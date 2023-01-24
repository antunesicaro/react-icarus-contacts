import PropTypes from "prop-types"; //importar pois vou precisar receber uma label via props para o form mudar de acordo com a página
import { useState,useEffect,forwardRef,useImperativeHandle } from "react";

import isEmailValid from "../../utils/isEmailValid";
import formatPhone from "../../utils/formatPhone";

import useErrors from "../../hooks/useErrors";

import { Form,ButtonContainer } from "./styles";


import FormGroup from "../FormGroup";
import Input from "../Input"; //oq importar aqui e usar dentro do FormGroup, vai ser repassado pro index.js do formgroup como children.... dai posso usar o form group pra select ou qualquer outro como input, button ... com isso aqui já podemos personalizar os erros de forms
import Select from "../Select";
import Button from "../Button";

import CategoriesService from "../../services/CategoriesService";


//para por os erros mokados: error="O formato do email é inválido" como classe no formgroup desejado , error como class no input
//recebe a label via props pra usar no button... vai pra pagina de new cotact para fazer a config de mandar pra cá via props
//recebe ref como uma prop q vem lá do editcontact q é o pai.. porém ref , assim como key é propriedade interna do react, ai vai dar undefined... precisa usar o fowardRef(), que é o encaminhamento de referência. O fowardRef pega a referencia lá do editcontact contactform e encaminha pra dentro desse nosso componente, pois ai conseguimos acessar a ref
//o retorno de fowardRef é o componente contactform
//recebe também outro argumento q é a ref porém não como prop e sim como segundo argumento, ai sim tenho acesso ao currtent da ref, que o valor inicial é nulo q tá lá no editcontact no contactformref com useref
//usa-se o forwardRef aqui dentro do contact form pois ele tá recebendo uma ref do editcontact, essa ref q tá vindo de lá é imperativa , ai digo q é um objeto com dados
const ContactForm = forwardRef(({ buttonLabel,onSubmit, },ref) => { //recebe um argumento que é o render, redenrização... é um componente do react onde posso usar tudo como os hooks



     //error do input é true ou false

    //para transforamr o componente em controled, basta passar um value nele com valor do name daqui do usestate... passa a ser controled.. react q fica responsabilidade do controle de informações desse componente, como ele está se copmportando, etc... react q dá o feedback visual, precisa atualizar a dom pra ver, dai tem q usar o hook setName, e usar no onchange do compopnente, no caso do input
    const [name,setName] = useState(''); //transformar o iput de nome, por exemplo, em um componente controlado, ai podemos controlar seu valor a partir do react.. o valor q tem no use state é vazio pois é o inicial.. como é um formlário, quer deixar vazio mesmo para ser preenchido.
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [categoryId,setCategoryId] = useState('');
    const [categories,setCategories] = useState([]) //estado de categories começa como um array vazio, e depois é preenchido  assim q fizer o loadCategories com a requisição
    const [isLoadingCategories,setIsLoadingCategories] = useState(true); //começa como true pois assim q o componente entra na tela, já vai ta loading.. dai so vou setar false pra dizer que nao ta mais loading quando parar o loading
    //sempre pensar: é uma coisa q vou usar toda vez q o concatc form for usado? se sim, centralizo aqui no componente, como é o exemplo agora do loading do botao de cadastrar ou atualizar
    const [isSubmiting,setIsSubmiting] = useState(false); //começa sendo false, pois o estado só vai ser true quando eu clicar no botao o uder enter no formuilario


    //atribuindo  valor à ref
    //const refObject = ref;
    //refObject.current = 'valor setado dentro do contact form' //agora o valor q é setado aqui, ocupa o valor de null q tem no pai, que é o editcontact no useref


    //atribuindo e setando com o hook especifico para lidar com uso imperativo... bascimanete aqui vamos dizer q o valor dessa referencia será os dados da api q estou chamando, dai vou conseguir mudar esse contact form refletindo lá no pai... perceber q temos que fazer tudo isso com o hook de uso imperativo pois a ordem do react é de pai para filho... daqui estou fazendo uma mudança do filho para o pai
    useImperativeHandle(ref,() => ({
         // o que for retornado da função, será o current da ref
            setFieldsValues: (contact) => { //recebe os dados do contato diretamente do q a api retorna
                setName(contact.name ?? '');
                setEmail(contact.email ?? '');//uso o operador de nulish q é o ??, poderia usar o || a diferença é q o nulish só conta se for null ou undefined, já o || conta 0,nan,false,undefnid, ai sempre q fosse um desse vai ser valor vazio na string, enfim, caso de uso...se tiver valor usa ele, se n tiver usa string vazia para não dar o famoso erro de 'value' prop on... consider using an empty string
                setPhone(contact.phone ?? '');
                setCategoryId(contact.category_id ?? '');
            },

            resetFields: () => {
                setName('');
                setEmail('');
                setPhone('');
                setCategoryId('');
            }

    }),[]);//primeiro argumento q recebe é a ref, o segundo argumento é uma função normal q o que retorna de dentro da função será o valor q será atribuido ao current da ref... no caso quero q o valor desse retorno seja o objeto com os setname pra contact.name por exemplo

    const {setError,removeError,getErrorMessageByFieldName,errors} = useErrors();

    const isFormValid = (name && errors.length === 0); //verifica se dentro do state name, tem um valor válido... quando tem um valor vazio, é false, dai a negação de false lá no button do submit é true, sendo true, a propriedade disable fica true, então desabilita... se tiver coisa escrita é true, porém a negção de true lá no button faz virar false, logo vai estar habilitado, pois o disable vai ser false... também digo q o meu array de erros precisa ter um tamanho igual a 0, o useja, que ele não tenha nenhum erro dentro, pois assim sabemos q ele tá válido



    useEffect(() => { //faço a requisiçõa aqui e o resultado q é justamente as categorias, irei salvar em um estado
        async function loadCategories(){

            try{
                const categoriesList = await CategoriesService.listCategories()

                setCategories(categoriesList) //assim q fizer a requisição, pego o array de resultados e salvo no estado q começa como vazio e agora está preenchido.
            } catch {
                //comentario apenas pra não bugar o eslint ou usa o allowEmptyCatch
            } finally { //independente de cair no try ou no catch, executo esse bloco
                //quando a promise termina, ou seja, todo carregamento foi feito, seto o is loading como false pois ele nao está mais loading
                setIsLoadingCategories(false)
            }

            }

        loadCategories();
    },[]);


    function handleNameChange(event){
        setName(event.target.value);

        if(!event.target.value){ //pra quando limpar o input..negação de string vazia é true, quando o usuário n digitou nada ainda.. então,  se for true, cai dentro do bloco pra executar //pego o value no momento da digitação... não uso aqui o name, pois é assincrono e nao posso pegar ele direto pois tem delay, dai pego o value direto do momento
           setError({field:'name',message:'Nome é obrigatório'});
        }
        else{ //se não for uma string vazia, isto é, aqui é um valor válido e esta checagem tá atualizando os erros e removendo os que não existem mais.. aqui é como se fosse a atualização, 'não está mais com esse erro, foi ajustado'
            removeError('name');
        }
    };

    function handleEmailChange(event){
        setEmail(event.target.value)

        if(event.target.value && !isEmailValid(event.target.value)){ //se o usuário digitou algo e essa coisa NÃO é um email valido... retorna true ou false do isEmailValid, true pra valido, false pra invalido...entao esse if diz: se o usuário digitou algo e ese algo não é válido.. faça algo

          setError({field:'email',message:'Email é inválido'});

        }else{ //se o usuário não digitou nada, só remove os erros pq não é um field(campo) obrigatório
            removeError('email')
        }
    }

    function handlePhoneChange(event){ //pega oq tá sendo digitado e manda como argumento pra regex de validação q tá em utils e foi exportada pra ca
        setPhone(formatPhone(event.target.value))
    }

    //function click no cadastrar... lembrar q quando for chamar o onbumit no form, o comportamento padrão é atualizar a pagina, pega todos dados q tem dentro dele como input,select e envia pra dentro da url que a gente passa dentro do action dele mesmo q nós criamos lá no form... por padrão o método é get, quando manda o valor vai por query params pro action q tá especificado... esse action é no porprio elemento em que tá o onSubmit{handleSubmit}
   async function handleSubmit(event){ //recebe o evento e previne o comportamento padrão dele para q não atualize a página e faça o que eu digitei em cima daqui
        event.preventDefault(); //não vai redirecionar a página e sim continuar executando o código

        setIsSubmiting(true)//mudo pra true quando o estado de está enviando a requisição

        await onSubmit({name,email,phone,categoryId}); //função de callback, dentro do componente filho q é esse(CotnactForm) tô executando uma função que está no componente pai(NewContact)... precisamos enviar as infomações do contato pra ca, pra dentro da onSubmit,pois no componente pai e dentro do pai faz a request enviando as inforamções que o usuário preencheu dentro do formulario, só que essas informações q o usuario preencheu dentro do formulçario estão dentro de um componente filho(contactform)... sempre tenho q pegar de pai e passo pro filho, n tem como fazer o oposto, por isso q estamos fazendo toda essa loucura de criar função no componente pai(NewContact), repassar ela pro filho(CotnactForm) como sendo prop e então no componente filho executa essa prop q foi repassada pelo pai,enviando as informações do contato pro pai, ai vai conseguir subir do "filho pro pai" usando o callback....

        //cehecar se o codigo abaixo realmejnte depende da promise, se n usar o .finally(()=>setissubmiting) na onsubmit
        setIsSubmiting(false); //quando o onsubmit for lá na handle submit, executar ela e trazer o retorno, ai vai ta finalizado o envio e boto false novamento pois n vai mais estar carregando



        //quando tiver submit, limpar os campos do form: isso serve apenas para quando criar um contato, quando editar nao quero isso
        //setName('');
        //setEmail('');
        //setPhone('');
        //setCategoryId('');
        //console.log({name,email,phone,categoryId});
        //obs: se eu quisesse ao clicar, mandar pro banco somente numeros do phone, sem os () e - da mascara... exemplo: manda 40028922 ao  inves de (91) 4002-8922 ..... teria que fazer um phone.replace(/\D/g,'') ... pega todos(g de global) caracteres q nao sao digitos(D) e transforma em string vazia, assim vai ficar só os numeros
    }







    //uso o noValidate para deixar que as validações do html de form, por exemplo, não interfiram em nada, não bloquee nada, pois eu que vou fazer manualmente.
    //formgroup do select tem dentro como prop o isloading como true, dai dentro do componente Frompgroup, lá onde tem children, error,etc, vou receber essa prop e tratar ela lá
    //<FormGroup isLoading={isLoadingCategories}> islaoding prop vai ser true quando o estado isloadingcategories tb for true
    //no botãocontainer : se não está sendo submetido, ai mostra o botão...se isSubmiting, mostra o spinner
    //uso nos disabled de html tb quando estiver submiting, desabilitar os campos
    return (
        <Form onSubmit={handleSubmit} noValidate>
            <FormGroup error={getErrorMessageByFieldName('name')}>
                <Input
                error={getErrorMessageByFieldName('name')}
                placeholder="Nome*"
                value={name}
                //onChange={(event) => console.log(event.target.value) }
                onChange={handleNameChange} //conforme vai digitando, react vai vendo no value.. oneway databind... unica fonte de verdade
                disabled={isSubmiting} //se estiver no estado de submiting, fica desablitado o input,
                />
            </FormGroup>

            <FormGroup error={getErrorMessageByFieldName('email')} >
                <Input
                  type="email"
                  error={getErrorMessageByFieldName('email')}
                  placeholder="E-mail"
                  value={email}
                  onChange={handleEmailChange}
                  disabled={isSubmiting}
                />
            </FormGroup>

            <FormGroup>
                <Input
                placeholder="Telefone"
                value={phone}
                onChange={handlePhoneChange}
                maxLength = "15"
                disabled={isSubmiting}
                />
            </FormGroup>


            <FormGroup isLoading={isLoadingCategories}>
                <Select
                   value={categoryId}
                   onChange={(event) => setCategoryId(event.target.value) }
                   disabled={isLoadingCategories || isSubmiting} //quando o isloadingcat for true, nao vai dar pra selecionar categorias, vai estar disbilitado o select
                >
                    <option value="">Sem categoria</option>
                    {categories.map((category) => ( //pra cada categoria vou rendezirar uma option
                         <option key={category.id} value={category.id}>{category.name}</option>
                    ))}

                </Select>
            </FormGroup>


            <ButtonContainer>
                <Button
                type="submit"
                disabled={!isFormValid}
                isLoading={isSubmiting}
                >

                {buttonLabel}

                </Button>
            </ButtonContainer>
        </Form>
    );

})


//export default function ContactForm(){

//}
//passo a propriedade isLoading pra dentro do componente Button, pois quero ter em varios buttons o isSubmiting.. quando issubmiting é true ele bloqueia automatico o botao
//tiro tudo isso:  {!isSubmiting && buttonLabel}
//               {isSubmiting && <Spinner size={16}/>}
//pois a lógica vai mudar,passo só o buttonlabel, pois a partir da propriedade is loading, ele já faz as duas coisas, desabilitar o botao e rederenziar o spinner

//sobre o disabled do button submit:
//vai estar desabilitado apenas quando o formulário não estiver válido, negação, quando o isformvalid for false ele fica desabilitado
//quando puxo uma funcao por prop preciso tipar
ContactForm.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
}

export default ContactForm;
