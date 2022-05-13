let delayed;

const dados = [
    [1, 'E', [9.1, 21.2, 18.2, 30.3, 21.2]],
    [2, 'C', [9.1, 15.2, 54.5, 9.1, 9.1]],
    [3, 'B', [24.2, 30.3, 21.2, 9.1, 15.2]],
    [4, 'B', [3, 36.4, 6.1, 45.5, 9.1]],
    [5, 'A', [63.6, 24.2, 3, 9.1, 0]],
    [6, 'A', [39.1, 34.8, 19.6, 4.3, 2.2]],
    [7, 'C', [27.3, 3, 30.3, 30.3, 9.1]],
    [8, 'D', [6.1, 21.2, 15.2, 48.5, 9.1]],
    [9, 'C', [21.2, 6.1, 48.5, 15.2, 9.1]],
    [10, 'D', [6.1, 72.7, 9.1, 9.1, 3]],
    [11, 'E', [9.1, 12.1, 15.2, 12.1, 51.5]],
    [12, 'C', [9.1, 0, 72.7, 12.1, 6.1]],
    [13, 'C', [0, 3, 87.9, 9.1, 0]],
    [14, 'E', [30.3, 12.1, 24.2, 18.2, 15.2]],
    [15, 'B', [9.1, 63.6, 6.1, 9.1, 12.1]],
    [16, 'E', [9.1, 6.1, 3, 42.4, 39.4]],
    [17, 'C', [6.1, 9.1, 39.4, 15.2, 30.3]],
    [18, 'A', [78.8, 6.1, 3, 12.1, 0]],
    [19, 'A', [66.7, 0, 6.1, 6.1, 21.2]],
    [20, 'E', [9.1, 18.2, 15.2, 30.3, 27.3]],
    [21, 'B', [21.2, 39.4, 15.2, 12.1, 12.1]],
    [22, 'A', [72.7, 21.2, 3, 3, 0]],
    [23, 'B', [33.3, 51.5, 6.1, 6.1, 3]],
    [24, 'D', [0, 0, 15.2, 57.6, 27.3]],
    [25, 'E', [2.2, 8.7, 6.5, 28.3, 54.3]],
    [26, 'E', [7, 17.4, 15.2, 13, 47.8]],
    [27, 'C', [9.1, 3, 78.8, 0, 6.1]],
    [28, 'B', [36.4, 51.5, 6.1, 6.1, 0]],
    [29, 'D', [6.1, 15.2, 24.2, 12.1, 42.4]],
    [30, 'C', [0, 0, 47.8, 2.2, 50]],
    [31, 'D', [0, 15.2, 3, 75.8, 6.1]],
    [32, 'B', [8.7, 37, 0, 21.7, 32.6]],
    [33, 'D', [21.2, 6.1, 6.1, 51.5, 15.2]],
    [34, 'A', [44, 15.2, 8.7, 13, 15.2]],
    [35, 'A', [50, 6.5, 15.2, 17.4, 10.9]]
]

// dados[0][2] -> retorna a porcentagem por cada questão.
// dados[0][1] -> retorna a letra correta.

function drawBasic(numPergunta, respValor, letra){
    
    var cores = ['rgba(200,0,0, 0.7)', 'rgba(200,0,0, 0.7)', 'rgba(200,0,0, 0.7)', 
    'rgba(200,0,0, 0.7)', 'rgba(200,0,0, 0.7)']

    switch (letra) {
        case 'A':
        cores[1] = 'rgba(0, 200, 0, 0.7)'
            break;
        case 'B':
        cores[1] = 'rgba(0, 200, 0, 0.7)'
            break;
        case 'C':
        cores[2] = 'rgba(0, 200, 0, 0.7)'
            break;
        case 'D':
        cores[3] = 'rgba(0, 200, 0, 0.7)'
            break;
        case 'E':
        cores[4] = 'rgba(0, 200, 0, 0.7)'
            break;
        default:
            break;
    }    

    let numPerg = `${numPergunta}-pergunta`

    document.write('<Div Class= "grafico" Style = "margin-top: 5%;">')
    document.write(`<H3 Class = "titulo-pergunta">${numPergunta} ° Pergunta</H3>`)
    document.write(`<Canvas Id = "${numPerg}"></Canvas>`)
    document.write(`<H3>Gabarito: ${letra}</H3>`)
    document.write('</Div>')

    let ctx = document.getElementById(numPerg);
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['A','B','C','D','E'],
            datasets: [{
                label: `Seleção de alternativa em % na ${numPergunta}° Pergunta`,
                data: respValor,
                borderColor: [
                    'rgb(0,0,0)',
                ],
                backgroundColor: [
                    cores[0],
                    cores[1],
                    cores[2],
                    cores[3],
                    cores[4]
                ]
            },]
        },
        options: {
            respoonsive: true,
            title: {
                display: true,
                fontSize: 20,
                text: `${numPergunta} ° Pergunta`,
            },
            indexAxis: 'y',
            title: {
                display: true,
                fontSize: 15,
                text: `${numPergunta} ° Pergunta`,
            },
            animation: {
                onComplete: () => {
                    delayed = true;
                },
                delay: (context) => {
                    let delay = 0;
                    if (context.type === 'data' && context.mode === 'default' && !delayed) {
                      delay = context.dataIndex * 800 + context.datasetIndex * 300;
                    }
                    return delay;
                },
            },
            scales: {
				y: {
					display: true,
					title: {
						display: true,
						text: 'Alternativas'
					}
				},
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Quantidade de seleção em porcentagem (%)'
                    }
                },
			},
        }, 
    })
}

for (let i = 0; i < dados.length; i++) {
    drawBasic(dados[i][0], dados[i][2], dados[i][1])
}