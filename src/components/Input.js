import styled,{css} from "styled-components";

export default styled.input`
    width: 100%;
    background: #fff;
    box-shadow: 0px 4px 10px rgba(0,0,0,0.04);
    height: 52px;
    border-radius: 4px;
    border: none;
    outline: none;
    padding: 0 16px;
    font-size: 16px;
    border: 2px solid #fff; // ajustar o bug de pular quando dá o focus
    transition: border-color 0.2s ease-in;
    appearance: none;//desabilita estilos automáticos do mobile q o css pega por padrão

    &:focus{ //quando elemento pai, ou seja, p  & significa aqui input,... estiver em focus, faça o estilo
        border-color:${({theme}) => theme.colors.primary.main} ;
    }

    ${({theme,error}) => error && css` //se o error for ativo, isto é, for true.. diferente de null, ai vamos executar toda função do css à direita
    color: ${theme.colors.danger.main};
    border-color:${theme.colors.danger.main} !important;
    `}
`;
