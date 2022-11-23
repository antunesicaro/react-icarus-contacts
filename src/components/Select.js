import styled from "styled-components";

export default styled.select`
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

    &:focus{ //quando elemento pai, ou seja, p  & significa aqui input de select,... estiver em focus, faça o estilo
        border-color:${({theme}) => theme.colors.primary.main} ;
    }

    &[disabled]{ //quando o select(elemento pai) estiver disabled(ocorre quando o estado setisloadingcategories está true)
        background-color: ${({theme}) => theme.colors.gray[100]};
        border-color: ${({theme}) => theme.colors.gray[200]} ;
        opacity: 1;
    }
`;
