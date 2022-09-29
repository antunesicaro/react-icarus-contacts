import { Link } from 'react-router-dom';
import { Container,InputSearchContainer,Header,ListHeader,Card, ErrorContainer,EmptyListContainer } from './styles';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import Loader from '../../components/Loader';
import { useEffect, useState, useMemo,useCallback } from 'react';
import ContactsService from '../../services/ContactsService';
import sad from '../../assets/images/sad.svg';
import empBox from '../../assets/images/empBox.svg'
import Button from '../../components/Button';
//import APIError from '../../errors/APIError';


export default function Home(){ //<Modal danger/> // <Loader/>
//hooks

//vou salvar também dentro de um state todas as informações q vão vir da api
const [contacts,setContacts] = useState([]); //inicia como um array vazio por padrão, quando a tela é carregada, ainda não tenho os contatos, pois o useefect q tem a requisição só vai ser montado depois q o componente for montado na tela... incialmente n sei os contatos, tenho q esperar a api
const [orderBy,setOrderBy] = useState('asc')//state pra salvar o toggle de ordenação
const [searchTerm,setSearchTerm] = useState('');//inicia com string vazia... esse estado irá salvar o que o usuário digitar e mandar pro componente o valor de q o usuário tá digitando, q no caso é o termo de busca..searchTerm
const [isLoading,setIsLoading] = useState(true) //estado para salvar quando a requisição tá sendo carregada ou não...começa sendo true... já começa true pois a requisição de começo tá sendo feita e recarregada
const [hasError,setHasError] = useState(false); //começa com um estado de erro sendo false,pois só vai ser true o haserror quando for pro catch

//uso o usememo sempre q eu quiser memorizar valores como numeros, trings, contatos como é esse exemplo, pois por baixo dos panos ele retorna a execução de uma função
//usememo só executa na primeira vez que o componente for montado em tela... o array de depenncia de contato ainda é vazio da primeira vez q executa, por isso q vem de começo com 0 contatos...
const filteredContacts = useMemo(() => {
    //valor q retorna é o valor que desejo memoriazar, q vai ficar salvo no filteredconcatcts
    return  contacts.filter((contact) => (contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ) ); //recebe a lista de contatos filtrada... retorna um novo array percorre todos os itens do array e passa pro argumento(antes da seta) o item q estiver percorrendo... no pós arrow, se a condição for true, o item q está sendo percorrido vai pro novo array, se for false o item q estás sendo percorrido no momento não entra dentro do novo array... uso o includes para ver se dentro de contacts.name, exite a string q está sendo digitada pelo usuário e salvo no estado... includes retorna um booleano, ou vai ser true ou false, o que supre o uso do filter.... transformo tudo oq o usuário em lower case pra comparar,assim como o contats.name q vem da api, assim nao vou ter o problema de quando pesquisar por letra maiuscula e tiver minuscula, nao contar
},[contacts,searchTerm]); //recebe uma função como primeiro argumento e array de depencia como segundo... tem q preencher no array de dependencia com contacts e search para q fique monitorando, e toda vez q esses valores forem alterados, fazer o usememo para memorizar esses novos valores


//movo pra fora de useeffect a loadcontacts pois preciso acessar ela no handle try again
 //previnir a race conditions, disputa de funções executadas, função assincrona dentro da função de efeito
 const loadContacts = useCallback(async () => { // passo como argumento pro usecallback uma função e um array de dependeecias... a função q mandamos é a função que queremos q seja memorizada... react nao deve ficar criando essa função novamente, nao coloque novo endereçod e momoria pra cada vez que o componente renderizar, apenas uma vez ou quando o array de depencias do usecallback sofrer alteração

    try{
        //loader
    setIsLoading(true); //toda vez q o  usuário pedir pra reodernar, vai ser executado o setIsloading, dai dizemos q ele é true para fazer o loding carregar

    //não quero fazer if(contactsList) pois aqui no try vai ser só o caminho feliz, então não vou mais executar e vou fazer com q toda vez q tenha erro, vá pro catch e lá trata isso, então elimino toddo esse codigo q vou por abaixo com sua respectiva explicação
    /*
      if(contactsList){ //aqui precisa ser true se n vai pro else...antes de setar os contatos de fato, preciso ver se o valor q está no contact é true, assim irei garantir q de fato tenho um array com contatos e estarei usando filter nesse array... se eu tiver um erro de cliente, por exemplo, em q o array n venha, vou pro else daqui e lá irei construir uma tela de erro... é bom lembrar q isso vem lá de httpclient, lá pode mandar um false por exemplo quando a resposta de um get não é ok
        setContacts(contactsList); //depois q o componente foi montado e o useefetc foi usado para buscar os dados da api, e todos os dados já estão como json, agora vou usar o setContacts passando os contatos já em json
    }else{
        console.log('erro na api')
    }
    */
   //como explicado acima, toda vez q tiver erro, para aqui esse await e joga pro catch resolver
   //primeiro passo é ir no retorno onde antes era false no httpclient e lançar um erro lá, dai vou executar essa linha a seguir do contactslist e se nao der certo vai ser lançado um erro q vai parar a execução aqui e ir pro catch tratar
    const contactsList = await ContactsService.listContacts(orderBy); //manda pro listcontacts com o orderby asc ou desc dependendo do estado e retorna a lista de contatos pois lá faz toda a requisição q tá unificada lá
    //const contactsList = [] //simular listar de contatos vazia


    setHasError(false); //aqui seto pra false, pois quando der erro de primeira, e depois der certo, o erro vai continuar mostrando pois cairia no catch e lá a flag de erro fica true, dai tem q desfazer isso aqui

    setContacts(contactsList); //depois q o componente foi montado e o useefetc foi usado para buscar os dados da api, e todos os dados já estão como json, agora vou usar o setContacts passando os contatos já em json


    //throw new TypeError('miha mensag') //cria uma instancia dessa classe, q é uma função construtora... ai no caso isso aqui(instancia da classe erro) vai pro catch, lá eu posso perguntar pro javascript se o erro q tá no catch é uma instancia de typeerror, q no caso vai ser true pois é... se fosse outro como instance of syntaxerror ia ser false
    } catch{

        setHasError(true) //altero o valor do estado quando der erro




        //catch(error) --> se quiser tratar o erro
        //console.log(error.response)
        //console.log(error)
        // console.log(error instanceof APIError) //vai dar true se o erro for da api..se verificar se é de Error tb é true pois Error vai dar herança para APIError
        /*
        if(error instanceof TypeError){
            console.log('type ero')}
        if(error instanceof SyntaxError){
            console.log('sitna ero')
        }if(error instanceof Error){console.log(' erro q está em todos, genérico') //como se fosse um TypeError extends Error {}... typeerror herda de error
}
*/

    } finally{
        setIsLoading(false);
    }


/* esse aqui é com try catch, voyu transformar pra async e await

//decisao: uso do async e await: se o código q tiver abaixo do await depender da promise, da resolição desse await, ai vale mt a pena usar... pois trava o código até resolver
//fetch api do js
//precisa passar o endereço da url que queremos fazer a requisição, qnd a url for existente, vai pro then, quando nao for, vai pro catch... toda requisicao fetch cai no xhr ..xml http request
//uso o async e o await, assim no then de sucesso, vou esperar a transformação do corpo da resposta q era string em json
fetch(`http://localhost:3001/contacts?orderBy=${orderBy}`) //toda vez q n for uma requisição do tipo simples, o navegador vai automaticamente fazer preflight...fornçando um método, vai fazer um preflight, prevoo, que vai ser uma requisição disparada antes dessa aqui q escolhemos como método... método http vai ser do tipo options,put,get,etc... serve pra ver com backend quais métodos http e os headers q tao sendo permitidos a serem executados... antes de executar checa tudo , faz o pre voo antes de voar :)... checa se permite... {method:'GET', headers:new Headers({'X-App-Id':'123'}),}
.then(async (response) => { //antes de executar esse then, o navegador checa nos headers da resposta dessa requisição, q no caso é no response do backend de acordo com a rota, existe um header chamado acess control allow origin, pra ai sim ver se tá permitindo aquela url ou tá com * de curinga... dá reject com catch se n existir o header com a permissão

    await delay(3000); //travar a função por 3s, para podermos simular o delay do loader...quando entra no then, trava a callstack aqui, ai depois do tempo faz o parse e todo código abaixo...dentro da pasta utils tem a função delay

    const json = await response.json()////uso a função json q tá dentro do prototype, ou seja, está presente como método do response... essa função json irá transformar o body q primeiramente é uma string, readblestring em objeto javascript,ou seja, um json válido para manipular...//agora vira um array de objetos, posso manipular :)
    //atualização de estado, componente vai ser renderidado novamente, dai o estado salva as informações , nao vai criar contacts vazio novamente e sim com os dados da api
    setContacts(json); //depois q o componente foi montado e o useefetc foi usado para buscar os dados da api, e todos os dados já estão como json, agora vou usar o setContacts passando os contatos já em json

})
.catch((error) => {
    console.log('erro',error)

})
.finally(() => { //independednte de der certo a rquisição ou nao, o loader vai ser retirado
    setIsLoading(false); //depois q o contato é setado, para de carregar o loader, bota ele false
});

*/


 },[orderBy])





//request só vai ser disparada quando o componente home estiver em tela, quando for pra page de edit, por exemplo, não vai disparar, pra isso uso um ese efect, pois n quero que ao home ser reconstruida pelo react por um evento, por exemplo, essa requisição nao deve ser feita e refeita toda vez
//esse useEfect tem q ser feito apenas uma vez,quando o componente estiver montando na tela.. só vai executar quando tiver montando, entao na primeira passada ele ainda n executa, tanto q ser der um console log, aparece o estado inicial q é um array vazio defininido no usestate de setcontatacts.. obs: o componente q vai ser renderizado é o que tá no return, vai pulando direto pra lá
//toda vez q usar informação de contexto externo, isto é, tô usando o loadcontacts q tá fora do escopo do useEfect, essa informação precisa aparecer dentro do array de dependência q é onde tá o orderBy
useEffect   (()=>{
    loadContacts(); //executo a função assincrona, com isso vai esperar executar lá e ai sim não vou perder o return de baixo, que é o cleanup da função quando desmontar ou alterar
    //return () => console.log('cleanup')//função de cleanup, toda vez que o componente  for dismontado, executa a função de cleanup, ou toda vez q alterar o estado, antes de reexecutar toda função, ele executa essa função antes
},[loadContacts])//depois da funçao de efeito, boto o array de dependencias como vazio para não executar isso q tá dentro toda vez q remontar algo do react... executa a função de efeito, q é a fetch apenas uma vez e somente depois q o componente estiver todo montado em tela... serve também para que se eu botar um valor para esse array de estado ou propiredade, o react fica monitorando, e toda vez q esse valor q eu passar aqui for alterado, a função de efeito dele é executada
//SOP --> same origin policy, somente nos navegadores
//somente é aplicado a politica com requisições do javascript, as do html sao ignoradas como imagens, assets,etc
//origem é uma url---> protocolo://dominio:porta ...n pega query params,endpoint, só esses aqui q tao aqui.
//origem de onde a requisição tá saindo for a mesma origem de onde está chegando
// url de saída , origem de saída--> onde o front tá rodando:  http://localhost:3000
//Destino.. onde tá tentando chegar--> http://localhost:3000 ... da erro quando origens sao diferentes.
//vamos ter q trocar as portas pois n vamos conseguir rodar duas portas, a do front e do back ao mesmo tempo, dai quando muda fere essa politica, n faz requisição... dai vamos ter q resolver isso
//agora entra o CORS... é um mecanismo de flexibilizar a politica de segurança SOP, fazer com q ela seja burlada,deixar a requisição acontecer
//evita site malicioso roubando requisicao
//CORS: cross origin resoruce sharing, compartilhamento de recursos entre origens cruzadas
//no backend, vamo ter q criar um header q diz "olha, se a entrada for direfente, pode dar acesso"... temos q definir com acess control allow origin, passando a origem q desejamos permitir... como se tivesse dizendo pra aplicação.. olha, eu sei q não tá em SOP, porém quero permitir essa origem aqui... e diz qual a origem, que no caso é a url como visto acima... se a requisicao estiver saindo de localhost:3000 q é o front, eu acredito q é confiante... conhecer a origem... todos ajustes sao no back



//redenrização: no numero fiz a regra de se o tamanho for 1, rezeriza 1 contato, se for o resto é contatos... cards, pega o contacts q é um array de objetos e transformo em jsx para renderizar cada um com map, q cria um novo array com mesmo numero de posiçoes q o de base dele
//passo a key para o elemento pai lá no card, chave primaria para o react entender qual elemento atualizar, sempre q usar o map temos q usar essa key
//só renderizar o small se o category_name estiver preenchido.. conditional render
//actions, transformo em uma empressão javascript pro jsx interpretar q é javascript no link to {}



//funções
function handleToggleOrderBy(){ //irá apenas fazer a alteração do estado, pois assim passo o estado mofificado pro orderby, seja asc ou desc, e toda vez q o estado é alterado, a requisição vai ser refeita pois o react está observando o orderBy q é um estado e foi passado no array de depencência da requisição
    setOrderBy( //depois que mudar o estado, ai sim chama a função do useefectt
        (prevState) => (prevState === 'asc' ? 'desc' : 'asc') //pega o estado do hook setOrder q é por padrão asc, com o evento de clique, salva ele e faz a regra de negócio... se for asc vai pra desc, se for desc vai pra asc
    )
}

function handleChangeSearchTerm(event){ //recebe os dados, infos do evento, oq quero é o event.target.value
    setSearchTerm(event.target.value)//salvo dentro do estado esse valor aqui
}

function handleTryAgain(){ // o botão de tentar novamente vai fazer novamente a requisição para carregar os contatos
   loadContacts();
}

//console.log(orderBy);

//loader: se isLoading é true, rendereiza o loader, se for false nao renderiza
//só quero redenzrizar o strong se haserror for true, ou seja, se not has error, se nao tiver erro
//outra coisa do hasError: mando lá no header o has error como propriedade pro styled-component Header, pois ai consigo mudar a propriedade css do link "novo contato" de space btwen para flex-end, pois quando tenho o haserror como true, ele remove o strong, dai fica o novo contato na esquerda todo feioso, dai queroi por pro final
//condição para o input de digitar o nome... acesso o vetor inteiro e não o filtrado pois quero saber se de fato a api retornou algo... vehjo o tamanho, se for maior q zero ai sim redenrizo o input de busca
//quero adicionar mais uma condição pra rendezirar o numero de contatos quando nao tiver erro e o taamanho de contacts for maior q zero... só botar mais um & pra condicionar duplamente
//justifyContent do header manda pro style o valor de justify content dependendo do caso da regra de negócio


return (
        <Container>
           <Loader isLoading={isLoading}/>

            {contacts.length > 0 && (
                <InputSearchContainer>
                   <input value={searchTerm} type="text" placeholder="Pesquisar pelo nome" onChange={handleChangeSearchTerm} />
               </InputSearchContainer>
            )}


            <Header
            justifyContent={
                hasError
                ? 'flex-end' //quando tem erro (hasError true) , fica alinhado horizontal pra direita
                : ( //qnd n tem erro(hasError false) tem duas situacoes, spacebetwen pra quando tiver contato e center pra quando nao tiver contato, pra isso abro uma nova condição
                    contacts.length > 0 ? 'space-between' : 'center'
                )

                }>

                    {(!hasError && contacts.length > 0) && ( //só rendezira se o valor de contatos retornado da api for maior q zero e n tiver erro... coloca as condições dentro de paranteses pra facilitar leitura short cicuit evaluation q é o &&.. no entanto, o javascript não pega o true ou false da condição à direita, nao faz casting de transformar... portanto sempre colocar a expressao inteira, nesse caso é o > 0;... dá pra resolver usando ternário também ai fica o ? no lugar do render && e o : no final como null, pq ai o jsx entende q null não precisa renderezira nada... ou ainda, outra solução é forçar o casting com a função Boolean().. ou ainda usa o hakc das duas exclamações antes de toda expressao q nega a negação
                         <strong>
                               {filteredContacts.length}
                               {filteredContacts.length === 1 ? ' contato' : ' contatos'}
                        </strong>
                    )}


                <Link to="/new">Novo Contato</Link>
            </Header>

            {hasError && ( //quando hasError for true, pq teve erro e foi pro catch, redenriza isso
                <ErrorContainer>
                    <img src={sad} alt="sad"></img>

                    <div className="details">
                        <strong> vish deu erro aeeeeeeeeeeeee meudeussssse</strong>
                        <Button type="button" onClick={handleTryAgain}>Tentar novamente</Button>
                    </div>

                </ErrorContainer>
            )}


            {!hasError  && ( //novamente render condicional, só vou rendezirar a lista de contatos e o numero de contatos se não tiver erro.. uso fragment pois estou renderizando mais de um elemento... isso aqui é  pra quando der erro de eu mexer em outros elementos como a ordenação e o servidor tiver caido, os contatos não aparecerem junto com o erro e sim aparecer somente o erro... outra condicao é ser menor q 1 pra renderizar a caixa vazia dizendo q n tem nenhum contato
                <>

                {(contacts.length < 1 && !isLoading) && ( //nao pode estar carregando para poder redenzrizar e precisa ser 0 contatos(menor q 1)... iso garante q só aparece quando tiver terminado de carregar
                    <EmptyListContainer>
                        <img src={empBox} alt="empty box"></img>

                        <p>Você não tem nenhum contato cadastrado ainda! Clqiue no botão <strong>Novo contato</strong>
                         para cadastrar o seu primeiro</p>
                    </EmptyListContainer>
                )}


                {filteredContacts.length > 0 && ( //se o tamanho for maior q zero ai sim redenriza a ordenação, se não n precisa
               <ListHeader orderByValueAscOrDesc={orderBy}>

               <button type='button' onClick={handleToggleOrderBy}>
                   <span>Nome</span>
                   <img src={arrow} alt='Arrow' />
               </button>

       </ListHeader>
         )}


            {filteredContacts.map((contact)=>(
                <Card key={contact.id}>
                <div className="info">
                     <div className="contact-name">
                        <strong>{contact.name}</strong>
                        {contact.category_name && (<small>{contact.category_name}</small>)}

                     </div>

                     <span>{contact.email}</span>
                     <span>{contact.phone}</span>
                </div>

                <div className="actions">
                    <Link to={`/edit/${contact.id}`}><img src={edit} alt="edit"></img></Link>
                    <button type="button"><img src={trash} alt="edit"></img></button>
                </div>
            </Card>
            ))}
                </>
            )}


        </Container>
    )
}





