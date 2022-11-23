//camada q irá funcionar como um deesign pattern para centralizar a requisição dos contatos, assim, caso mude algo na url, qualquer q seja , fica centralizado e muda somente aqui, pois os lugares que estãoo chamando só irão chamar aqui, dai se tiver usando em 30 lugares, só muda em 1 e não em 30

import HttpClient from "./utils/HttpClient";

class ContactsService{

    constructor(){ //quando já exporta criando uma instância lá em baixo com new ConcatsService, esse método já é executado e esse metodo aqui constructor cria uma propriedade dentro da contacts service
       this.httpClient = new HttpClient('http://localhost:3001');//criar uma propriedade chamada httpClient dentro da contactsservice e o valor dessa propriedade é uma instacia do httpClient... só aqui q crio a instacia da classe, exportei a classe em si lá no HttpCliente.js, aqui crio a instacia dessa classe exportada de lá... dai recebo esse valor aqui q é a base url no momento em q a isntacia é criada.. a instancia é quando os métodos ali em baixo como get sao executados
    }



    async listContacts(orderBy = 'asc'){ //sempre q for chamar o método, vem como argumento o orderBy asc ou desc pra ca
    return this.httpClient.get(`/contacts?orderBy=${orderBy}`,{headers:{Authorization:'tokentesteexemplo'}}); //passo como argumento a url, no caso nao mais a url e sim o path, pois vou centralizar e a camada q trata da requisição tá abstraida tb...acesso o this.httpclient pois é lá q tá salvo a instancia, dai quando acesso ela cede a url q tá fixada a baseurl.. desacompla pois consigo usar diferentes base url, basta fazer uma instancia... tambem mando um header de auth pra quando quiser fazer autenticação por token, por exemplo
    }

    async createContact(contact){
        return this.httpClient.post('/contacts',{body:contact})
    }





}

/*estudar o preserve log para login social*/

export default new ContactsService(); //exporta instância da classe, dai quando importar vai ter acesso a todos os métodos
