console.log("Acertos: "+localStorage.getItem('acertosUsuario'))
console.log("Erros: "+localStorage.getItem('errosUsuario'))
console.log("Data(s): "+localStorage.getItem('dataSimulado'))

let acertos = []
let erros = []
let datas = []
let porcentagemAcerto = []
 

if(localStorage.getItem('acertosUsuario')){
  acertos = localStorage.getItem('acertosUsuario').split(',')
  erros = localStorage.getItem('errosUsuario').split(',')
  datas = localStorage.getItem('dataSimulado').split(',')

  for(let i = 0; i < acertos.length; i++){
    porcentagemAcerto[i] = Math.trunc((acertos[i] / 35) * 100)
  }

  if(datas.length < 2){
    window.location.href = 'Resultado.html' 
  }
}

console.log("Já em array "+acertos)
console.log("Já em array "+erros)
console.log("Já em array "+datas)
console.log("Porcentagem: "+porcentagemAcerto)

let delayed
grafico = document.getElementById('grafico-evolucao').getContext('2d')
dados = {
  type: 'bar',
  data: {
		labels: datas,
		datasets: [{
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
				backgroundColor: 'rgba(150, 0, 0, 0.6)',
				borderColor: 'rgba(150, 0, 0, 1)',
        type: 'line'
      }]
	},
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Desempenho nos simulados'
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
          text: 'Perguntas'
        }
      },
      x:{
        display: true,
        title: {
          display: true,
          text: 'Data (Dia/Mês/Ano)'
        }
      }
    }
  },
}
new Chart(grafico, dados);
