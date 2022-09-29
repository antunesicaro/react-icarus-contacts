import styled,{css} from "styled-components";


export default styled.button`

    height: 52px;
    border: none;
    padding: 0 16px;
    background: ${({theme}) => theme.colors.primary.main};
    font-size: 16px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.04);
    font-weight: bold;
    color: #fff;
    border-radius: 4px;
    transition: background 0.2s ease-in;

    &:hover{
        background:${({theme}) => theme.colors.primary.light};
    }

    &:active{
        background:${({theme}) => theme.colors.primary.dark};
    }

    &[disabled]{ //quando o botão estiver com a propriedade disabled, ai faça isso
        background: #CCC;
        cursor: default;
    }

    ${({theme,danger}) =>
        danger && css` //se o danger estiver ativo,isto é, se for true, vou por uma série de estilização q vou fazer usando a função css
            background: ${theme.colors.danger.main};

        &:hover{
        background:${theme.colors.danger.light};
                }

        &:active{
        background:${theme.colors.danger.dark};
        }

        `
    }
`;

