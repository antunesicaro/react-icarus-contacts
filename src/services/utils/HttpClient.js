import delay from "../../utils/delay";
import APIError from "../../errors/APIError"; //importo pois a gente que criou, é uma classe , módulo, precisa importar sempre

//não exportarei instancia da classe ahttpclient e sim só a classe em si, pois dentro do service irei criar umas instancia do httpclient com a base de url q tiver lá
class HttpClient{

    constructor(baseURL){ //método que é executado toda vez que é feito um new, uma instacia na classe e recebo nele a baseurl do service
        this.baseURL = baseURL// a base url do http client é o q tá sendo recebido no construtor, salvo essa base url dentro de uma propriedade do httpclient
    }


    async get(path){ //recebe como argumento o caminho no modo de get e faz o fetch, requisicao aqui com ele

    await delay(1500); //travar a função por 3s, para podermos simular o delay do loader...quando entra no then, trava a callstack aqui, ai depois do tempo faz o parse e todo código abaixo...dentro da pasta utils tem a função delay
    const response = await fetch(`${this.baseURL}${path}`); //base url vai ser recebida no momento em que uam instacia da classe for criada



        let body = null  //inicialiar variavel para poder receber lá no if do content type... apenas questao de escopo

      //veriricar o formato do body que tá vindo na nossa resposta... o que queremos é o json, se n for isso vai pro erro... verificamos com o header content-type.. quando fazermos a requisição e mandamos o header content type, o content type serve pra dizer pro backend "olha backend, estou te enviando uma requisicao e o body dessa requisicao tá no formato json,xml ou oq tiver"... resumo: quando fazemos requisição: diz pro backend qual formato de DADO q tá dentro do body da request e quando recebe a resposta o content type serve pra, no client, saber qual  formato do body q tá vindo
      const contentType = response.headers.get('Content-Type') //response.headers é um método q tem dentro da instancia de new Headers... vamos pegar o objeto dentro do prototype, q é onde tem as 'funcaos/objketos'... vou pegar o get, pois quero pegar o valor de cont type e checar se ele ´json ou outro formato, pois só vou mandar executar o list se for json

      if(contentType.includes('application/json')){//se conter json dentro da string q recebo no content type q é aplicattion/json etc etc
         body = await response.json(); //vou esperar o resultado dessa promise q é o get de contacts...sobrescreve o valor, bota a resposta do response.json q é o body parseado q é os contatos em formato de array com objetos dedntro q é como o js entende... dai ja faz o parse do json
        //console.log(body)
        }



    if(response.status >=200 && response.status <= 299){//tb poderia usar o response.ok...só vai dar a resposta se o status estiver ok, caso não esteja, vamos tratar o erro... lembrando que quando não vem o 'OK', não é problema da fetch, não é problema na requisição em si, ela continua executando os códigos pra baixo, porém dá erro na função q tá abaixo dela q é justamente os parse... unica coisa que faz a requisição fetch dar erro é o sevidor mesmo não estar funcionando como o localhost ou cors
        /*
        const json = await response.json()////uso a função json q tá dentro do prototype, ou seja, está presente como método do response... essa função json irá transformar o body q primeiramente é uma string, readblestring em objeto javascript,ou seja, um json válido para manipular...//agora vira um array de objetos, posso manipular :)
        return json;
        //atualização de estado, componente vai ser renderidado novamente, dai o estado salva as informações , nao vai criar contacts vazio novamente e sim com os dados da api
        */

        return body; //se o response ok for true, retorna esse body aqui q é os contatos lá pro contactservice q manda pro index de home
    }



    //lançando erro comum
    //lança uma mensagem de acordo com a resposta que o backend da pra a gente
    //estudar optinional chaining body?.error || ``${response.status} - ${response.statusText}`
    //aqui tb tem q ter cuidado, pois quando o body não for sobrescrito acima, o valor de body vai ser nulo aqui... portanto vai dar erro de n poder ler error de nulo,vamos tratar:
    //const errorMessage = body ? body.error : `${response.status} - ${response.statusText}` //se exisitir um valor dentro de body(não nulo true) > ? < vou retornar body.error > : < agora se dentro de body for null q é false entao lança personalizado
    //throw new Error(errorMessage); //retorno uma instancia de um erro q é uma classe q tem vários objetos de erro  dentro, dai preciso chamar onde for usar isso, lançar o erro... só tô retornando a instancia de erro aqui... no index lá preciso lançar ele de fato dessa instancia... dai quando eu lançar um erro lá onde eu escolher, ai sim a execução para na linha q lancei ele e ai cai no bloco catch de lá pra resolver... dai pra lançar erro, troco o return por um trhow aqui

    //lançando erro customizado
    throw new APIError( // manda lá pra apierror.js a resposta e o body e lá ele trata e retorna mensagem
        response,body
    );


}
}


export default HttpClient; //base url vai ser recebida no momento em que uam instacia da classe for criada, por isso exporto apenas a classe em si, sem instaciar, pois só vou criar a instacia dentro dos services,
