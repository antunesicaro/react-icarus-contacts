import PageHeader from "../../components/PageHeader";
import ContactForm from "../../components/ContactForm";
import ContactsService from "../../services/ContactsService";
import toast from "../../utils/toast";
import { useRef } from "react";

export default function NewContact(){ //passo props daqui pro PageHeadr com title.. também passo pro Contact form... do new é um, do edit outro, e assim por dianta

    //estou dentro do componente pai q é o NewContatact, os filhos dele sao os componente PageHeader e CotbnactForm
    //vou criar um função aqui que handle(lida) com submit
    //callback por prop: quando o componente ContactForm for submetido(enviado),chama a função daqui do pai e manda pra esse ContactForm(filho) via props... pega uma função e envia ela pro componente filho
    //mando a prop com o nome onSubmit pois quando formos usar html, fica mais fácil e clean.. no html, para lidar com clique por exemplo, usamos o onSubmit, aqui já passamos como onSubmit também


    //crio a referência aqui para o contactform e passo essa referência do pai(newcontact) pro filho(contactform)
    const contactFormRef = useRef(null)

    async function handleSubmit(formData){ //pego todas informações q estão dentro do componente filho, la expliquei o fluxo, mas basicamente é q quero passar prop de filho pro pi, porém nao pode, dai usamos callback pra fazer isso, agora tenho acesso à infos dos contatos preenchidos pelo usuário no formulário
     try{
        const contact = {
            name:formData.name,
            email:formData.email,
            phone:formData.phone,
            category_id:formData.categoryId, //transformo pra snake-case q é oq a api espera.. poderia formatar aqui oq quisesse

        }

         await ContactsService.createContact(contact) //mando um objeto contendo todos dados do formulario

        contactFormRef.current.resetFields(); //vai pro contactform e fica centralizado esse método de limpar lá, porém só chamo esse método aqui do novo contato, do editar nao quero

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
            text: 'Contato foi cadastrado com sucesso',
            duration:2000,
        })

     }catch{ // se na conseguir cadastrar, vai renderizar um erro

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
            text:'Erro ao cadastrar o contato'
        })

     }
    }


    return(
        <>
            <PageHeader
            title=" Novo contato"
            />

            <ContactForm
            buttonLabel="Cadastrar"
            onSubmit={handleSubmit}
            ref={contactFormRef }
            />

        </>
        )
}
