/* Declarando variaveis para armazenar a alternativa correta e texto (respectiva resposta).*/
var altCorreta = ''
var altCorretaTexto = ''
var pagsCorrigidas = ''
var index = 0

/* Quando a pagina carregar... */
window.addEventListener('load', function(){

    if(!sessionStorage.getItem('comecoProva'))
        this.sessionStorage.setItem('comecoProva', Date.parse(new Date()))

    verificaPagCorrigida()

    /* Salvando a alternativa correta. */
    altCorreta = document.getElementById('alt-correta').value    
})

/* 
    Quando o botão de corrigir for clicado,
    o metódo 'confereResposta' será chamado
    este é responsável por conferir a repsota
*/
function confereResposta(){

    /* Verifica se a página já foi corrigida. */
    verificaPagCorrigida()
    
    /* Se houver uma alternativa selecionada... */
    if(alternativaSelecionada() != 'None'){
        /* Se a alternativa esta correta, abrimos um pop-up mostrando que está correta. */
        if (alternativaSelecionada() === altCorreta)
            console.log('voce acertou, a alternativa correta é: ', altCorreta)
        
        /* Se estiver errada, abrimos um pop-up mostrando que está errada */
        if (alternativaSelecionada() != altCorreta){
            if(alternativaSelecionada() != 'None')
                console.log('voce errou, a alternativa era: ', altCorreta)
        }

        /* 
            Ao chamarmos essa função, ela requere um parametro (alternativaSelecionada e este
            parametro é aquela alternativa que foi selecionada pelo usuário), 
            vai na alternativa que o usuário passou e 'pega'
            o texto/valor dela. 
        */
        conteudoAlternativaSelecionada(alternativaSelecionada())
        /* Desativando a opção de marcar outra a alternaiva caso o usuário já tenha corrigido. */
        desativaInputRadio()

        /* Variável que vai receber a quantidade de vezes que o ID se repete. */
        let repitcoes = 0
        /* Percorrendo o array todo para ver se há alguma repetição de ID. */
        for(pagCorrigida of pagsCorrigidas.split(" ")){
            /* Se o id da pagina ja estiver no array, então somamos 1. */
            if(pagCorrigida == idPagina){
                repitcoes++
            }
        }
    
        /* verificando se ID se repete */
        if(repitcoes==0){
            /* Salvando a pagina como já corrigida. */
            /* Convertendo para array e armazenando. */
            pagsCorrigidas = pagsCorrigidas.split(" ")
            /* Salvando o novo ID da pagina no array. */
            pagsCorrigidas.push(idPagina)
            /* Convertendo para string. */
            pagsCorrigidas = pagsCorrigidas.join(" ")
            /* Salvando no sessionStorage para utilizar em breve. */
            sessionStorage.setItem('paginasCorrigidas', pagsCorrigidas)
        }
    }
    /* Caso contrário, ele solicita ao usuário marcar uma alternativa */
    else {
        /* Se nenhuma for selecionada, abrimos um pop-up mostrando que nenhuma foi selecionada.*/ 
        console.log('selecione ao menos uma alternativa.')
    }
}

/* 
    Desativa a possibilidade de 
    marcar a alternativa 
*/
function desativaInputRadio(){
    /*
        Desabilitando a possibilidade do usuário selecionar
        outra alternativa (caso ele já tenha corrigido a pag em questão).
    */
    for(item of document.querySelectorAll(`Input[Name=${idPagina}]`))
    item.style.pointerEvents = 'None' 
}

/* 
    Vendo se a pagina já foi corrigida, se sim ele 
    bloqueia a opção de mudar a alternativa.
*/
function verificaPagCorrigida(){
    if(sessionStorage.getItem('paginasCorrigidas')){

        pagsCorrigidas = sessionStorage.getItem('paginasCorrigidas')

        for(pagCorrigida of pagsCorrigidas.split(" ")){

            if(pagCorrigida == idPagina)               
                desativaInputRadio()
        }
    } else
        sessionStorage.setItem('paginasCorrigidas', '')
}


/*
    Ao chamar essa função, ela verifica se o usuário 
    selecinou alguma alternativa, qual foi selecionada
    e se a mesma é a alternativa correta.
*/
function alternativaSelecionada(){

    /* 
        Fazemos uma estrutura de repetição
        para percorrer todas as alternativas cujo o nome for "Q"
        e para cada (item) fazemos uma verificação.
        le-se: para cada item cujo o nome for 'Q' faça...
    */
    for(item of document.querySelectorAll(`Input[Name=${idPagina}]`)){
        /* Se houver algum input radio selecionado, então retorne o valor do input... */
        if(item.checked)
            return item.value     
    }
    return 'None'
}

/*
    Função utilizada para ler a resposta que se encontra na alternativa X.
    É repassado para essa função uma alternativa em específico, e a função é responsável 
    por 'ir' até a alternatia selecionada e, 'pegar' o conteúdo ali encontrado.  
*/
function conteudoAlternativaSelecionada(alternativa){
    /* 
        1° - Acessamos o DOM (lugar onde se encontra os elementos do HTML, DOM -> Document).
        2° - Buscamos por um elemento específico (cujo valor é o da variável alternativa).
        3° - Pegamos o elemento pai.
        4° - 'Filtramos' p armazenar somente a string não o HTML por completo. 
    */
    altCorretaTexto = document.querySelector(`Input[value=${alternativa}`).parentElement.innerText

    /* 
        1° - Acessamos o contéudo encontrado em 'altCorretaTexto'.
        2° - Utilizamos o método subString para pegar uma determinada parte da string
        no caso a string "altCorretaTexto", e utilizamos o '2' para começar a partir do 2 
        índice, logo após o ')' começando pelo indice 0.
    */
    altCorretaTexto = altCorretaTexto.substring(altCorretaTexto.indexOf(")") + 2)
    console.log(altCorretaTexto)
}