import PropTypes from 'prop-types'
import Spinner from '../Spinner';
import { StyledButton } from "./styles";

//recebo as props, digo q o styledButton vai estar disabilitado quando os valores q eu receber dos estados for disabled  true ou isLoading true
//recebo o conteúdo q é informado dentro do button, que é o children.  <Button>conteudo(children)<Button>
export default function Button({type,disabled,isLoading,children}){
    return(
    <StyledButton type={type} disabled={disabled || isLoading} >
        {!isLoading && children}
        {isLoading && <Spinner size={16}></Spinner>}
    </StyledButton>
    )
}


Button.propTypes = {
    type: PropTypes.string,
    disabled: PropTypes.bool,
    isLoading:PropTypes.bool,
    children:PropTypes.node.isRequired
}

Button.defaultProps = {
    type:'button',
    disabled:false,
    isLoading:false,
}
