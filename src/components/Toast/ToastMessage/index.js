import PropTypes from 'prop-types'
import { Container } from "./styles";
import xCircleIcon from '../../../assets/images/icons/x-circle.svg'
import checkIcon from '../../../assets/images/icons/check-circle.svg'

//recebo o valor(texto) do pai toastContainer pra esse conteiner daqui
//logica : quando o type q vem de props for sucess, redenrizo a imagem de sucesso, quando for error, redereniza danger
//pego o type que recebo de toastcontainer jogo esse type pro container q é o uum styled por meio de prop, e lá no styled faço a lógica para escolher o estilo de  um dos variants de acordo com type  que for mandado aqui..
export default function ToastMessage({text,type}){
    return (
        <Container type={type}>
            {type === 'danger' && <img src={xCircleIcon} alt="X"/>}
            {type === 'success' && <img src={checkIcon} alt="check"/>}
            <strong>{text}</strong>
        </Container>
    )
}

ToastMessage.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default','success','danger']) // deixar especificado q o valor q deve vir pela prop é um desses q ta no array
}

ToastMessage.defaultProps = { //quando nao passar nadala pela props de toatscontainer em type, o valor padrao do ype é default
    type:'default'
}
