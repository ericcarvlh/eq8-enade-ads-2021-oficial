# Dicionário de funções

## Corrigir 

```function confereRespostas()``` -> Antes de conferir, ele realiza uma verificação para ver se há, ao menos, uma alternativa selecionada, se houver, ele verifica se alternativa é correta ou incorreta.

```function desativaInputRadio()``` -> Utilizada para desativar a possibilidade de selecionar as opções que se encontram em cada questão, exemplo de utilização: quando o usuário seleciona alguma opção e logo em seguida ele pressiona o botão **CORRIGIR**.

```function verificaPagCorrigida()``` -> Verifica se a página foi corrigida anteriormente, se sim, ele chama a função ```function desativaInputRadio()``` que vai desativar a possibilidade de selecionar outra alternativa.

```function alternativaSelecionada()``` -> Verifica a alternativa selecionada pelo usuário e a retorna para ser salva em uma variável

```function conteudoAlternativaSelecionada(alternativa)``` -> Atribui a variável `altCorretaTexto` o conteúdo da alternativa que o usuário selecionou e também retorna.

## Contar

```function alternativaSelecionada()``` -> Com base no ID da página, é feito uma busca para 
ver qual a alternativa selecionada.

```function salvaResultadoSimulado()``` -> Quando o botão 'Finalizar' for pressionado, este método é chamado e este por sua vez, é responsável por salvar todos os dados da página `resultado.html`, `resultadoEstatisticas.html` e `evolucaoUsuario.html`.

```function salvaDadosEvolucao()``` -> Esta função é utilizada na ```function salvaResultadoSimulado()``` e serve para reduzir a quantidade de linhas, quanto a sua ação, ela salva os dados no `localStorage`, convertendo o `localStorage` recebido para vetor, salvando o valor no vetor e depois transformando para `string` para logo em seguida ser colocado no `localStorage`.

## Resultado 

```function montaGrafico()``` -> Monta o gráfico, com 2 barras e um título principal.

```function imprimirResultado()``` -> Quando o botão 'Baixar resultado' for pressionado, a página vai ser basicamente imprimida, para isso, há um estilo (CSS) específico.

```function atribuiInformacoesInteiras()``` -> Coloca a quantidade total de acertos, erros, perguntas não respondidas e perguntas respondidas. Além disso, também realiza um cálculo para obter os respectivos valores em porcentagem, com a utilização do `Math.round()`, que arredonda o número decimal para um inteiro mais próximo, se os 2 primeiros números da casa decimal forem maior ou igual a metade ele arredonda, caso contrário ele não arredonda. Confira: [Exemplo `Math.round()`](https://jsfiddle.net/ericcarvlh/g132tc9u/2/).

```function atribuiValorStorage()``` -> Utilizada para reduzir a quanidade de código para realizar uma tarefa, serve para pegar os dados do `localStorage`, convertê-lo para vetor, pegar o último valor do vetor e retorná-lo para uma variável.

## Resultado-estatisticas 

```function montaGraficoEstatistica()``` ->  Responsável por criar os gráficos que se encontram na página de estatpisticas gerais, com um título principal p/ cada pergunta, descrição dos respectivos itens no eixo X e Y, subtítulo e cores padrões para as respostas erradas e certas.

```function criaGabaritoUsuario()``` -> Cria uma área (antes dos gráficos) que mostra as perguntas certas e erradas do usuário, é válido ressaltar que as perguntas não respondidas são consideras como erradas.

```function imprimirEstatisticas()``` -> responsável por transformar a página em PDF para o usuário baixar, literalmente imprimir a página, tudo isso quando o botão 'Baixar estatisticas' for pressionado. 