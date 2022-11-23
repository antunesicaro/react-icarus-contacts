import PropTypes from 'prop-types'
import { StyledSpinner } from "./styles";


export default function Spinner({ size }){ //recebo uma prop chamada tamanho(size) q vai ser o tamanho do font-size, pois estamos componentizando o spinner para ser usado em varias telas, o mesmo estilo dele porém de difirentes tamanhos
    //passo a prop tb pro styled, pois é lá que vamos usar
    return <StyledSpinner size={size} />
}

Spinner.propTypes = {
    size: PropTypes.number,
}


Spinner.defaultProps = { //size padrao do spinner se n passar nenhuma prop quando usar o componente
    size: 32,
}
