import PropTypes from 'prop-types'; //preciso importar o prop-types para poder conceder pro FormGroup uma prop e tipar
import Spinner from '../Spinner';
import { Container } from "./styles";



export default function FormGroup({children,error,isLoading}){ //passar o input pra ca pra dentro via children q vem lá no formgroup, q tem dentro dele um input(uma children)
    //depois do children, que é os input
    //se houver algum valor dentro do error, q seja diferente de null, sendo true, retorna o lado direito da expressao do error, q no caso é um small com msg
    //children são os filhos do FormGroup
    //coloco uma div pra redenrizar os filhos de form group
    //crio renderização condicional pra dizer q se o isloading passado pela prop for true, rederenrizo o carregamento
    //só criei o form item pra ele ser relative e o loader absolulte em relacao ao seu pai e nao em relacao a pagina, assim ele fica no right do input e nao da pagina toda
    //redenrizo o componente spinner q retorna um spinner estilizado quando o tiver carregando
    //crio uma div com class name pra englobar o spinner e essa div q irá controlar a posição do spinner, pois ele é um componente com a mesma posição padrão, ai o componente q for usar ele q vai dizer qual posicao ele deve ficar, usando uma div q ira englobar ele e o controlar
    return (
       <Container>
           <div className="form-item">
            {children}

            {isLoading && <div className="loader"><Spinner size={16}/></div>}

           </div>

            {error && <small>{error}</small>}
       </Container>
    )
}

FormGroup.propTypes = {
    children: PropTypes.node.isRequired,
    error: PropTypes.string,
    isLoading : PropTypes.bool ,
}

FormGroup.defaultProps = { //valor padrão, que começa
    error:null,
    isLoading: false //nas propriedades padrao começa sendo false
}
