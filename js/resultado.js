const gabaritoOficial = ["Q1:E", "Q2:C", "Q3:B", "Q4:B", "Q5:A", "Q6:A", "Q7:C","Q8:D", "Q9:C", "Q10:D","Q11:E", 
"Q12:C", "Q13:C","Q14:E", "Q15:B", "Q16:E","Q17:C", "Q18:A", "Q19:A","Q20:E", "Q21:B","Q22:A", "Q23:B","Q24:D", 
"Q25:E", "Q26:E","Q27:C", "Q28:B", "Q29:D","Q30:C","Q31:D", "Q32:B", "Q33:D","Q34:A", "Q35:A", ""]
var gabaritoUsuario = []
var totalRespondidas = []

if(sessionStorage.getItem('gabaritoUsuario')){
	gabaritoUsuario = sessionStorage.getItem('gabaritoUsuario').split(" ")
	totalRespondidas = sessionStorage.getItem('gabaritoUsuario').split(" ")
}

var totalAcertos = []
var totalErros = []
var totalNaoRespondidas = 35
var mensagemAcertos = ''

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

var porcentagemAcerto = Math.round((totalRespondidas.length / 35) * 100)

if(porcentagemAcerto == 0 || gabaritoUsuario == null){
	mensagemAcertos = 'Ops, parece que você não respondeu a nenhuma pergunta. Clique em <b>REFAZER SIMULADO</b>.'
	document.getElementById('final-simulado').innerHTML = 'Por favor, certifique-se de selecionar ao menos uma alternativa de uma questão.'
	document.getElementById('sub-t-final-simulado').innerHTML = 'Vá ao final da página e clique em <b>REFAZER SIMULADO</b>.'
	document.getElementById('info-resultado').style.display = 'None'
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

montaGrafico('acertos-erros', ['Total de acertos e erros'], 'Total de acertos', 
[totalAcertos.length], 'rgba(0, 255, 0, 0.6)',  'rgba(0, 255, 0, 1)', 'Total de erros', 
[totalErros.length], 'rgba(255, 0, 0, 0.6)',  'rgba(255, 0, 0, 1)', 
'Total de acertos e erros')

montaGrafico('respondidas-e-naorespondidas', ['Total de perguntas não respondidas e respondidas'],
'Total de perguntas não respondidas', [totalNaoRespondidas], 'rgba(180, 180, 180, 0.6)', 
'rgba(180, 180, 180, 1)', 'Total de perguntas respondidas', [totalRespondidas.length], 
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

addEventListener('load', function(){

	let datas = []

	if(this.localStorage.getItem('dataSimulado'))
		datas = this.localStorage.getItem('dataSimulado').split(',')

	if(datas.length<2){
		this.document.getElementById('link-evolucao-usuario').href = ''
		this.document.getElementById('mensagem-evolucao-usuario').style.display = 'Block'
		this.document.getElementById('conferir-evolucao').disabled = true
	}

})

function salvaEvolucaoResetaSimulado(){
	let gabaritoUsuario = sessionStorage.getItem('gabaritoUsuario').split(" ")
	let totalRespondidas = sessionStorage.getItem('gabaritoUsuario').split(" ")

	let totalAcertos = []
	let totalErros = []
	//let totalNaoRespondidas = 35

	let data = new Date()
	let diaMesAno = String(data.getDate()).padStart(2, '0') + '/' + 
	String(data.getMonth() + 1).padStart(2, '0') + '/' + data.getFullYear() 

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

	if(localStorage.getItem('acertosUsuario')){
		let acertos = localStorage.getItem('acertosUsuario').split(',')
		let erros = localStorage.getItem('errosUsuario').split(',')
		let datas = localStorage.getItem('dataSimulado').split(',')

		acertos.push(totalAcertos.length)
		erros.push(totalErros.length)
		datas.push(diaMesAno)

		acertos.join(' ')
		erros.join(' ')
		datas.join(' ')
	
		localStorage.setItem('acertosUsuario', acertos)
		localStorage.setItem('errosUsuario', erros)
		localStorage.setItem('dataSimulado', datas)
	}
	else{
		localStorage.setItem('acertosUsuario', totalAcertos.length)
		localStorage.setItem('errosUsuario', totalErros.length)
		localStorage.setItem('dataSimulado', diaMesAno)
	}

	sessionStorage.setItem('gabaritoUsuario', '')
}

console.log("Gabarito usuario: "+sessionStorage.getItem('gabaritoUsuario'))
console.log("Acertos: "+localStorage.getItem('acertosUsuario'))
console.log("Erros: "+localStorage.getItem('errosUsuario'))
console.log("Data(s): "+localStorage.getItem('dataSimulado'))

/* Fazer uma função para mostrar evolução do usuário
quando o storage for diferente de nulo e quando for, deve haver ao menos 
2 simulados realizdos. */