//modal genérico
import PropTypes from "prop-types";
import ReactDOM  from "react-dom"; //react dom é o pacote que usamos pra renderizar os componentes react na web, uso pra crair portal
import { Overlay,Container,Footer } from "./styles"
import Button from "../Button" //importo o button e vou redenrizar ele diferente


export default function Modal({danger}){ //pego a prop danger e mando pro container,,, danger é a cor no caso para por no title da modal...essa informação é true ou false

    return ReactDOM.createPortal( //o primeiro agumento que passo é o children(que é um código jsx), ou seja, o que desejamos rendezizar quando o modal for usado, que é bascamente o overlay com todos componentes que tem  dentro(a modal em si)... o segundo argumento é onde sejo renderizar tudo isso, no caso eu desejo redenzirazr em uma nova div que vou criar lá no html... estou fazendo tudo isso pois queria usar um position na modal pra ficar em toda tela, porém ele tem uma div mae q impede de eu deixar em relação à toda tela, portanto eu crio um portal pra que o pai dessa modal seja a div q vou por no html, assim ela vai ter a referência como se tivesse da root, que é a mais geral, tendo a referência da mais geral, consigo deixar a position em relação à toda a tela
    <Overlay>
        <Container danger={danger}>
            <h1>Titulo do modal</h1>
            <p>
                Corpo do modal
            </p>

            <Footer>
                <button type="button" className="cancel-button">Cancelar</button>
                <Button type="button" danger={danger}>Deletar</Button>
            </Footer>
        </Container>
    </Overlay>,document.getElementById('modal-root'),
    )

}


Modal.propTypes = {
    danger: PropTypes.bool,
}

Modal.defaultProps = { //digo que a propriedader por padrão é false... vindo lá da modal, vem como true
    danger: false,
}
