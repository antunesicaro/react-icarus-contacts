import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    //all elements style
    *{
        margin: 0;
        padding: 0;
        box-sizing:border-box;
        font-family: 'Sora', sans-serif;

    }

    body{
        background:${props => props.theme.colors.background}; // também posso desestruturar ${({theme }) => theme.colors.background}
        font-size: 16px;
        color: ${({theme }) => theme.colors.gray[900]}; //color global padrão das letras vai ser o gray q tá predefinido em default dos themes
    }

    button{
        cursor: pointer;
    }
`;
