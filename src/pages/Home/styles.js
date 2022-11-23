import styled from 'styled-components';

export const Container = styled.div` //Container que separa o input de serach do elemento numero de contatos e  e novo contato
    margin-top: 32px;
    position: relative;

`

export const InputSearchContainer = styled.div` //estilo do container do input
    width: 100%; //faz o container, div por fora, ficar com 100% do tamanho

    input{ //estilo do input em si
        width: 100%;
        background: #fff;
        border: none;
        border-radius: 25px;
        height: 50px;
        box-shadow:0px 4px 10px rgba(0,0,0,0.04);
        //remover o outline quando user clica
        outline: 0;
        padding: 0 16px; //espaçamento 0 pro topo e baixo, 16 px esquerda direita pra desgrudar o placeholder

        &::placeholder{ //& significa que atribuo os estilos ao input referenciado
            color: #bcbcbc;
        }
    }

`



export const Header = styled.header` //box que é o header pra suportar conteudo do container acima, vou estilziar aqui o strong(numero de contatos) e o link
    display:flex;
    align-items: center;
    justify-content: ${({ justifyContent}) => justifyContent } ; //como vai ter muita regra de negócio aqui, vai ter 3 tipos difirentes, vou mover a regra pra dentro do componente e só retornar o estilo pra cá...justify content é o valor da prrppriedade q to recebendo lá do header
    margin-top: 32px;
    border-bottom: 2px solid ${({theme}) => theme.colors.gray[100]};//boto uma borda
    padding-bottom: 16px;//espaçamenti

    strong{
        font-size: 24px;
    }

    a{
        font-size: 16px;
        color: ${({theme}) => theme.colors.primary.main};
        text-decoration: none;
        font-weight: bold;
        border: 2px solid  ${({theme}) => theme.colors.primary.main};
        padding: 8px 16px;
        border-radius: 4px;
        transition: all 0.2s ease-in;

        &:hover{
            background: ${({theme}) => theme.colors.primary.main};
            color:#fff;
        }
    }
`

export const ListHeader = styled.header` //header q começa pelo order name
        margin-top: 24px;
        margin-bottom: 8px;

        button{
            background: transparent;
            border: none;
            display: flex;
            align-items: center;
        }


        span{
            margin-right: 8px;
            font-weight: bold;
            color:  ${({theme}) => theme.colors.primary.main};
        }

        img{ //acesso as props e se tiver asc, deixa em 0 grau, se tiver desc, gira em 180graus... pra isso preciso acessar via props pra ter o valor asc ou desc q vem lá do componente list header
            transform: ${(props) => props.orderByValueAscOrDesc === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)'};
            transition: transform 0.2s ease-in; //transicao da propriedade transoform
        }

`

export const Card = styled.div`
    background: #fff;
    box-shadow: 0px 4px 10px rgba(0,0,0,0.4);
    padding: 16px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & + &{  //toda vez que tiver um elemento Card seguido do outro(por isso &+&, elemento mais elemento...) ... obs o irmao anterior e sucessor a ele tem que ser o card, no caso a const Card
        margin-top: 16px;
    }

    .info{
        .contact-name{
            display: flex;
            align-items: center;

            small{
                background: ${({theme}) => theme.colors.primary.lighter};
                color: ${({theme}) => theme.colors.primary.main};
                font-weight: bold;
                text-transform: uppercase;
                padding: 4px;
                border-radius: 4px;
                margin-left:8px;
            }



        }

        span{
                display: block;
                font-size: 14px;
                color: ${props => props.theme.colors.gray[200]};
            }


    }

    .actions{

        display: flex;
        align-items: center;

        button{
            background: transparent;
            border: none;
            margin-left: 8px;
        }


    }
`


export const ErrorContainer = styled.div`
    margin-top: 16px;
    display: flex;
    align-items: center;

    .details{
        margin-left: 24px;

        strong{
            font-size :22px;
            color: ${({theme}) => theme.colors.danger.main};
            display: block;
            margin-bottom: 8px;
        }


    }
`

export const EmptyListContainer = styled.div`
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;

    p{
        color: ${({ theme }) => theme.colors.gray[200]};
        text-align: center;
        margin-top: 8px;

        strong{
            color: ${({ theme }) => theme.colors.primary.main};
        }
    }
`


export const SearchNotFoundContainer = styled.div `
 margin-top: 16px;
 display: flex;
 align-items: flex-start; //alinha tudo no começo do container, na vertical

span{
    color: ${({ theme }) => theme.colors.gray[200]};
    margin-left: 24px;
    word-break: break-word; //autoriza css a quebrar palavra
}
`

