import styled from "styled-components";

export const Container = styled.header`
    margin-bottom: 24px; //margin para todos abaixo do container

    a{ //link é o a lá no index.js do pageheader, dai como tá tudo dentro do link(do a), uso display flex aqui para alinha os itens q estão dentro do a(do link).... assim tenho alinhado a flecha com o voltar
        display: flex;
        align-items: center;
        text-decoration: none;

        span{
        color: ${({theme}) => theme.colors.primary.main};
        font-weight: bold;
        }
    }


    img{
        margin-right: 8px;
        transform: rotate(-90deg);
    }

    h1{
        font-size: 24px;
    }

`;
