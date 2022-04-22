google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawBasic);

function drawBasic() {

    var data = google.visualization.arrayToDataTable([
        ['Questão', 'Seleção em (%)', { role: 'annotation' }],
        ['A', 8.1, 'Alternativa A'],
        ['B', 3.7, 'Alternativa B'],
        ['C', 2.9, 'Alternativa C'],
        ['D', 20.9, 'Alternativa D'],
        ['E', 15.3, 'Alternativa E'],
        ['SI', 19.3, 'Alternativa em branco']
    ]);

    var options = {
        title: 'Distribuição de seleção por alternativa',
        chartArea: {
            width: '25%'
        },
        hAxis: {
            title: 'Distribuição de seleção (%)',
            minValue: 0
        },
        vAxis: {
            title: 'Alternativas'
        }
    };

    var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}