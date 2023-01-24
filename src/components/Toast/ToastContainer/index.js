import { Container } from "./styles"
import ToastMessage from "../ToastMessage"
import { useState,useEffect,useCallback } from "react" //pego o useEffect pra adicionar um eventlistener, começa a ouvir um evento... depois que o componente estiver montado(em tela), vou ficar escutando ele.
import { toastEventManager } from "../../../utils/toast";


//preciso dinamizar a lista,ou seja, toda vez que aparecer um toast na tela ou ele for sumir, a interface atualize, pra isso atualiza estado, usa estado
export default function ToastContainer(){

    //ja desestrutura pra trazer os proprios valores do obj
    /*
     { id: Math.random(),type:'default',text:'Default text' },
        { id: Math.random(),type:'danger',text:'danger text' },
        { id: Math.random(),type:'success',text:'suces text' },
    */
    const  [messages,setMessages] = useState([]);



    //apago do return <ToastMessage text="Default Toat" />
    //<ToastMessage text="Error Toat" type="danger"/>
    //<ToastMessage text="Sucess Toat" type="success"/> //parei em 5 min


    useEffect(() => { //toda vez q eu chamar aqui, apenas o toast container redenriza e nao tudo

        function handleAddToast({ type,text,duration }){ //botar em funçao pra depois de ouvir o evento, também fazer o cleanup e não ter o erro de ficar rendezizando o toast várias vezes depois da primeira vez... listener vai rodar apenas uma vez, entao toast também rendereiza apenas uma vez

            //console.log('addtoastListener',event)
             //const {text,type} = event.detail; //pego os valores q estão no event detail q é o texto e tipo do toast... n pega mais do detail pq no toast.js não estou mais usando o customevent e sim o meu próprio eventmanager
             setMessages((prevState) => [ //pego todas as mensagens q já estão no estado e quero manter elas, uso o spread para isso
                 ...prevState,
                 {id:Math.random(),type,text,duration}//aqui adiciono a mensagem pra se juntar com as q já tem
             ])
        }
        //document.addEventListener('addtoast',handleAddToast) //escuto o evento customizado lá do index de new contact, lá dispara cria e dispara o evento, aqui eu escuto a disparada desse evento... quando crio algo invalido como alguem q ja tem email invalido, cai no catch de lá... posso pegar inclusive o detail se eu quiser q são informações q  eu mando de lá
        toastEventManager.on('addtoast',handleAddToast)//escuto o meu eventmanager


        //fazer o cleanup dessa funcao de useefecct para não ficar sendo adicionado vários eventlisteners...quando o componente é desmontado, limpar.. se nao fica alocando memoria pra listener
        return() => {
            //document.removeEventListener('addtoast',handleAddToast)
            toastEventManager.removeListener('addtoast',handleAddToast)
        }
    },[]); //executo e  passo array de dep vazia pq só quero q execute na só na primeira vez q o componente motnar


    //sendo aqui function, toda vez q o componente toastcontainer renderizar, a função é criada novamente apontando pra um novo endereço de memória... só q n quero isso, quero q ela crie, salve a primeira criada e depois continue a mesma endereço de memória... antes a cada rendereziação, passavamos a cada renderezação, uma nova função, mas não é isso, é sempre a mesma função q quero, pq se não quando for pro tpastmessage no useefect q tem, ia ficar toda hora renderizando novamente pq ia estar mudando a função... pra isso deixar a função com usecallback
    const handleRemoveMessage = useCallback((id) => {

        setMessages((prevState) => prevState.filter(
            (message) => message.id !== id,
        )) //uso o função de setMessages do estado mantendp p estadp anterior, isto é, mantendo as mensagens já existentes e fazendo um filtro nela

    },[]) //array de depé vazio pq n usa funcao, variavel, prop, nada externo



    return (
        <Container>
            {messages.map((message) => (
                <ToastMessage
                message={message}
                onRemoveMessage={handleRemoveMessage} //quero executar uma função q tá no componente filho, porém executar ela dentro de um componente paigl , faço função de callback... usa propç... tenho q fazer isso pois o container q vai ser removido está aqui nesse estado, que é o container do toast geral
                />
            ))}
        </Container>
    )
}
