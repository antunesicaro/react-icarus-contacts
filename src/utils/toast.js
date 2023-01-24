import EventManager from "../lib/EventManager";

export const toastEventManager = new EventManager(); //exporto essa instacia, pois toda vez q eu for importar ele, tô importando exatamente a mesma instancia daqui, que é o que eu quero, o node trabalha assim, tendo a mesma instancia, tenho os mesmos objetos... ou seja, agora daqui posso importar no toastcontainer q é onde vou usar e usar os métodos dessa instância


export default function toast({type,text,duration}){
    //substui o customevent pelo nosso event manager

    /*
    //customevent:
    //criar um evento para depois disparar.. usando eventminner aqui... usa o custumevent pra criar um evento... é nativo do javascript... evento criado e disparado aqui vai envviar informação pro listener de adicionar toast.. a informação vai ser os parametros q precisam pra preencher o toast, que no caso é o texto e o tipo do toast
     const event = new CustomEvent('addtoast',{ //cria instancia de um novo evennto customizado pois assim ja vem com os atributos e propiredades nativos
        detail:{
            type:type,
            text:text
        }
    }); //envia aqui dois argumentos, primeiro é uma string q é o nome do evento, nesse caso é o adicionartoast, dai quando eu for usar o addEventListener('aqui vai o nome q é addtoast') .....segundo argumento é um objeto q é opcional, ela é o detail q são as informações, por exemplo em um clique a posição que foi clicado, etc.TEMOS q pensar aqui: o que faz sentido eu enviar pra quem tá ouvindo o evento addtoast? faz sentido enviar o tipo e o text do toast... detail é opcional e posso enviar qualquer coisa como number,string,boolenan, ou não passar nada

    //agora que criamos o evento, vamos disparar
    document.dispatchEvent(event); //a partir do momento que faz esse dispatchEvent(disparamento do evento), todos os listeners que estiverem ouvindo(la no toast container por exemplo)

    */

    //eventmanager:

    toastEventManager.emit('addtoast', {type,text,duration}); //executa o nome do evento e o payload q é o dado a ser enviado pro listeners

    //agora preciso adicionar um listener pra esse nesse mesmo objeto q é toasteventmanager, usando a mesma instância



}
