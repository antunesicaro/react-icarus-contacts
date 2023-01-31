//modal para que quando clique em remover, apareça a modal para confirma se o usuário tem certeza que deseja remover
import styled from "styled-components";

export const Overlay = styled.div`
background: rgba(0,0,0,0.6);
backdrop-filter: blur(5px);
position: fixed; //ficar por cima na tela com absolute ou fixed pra deixar fixo quando scrollar
width: 100%;
height: 100%;
left: 0;
top: 0;

//p/ centralizar o container com conteudo
display: flex;
align-items: center;
justify-content: center;
`

export const Container = styled.div` //Caixa em si q irá ficar no emio da tela contendo as informaçoes de delete ou cancel
    background: #fff;
    border-radius: 4px;
    padding: 24px;
    box-shadow: 0px 4px 10px rgba(0,0,0,0.04);
    //responsive
    max-width: 450px;
    width: 100%;

    //tilte
    > h1{ //esse maior que diz que, esse estilo só vai ser aplicado aos filhos diretos, ou seja, no h1 q estiver diretamente dentro de container
       font-size :22px;
       //a prop danger está no container, ela é true ou false... vou fazer um if aqui pra definir ela... se for true o danger vindo pro modal, ai fica vermehlo, se nao, fica normal
       color:${({theme,danger}) => (
           danger ? theme.colors.danger.main : theme.colors.gray[900]
       )}
    }

    .modal-body{
        margin-top: 32px;
    }

`

export const Footer = styled.footer`
    margin-top: 32px;
    //alinhar o conteudo do footer(que no caso sao os dois botoes)
    display: flex;
    align-items: center;
    justify-content: flex-end; //manda os itens lá pro final

    .cancel-button{
        background: transparent;
        border: none;
        font-size: 16px;
        margin-right: 24px;
        color: ${({theme}) =>theme.colors.gray[200]};
    }
`
