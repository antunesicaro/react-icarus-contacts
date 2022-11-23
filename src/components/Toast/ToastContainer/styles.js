import styled from "styled-components";
//esse toats vai ficar fixo na tela do usuário indepedente de scroll
export const Container = styled.div `
    /* para alinhar em  baixo e no centro, porém não vou usar isso pois com width de 100% da tela, o toast vai cobrir outros elementos como o botão, impossibilitando de clicar
    position: fixed;
    bottom: 48px;
    width: 100%;
    display: flex;
    justify-content: center;
    z-index: 2;
    */

    //centralizar sem precisar de display flex
    position: fixed;
    z-index: 2;
    bottom: 48px;
    left: 50%;
    transform: translateX(-50%);
`
