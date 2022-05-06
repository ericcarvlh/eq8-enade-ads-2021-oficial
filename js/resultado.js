const gabaritoOficial = ["Q1:E", "Q2:C", "Q3:B", "Q4:B", "Q5:A", "Q6:A", "Q7:C","Q8:D", "Q9:C", "Q10:D","Q11:E", 
"Q12:C", "Q13:C","Q14:E", "Q15:B", "Q16:E","Q17:C", "Q18:A", "Q19:A","Q20:E", "Q21:B","Q22:A", "Q23:B","Q24:D", 
"Q25:E", "Q26:E","Q27:C", "Q28:B", "Q29:D","Q30:C","Q31:D", "Q32:B", "Q33:D","Q34:A", "Q35:A", ""]
const gabaritoUsuario = sessionStorage.getItem('gabaritoUsuario').split(" ")
var totalAcertos = []
var totalErros = []
var totalRespondidas = sessionStorage.getItem('gabaritoUsuario').split(" ")
var totalNaoRespondidas = 35

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

salvaProgresso(totalAcertos, totalErros)

var mensagemAcertos = ''
var porcentagemAcerto = Math.round((totalRespondidas.length / 35) * 100)

if(porcentagemAcerto == 0){
	mensagemAcertos = 'Ops, parece que você não respondeu a nenhuma pergunta. Clique em <b>REFAZER SIMULADO</b>.'
	document.getElementById('final-simulado').innerHTML = 'Por favor, certifique-se de selecionar ao menos uma alternativa de uma questão.'
	document.getElementById('sub-t-final-simulado').innerHTML = 'Vá ao final da página e clique em <b>REFAZER SIMULADO</b>.'
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

let delayed;

var grafico = document.getElementById('acertos-erros').getContext('2d');
var dados = {
	type: "bar",
	data: {
		labels: ['Total de acertos e erros'],
		datasets: [{
				label:'Total de acertos',
				data: [totalAcertos.length],
				backgroundColor: 'rgba(0, 255, 0, 0.6)',
				borderColor: 'rgba(0, 255, 0, 1)',
			},
			{
				label:'Total de erros',
				data: [totalErros.length],
				backgroundColor: 'rgba(255, 0, 0, 0.6)',
				borderColor: 'rgba(255, 0, 0, 1)',
		}]
	},
	options: {
		responsive: true,
		plugins: {
			title: {
				display: true,
				text: 'Total de acertos e erros'
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

var grafico = document.getElementById('respondidas-e-naorespondidas').getContext('2d');
var dados = {
	type: "bar",
	data: {
		labels: ['Total de perguntas não respondidas e respondidas'],
		datasets: [{
				label: 'Total de perguntas não respondidas',
				data: [`${totalNaoRespondidas}`],
				backgroundColor:'rgba(180, 180, 180, 0.6)',
				borderColor: 'rgba(180, 180, 180, 1)'
			},
			{
				label: 'Total de perguntas respondidas',
				data: [`${totalRespondidas.length}`],
				backgroundColor:'rgba(255, 155, 55, 0.6)',
				borderColor: 'rgba(255, 153, 51, 1)'
		}]
	},
	options: {
		responsive: true,
		plugins: {
			title: {
				display: true,
				text: 'Total de perguntas não respondidas e respondidas'
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

function salvaProgresso(totalAcertos, totalErros){
	let errosUsuario = 0
	let acertosUsuario = 0

	if(localStorage.getItem('errosUsuario') && localStorage.getItem('acertosUsuario')){
		errosUsuario = localStorage.getItem('errosUsuario').split(" ")
		acertosUsuario = localStorage.getItem('acertosUsuario').split(" ")

		/**/
		errosUsuario.push(totalErros.length)
		errosUsuario.join(" ")
		localStorage.setItem('errosUsuario', errosUsuario)

		acertosUsuario.push(totalAcertos.length)
		acertosUsuario.join(" ")
		localStorage.setItem('acertosUsuario', acertosUsuario)
		/**/
	
		errosUsuario = localStorage.getItem('errosUsuario').split(" ")
		acertosUsuario = localStorage.getItem('acertosUsuario').split(" ")

		console.log(errosUsuario)
		console.log(acertosUsuario)

	}else{
		localStorage.setItem('errosUsuario', errosUsuario)
   		localStorage.setItem('acertosUsuario', acertosUsuario)
	}

	//localStorage.removeItem('errosUsuario')
	//localStorage.removeItem('acertosUsuario')

	//sessionStorage.setItem('gabaritoUsuario', '')
}

//console.log(gabaritoUsuario)


function limparStorage() {
	//salvaEvolucao(totalAcertos, totalErros))
	//sessionStorage.setItem('gabaritoUsuario', '')
}

/* Fazer uma função para reduzir a quantidade de linhas dos gráficos. */

/* Fazer uma função para mostrar o botão de evolução do funciónario
quando o storage for diferente de nulo e quando for, deve haver ao menos 
2 simulados realizdos. */