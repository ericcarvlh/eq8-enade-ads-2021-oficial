/*
	Declarando, respectivamente, variáveis para
	armazenar o total de acertos, erros, perguntas respondidas,
	porcentagem de acerto, datas, total de perguntas não respondidas,
	tempo de simulado decorrido, mensagem em relação a porcentagem de acertos,
	conteúdos recomendados para estudar, nota na formação geral, mota em componente
	específico, nota final, nota final componenteEspecifico e nota final formacaoGeral.
*/
var totalAcertos = 0, totalErros = 0, 
totalRespondidas = 0, porcentagemAcerto = 0,
datas = [], totalNaoRespondidas = 0, tempoDecorrido = 0,
mensagemAcertos = '', recomendaConteudos = [],
formacaoGeral = 0, componenteEspecifico = 0, notaFinal = 0,
notaFinalComponenteEspecifico = 0, notaFinalFormacaoGeral = 0

/* Se o localStorage 'notaFinal' existir, então... */
if(localStorage.getItem('acertosUsuario')){
	/* Salvamos os dados em uma variáve, (pegando o último valor do vetor.), com exceção das datas. */
	totalAcertos = atribuiValorStorage('acertosUsuario')
	totalErros = atribuiValorStorage('errosUsuario')
	totalRespondidas = atribuiValorStorage('totalRespondida')
	porcentagemAcerto = atribuiValorStorage('porcentagensDeAcerto')
	totalNaoRespondidas = atribuiValorStorage('perguntasNaoRespondidas')
	formacaoGeral = atribuiValorStorage('formacaoGeral')
	componenteEspecifico = atribuiValorStorage('componenteEspecifico')
	notaFinal = atribuiValorStorage('notaFinal')
	tempoDecorrido = atribuiValorStorage('tempoDecorrido')
	notaFinalComponenteEspecifico = atribuiValorStorage('notaFinalComponenteEspecifico')
	notaFinalFormacaoGeral = atribuiValorStorage('notaFinalFormacaoGeral')
	/* Salvamos a data em um vetor. */
	datas = localStorage.getItem('dataSimulado').split(',')
}

/* Se o localStorage 'recomendaConteudos', existir, então... */
if(localStorage.getItem('recomendaConteudos'))
	recomendaConteudos = localStorage.getItem('recomendaConteudos')

/* 
	Atribui as informações (total de acertos, 
	total de erros, total de perguntas não 
	respondidas e total de perguntas respondidas)
	nos respectivos elementos (as 4 tabelas que se 
	encontram na página de resultado.html) na página
	de resultado.html
*/
atribuiInformacoesInteiras(totalAcertos, totalErros, 
	totalNaoRespondidas, totalRespondidas)

/* Se o tempoDecorrido for maior que 0, então... */
if(tempoDecorrido > 0){
	/* 
		Obtém a quantidade total de segundos. 
		De uma forma que o resto são considerados os segundos 
		e o quociente a qantidade total de minutos.
	*/
	segundos = tempoDecorrido%60
	/* 
		Armazena o tempo médio por pergunta, 
		realizando um arredondamento para  
		ficar mais claro.
	*/
	tempoMedioPergunta = Math.round(tempoDecorrido/totalRespondidas)
	/* Se o tempo decorrido for menor que 60 segundos (menor que 1 minuto) e segundos maior 0, então... */
	if(tempoDecorrido < 60 && tempoMedioPergunta != Infinity){
		/* Inserimos somente o tempo decorrido (em segundos) e o tempo médio por pergunta no elemento. */
		document.getElementById("tempo-de-simualdo").innerText = `Tempo total: ${tempoDecorrido} segundos, 
		com um tempo médio por pergunta de ${tempoMedioPergunta} segundos`
	} else{
		document.getElementById("tempo-de-simualdo").innerText = `Tempo total: ${tempoDecorrido} segundos`
	}

	/* Agora se o tempo decorrido for maior que 60 segundos (ou seja, igual a 1 minuto ou maior, então...) */
	if(tempoDecorrido > 60){
		/* Armazena o menor número inteiro obtido no seguinte cálculo. */
		let minutos = Math.floor(tempoDecorrido/60)
		/* Deixa o minuto e o segundo no plural. */
		let p1 = 'minutos'
		let p2 = 'segundos'

		/* Converte para o singular se o valor for igual a 1. */
		if(minutos == 1) 
			p1 = 'minuto'
		if(segundos == 1) 
			p2 = 'segundo'

		/* Insere minutos, segundos e tempo médio por pergunta na página. */
		document.getElementById("tempo-de-simualdo").innerText = `Tempo total: ${minutos} ${p1} e ${segundos} ${p2}, 
		com um tempo médio por pergunta de ${tempoMedioPergunta} segundos`
	}
}

/* Se o dataSimulado existir, entõa converta para vetor e armazene em um vetor. */
if(this.localStorage.getItem('dataSimulado'))
	datas = this.localStorage.getItem('dataSimulado').split(',')

/* Se a quantidade de vezes que o usuário realizou a prova for menor que 2, então... */
if(datas.length<2){
	/* Não permite o acesso a página de progresso. */
	this.document.getElementById('link-evolucao-usuario').href = ''
	/* Torna visível a visualização da mensagem instruindo o usuário sobre como acessar a pag de progresso. */
	this.document.getElementById('mensagem-evolucao-usuario').style.display = 'Block'
	/* Desabilita o botão. */
	this.document.getElementById('conferir-evolucao').disabled = true
}

/* Se o tamanho do recomenda conteúdo for menor que 1, então... */
if(recomendaConteudos.length < 1)
	document.getElementById('conteudos-estudo').style.display = 'None' /* Desabilite a visualização dos conteúdos para estudar. */
else /* Caso contrário... */
	document.getElementById('conteudos').innerHTML = recomendaConteudos /* É inserido na página os conteúdos para estudo. */

if(porcentagemAcerto == 0){ /* Se a porcentagem de acerto for igual a 0 é porque o usuário não respondeu nada. */
	/* Então realizamos uma série de implementações de instruções ao usuário. */
	mensagemAcertos = 'Ops, parece que você não respondeu a nenhuma pergunta. Clique em <b>REFAZER SIMULADO</b>.'
	document.getElementById('final-simulado').innerHTML = 'Por favor, certifique-se de selecionar ao menos uma alternativa de uma questão.'
	document.getElementById('sub-t-final-simulado').innerHTML = 'Vá ao final da página e clique em <b>REFAZER SIMULADO</b>.'
	document.getElementById('info-resultado').style.display = 'None'
	document.getElementById('imprimir-resultado').style.display = 'None'
	document.getElementById('primeiro-dados-por-inteiro').style.display = 'None'
	document.getElementById('segundo-dados-por-inteiro').style.display = 'None'
	document.getElementById('nota-simulado').style.display = 'None'
}
else if(porcentagemAcerto < 25) /* Se a porcentagem de acerto for menor que 25%, então mude a mensagem de acerto e assim vai... */
	mensagemAcertos = 'Infelizmente, você está na linha de rebaixamento igual o Palmeiras, pois o seu rendimento foi de '+porcentagemAcerto+'%. Continue se esforçando.'
else if (porcentagemAcerto < 50)
	mensagemAcertos = 'Você está quase lá, estude mais. O seu rendimento foi de '+porcentagemAcerto+'%. Continue se esforçando.'
else if (porcentagemAcerto < 75)
	mensagemAcertos = 'Você acertou '+totalAcertos+'% das questões do simulado. Se continuar se esforçando, obterá o resultado máximo, continue...'
else
	mensagemAcertos = 'Parabéns, sua quantidade de acertos foi igual a '+porcentagemAcerto+'%.  Nos parece que você é o filho do Einsten, não reencarne.'

/* Insere a mensagem de acerto nos respectivos elementos. */
document.getElementById('retorno-acertos').innerHTML = mensagemAcertos
document.getElementById('formacao-geral-multipla-escolha').innerHTML = formacaoGeral
document.getElementById('componente-especifico-multipla-escolha').innerHTML = componenteEspecifico
document.getElementById('nota-final-formacao-geral-multipla-escolha').innerHTML = notaFinalFormacaoGeral
document.getElementById('nota-final-componente-especifico-multipla-escolha').innerHTML = notaFinalComponenteEspecifico
/* Altera o valor do elemento da nota final. */
document.getElementById('nota-final').innerHTML = notaFinal

/* Monta o gráfico de total de certos e erros */
montaGrafico('acertos-erros', ['Total de acertos e erros'], 'Total de acertos', 
[totalAcertos], 'rgba(0, 255, 0, 0.6)',  'rgba(0, 255, 0, 1)', 'Total de erros', 
[totalErros], 'rgba(255, 0, 0, 0.6)',  'rgba(255, 0, 0, 1)', 
'Total de acertos e erros')

/* Monta o gráfico de total perguntas respondidas e não respondidas. */
montaGrafico('respondidas-e-naorespondidas', ['Total de perguntas não respondidas e respondidas'],
'Total de perguntas não respondidas', [totalNaoRespondidas], 'rgba(180, 180, 180, 0.6)', 
'rgba(180, 180, 180, 1)', 'Total de perguntas respondidas', [totalRespondidas], 
'rgba(255, 155, 55, 0.6)', 'rgba(255, 153, 51, 1)', 'Total de perguntas não respondidas e respondidas')

/* function responsável por montar 2 gráfico a cada vez que for chamada. */
function montaGrafico(idCanvas, labels, label1, dados1, corFundoPrimeiroGrafico, corBordaPrimeiroGrafico, 
label2, dados2, corFundoSegundoGrafico, corBordaSegundoGrafico, titulo){
	let delayed;
	var grafico = document.getElementById(idCanvas).getContext('2d');
	var dados = {
		type: "bar",
		data: {
			labels: labels,
			datasets: [{
					label: label1,
					data: dados1,
					backgroundColor: corFundoPrimeiroGrafico,
					borderColor: corBordaPrimeiroGrafico,
				},
				{
					label: label2,
					data: dados2,
					backgroundColor: corFundoSegundoGrafico,
					borderColor: corBordaSegundoGrafico,
			}]
		},
		options: {
			responsive: true,
			plugins: {
				title: {
					display: true,
					text: titulo
				},
			},
			animation: {
				onComplete: () => {
					delayed = true;
				},
				delay: (context) => {
					let delay = 0;
					if (context.type === 'data' && context.mode === 'default' && !delayed) {
						delay = context.dataIndex * 850 + context.datasetIndex * 950;
					}
					return delay;
				},
			},
			scales: {
				y: {
					display: true,
					title: {
						display: true,
						text: 'Total de perguntas'
					}
				},
			}
		}
	}
	new Chart(grafico, dados);
}

/* Responsável por converter a página em pdf para ser baixada. */
function imprimirResultado(){
	window.print()
}

/* Insere o total de acertos, erros, perguntas não respondidas e total de perguntas respondidas. */
function atribuiInformacoesInteiras(acertos, erros, naoRespondidas, respondidas){
	/* Nas 4 linhas a seguir é feito o cálculo da porcentagem de acerto, erros, perguntas nao respondidas e perguntas respondidas. */
	let porcentAcerto = Math.round((acertos/35)*100)
	let porcentErros = Math.round((erros/35)*100)
	let porcentNaoRespondidas = Math.round((naoRespondidas/35)*100)
	let porcentRespondidas = Math.round((respondidas/35)*100)

	/* E depois mudamos os valores de cada elemento da página de acordo com os cálculos e variáveis passadas anteriormente. */
	document.getElementById('acertos').innerHTML = `${acertos}/35 <b>(${porcentAcerto}%)</b>`   
	document.getElementById('erros').innerHTML = `${erros}/35 <b>(${porcentErros}%)</b>`
	document.getElementById('nao-respondidas').innerHTML = `${naoRespondidas}/35 <b>(${porcentNaoRespondidas}%)</b>`
	document.getElementById('respondidas').innerHTML = `${respondidas}/35 <b>(${porcentRespondidas}%)</b>`	
}

/* Pega o último valor do localStorage e retorna ele. */
function atribuiValorStorage(key){
	let valorStorage = localStorage.getItem(key).split(',')
	return valorStorage[valorStorage.length-1]
}