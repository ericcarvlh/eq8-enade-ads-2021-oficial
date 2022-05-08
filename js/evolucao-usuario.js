console.log("Acertos: "+localStorage.getItem('acertosUsuario'))
console.log("Erros: "+localStorage.getItem('errosUsuario'))
console.log("Data(s): "+localStorage.getItem('dataSimulado'))
console.log("Em branco: "+localStorage.getItem('perguntasNaoRespondidas'))
console.log("Tempo decorrido: "+localStorage.getItem('tempoDecorrido'))
console.log("Total respondida: "+localStorage.getItem('totalRespondida'))

let acertos = []
let erros = []
let datas = []
let naoRespondidas = []
let temposDecorridos = []
let respondidas = []
let porcentagemAcerto = []

if(localStorage.getItem('acertosUsuario')){
  acertos = localStorage.getItem('acertosUsuario').split(',')
  erros = localStorage.getItem('errosUsuario').split(',')
  datas = localStorage.getItem('dataSimulado').split(',')
  naoRespondidas = localStorage.getItem('perguntasNaoRespondidas').split(',')
  temposDecorridos = localStorage.getItem('tempoDecorrido').split(',')
  respondidas = localStorage.getItem('totalRespondida').split(',')

  for(let i = 0; i < acertos.length; i++){
    porcentagemAcerto[i] = Math.trunc((acertos[i] / 35) * 100)
  }

  if(datas.length < 2){
    window.location.href = 'Resultado.html' 
  }
}

let delayed
var grafico = document.getElementById('grafico-evolucao').getContext('2d');
var dados = {
	type: "line",
	data: {
		labels: datas,
		datasets: [{
        label:'Total de perguntas respondidas',
        data: respondidas, 
				backgroundColor: 'rgba(255, 155, 55, 0.6)',  
				borderColor: 'rgba(255, 153, 51, 1)',
      },
      {
				label:'Total de acertos',
				data: acertos,
				backgroundColor: 'rgba(0, 255, 0, 0.6)',
				borderColor: 'rgba(0, 255, 0, 1)',
			},
			{
				label:'Total de erros',
				data: erros,
				backgroundColor: 'rgba(255, 0, 0, 0.6)',
				borderColor: 'rgba(255, 0, 0, 1)',
		  },
      {
        label:'Acertos em %',
        data: porcentagemAcerto, 
				backgroundColor: 'rgba(0, 153, 0, 0.6)',
				borderColor: 'rgba(0, 153, 0, 1)',
      },
      {
        label:'Total de perguntas não respondidas',
        data: naoRespondidas, 
				backgroundColor: 'rgba(180, 180, 180, 0.6)', 
				borderColor: 'rgba(180, 180, 180, 1)',
    }]
	},
    options: {
        animation: {
            x: {
              type: 'number',
              easing: 'linear',
              duration: 1000,
              from: 0, // the point is initially skipped
              delay(ctx) {
              if (ctx.type !== 'data' || ctx.xStarted) {
                  return 0;
              }
              ctx.xStarted = true;
              return ctx.index * 500;
              }
            },
            y: {
              type: 'number',
              easing: 'linear',
              duration: 1000,
              from: 0,
              delay(ctx) {
                if (ctx.type !== 'data' || ctx.yStarted) {
                  return 0;
                }
                ctx.yStarted = true;
                return ctx.index * 500;
              }
            }
        }
    }   
}
new Chart(grafico, dados);
