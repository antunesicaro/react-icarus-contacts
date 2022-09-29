import styled from 'styled-components';


export const Container = styled.header` //estiliza o container do header e expoorta pro index de Header... vai ter q pegar com {} no index do header os estilos
margin-top: 74px;
margin-bottom: 48px; //distancia de da logo para todo conteudo abaixo, de todas as páginas
display: flex;
flex-direction:column; //pra não ficar em row os componentes, e sim um em baixo do outro, no caso a logo e o input de busca
//justify-content: center; como tem mais de um item, usa o align itens
align-items: center;
`



