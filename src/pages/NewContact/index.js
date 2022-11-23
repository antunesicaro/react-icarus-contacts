import PageHeader from "../../components/PageHeader";
import ContactForm from "../../components/ContactForm";
import ContactsService from "../../services/ContactsService";

export default function NewContact(){ //passo props daqui pro PageHeadr com title.. também passo pro Contact form... do new é um, do edit outro, e assim por dianta

    //estou dentro do componente pai q é o NewContatact, os filhos dele sao os componente PageHeader e CotbnactForm
    //vou criar um função aqui que handle(lida) com submit
    //callback por prop: quando o componente ContactForm for submetido(enviado),chama a função daqui do pai e manda pra esse ContactForm(filho) via props... pega uma função e envia ela pro componente filho
    //mando a prop com o nome onSubmit pois quando formos usar html, fica mais fácil e clean.. no html, para lidar com clique por exemplo, usamos o onSubmit, aqui já passamos como onSubmit também

    async function handleSubmit(formData){ //pego todas informações q estão dentro do componente filho, la expliquei o fluxo, mas basicamente é q quero passar prop de filho pro pi, porém nao pode, dai usamos callback pra fazer isso, agora tenho acesso à infos dos contatos preenchidos pelo usuário no formulário
     try{
        const contact = {
            name:formData.name,
            email:formData.email,
            phone:formData.phone,
            category_id:formData.categoryId, //transformo pra snake-case q é oq a api espera.. poderia formatar aqui oq quisesse

        }

        const response = await ContactsService.createContact(contact) //mando um objeto contendo todos dados do formulario

        //console.log(response)
     }catch{ // se na conseguir cadastrar, vai renderizar um erro
        alert('erro hein')
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
            />

        </>
        )
}
