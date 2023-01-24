import delay from "../../utils/delay";
import APIError from "../../errors/APIError"; //importo pois a gente que criou, é uma classe , módulo, precisa importar sempre

//não exportarei instancia da classe ahttpclient e sim só a classe em si, pois dentro do service irei criar umas instancia do httpclient com a base de url q tiver lá
class HttpClient{

    constructor(baseURL){ //método que é executado toda vez que é feito um new, uma instacia na classe e recebo nele a baseurl do service
        this.baseURL = baseURL// a base url do http client é o q tá sendo recebido no construtor, salvo essa base url dentro de uma propriedade do httpclient
    }


  get(path,options = {}){ //recebe como argumento o caminho no modo de get e faz o fetch, requisicao aqui com ele... quando for acionado, faz o this.makeRquest, mandado o path... n preciso usar o async na função pois o  makeRequest() é retornando, e ele é uma promise, portanto retorna uma promise pra ca

        return this.makeRequest(path,{ method: 'GET',headers:options.headers})

        /*
     antes era isso aqui no get, porém pra melhorar o código centralizamos em makeRequest

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

    */
    }





  post(path,options = {}){ //também receb os dados do body options aqui, pois precisamo enviar iinfomrções dentro do body da request pro backend.. enviamos tb o objeto com as info do contato... se nao informar o options, ele é um objeto vazio, pois posso fazer um post sem mandar body, ai vou tentar la em baixo ler propriedades de undefined, pois o options seria undefined, pra nao ocorrer isso, deixo ele pádrão como objeto
        return this.makeRequest(path, {method: 'POST',body:options.body,headers:options.headers,}) // manda pro make request,headers:{Authorization:'tokenexemplo'} caso queira usar token, recebo no post um token de usuario por exemplo... vem la do create do contacts service
        }



        put(path,options = {}){ //também receb os dados do body options aqui, pois precisamo enviar iinfomrções dentro do body da request pro backend.. enviamos tb o objeto com as info do contato... se nao informar o options, ele é um objeto vazio, pois posso fazer um post sem mandar body, ai vou tentar la em baixo ler propriedades de undefined, pois o options seria undefined, pra nao ocorrer isso, deixo ele pádrão como objeto
            return this.makeRequest(path, {method: 'PUT',body:options.body,headers:options.headers,}) // manda pro make request,headers:{Authorization:'tokenexemplo'} caso queira usar token, recebo no post um token de usuario por exemplo... vem la do create do contacts service
            }






    async makeRequest(path,options){ //recebe o path e também o objeto de configurações com método,headers tb vou querer receber pra caso precise autorizar autenticação, etc
        await delay(1500);

        const headers = new Headers(); //crio nova instancia do headers e dou pra const esse valor, dai posso acessar propriedades dessa classe.. dou o valor inicial do formato do body, mt importante ter isso aqui pois assim o backend consegue fazer o parse... pra ter uma ideia,lá no express.json() midleware do backend ele verifica se o content type da request q tá vindo é aplication/json e asi sim se for faz o parse
        if(options.body){ //se for true ,o u seja, existir um body, significa q vou precisar fazer preflight, que é checar se de fato todas configurações estão ok, se nao tiver, nao vou adicionar o conbtent type sendo o aplicattion/jkson pois isso fere as regras para ser uma requisição simples, dai estaria fazendo pre filght em metodos q nao precisam,  como o get por exemplo
            headers.append('Content-Type' , 'application/json') //append serve pra mandar algo na instancia de headers, mesma coisa q eu estivesse fazendo headers['Content-type'] = 'aplication/json'
        }

        if(options.headers){//verificação para ver se foi passado algum header customizado na requisição

            //object entries retorna um array com arrays onde a posição 0 do array, tem outro array com duas posicoes sendo elas o nome e o valor
            Object.entries(options.headers).forEach(([name,value]) => { // faço desestruturação no argumento entry com [], ai ja pego direto os valores q seriam percorridos
                headers.append(name,value)
            })


            /*
            //da pra fazer de duas formas pra mandar headers personalizado, a primeira é com keys e a segunda com entries
            //percorro o objeto de headers, estamos usando como exemplo uma auth la do list do contacts service, q la tem headers... uso
            //object keys pega todas chaves q tem dentro do objeto headers e retorna elas e um array de posições.. dai consigo dar um forEach nesse array pra percorrer
            Object.keys(options.headers).forEach((name) => { // pra cada vez q percorrer, joga o valor da chave para name... dai consigo acessar tanto o nome dela quanto o valor
                //console.log({nameKey:name,value: options.headers[name] }) //pego o nome e o valor de acordo com o valor varrido

                //vou dar um append nos headers pra mandar algo na instancia de headers como fiz com content type
                headers.append(name, options.headers[name]) // pronto, só ver em network na request de get e vejo nos headers um header peronsalizado, mt usado pra autenticação
            })
            */

        }

        const response = await fetch(`${this.baseURL}${path}`,{ //envia um objeto com configurações

            method:options.method, //precisa alterar o método http , pois por padrão é get
            body : JSON.stringify(options.body) ,//pego o objeto javascript(que é o objeto contact lá o handle submit) e transformo em string //passo o body que estamos recebendo como argumentio, porém não pósso mandar o body pois ele é um objeto e o http(hypertext) é um protocolo de TEXTO, to tendo aqui um objeto javascript e isso nao pode no body, vai retornar o object Object, pois vai transformar o objeto em string, entao temos q mandar string mesmo pra n dar ese erro
            headers:headers, //preciso dizer q o body q mando está indo com o formato aplication/json para q o backend consiga tratar... como no protocolo http é sempre string pois é hyperTEXT, tô dizendo q o formato aqui é json, pois pode ser xml, ettc, mas tô especificando q é json..... //quando eu faço a request eu preciso dizer pro backend q essa request tá indo com formato aplicattion/json
                //'Content-Type' : 'application/json'


        });
          let responseBody = null
          const contentType = response.headers.get('Content-Type')

          if(contentType.includes('application/json')){ //se for aplication /json faz o parse
            responseBody = await response.json();
            }
        if(response.status >=200 && response.status <= 299){ //retorna se tiver td ok
            return responseBody;
        }
        throw new APIError(
            response,options.body
        );
    }

}


export default HttpClient; //base url vai ser recebida no momento em que uam instacia da classe for criada, por isso exporto apenas a classe em si, sem instaciar, pois só vou criar a instacia dentro dos services,
