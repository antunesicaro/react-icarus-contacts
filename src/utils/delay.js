export default function delay(ms = 1000){ //recebe o tempo em milisegundos como argtrumneto, se n passar nada o padraoo é 1 s
    return new Promise((resolve) => setTimeout(resolve,ms)); //retorna uma promise q precisa ser resolvida.. depois de dois segundos, executa o resolve

}
