import PropTypes from 'prop-types'; //preciso importar o prop-types para poder conceder pro FormGroup uma prop e tipar
import { Container } from "./styles";



export default function FormGroup({children,error}){ //passar o input pra ca pra dentro via children q vem lá no formgroup, q tem dentro dele um input(uma children)
    //depois do children, que é os input
    //se houver algum valor dentro do error, q seja diferente de null, sendo true, retorna o lado direito da expressao do error, q no caso é um small com msg
    return (
       <Container>
            {children}
            {error && <small>{error}</small>}
       </Container>
    )
}

FormGroup.propTypes = {
    children: PropTypes.node.isRequired,
    error: PropTypes.string,
}

FormGroup.defaultProps = { //valor padrão, que começa
    error:null,
}
