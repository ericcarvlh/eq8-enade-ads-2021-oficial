google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

var gabarito = []
var acertos = []
var erros = []

function drawChart() {

    /* Grafico de acertos e erros em porcentagem. */

    var dados = new google.visualization.DataTable();
    dados.addColumn('string', 'Acertos e erros');
    dados.addColumn('number', 'Quantidade de acertos e erros');
    dados.addRows([
        ['Erros', 11],
        ['Acertos', 24]
    ]);

    var configuracoes = {
        'title':'Acertos e erros em porcentagem', 
        'pieHole': 0.4,
        'colors': ['#e0440e', '#e6693e'],
    };

    var grafico = new google.visualization.PieChart(document.getElementById('grafico_AcertoErro_per'))
    grafico.draw(dados, configuracoes);

    /* Fim */

    /* Grafico de acertos e erros em fatia por numero inteiro. */

    configuracoes = {
        'title':'Acertos e erros em número inteiro', 
        'pieHole': 0.4,
        'pieSliceText': 'value',
        'colors': ['#e0440e', '#e6693e'],
    };   

    grafico = new google.visualization.PieChart(document.getElementById('grafico_AcertoErro_int'))
    grafico.draw(dados, configuracoes);

    /* Fim */

    /* Grafico total de questões respondidas. */

    dados = new google.visualization.DataTable();
    dados.addColumn('string', 'Perguntas preenchidas e nulas');
    dados.addColumn('number', 'Quantidade de perguntas preenchidas e nulas');
    dados.addRows([
        ['Nulas', 5],
        ['Preenchidas', 30]
    ]);

    configuracoes = {
        'title': 'Quantidade de perguntas preenchidas e nulas',
        'pieHole': 0.4,
        'pieSliceText': 'value',
        'colors': ['#e0440e', '#e6693e']
    };

    grafico = new google.visualization.PieChart(document.getElementById('grafico_PreenchidasNulas_int'));
    grafico.draw(dados, configuracoes);

    /* Fim */

}