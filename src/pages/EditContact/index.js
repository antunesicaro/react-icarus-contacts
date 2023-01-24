//paginas

import PageHeader from "../../components/PageHeader";
import ContactForm from "../../components/ContactForm";
import { useParams,useHistory } from "react-router-dom";
import { useEffect, useState,useRef } from "react";
import ContactsService from "../../services/ContactsService";
import Loader from '../../components/Loader';
import toast from '../../utils/toast'

export default function EditContact(){ //passo props daqui pro PageHeadr com title e também pro contact form de edit

    const [isLoading,setIsLoading] = useState(true)//estado para mostrar o loading enquanto a requisição dos dados do contato tá sendo feita... começa sendo true, só faz tornar false depois quando fizer o carregamento de dado
    const contactFormRef = useRef(null)//crio uma referência dentro do componente pai e passo ela pro componente filho... faço essa passagem lá em baixno no contactform passando o ref de forma imperativa ...vou passar uma ref para o componente contactform e de lá dele vou conseguir acessar os valores.. começa como nulo pois enquanto o componente contact form não tiver renderizado, não vai ter nada dentro... dai começa como nulo
    const params = useParams();//usa os parametros de dentro do reactrouterdom q tá lá no routes.js, com isso consigo pegar o id... agora vamos pegar esse valor e fazer uma request pro backend... vou ter q chamar pro caminho localhost:3001/contacst/iddomoment... ai vou lá pro contactsservice pra implementar esse get ai q vem dados dando o id
    const history = useHistory(); //hook de histórico pra redirecionar
    const [contactName,setContactName] = useState(''); //estado pra pegar o nome do contato e colocar ao lado do render de editar dinamicamente... ai depois que faço a request lá em baixo seto esse valor usando a função para dizer q ao invés de ser vazio, ele vai ser o name de contact.name da requisição

    useEffect(() => {

        async function loadContact(){ //crio uma nova função que tenta fazer a requisição lá para contactsservice para usar o método getcontactbyid... como o método de lá espera um id, então vou ter q passar um id daqui e esse id vai ser o params.id, q é o id q foi entrado e q tá na url do routes
            try{
                const contactData = await ContactsService.getContactById(params.id);
                contactFormRef.current.setFieldsValues(contactData) //aqui estou falando: set os valores do meu campo com esses dados q foram feitos e buscando na api e levados pra la... entao to dizendo , o pai edit ta dizendo pro filho pra ele setar lá, acesso de modo imperativo


                setIsLoading(false); //desativa o loading pois deu certo a request
                setContactName(contactData.name) // mudo o estado para trocar o valor para o que veio do backend.. ai vou pro pageheader e ao invés de renderizar algo mockado, renderizo esse estado dinamico aqui
            }
            catch{
                //quando der erro, redireciona pra home e mostra um toast dizendo q deu erro
                history.push('/');
                toast({type:'danger',text:'Ocorreu um erro ao editar o contato',duration:4000})
            }
        }

        loadContact();

    },[params.id,history]) //rodar a request assim que o componente for montado na tela, pois vou querer pegar todos os dados do id q foi clicado




    async function handleSubmit(formData){ //recebe os dados do form ao clicar em submit pois no contactform o handle submit é uma função de callback,//pego todas informações q estão dentro do componente filho, la expliquei o fluxo, mas basicamente é q quero passar prop de filho pro pai, porém nao pode, dai usamos callback pra fazer isso, agora tenho acesso à infos dos contatos preenchidos pelo usuário no formulário
        try{
           const contact = {
               name:formData.name,
               email:formData.email,
               phone:formData.phone,
               category_id:formData.categoryId, //transformo pra snake-case q é oq a api espera.. poderia formatar aqui oq quisesse

           }

            const updatedContactData = await ContactsService.updateContact(params.id,contact) //mando um objeto contendo todos dados do formulario e também o id

            //setContactName(formData.name) //atualizo o estado pelo form
            setContactName(updatedContactData.name) //atualizo o estado pegando  do backend

          /*
            //criar um evento para depois disparar.. usando eventminner aqui... usa o custumevent pra criar um evento... é nativo do javascript... evento criado e disparado aqui vai envviar informação pro listener de adicionar toast.. a informação vai ser os parametros q precisam pra preencher o toast, que no caso é o texto e o tipo do toast
           const event = new CustomEvent('addtoast',{ //cria instancia de um novo evennto customizado pois assim ja vem com os atributos e propiredades nativos
               detail:{
                   type:'success',
                   text:`${response.name} foi cadastrado com sucesso`
               }
           }); //envia aqui dois argumentos, primeiro é uma string q é o nome do evento, nesse caso é o adicionartoast, dai quando eu for usar o addEventListener('aqui vai o nome q é addtoast') .....segundo argumento é um objeto q é opcional, ela é o detail q são as informações, por exemplo em um clique a posição que foi clicado, etc.TEMOS q pensar aqui: o que faz sentido eu enviar pra quem tá ouvindo o evento addtoast? faz sentido enviar o tipo e o text do toast... detail é opcional e posso enviar qualquer coisa como number,string,boolenan, ou não passar nada

           //agora que criamos o evento, vamos disparar
           document.dispatchEvent(event); //a partir do momento que faz esse dispatchEvent(disparamento do evento), todos os listeners que estiverem ouvindo(la no toast container por exemplo)
          */


           toast({
               type:'success',
               text: 'Contato foi editado com sucesso',
               duration:2000,
           })

        }catch{ // se na conseguir editar, vai renderizar um erro

           /*
             //criar um evento para depois disparar.. usando eventminner aqui... usa o custumevent pra criar um evento... é nativo do javascript... evento criado e disparado aqui vai envviar informação pro listener de adicionar toast.. a informação vai ser os parametros q precisam pra preencher o toast, que no caso é o texto e o tipo do toast
           const event = new CustomEvent('addtoast',{ //cria instancia de um novo evennto customizado pois assim ja vem com os atributos e propiredades nativos
               detail:{
                   type:'danger',
                   text:'erro ao cadastrar contato'
               }
           }); //envia aqui dois argumentos, primeiro é uma string q é o nome do evento, nesse caso é o adicionartoast, dai quando eu for usar o addEventListener('aqui vai o nome q é addtoast') .....segundo argumento é um objeto q é opcional, ela é o detail q são as informações, por exemplo em um clique a posição que foi clicado, etc.TEMOS q pensar aqui: o que faz sentido eu enviar pra quem tá ouvindo o evento addtoast? faz sentido enviar o tipo e o text do toast... detail é opcional e posso enviar qualquer coisa como number,string,boolenan, ou não passar nada

           //agora que criamos o evento, vamos disparar
           document.dispatchEvent(event); //a partir do momento que faz esse dispatchEvent(disparamento do evento), todos os listeners que estiverem ouvindo(la no toast container por exemplo) o addtoast, isto é, esperando o addtoast q tá no customevent vão ser executados*/

           toast({
               type:'danger',
               text:'Erro ao editar o contato'
           })

        }
       }


    //passo a ref do estado pro contactform... no entanto o react n pega assim do nada tudo dos estados do contact form e atribui pra referencia por meio do useref daqui... vamos ter que de maneira explicita, clara, receber a ref lá dentro do concatform e dizer q a ref.current , isto é, o valor da ref é uma string ou objeto, enfim, o que quiser, com a propriedade de setar valores dos campos... é o contactform, ou seja, o componente que está RECEBENDO a referência q vai definir o valor dessa referência e o que es´ta visível
    //ternario no pageheader... se o estado isLoading for true, mostra carregando contato, quando nao, mostra o nome do contato q veio do estado contatname com setcontactname
    return (
        <>

        <Loader isLoading={isLoading}/>

         <PageHeader
            title={isLoading ? 'Carregando contato...' :`Editar ${contactName}`}
         />

        <ContactForm
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
        ref={contactFormRef}
        />

        </>
    );
}
