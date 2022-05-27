// variável responsável por dar delay ao gráfico.
let delayed;

/* Verifica se a o usuário já realizou o simulado alguma vez. */
if(!localStorage.getItem('gabaritoUsuario')){
    /* 
        Se ele não tiver feito, então 'transportamos' ele para 
        para a página de resultado, pois nessa página é necessário
        o gabarito com pelo menos uma questão responidda.
    */
    window.location.href = 'Resultado.html'
}

/*
    O array dados, contém os dados que alimentaram os nossos gráficos.
*/
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

// Chama o método que escreve o gabarito do usuário
criaGabaritoUsuario()

/*
    A estrutura de repetição repete a função que desenha os gráficos,
    passando como prametro os dados que estão estabelecidos no array dados
*/
for (let i = 0; i < dados.length; i++) {
    montaGraficoEstatistica(dados[i][0], dados[i][2], dados[i][1], i)
}

/* Verifica se o gabaritoUsuario existe na memória, apenas para fins de boas práticas e verificaçãi. */
if(localStorage.getItem('gabaritoUsuario')){
	/* Convertendo o localStorage para vetor, p/ que assim possamos  percorre-lo. */
	let local = localStorage.getItem('gabaritoUsuario').split(",")
	/* Percorrendo o array  */
	for(let i = 0; i < local.length; i++)
		document.getElementById(`gabUsu-${local[i].split(":")[0].split("Q")[1]}`).innerHTML = `Sua resposta ${local[i].split(":")[1]}`
	for(let i = 0; i < local.length; i++){
		let index = local[i].split(":")[0].split("Q")[1]
		if(dados[index-1][1] == local[i].split(":")[1]){
			document.getElementById(`caixa-gabUso-${local[i].split(":")[0].split("Q")[1]}`).classList.remove('errou')
			document.getElementById(`caixa-gabUso-${local[i].split(":")[0].split("Q")[1]}`).classList.add('acertou')
		}
	}
}

function montaGraficoEstatistica(numPergunta, respValor, letra, i) {

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

    // Parte que coloca o gráfico no HTML
    document.write('<Div Class= "grafico" Style = "margin-top: 5%;">')
    document.write(`<H3 Class = "titulo-pergunta">${numPergunta} ° Pergunta</H3>`)
    document.write(`<Canvas Id = "${numPerg}"></Canvas>`)
    document.write(`<H4>Gabarito: ${letra}</H4>`)
	document.write(`<H4 Id = gabUsu-${numPergunta}>Sua resposta: Não respondida</H4>`)
    document.write('</Div>')

    let ctx = document.getElementById(numPerg);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['A', 'B', 'C', 'D', 'E'],
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

function criaGabaritoUsuario() {
    // Escreve uma div no HTML
    document.write('<div id = "gabarito-usuario" class="gabarito-usuario"> <h3>Suas Respostas:</h3>')

    for (let i = 0; i < dados.length; i++) {	
        /* Realiza a contagem da quantidade de vezes que passa pelo for. */
        let cont = 0;
        
		/* Se a contagem for menor que, inserimos um zero a esqueda. */
		if(cont < 9)
			document.write(`<div id = "caixa-gabUso-${dados[i][0]}" class="errou">0${dados[i][0]}</div>`) /* Monta a caixinha de questão errada */
		else if(cont >= 9) /* Caso nao for o de cima, o numero sera maior que 9 e, portanto, 'removemos' o 0 a esquerda. */
			document.write(`<div id = "caixa-gabUso-${dados[i][0]}" class="errou">${dados[i][0]}</div>`)

        // Estrutura para quando for escrita 18 quetões, pular uma linha para começar as escrever as demais
        if(cont === 18){
            document.write('<br>')
        }
		
		cont++
    }
    
    document.write('</div>')
}

/* Transforma a página em um PDF */
function imprimirEstatisticas(){
	window.print()
}