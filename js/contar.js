/* Declarando var. para armazenar o Id da página e perguntas respondidas (gabarito do usuário). */
let idPagina = ''
let perguntasRespondidas = ''

/* Armazenando o ID da página. */
idPagina = document.querySelector('Body').id
console.log("teste de id, o id é: "+ idPagina)
/* 
    Verifica alternativa selecionada e retorna a mesma. 
*/
function alternativaSelecionada(){

    for(item of document.querySelectorAll(`Input[Name=${idPagina}]`)){
        if(item.checked)
            return item.value     
    }
}

/* 
    Quando a página carregar... 
*/
addEventListener('load', () => {

    /* 
        Verificando a existência de uma sessão
        para salvar as respostas do usuário. 
        Se existir...
    */
    if(sessionStorage.getItem('gabaritoUsuario')){
        /* 
            Armazenando o gabarito do usuário em uma variável (perguntasRespondidas).
            Obs: ele vem em uma string, ex: Q1:A, Q2:B, Q3:C.. 
        */
        perguntasRespondidas = sessionStorage.getItem('gabaritoUsuario')
        console.log("O gabarito é: "+ perguntasRespondidas)

        /*
            Pegamos a variavel perguntasRespondidas e com o método 'split'
            convertemos para um array.
            É válido ressaltar que o split vai separar utilizando como 
            ponto de referência os espaços (se você der um console.log na 
            var. perguntasRespondidas verá que todos os id's das paginas 
            e as alternativas se encontram todas em uma string, porém
            separadas por um espaço.) que se encontram na variável.
        */
        for(perguntaR of perguntasRespondidas.split(" ")){

            /* 
                Com o gabarito do usuário já 'divido', acessamos o array
                cujo o índice for 0 (inicial) e nele se encontra o ID da 
                página, logo comparamos com o ID da página pego posteriormente
                (linha 8) com uma condicional.
            */
            if(perguntaR.split(":")[0] == idPagina){

                /*
                    Se a condição for verdadeira, então marcamos a alternativa
                    já selecionada anteriormente pelo usuário.
                    Ou seja, realizamos uma série de eventos (laços e 
                    condicionais) para marcarmos a alternativa já selecionada pelo
                    usuário posteriormente.
                */
                document.querySelector(`Input[Value=${perguntaR.split(":")[1]}]`).checked = true;

            }

        }

    }
    /* 
        Senão, criamos um sessionStorage 
        para armazenamos o gabarito do usuário 
        ao decorrer.
    */
    else
        sessionStorage.setItem('gabaritoUsuario', '')
})

/* 
    Quando a página mudar/sofrer alteração... 
*/
addEventListener('change', () => {

    /* Armazenando a alternativa selecionada pelo usuário. */
    let altUsuario = alternativaSelecionada()
    /* Passando o gabarito do usuário como array para uma variável. */
    let historicoPerguntas = perguntasRespondidas.split(" ")
    /* 
        Armazenando 'false' para indicar que não 
        realizamos nenhuma alteração em uma pergunta 
        já respondida. 
    */
    let alteracaoQuestao = false

    /* para cada pergunta do gabarito do usuário...  */
    for(pergunta of historicoPerguntas){

        /* Se o ID da pergunta em questão for igual ao id da página */
        if(pergunta.split(":")[0] == idPagina){

            /* Atribuímos o índice do array desta pergunta em questão. */
            let i = historicoPerguntas.indexOf(pergunta)
            /* e após isso, atribuímos um valor a essa questão. */
            historicoPerguntas[i] = `${idPagina}:${altUsuario}`

            /* como a questão foi alterada, então mudamos a 'alteracaoQuestao'. */
            alteracaoQuestao = true
        }

    }

    console.log(alteracaoQuestao)
    /* 
        Se a questão não tiver sido alterada, 
        então devemos salvar a resposta na variável 'historicoPerguntas'.  
    */
    if(!alteracaoQuestao){

        /* 
            Se estiver vazio, quer dizer que o usuário não 
            respondeu nada, então, fica vazia.
        */
        if(historicoPerguntas[0] == "")
            historicoPerguntas[0] = `${idPagina}:${altUsuario}`
        /*
            Caso contrário, ele respondeu, então salvamos
            na variável 'historicoPerguntas'.
        */
        else
            historicoPerguntas.push(`${idPagina}:${altUsuario}`) 

    }

    /* 
        Após isso convertemos o array 
        para uma string.
        Ex ANTES de converter (entrada): Q1:A, Q2:B, Q3:C,...
        Ex DEPOIS de converter (saída): Q1:A Q2:B Q3:C...
    */
    historicoPerguntas = historicoPerguntas.join(" ")

    /* 
        Depois informados que na sessionStorage 
        onde nos encontramos (gabaritoUsuario)
        ele irá armazenar o valor da string 
        recebida (historicoPerguntas). 
    */
    this.sessionStorage.setItem('gabaritoUsuario', historicoPerguntas)
})

