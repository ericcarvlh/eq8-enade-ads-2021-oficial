/* Declarando variaveis para armazenar a alternativa correta e texto (respectiva resposta).*/
var altCorreta = ''
var altTexto = ''
var pagsCorrigidas = ''
var index = 0
var selecionada = ''

// Chama os métodos que constroem os pop ups de erro, acerto e alerta no HTML
constroeAlerta()
constroeErro()
constroeAcerto()

/* Quando a pagina carregar... */
window.addEventListener('load', () => {
    
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
    
    /* 
        Ao chamarmos essa função, ela requere um parametro (alternativaSelecionada e este
        parametro é aquela alternativa que foi selecionada pelo usuário), e depois ela
        vai na alternativa que o usuário passou e 'pega' o texto/valor dela. 
    */

    /* Se houver uma alternativa selecionada... */
    if(alternativaSelecionada() != 'None'){
        conteudoAlternativaSelecionada(alternativaSelecionada())

        /* Se a alternativa esta correta, abrimos um pop-up mostrando que está correta. */
        if (alternativaSelecionada() === altCorreta){
            abrirCerto()
        }
        
        /* Se estiver errada, abrimos um pop-up mostrando que está errada */
        if (alternativaSelecionada() != altCorreta){
            if(alternativaSelecionada() != 'None')
                abrirErrado()
        }

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
    else 
        /* Se nenhuma for selecionada, abrimos um pop-up mostrando que nenhuma foi selecionada.*/
        abrirAlerta() 
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
    selecinou alguma alternativa e qual foi selecionada.
*/
function alternativaSelecionada(){
    /* 
        Fazemos uma estrutura de repetição
        para percorrer todas as alternativas cujo o nome for 
        o id da pagina (Ex: Q35). Para cada (item/input radio) fazemos 
        uma verificação. le-se: para cada item cujo o nome for o id da página, faça...
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
    altTexto = document.querySelector(`Input[value=${alternativa}`).parentElement.innerText

    /* 
        1° - Acessamos o contéudo encontrado em 'altTexto'.
        2° - Utilizamos o método subString para pegar uma determinada parte da string
        no caso a string "altTexto", e utilizamos o '2' para começar a partir do 2 
        índice, logo após o ')' começando pelo indice 0.
    */
    altTexto = altTexto.substring(altTexto.indexOf(")") + 2)

    return altTexto
}

/**
 * Usa document.write para escrever no HTML e construir uma div 
 * com id = 'pop-erro' e class = 'pop-acerto', e dentro dela contruir 
 * outra div com id e class = 'errado', na qual estão a imagem, a mensagem 
 * e um span para fechar que compõem o pop up
 */
function constroeErro() {
    const alternativaCorreta = document.querySelector('#alt-correta').value
    const textoCorreto = document.querySelector(`input[value = ${document.querySelector('#alt-correta').value}]`).parentElement.innerText    
    document.write('<div id="pop-erro" class="pop-acerto">')
    document.write('<div id = "errado" class="errado">')
    document.write('<img src="../../Images/Perguntas/errado.png">')
    document.write('<h3>Você Errou</h3>')
    document.write('<span class="fechar" onClick = "fechar()" >X</span>')
    document.write('<p>A alternativa correta era a "' + alternativaCorreta + '", ou seja:</p>')
    document.write('<p><b>"' + textoCorreto + '"</b></p>')
    document.write(`<p>Se esforce um pouco mais, continuamos tendo orgulho de ter um usúario igual à você, o importante é tentar.</p></div></div>`)
}

/**
 * Usa document.write para escrever no HTML e construir uma div 
 * com id = 'pop-acerto' e class = 'pop-acerto', e dentro dela contruir 
 * outra div com id e class = 'certo', na qual estão a imagem, a mensagem 
 * e um span para fechar que compõem o pop up
 */
function constroeAcerto() {
    const alternativaCorreta = document.querySelector('#alt-correta').value
    const textoCorreto = document.querySelector(`input[value = ${document.querySelector('#alt-correta').value}]`).parentElement.innerText
    document.write('<div id="pop-acerto" class="pop-acerto">')
    document.write('<div id = "certo" class="certo">')
    document.write('<img src="../../Images/Perguntas/certo.png">')
    document.write('<h3>Você Acertou</h3>')
    document.write('<span class="fechar" onClick = "fechar()" >X</span>')
    document.write('<p>Você acertou, a alternativa correta era a "' + alternativaCorreta + '", ou seja:</p>')
    document.write('<p><b>"' + textoCorreto + '"</b></p>')
    document.write('<p>Nos sentimos orgulhosos por termos um usuário igual a você, continue assim.</p></div></div>')
}

/**
 * Usa document.write para escrever no HTML e construir uma div 
 * com id = 'pop-alerta' e class = 'pop-acerto', e dentro dela contruir 
 * outra div com id e class = 'atenaco', na qual estão a imagem, a mensagem 
 * e um span para fechar que compõem o pop up
 */
function constroeAlerta(){
    document.write('<div id="pop-alerta" class="pop-acerto">')
    document.write('<div id = "atencao" class="atencao">')
    document.write('<img src="../../Images/Perguntas/atencao.png">')
    document.write('<h3>Selecione uma alternativa</h3>')
    document.write('<span class="fechar" onClick = "fechar()" >X</span>')
    document.write('<p>Para corrigir a questão, é obrigatório que você selecione uma alternativa.</p></div></div>')
}

/**
 * O método que abre o alerta, pega a div maior pelo ID
 * e seu atrubuto 'display' no css é mudado de none para flex.
 * A div menor também é pega pelo ID e seu atributo 'display'
 * no css é mudado de none para block.
 */
function abrirAlerta() {
    const container = document.getElementById('pop-alerta')
    container.style.display = 'flex'
    const atencao = document.getElementById('atencao')
    atencao.style.display = 'block'
}

/**
 * O método que abre o errado, pega a div maior pelo ID
 * e seu atrubuto 'display' no css é mudado de none para flex.
 * A div menor também é pega pelo ID e seu atributo 'display'
 * no css é mudado de none para block.
 */
function abrirErrado() {
    const container = document.getElementById('pop-erro')
    container.style.display = 'flex'
    const errado = document.getElementById('errado')
    errado.style.display = 'block'
}

/**
 * O método que abre o certo, pega a div maior pelo ID
 * e seu atrubuto 'display' no css é mudado de none para flex.
 * A div menor também é pega pelo ID e seu atributo 'display'
 * no css é mudado de none para block.
 */
function abrirCerto() {
    const container = document.getElementById('pop-acerto')
    container.style.display = 'flex'
    const certo = document.getElementById('certo')
    certo.style.display = 'block'
}

/**
 * No método para fechar pegamos todos os IDs, tanto os maiores quanto os
 * menores, e mudamos seu atributo 'display' no css para none. Assim podemos 
 * usar o mesmo método para fechar todos os pop ups.
 */
function fechar() {
    const popAlerta = document.getElementById('pop-acerto')
    const popErro = document.getElementById('pop-erro')
    const container = document.getElementById('pop-alerta')
    const certo = document.getElementById('certo')
    const errado = document.getElementById('errado')
    const atencao = document.getElementById('atencao')
    popErro.style.display = 'none'
    container.style.display = 'none'
    certo.style.display = 'none'
    errado.style.display = 'none'
    popAlerta.style.display = 'none'
    atencao.style.display = 'none'
}