import PropTypes from "prop-types"; //importar pois vou precisar receber uma label via props para o form mudar de acordo com a página
import { useState } from "react";

import isEmailValid from "../../utils/isEmailValid";
import formatPhone from "../../utils/formatPhone";

import useErrors from "../../hooks/useErrors";

import { Form,ButtonContainer } from "./styles";


import FormGroup from "../FormGroup";
import Input from "../Input"; //oq importar aqui e usar dentro do FormGroup, vai ser repassado pro index.js do formgroup como children.... dai posso usar o form group pra select ou qualquer outro como input, button ... com isso aqui já podemos personalizar os erros de forms
import Select from "../Select";
import Button from "../Button";



//para por os erros mokados: error="O formato do email é inválido" como classe no formgroup desejado , error como class no input


export default function ContactForm({ buttonLabel }){ //recebe a label via props pra usar no button... vai pra pagina de new cotact para fazer a config de mandar pra cá via props
    //error do input é true ou false

    //para transforamr o componente em controled, basta passar um value nele com valor do name daqui do usestate... passa a ser controled.. react q fica responsabilidade do controle de informações desse componente, como ele está se copmportando, etc... react q dá o feedback visual, precisa atualizar a dom pra ver, dai tem q usar o hook setName, e usar no onchange do compopnente, no caso do input
    const [name,setName] = useState(''); //transformar o iput de nome, por exemplo, em um componente controlado, ai podemos controlar seu valor a partir do react.. o valor q tem no use state é vazio pois é o inicial.. como é um formlário, quer deixar vazio mesmo para ser preenchido.
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [category,setCategory] = useState('');


    const {setError,removeError,getErrorMessageByFieldName,errors} = useErrors();

    const isFormValid = (name && errors.length === 0); //verifica se dentro do state name, tem um valor válido... quando tem um valor vazio, é false, dai a negação de false lá no button do submit é true, sendo true, a propriedade disable fica true, então desabilita... se tiver coisa escrita é true, porém a negção de true lá no button faz virar false, logo vai estar habilitado, pois o disable vai ser false... também digo q o meu array de erros precisa ter um tamanho igual a 0, o useja, que ele não tenha nenhum erro dentro, pois assim sabemos q ele tá válido



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
    function handleSubmit(event){ //recebe o evento e previne o comportamento padrão dele para q não atualize e faça o que eu digitei em cima daqui
        event.preventDefault(); //não vai redirecionar a página e sim continuar executando o código

        console.log({name,email,phone,category});
        //obs: se eu quisesse ao clicar, mandar pro banco somente numeros do phone, sem os () e - da mascara... exemplo: manda 40028922 ao  inves de (91) 4002-8922 ..... teria que fazer um phone.replace(/\D/g,'') ... pega todos(g de global) caracteres q nao sao digitos(D) e transforma em string vazia, assim vai ficar só os numeros
    }







    //uso o noValidate para deixar que as validações do html de form, por exemplo, não interfiram em nada, não bloquee nada, pois eu que vou fazer manualmente.
    return (
        <Form onSubmit={handleSubmit} noValidate>
            <FormGroup error={getErrorMessageByFieldName('name')}>
                <Input
                error={getErrorMessageByFieldName('name')}
                placeholder="Nome*"
                value={name}
                //onChange={(event) => console.log(event.target.value) }
                onChange={handleNameChange} //conforme vai digitando, react vai vendo no value.. oneway databind... unica fonte de verdade
                />
            </FormGroup>

            <FormGroup error={getErrorMessageByFieldName('email')} >
                <Input
                  type="email"
                  error={getErrorMessageByFieldName('email')}
                  placeholder="E-mail"
                  value={email}
                  onChange={handleEmailChange}
                />
            </FormGroup>

            <FormGroup>
                <Input
                placeholder="Telefone"
                value={phone}
                onChange={handlePhoneChange}
                maxLength = "15"
                />
            </FormGroup>

            <FormGroup>
                <Select
                   value={category}
                   onChange={(event) => setCategory(event.target.value) }
                >
                    <option value="">Categoria</option>
                    <option value="instagram">Instagram</option>
                    <option value="discord">Discord</option>
                </Select>
            </FormGroup>

            <ButtonContainer>
                <Button type="submit" disabled={!isFormValid}>
                 {buttonLabel}
                </Button>
            </ButtonContainer>
        </Form>
    );
}
//sobre o disabled do button submit:
//vai estar desabilitado apenas quando o formulário não estiver válido, negação, quando o isformvalid for false ele fica desabilitado

ContactForm.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
}
