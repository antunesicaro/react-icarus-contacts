import PropTypes from 'prop-types'
import Spinner from '../Spinner';
import { StyledButton } from "./styles";

//recebo as props, digo q o styledButton vai estar disabilitado quando os valores q eu receber dos estados for disabled  true ou isLoading true
//recebo o conteúdo q é informado dentro do button, que é o children.  <Button>conteudo(children)<Button>
//recebo tb a propriedade danger, que vai repassar pro styledbutton quando invocada de algum lugar...nesse lugar q to invocando digo q a prop é danger por exemplo, ai vem o danger pra ca e leva pro styled ali em baixo
//recebo tb o onclick q vai ser uma func e não vai ser obrigatorio, por padrao o valor é undefnid caso nao passe nada.... passo pro styledbutton, quando o botao for clicado passo o onclick
export default function Button({type,disabled,isLoading,children,danger,onClick}){
    return(
    <StyledButton type={type} disabled={disabled || isLoading} danger={danger} onClick={onClick} >
        {!isLoading && children}
        {isLoading && <Spinner size={16}></Spinner>}
    </StyledButton>
    )
}


Button.propTypes = {
    type: PropTypes.string,
    disabled: PropTypes.bool,
    isLoading:PropTypes.bool,
    children:PropTypes.node.isRequired,
    danger:PropTypes.bool,
    onClick:PropTypes.func
}

Button.defaultProps = {
    type:'button',
    disabled:false,
    isLoading:false,
    danger:false,
    onClick:undefined
}
