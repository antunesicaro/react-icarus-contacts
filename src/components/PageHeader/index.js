import { Link } from "react-router-dom"; //pra substituir o uso do a
import { Container } from "./styles";
import arrow from '../../assets/images/icons/arrow.svg'
import PropTypes from 'prop-types'; //para que o PageHeader receba a props title

export default function PageHeader({title}){ //faço o PageHeader receber uma propriedade chama title, que vai variar de acordo com onde estou entrando, ai vai enviar pra ca essa prop e ela vai ser renderizada no h1
    return (
        <Container>
            <Link to="/">
                <img src={arrow} alt="back"></img>
                <span>Voltar</span>
            </Link>

            <h1>{title}</h1>
        </Container>
    )
}

PageHeader.propTypes = { //tipagem da prop, tiitle q tá como argumento de PageHeader vai ser obrigatório e do tipo string
    title: PropTypes.string.isRequired,
}


