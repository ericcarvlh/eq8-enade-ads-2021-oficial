/* 
    Declarando variaveis para armazenar o Id da 
    página e perguntas respondida (gabarito do usuário).
*/
let idPagina = ''
let perguntasRespondidas = ''

/* Armazenando o ID da página. */
idPagina = document.querySelector('Body').id

function alternativaSelecionada(){

    for(item of document.querySelectorAll(`Input[Name=${idPagina}]`)){
        if(item.checked)
            return item.value     
    }
}

addEventListener('load', function(){

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

                /*
                    Além disso, desabilitamos a opção do usuário de selecionar
                    outra alternativa (caso ele já tenha respondido).
                */
                for(item of document.querySelectorAll('Input[Name=Q]'))
                    item.style.pointerEvents = 'None'

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

/* Quando a página mudar/sofrer alteração... */
addEventListener('change', function(){

    /* Armazenando a alternativa selecionada pelo usuário*/
    let altUsuario = alternativaSelecionada()
    /* Passando o gabarito do usuário como array para uma variável. */
    let historicoPerguntas = perguntasRespondidas.split(" ")
    /*  */
    let alteracaoQuestao = false

    for(pergunta of historicoPerguntas){

        if(pergunta.split(":")[0] == idPagina){
            let i = historicoPerguntas.indexOf(pergunta)
            historicoPerguntas[i] = `${idPagina}:${altUsuario}`

            alteracaoQuestao = true
        }

    }

    if(!alteracaoQuestao){

        if(historicoPerguntas[0] == "")
            historicoPerguntas[0] = `${idPagina}:${altUsuario}`
        else
            historicoPerguntas.push(`${idPagina}:${altUsuario}`) 

    }

    historicoPerguntas = historicoPerguntas.join(" ")

    this.sessionStorage.setItem('gabaritoUsuario', historicoPerguntas)

})

