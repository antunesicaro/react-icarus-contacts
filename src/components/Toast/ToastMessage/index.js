import PropTypes from 'prop-types'
import { Container } from "./styles";
import xCircleIcon from '../../../assets/images/icons/x-circle.svg'
import checkIcon from '../../../assets/images/icons/check-circle.svg'
import { useEffect } from 'react';

//recebo o valor(texto) do pai toastContainer pra esse conteiner daqui
//logica : quando o type q vem de props for sucess, redenrizo a imagem de sucesso, quando for error, redereniza danger
//pego o type que recebo de toastcontainer jogo esse type pro container q é o uum styled por meio de prop, e lá no styled faço a lógica para escolher o estilo de  um dos variants de acordo com type  que for mandado aqui..
//onclick na div Q LEVA para função de remover o toast... preciso remover de dentro do meu array de estados q tem a message,type, e text... por isso a manipulação precisa occorer dentro do toastContainer pois n dá pra remover do toastmessage pois o estado está em outro lugar, dai vou pro toast container crio uma handleremovemessage
//recebo tb a prop onRemoveMessage que é a função handleRemoveMessage
//recebo tb um id da message
export default function ToastMessage({message,onRemoveMessage}){



    useEffect(()=>{

        //criando um timer para depois desse timer, remover o toast com o onremovemessage
        //crio com const para depois pegar o id dessa const para limpar com o cleartimeout
       const timeoutId = setTimeout(() => { //crio uma arrow, assim q der o tempo do timeout, chamo a função de remover pois ela tem par^Çametro
        onRemoveMessage(message.id); //vou querer remover assim como estou fazendo lá no componente pai, aqui é apenas o callback pois a função tá no pai
       },message.duration || 7000);

       return() => { //cleanup para quando o usuário clicar para fechar o toast, pare de executar o settimeout de cima
        //sempre limpar o timeout

        clearTimeout(timeoutId);
       }

    },[message,onRemoveMessage]);//assim que o componente for montado, quuero executar uma função.. pra isso uso o useefecct

    function handleRemoveToast(){
        //no momneto em que a handleremovetoast for executada, que é quando o toast de fechar é clicado, ai eu chamo o onremovemessage
        onRemoveMessage(message.id);
    }

    //tabindex e role é 0 pois na primeira interação do tab ele fica como zero para acessiblidade de pessoas cegas
    return (
        <Container tabIndex={0} role="button" type={message.type} onClick={handleRemoveToast}>
            {message.type === 'danger' && <img src={xCircleIcon} alt="X"/>}
            {message.type === 'success' && <img src={checkIcon} alt="check"/>}
            <strong>{message.text}</strong>
        </Container>
    )
}

ToastMessage.propTypes = {

    onRemoveMessage:PropTypes.func.isRequired,

    message:PropTypes.shape({
        id:PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['default','success','danger']) ,// deixar especificado q o valor q deve vir pela prop é um desses q ta no array
        duration:PropTypes.number,
    }).isRequired
}


/*
ToastMessage.defaultProps = { //quando nao passar nadala pela props de toatscontainer em type, o valor padrao do ype é default
    type:'default'
}
*/

