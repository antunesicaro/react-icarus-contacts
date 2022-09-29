import { useState } from "react";

export default function useErrors(){
    const [errors,setErrors] = useState([]);  //anota dentro desse state todos os erros do formulário...

    function setError({field,message}){ //recebo o campo e a mensagem de erro, ai aqui dentro só trato.. passo como objeto pra ter nomeado que é field: 'algo' , message:'algo' ao invés de algo,algo

        const errorAlreadyExists = errors.find((error) => error.field === field); //procuro dentro do array de erros algum objeto q tenha como campo, field, o email

        //na primeira execução, o errorAlreadyExists vai ser undefined, ou seja, aqui vai ser false e não irá executar, pois o erro ainda não existe, porém a partir do momento que esse mesmo erro exisitir, ele vai ser true aqui e executar a função de parar, no caso o return.
        if(errorAlreadyExists){ //se já existe um erro com o field email
            return; //dá um return pra parar a execução
        }


        setErrors((prevState) => [
            ...prevState, //mantém todos os erros que tem dentro do estado.. usa o prevState para isso
            {field:field,message:message}, //agora fica automático o campo e a mensagem.. vai adicionando no final do array os erros
        ])
    }

    function removeError(fieldName){
        setErrors((prevState) => prevState.filter( //percorre todos os erros q já existem dentro de setErrors
        (error) => error.field !== fieldName,  //quando retornar true, o filter pega o objeto error e salva dentro do array q ele vai retornar, que no caso é um novo array..... quando retornar false,não coloca dentro do novo array... error.field diferente de name, vai deixar no array pois é um erro, porém quando name for igual a name, a checagem se eles são diferentes um do outro vai ser falsa, pois eles são iguais, portanto não são diferentes, logo quando é falso a checagem, o que resulta é na filtragem, eliminação desse error.. isto irá acontecer quando o error não acontecer mais, isto é, foi corrigido, dai remove de erro pois não é mais um erro
    ));
    }

    function getErrorMessageByFieldName(fieldName){ //recebe argumento de um campo
        //optional chaining.. checa se o retorno, ou seja, o valor que está antes da interrogação é um valor válido, se não for válido, "deixa passar para propxima execução,retorna o undefined"... entao vai ser assim: na primeira execução, o error é undefined daqui : errors.find((error) => error.field === fieldName) ... assim, conseguimos acessar propriedades de objetos que a gente n sabe se de fato vai ser objeto...
        return errors.find((error) => error.field === fieldName)?.message; //pesquiso dentro do array de erros um erro com o campo q recebo aqui no argumento... no final, quero retornar a propriedade message, e não o array inteiro com os dois objetos, portanto uso o .message
    }


    //também vou externalizar o array de errors, estados de erros no caso, pois vou precisar ficar vendo ele pra habilitar ou desabilitar o button de submit
    return {setError, removeError,getErrorMessageByFieldName,errors}//dentro desse objeto q será retornado, tem todas as informações que desejamos externalizar, ou seja, todas as funções, constantes, valores que queremos ter acesso dentro dos componentes que forem usar esse hook personalizado
}
