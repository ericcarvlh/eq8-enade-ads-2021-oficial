/* Declarando var. para armazenar o Id da página e perguntas respondidas (gabarito do usuário). */
let idPagina = ''
let perguntasRespondidas = ''

/* Armazenando o ID da página. */
idPagina = document.querySelector('Body').id
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
    if(!sessionStorage.getItem('comecoProva'))
        this.sessionStorage.setItem('comecoProva', Date.parse(new Date()))

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

function salvaResultadoSimulado(){
    let gabaritoOficial = ["Q1:E", "Q2:C", "Q3:B", "Q4:B", "Q5:A", "Q6:A", "Q7:C","Q8:D", "Q9:C", "Q10:D","Q11:E", 
    "Q12:C", "Q13:C","Q14:E", "Q15:B", "Q16:E","Q17:C", "Q18:A", "Q19:A","Q20:E", "Q21:B","Q22:A", "Q23:B","Q24:D", 
    "Q25:E", "Q26:E","Q27:C", "Q28:B", "Q29:D","Q30:C","Q31:D", "Q32:B", "Q33:D","Q34:A", "Q35:A"]
    let conteudosProva = [
        ['Q1', [' Interpretação']], ['Q2', [' Desconhecido']], ['Q3', [' Desconhecido']], 
        ['Q4', [' Desconhecido']], ['Q5', [' Desconhecido']], ['Q6', [' Desconhecido']], 
        ['Q7', [' Desconhecido']], ['Q8', [' Desconhecido']], ['Q9', [' Desconhecido']],
        ['Q10', [' Desconhecido']], ['Q11', [' Desconhecido']], ['Q12', [' Desconhecido']], 
        ['Q13', [' Desconhecido']], ['Q14', [' Desconhecido']], ['Q15', [' Desconhecido']],
        ['Q16', [' Desconhecido']], ['Q17', [' Desconhecido']], ['Q18', [' Desconhecido']],
        ['Q19', [' Desconhecido']], ['Q20', [' Desconhecido']], ['Q21', [' Desconhecido']],
        ['Q22', [' Desconhecido']], ['Q23', [' Desconhecido']], ['Q24', [' Desconhecido']],
        ['Q25', [' Desconhecido']], ['Q26', [' Desconhecido']], ['Q27', [' Desconhecido']],
        ['Q28', [' Desconhecido']], ['Q29', [' Desconhecido']], ['Q30', [' Desconhecido']],
        ['Q31', [' Desconhecido']], ['Q32', [' Desconhecido']], ['Q33', [' Desconhecido']],
        ['Q34', [' Desconhecido']], ['Q35', [' Desconhecido']]
    ]

	let recomendaConteudos = []
	let gabaritoUsuario = []
	let totalRespondidas = []
	let totalAcertos = []
	let totalErros = []

	let tempoDecorrido = 0
	let totalNaoRespondidas = 35

	if(sessionStorage.getItem('gabaritoUsuario')){
		gabaritoUsuario = sessionStorage.getItem('gabaritoUsuario').split(" ")
		totalRespondidas = sessionStorage.getItem('gabaritoUsuario').split(" ")
	}

	if(totalRespondidas[0] != ''){
		for (let i = 0; i < gabaritoUsuario.length; i++) {
			
			if (gabaritoOficial.indexOf(gabaritoUsuario[i]) >=0 )
				totalAcertos.push(gabaritoUsuario[i]) 
			
			if (gabaritoOficial.indexOf(gabaritoUsuario[i]) < 0)
				totalErros.push(gabaritoUsuario[i])
		}
		totalNaoRespondidas = 35 - totalRespondidas.length
	}
	else
		totalRespondidas = []

	if(totalErros.length != 0){
		for(let i = 0; i < totalErros.length; i++){
			let questao = totalErros[i].split(":")[0]

			if(conteudosProva[i][0].indexOf(`${questao}`) == 0)
				recomendaConteudos.push(conteudosProva[i][1])
		}
	}

	if(sessionStorage.getItem("comecoProva")){
		let inicioProva = sessionStorage.getItem("comecoProva")
		let finalProva = Date.parse(new Date())

		tempoDecorrido = (finalProva - inicioProva)/1000
	}

	var porcentagemAcerto = Math.round((totalRespondidas.length / 35) * 100)

	// salva dados no localStorage

	let data = new Date()
	let diaMesAno = String(data.getDate()).padStart(2, '0') + '/' + 
	String(data.getMonth() + 1).padStart(2, '0') + '/' + data.getFullYear() 

	if(localStorage.getItem('acertosUsuario')){
		salvaDadosEvolucao(totalAcertos.length, 'acertosUsuario')
		salvaDadosEvolucao((totalErros.length+totalNaoRespondidas), 'errosUsuario')
		salvaDadosEvolucao(diaMesAno, 'dataSimulado')
		salvaDadosEvolucao(totalNaoRespondidas, 'perguntasNaoRespondidas')
		salvaDadosEvolucao(tempoDecorrido, 'tempoDecorrido')
		salvaDadosEvolucao(totalRespondidas.length, 'totalRespondida')
		salvaDadosEvolucao(porcentagemAcerto, 'porcentagensDeAcerto')
	}
	else{
		localStorage.setItem('acertosUsuario', totalAcertos.length)
		localStorage.setItem('errosUsuario', totalErros.length)
		localStorage.setItem('dataSimulado', diaMesAno)
		localStorage.setItem('perguntasNaoRespondidas', totalNaoRespondidas)
		localStorage.setItem('tempoDecorrido', tempoDecorrido)
		localStorage.setItem('totalRespondida', totalRespondidas.length)
		localStorage.setItem('porcentagensDeAcerto', porcentagemAcerto)
	}

	sessionStorage.setItem('gabaritoUsuario', '')
	sessionStorage.setItem('paginasCorrigidas', '')
	sessionStorage.setItem('comecoProva', '')

    window.location.href = 'Resultado.html'
}

function salvaDadosEvolucao(valorASerArmazenado, chaveLocalStorage){
	let vetor = localStorage.getItem(chaveLocalStorage).split(',')
	vetor.push(valorASerArmazenado)
	vetor.join(' ')
	localStorage.setItem(chaveLocalStorage, vetor)
}
