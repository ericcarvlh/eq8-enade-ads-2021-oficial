console.log("Acertos: "+localStorage.getItem('acertosUsuario'))
console.log("Erros: "+localStorage.getItem('errosUsuario'))
console.log("Data(s): "+localStorage.getItem('dataSimulado'))

let acertos = []
let erros = []
let datas = []

if(localStorage.getItem('acertosUsuario')){
  acertos = localStorage.getItem('acertosUsuario').split(',')
  erros = localStorage.getItem('errosUsuario').split(',')
  datas = localStorage.getItem('dataSimulado').split(',')

  if(datas.length < 2){
    window.location.href = 'Resultado.html' 
  }
}

console.log("Já em array "+acertos)
console.log("Já em array "+erros)
console.log("Já em array "+datas)

var grafico = document.getElementById('grafico-evolucao').getContext('2d');
var dados = {
	type: "line",
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