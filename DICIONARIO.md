# Dicionário de funções

## Corrigir 

```function confereRespostas()``` -> Antes de conferir, ele realiza uma verificação para ver se há, ao menos, uma alternativa selecionada, se houver, ele verifica se alternativa é correta ou incorreta.

```function desativaInputRadio()``` -> Utilizada para desativar a possibilidade de selecionar as opções que se encontram em cada questão, exemplo de utilização: quando o usuário seleciona alguma opção e logo em seguida ele pressiona o botão **CORRIGIR**.

```function verificaPagCorrigida``` -> Verifica se a página foi corrigida anteriormente, se sim, ele chama a função ```function desativaInputRadio()``` que vai desativar a possibilidade de selecionar outra alternativa.

```function alternativaSelecionada()``` -> Verifica a alternativa selecionada pelo usuário e a retorna para ser salva em uma variável

```function conteudoAlternativaSelecionada(alternativa)``` -> Atribui a variável `altCorretaTexto` o conteúdo da alternativa que o usuário selecionou e também retorna.

