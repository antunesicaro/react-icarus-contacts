//header agora é só o logo, pois é a única que se repete em todas as páginas

import { Container } from './styles'; //importo dos estilos da mesma pasta, lá estilizo e mando pra cá
import logo from '../../assets/images/logo.svg' //quando importo imagem, o que vem é o caminho, por isso preciso passar pra dentro de src, que é como se tivesse pegando a string e jogando no src

export default function Header(){ //exporto a function pra usar no app, tanto que quando importo lá, não preciso usar {} pois estou dando export com default

    return (
        <Container>
            <img src={logo} alt="icaruscontact" width="201"/>
        </Container>
    )
}
