import { Container } from "./styles"
import ToastMessage from "../ToastMessage"
import { useState } from "react"

//preciso dinamizar a lista,ou seja, toda vez que aparecer um toast na tela ou ele for sumir, a interface atualize, pra isso atualiza estado, usa estado
export default function ToastContainer(){

    //ja desestrutura pra trazer os proprios valores do obj
    const  [messages] = useState([
        { id: Math.random(),type:'default',text:'Default text' },
        { id: Math.random(),type:'danger',text:'danger text' },
        { id: Math.random(),type:'success',text:'suces text' },
    ]);



    //apago do return <ToastMessage text="Default Toat" />
    //<ToastMessage text="Error Toat" type="danger"/>
    //<ToastMessage text="Sucess Toat" type="success"/> //parei em 5 min


    return (
        <Container>
            {messages.map((message) => (
                <ToastMessage
                key={message.id}
                type={message.type}
                text={message.text}
                />
            ))}
        </Container>
    )
}
