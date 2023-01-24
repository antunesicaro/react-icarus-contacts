//camada q irá funcionar como um deesign pattern para centralizar a requisição dos contatos, assim, caso mude algo na url, qualquer q seja , fica centralizado e muda somente aqui, pois os lugares que estãoo chamando só irão chamar aqui, dai se tiver usando em 30 lugares, só muda em 1 e não em 30

import HttpClient from "./utils/HttpClient";

class CategoriesService{

    constructor(){ //quando já exporta criando uma instância lá em baixo com new ConcatsService, esse método já é executado e esse metodo aqui constructor cria uma propriedade dentro da contacts service
       this.httpClient = new HttpClient('http://localhost:3001');//criar uma propriedade chamada httpClient dentro da CategoriesService e o valor dessa propriedade é uma instacia do httpClient... só aqui q crio a instacia da classe, exportei a classe em si lá no HttpCliente.js, aqui crio a instacia dessa classe exportada de lá... dai recebo esse valor aqui q é a base url no momento em q a isntacia é criada.. a instancia é quando os métodos ali em baixo como get sao executados
    }

 listCategories(){
    return this.httpClient.get('/categories'); //passo como argumento a url, no caso nao mais a url e sim o path, pois vou centralizar e a camada q trata da requisição tá abstraida tb...acesso o this.httpclient pois é lá q tá salvo a instancia, dai quando acesso ela cede a url q tá fixada a baseurl.. desacompla pois consigo usar diferentes base url, basta fazer uma instancia
    }





}

/*estudar o preserve log para login social*/

export default new CategoriesService(); //exporta instância da classe, dai quando importar vai ter acesso a todos os métodos
