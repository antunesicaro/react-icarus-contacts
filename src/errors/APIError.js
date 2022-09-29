export default class APIError extends Error{ //classe apierror extende um contruttor genérico, herda tudo de Error.

    //sobrescrevendo...quando pego tudo de Error pra APIError, preciso sobrescrever alguns atributos, pois vem tudo q existe nele, é como se fosse um spread q eu desse
    constructor(response,body){ //método construtor é executado toda vez que usamos o new na frente da função, isto é, toda vez que se cria uma instancia.. logo, a função que executo lá do new APIError do httpclient é exatamente essa aqui... no caso de lá do httpclint Tô enviando uma mensagem pra dentro dessa classe e recebo essa msg aqui
       super();//toda vez q a classe q herda, herdar algo para alguém, preciso executar essa classe q irá herdar, faço isso com o super... q no caso é o Error.contrutctor e repasso a mensagem //dentro tinha body?.error || `${response.status} - ${response.statusText}`, mas tirei daqui e joguei la em this.message
    //oq fiz acima do constructor é só pra subprir necessidade do js, agora vou poder sobrescrever
    this.name = 'APIError'

    //vantangem é q posso pegar oq quiser e usar funções
    this.response = response
    this.message = body?.error || `${response.status} - ${response.statusText}`; //por baixo dos panos, se eu passasse essa message ali no super, ele iria sobrescrever o message com o this, mas pra deixar explicito, faço isso aqui

    }
}
