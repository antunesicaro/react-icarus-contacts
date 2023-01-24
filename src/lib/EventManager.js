export default class EventManager{
    constructor(){ //toda vez q uso o new pra instaciar o construtor é executado
        this.listeners = {}; //lista de listeners aqui ... poderia tb usar o new Map() ... no primeiro on usaria .has(event) e depois .set(event,[])

    }

    on(event, listener){ //recebe o evento e o listener q é a função q vai ser registrada q quando o evento acontecer, ser executada
        if(!this.listeners[event]){
            this.listeners[event] = [];
        } //se nao exisitir esse atributo dentro da lista do constructor eu vou iniciar aqui como um array vazio para n dar undefnided


        this.listeners[event].push(listener); //this.listerners.get(event).push(listener) com o new Map()
    }

    emit(event,payload){ //método q vai emitir o evento.. preciso do nome do evento , isto é, qual evento q preciso executar o listener... e o payload, q é qualquer informação q eu queira enviar junto com o evento
        if(!this.listeners[event]){ //se não tem nenhum listener, isto é, n tem ninguém ouvindo pra esse evento, n tem pq executar
            return
        }

        //mas se existir algum listener:
        this.listeners[event].forEach((listener) => {listener(payload)}) //percorro o array, dentro de cada posição do array tenho a função de listener, isto é, a função q executa quando é escutado
        //agora, quando faõ o emit do addtoast e passo como segundo argumento o payload q é um objeto com type e dataeil do toast, o emit olha dentro do objeto de listener, pega todos os listeners que estão registrados pra o addtoast e executa cada um deles por meio do forEach, enviando o payload q pedi pra ser enviado
    }

    removeListener(event,listenerToRemove){ //recebo o evento e o listener q vai ser removido

        const listeners = this.listeners[event]; //apenas pra melhora  de código


        //se n tiver listener pra remover, n remove nada
        if(!listeners){ //se não tem nenhum listener, isto é, n tem ninguém ouvindo pra esse evento, n tem pq executar
            return;
        }

        //filtrar a lista de listeners, verificar e percorrer o array pra olhar função por função q tem dentro dele até encontrar a função q tá me sendo passada(o listenerToRemove) e quando encontrar vou retirar
        const filteredListeners = listeners.filter(
            (listener) => listener !== listenerToRemove //pra cada item q eu tiver dentro do array q eu sei q é um listener e vou filtrar, isto é, manter, ... manter apenas os listeners que são diferentes de listenerToRemove, dai removo o q tem q ser removido
        );

        this.listeners[event] = filteredListeners;
    }
}
/*
const toastEventManager = new EventManager();
toastEventManager.on('addtoast',() => {})
console.log(toastEventManager)
*/

