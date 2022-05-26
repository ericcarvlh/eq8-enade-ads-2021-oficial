const gabaritoOficial = ["Q1:E", "Q2:C", "Q3:B", "Q4:B", "Q5:A", "Q6:A", "Q7:C","Q8:D", "Q9:C", "Q10:D","Q11:E", 
"Q12:C", "Q13:C","Q14:E", "Q15:B", "Q16:E","Q17:C", "Q18:A", "Q19:A","Q20:E", "Q21:B","Q22:A", "Q23:B","Q24:D", 
"Q25:E", "Q26:E","Q27:C", "Q28:B", "Q29:D","Q30:C","Q31:D", "Q32:B", "Q33:D","Q34:A", "Q35:A"]

var totalAcertos = 0, totalErros = 0, 
totalRespondidas = 0, porcentagemAcerto = 0,
datas = [], totalNaoRespondidas = 0, tempoDecorrido = 0,
mensagemAcertos = '', recomendaConteudos = [],
formacaoGeral = 0, componenteEspecifico = 0, notaFinal = 0

if(localStorage.getItem('acertosUsuario')){
	totalAcertos = atribuiValorStorage('acertosUsuario')
	totalErros = atribuiValorStorage('errosUsuario')
	totalRespondidas = atribuiValorStorage('totalRespondida')
	porcentagemAcerto = atribuiValorStorage('porcentagensDeAcerto')
	totalNaoRespondidas = atribuiValorStorage('perguntasNaoRespondidas')
	formacaoGeral = atribuiValorStorage('formacaoGeral')
	componenteEspecifico = atribuiValorStorage('componenteEspecifico')
	notaFinal = atribuiValorStorage('notaFinal')
	tempoDecorrido = atribuiValorStorage('tempoDecorrido')
	datas = localStorage.getItem('dataSimulado').split(',')
}

if(localStorage.getItem('recomendaConteudos'))
	recomendaConteudos = localStorage.getItem('recomendaConteudos')

atribuiInformacoesInteiras(totalAcertos, totalErros, 
	totalNaoRespondidas, totalRespondidas)

if(tempoDecorrido > 0){
	segundos = tempoDecorrido%60
	tempoMedioPergunta = Math.round(tempoDecorrido/totalRespondidas)

	if(tempoDecorrido < 60){
		document.getElementById("tempo-de-simualdo").innerText = `Tempo total: ${tempoDecorrido} segundos, 
		com um tempo médio por pergunta de ${tempoMedioPergunta} segundos`
	}

	if(tempoDecorrido > 60){
		let minutos = Math.floor(tempoDecorrido/60)

		let p1 = 'minutos'
		let p2 = 'segundos'

		if(minutos == 1) 
			p1 = 'minuto'
		if(segundos == 1) 
			p2 = 'segundo'

		document.getElementById("tempo-de-simualdo").innerText = `Tempo total: ${minutos} ${p1} e ${segundos} ${p2}, 
		com um tempo médio por pergunta de ${tempoMedioPergunta} segundos`
	}
}

if(this.localStorage.getItem('dataSimulado'))
	datas = this.localStorage.getItem('dataSimulado').split(',')

if(datas.length<2){
	this.document.getElementById('link-evolucao-usuario').href = ''
	this.document.getElementById('mensagem-evolucao-usuario').style.display = 'Block'
	this.document.getElementById('conferir-evolucao').disabled = true
}

if(recomendaConteudos.length < 1)
	document.getElementById('conteudos-estudo').style.display = 'None'
else
	document.getElementById('conteudos').innerHTML = recomendaConteudos

if(porcentagemAcerto == 0){
	mensagemAcertos = 'Ops, parece que você não respondeu a nenhuma pergunta. Clique em <b>REFAZER SIMULADO</b>.'
	document.getElementById('final-simulado').innerHTML = 'Por favor, certifique-se de selecionar ao menos uma alternativa de uma questão.'
	document.getElementById('sub-t-final-simulado').innerHTML = 'Vá ao final da página e clique em <b>REFAZER SIMULADO</b>.'
	document.getElementById('info-resultado').style.display = 'None'
	document.getElementById('imprimir-resultado').style.display = 'None'
	document.getElementById('primeiro-dados-por-inteiro').style.display = 'None'
	document.getElementById('segundo-dados-por-inteiro').style.display = 'None'
	document.getElementById('nota-simulado').style.display = 'None'
}
else if(porcentagemAcerto < 25)
	mensagemAcertos = 'Infelizmente, você está na linha de rebaixamento igual o Palmeiras, pois o seu rendimento foi de '+porcentagemAcerto+'%. Continue se esforçando.'
else if (porcentagemAcerto < 50)
	mensagemAcertos = 'Você está quase lá, estude mais. O seu rendimento foi de '+porcentagemAcerto+'%. Continue se esforçando.'
else if (porcentagemAcerto < 75)
	mensagemAcertos = 'Você acertou '+totalAcertos+'% das questões do simulado. Se continuar se esforçando, obterá o resultado máximo, continue...'
else
	mensagemAcertos = 'Parabéns, sua quantidade de acertos foi igual a '+porcentagemAcerto+'%.  Nos parece que você é o filho do Einsten, não reencarne.'

document.getElementById('retorno-acertos').innerHTML = mensagemAcertos
for(elemento of document.querySelectorAll('#formacao-geral-multipla-escolha'))
	elemento.innerHTML = formacaoGeral
for(elemento of document.querySelectorAll('#componente-especifico-multipla-escolha'))
	elemento.innerHTML = componenteEspecifico
document.getElementById('nota-final').innerHTML = notaFinal

montaGrafico('acertos-erros', ['Total de acertos e erros'], 'Total de acertos', 
[totalAcertos], 'rgba(0, 255, 0, 0.6)',  'rgba(0, 255, 0, 1)', 'Total de erros', 
[totalErros], 'rgba(255, 0, 0, 0.6)',  'rgba(255, 0, 0, 1)', 
'Total de acertos e erros')

montaGrafico('respondidas-e-naorespondidas', ['Total de perguntas não respondidas e respondidas'],
'Total de perguntas não respondidas', [totalNaoRespondidas], 'rgba(180, 180, 180, 0.6)', 
'rgba(180, 180, 180, 1)', 'Total de perguntas respondidas', [totalRespondidas], 
'rgba(255, 155, 55, 0.6)', 'rgba(255, 153, 51, 1)', 'Total de perguntas não respondidas e respondidas')

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

function imprimirResultado(){
	window.print()
}

function atribuiInformacoesInteiras(acertos, erros, naoRespondidas, respondidas){
	let porcentAcerto = Math.round((acertos/35)*100)
	let porcentErros = Math.round((erros/35)*100)
	let porcentNaoRespondidas = Math.round((naoRespondidas/35)*100)
	let porcentRespondidas = Math.round((respondidas/35)*100)

	document.getElementById('acertos').innerHTML = `${acertos}/35 <b>(${porcentAcerto}%)</b>`   
	document.getElementById('erros').innerHTML = `${erros}/35 <b>(${porcentErros}%)</b>`
	document.getElementById('nao-respondidas').innerHTML = `${naoRespondidas}/35 <b>(${porcentNaoRespondidas}%)</b>`
	document.getElementById('respondidas').innerHTML = `${respondidas}/35 <b>(${porcentRespondidas}%)</b>`	
}

function atribuiValorStorage(key){
	let valorStorage = localStorage.getItem(key).split(',')
	return valorStorage[valorStorage.length-1]
}

/*
apagaTestes("Acertos: ", 'acertosUsuario')
apagaTestes("Erros: ", 'errosUsuario')
apagaTestes("Data(s): ", 'dataSimulado')
apagaTestes("Em branco: ", 'perguntasNaoRespondidas')
apagaTestes("Tempo decorrido: ", 'tempoDecorrido')
apagaTestes("Total de perguntas respondidas: ", 'totalRespondida')
apagaTestes('Porcentagens de acerto: ', 'porcentagensDeAcerto')
apagaTestes("Gabarito do usuário: ", 'gabaritoUsuario')
apagaTestes("Recomenda conteudos: ", 'recomendaConteudos')
apagaTestes("Formação geral: ", 'formacaoGeral')
apagaTestes("Componente específico: ", 'componenteEspecifico')
apagaTestes("Nota final: ", 'notaFinal')
*/

/*
testes("Acertos: ", 'acertosUsuario')
testes("Erros: ", 'errosUsuario')
testes("Data(s): ", 'dataSimulado')
testes("Em branco: ", 'perguntasNaoRespondidas')
testes("Tempo decorrido: ", 'tempoDecorrido')
testes("Total de perguntas respondidas: ", 'totalRespondida')
testes("Porcentagens de acerto: ", 'porcentagensDeAcerto')
testes("Gabarito do usuário: ", 'gabaritoUsuario')
testes("Recomenda conteudos: ", 'recomendaConteudos')
testes("Formação geral: ", 'formacaoGeral')
testes("Componente específico: ", 'componenteEspecifico')
testes("Nota final: ", 'notaFinal')
*/

function testes(msg, key){
	console.log(msg + localStorage.getItem(key))
}

function apagaTestes(msg, key){
	console.log(msg + localStorage.removeItem(key))
}