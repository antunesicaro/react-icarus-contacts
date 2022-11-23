import styled from "styled-components";




export const Container = styled.div`
    & + & {
        margin-top: 16px;
    }

    small{
      color:${({theme}) =>theme.colors.danger.main};
      font-size: 12px;
      margin-top: 8px;
      display: block;
    }

    //dentro do container tenho o form item q é onde os filhos do formgroup sao redenrizados, dentro de form item tem o loader q é onde vai ficar o icone de carregamento
    .form-item{
            position: relative; //só criei o form item pra ele ser relative e o loader absolulte em relacao ao seu pai e nao em relacao a pagina, assim ele fica no right do input e nao da pagina toda

    }

    .loader{ //div q controla o spinner do container do formgroup
        position: absolute;
        top: 18px;
        right: 16px;
    }
`
