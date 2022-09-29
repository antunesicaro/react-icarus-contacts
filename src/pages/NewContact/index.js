import PageHeader from "../../components/PageHeader";
import ContactForm from "../../components/ContactForm";

export default function NewContact(){ //passo props daqui pro PageHeadr com title.. também passo pro Contact form... do new é um, do edit outro, e assim por dianta
    return(
        <>
            <PageHeader
            title=" Novo contato"
            />

            <ContactForm
            buttonLabel="Cadastrar"
            />

        </>
        )
}
