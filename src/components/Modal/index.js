//modal genérico
import PropTypes from "prop-types";
import ReactDOM  from "react-dom"; //react dom é o pacote que usamos pra renderizar os componentes react na web, uso pra crair portal
import { Overlay,Container,Footer } from "./styles"
import Button from "../Button" //importo o button e vou redenrizar ele diferente

//titulo da modal é passado via prop tb... tb recebo um children para no corpo ser oq quiser, depende do que o componente q vai usar esse componente modal aqui decidir, se elequiser q seja strong vai ser, paragrafo vai ser,enfim.
//se quiser mudar os valores de cancellabel e confirmlabel é só escrever por cima a prop no componente que for usar esse, mas por pdrão existem lá em baixo
//também recebo pro das funções quando clicar nos botoes...onclick executa oncancel,assim por diante
//também recebo visible de onde uso o componente, no caso é lá de home, estado . agora que recebi posso fazer a redenrização condicional aqui dentro
//também recebe o isloading dentro do modal, pra quando clicar no modal e fizer a request, aparecer o loading de carregamento...passo o isloading pra dentro do meu button
export default function Modal({visible,isLoading,danger,title,children,cancelLabel,confirmLabel,onCancel,onConfirm}){ //pego a prop danger e mando pro container,,, danger é a cor no caso para por no title da modal...essa informação é true ou false

    if(!visible){ //não retorna nada, não renderiza nada na tela se a prop for diferente de true,
        return null
    }//agora se viseble for true... faz o q tá abaixo

    //envolvo children em uma div pra estilizar
    //no nosso Button de onconfirm preciso levar o onclick pra ele, q é um componente nosso e nao nativo
    return ReactDOM.createPortal( //o primeiro agumento que passo é o children(que é um código jsx), ou seja, o que desejamos rendezizar quando o modal for usado, que é bascamente o overlay com todos componentes que tem  dentro(a modal em si)... o segundo argumento é onde sejo renderizar tudo isso, no caso eu desejo redenzirazr em uma nova div que vou criar lá no html... estou fazendo tudo isso pois queria usar um position na modal pra ficar em toda tela, porém ele tem uma div mae q impede de eu deixar em relação à toda tela, portanto eu crio um portal pra que o pai dessa modal seja a div q vou por no html, assim ela vai ter a referência como se tivesse da root, que é a mais geral, tendo a referência da mais geral, consigo deixar a position em relação à toda a tela
    <Overlay>
        <Container danger={danger}>
            <h1>{title}</h1>

            <div className="modal-body">{children}</div>


            <Footer>
                <button onClick={onCancel} type="button" className="cancel-button">{cancelLabel}</button>
                <Button  onClick={onConfirm} type="button" danger={danger} isLoading={isLoading}>{confirmLabel}</Button>
            </Footer>
        </Container>
    </Overlay>,document.getElementById('modal-root'),
    )

}


Modal.propTypes = {
    danger: PropTypes.bool,
    visible: PropTypes.bool.isRequired,
    isLoading:PropTypes.bool,
    title:PropTypes.string.isRequired,
    children:PropTypes.node.isRequired,
    confirmLabel:PropTypes.string,
    cancelLabel:PropTypes.string,
    onCancel:PropTypes.func.isRequired,
    onConfirm:PropTypes.func.isRequired,


}

Modal.defaultProps = { //digo que a propriedader por padrão é false... vindo lá da modal, vem como true
    danger: false,
    isLoading:false,
    confirmLabel:'confirmar',
    cancelLabel:'Cancelar,'
}
