import styled, { css } from "styled-components";

//variantes no styled
const containerVariants = { //as chaves desse objeto serão as variantes.. a variante do toats sao 3, a defultm sucess e danger
    default: css`
        background: ${({theme}) => theme.colors.primary.main};
    `,
    success:css`
        background: ${({theme}) => theme.colors.success.main};
    `,
    danger:css`
        background: ${({theme}) => theme.colors.danger.main};
    `,
};


export const Container = styled.div `
    padding: 16px 32px;

    color: #fff;
    border-radius: 4px;
    box-shadow: 0px 20px 20px -16px rgba(0, 0, 0, 0.25);
    ${({ type }) => containerVariants[type] || containerVariants.default}//pego de dentro das props o type edigo q o estilo q vai ser escolhido de containerVariants vai ser o que está na posição type do objeto... a posição type vai dependender do q vier da prop, se vier default, escolhe automatico o  estilo defaul... mas se n passar nada passa o default
    //alinhar os filhos, que no caso os filhos de container é o que tá na lo index de toastmessage
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &focus{ //estilo pra quando estiver em foco para melhorar acessibilidade de quem usa leitor de tela, pois eles usam foco para ler o componente, ai quando essa div estiver no foco, vai ser tornar como se fosse botão por meio do  role do toast container
        //também vou precisar botar um tab index como zero lá no toast message para o primeiro tab ou interaçõ com a página, focar no toast
    }

    // toast seguido por outro toast
    & + & {
        margin-top: 12px;
    }

    img{
        margin-right: 8px;
    }
`
