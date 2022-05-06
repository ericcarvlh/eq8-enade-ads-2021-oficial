

var grafico = document.getElementById('grafico-evolucao').getContext('2d');
var dados = {
	type: "line",
	data: {
		labels: ['Jan', 'Fev', 'Mar'],
		datasets: [{
				label:'Total de acertos',
				data: [50, 450, 50],
				backgroundColor: 'rgba(0, 255, 0, 0.6)',
				borderColor: 'rgba(0, 255, 0, 1)',
			},
			{
				label:'Total de erros',
				data: [50, 350, 150],
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