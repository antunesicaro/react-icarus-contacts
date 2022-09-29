//paginas

import PageHeader from "../../components/PageHeader";
import ContactForm from "../../components/ContactForm";

export default function EditContact(){ //passo props daqui pro PageHeadr com title e também pro contact form de edit
    return (
        <>

         <PageHeader
            title="Editar icaro antuens"
         />

        <ContactForm
        buttonLabel="Salvar alterações"
        />

        </>
    );
}
