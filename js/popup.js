/*
    O array abaixo é preenchido com os nomes das páginas para serem 
    inseridos como um href na linkagem pra as respectivas páginas 
    no pop up de navegação entre as questões.
*/
const htmls = [
    'Q1AE_EQ8.html',
    'Q2AC_EQ8.html',
    'Q3AB_EQ8.html',
    'Q4AB_EQ8.html',
    'Q5AA_EQ8.html',
    'Q6AA_EQ8.html',
    'Q7AC_EQ8.html',
    'Q8AD_EQ8.html',
    'Q9AC_EQ8.html',
    'Q10AD_EQ8.html',
    'Q11AE_EQ8.html',
    'Q12AC_EQ8.html',
    'Q13AC_EQ8.html',
    'Q14AE_EQ8.html',
    'Q15AB_EQ8.html',
    'Q16AE_EQ8.html',
    'Q17AC_EQ8.html',
    'Q18AC_EQ8.html',
    'Q19AA_EQ8.html',
    'Q20AE_EQ8.html',
    'Q21AB_EQ8.html',
    'Q22AA_EQ8.html',
    'Q23AB_EQ8.html',
    'Q24AD_EQ8.html',
    'Q25AE_EQ8.html',
    'Q26AE_EQ8.html',
    'Q27AC_EQ8.html',
    'Q28AB_EQ8.html',
    'Q29AD_EQ8.html',
    'Q30AC_EQ8.html',
    'Q31AD_EQ8.html',
    'Q32AB_EQ8.html',
    'Q33AD_EQ8.html',
    'Q34AA_EQ8.html',
    'Q35AA_EQ8.html',
]

// chama o método que cria o pop up no body do HTML
criarBotoes()

// variável para pegar o ID da div que vai se sobrepor o resto da página, na qual ficará o pop up
const container = document.getElementById('container-pop');

// váriável que vai pegar a div na qual vai ficar os botões da navegação
let botoes = document.getElementsByClassName('botoes');

/*
    função que vai abrir o pop up:
    Ele pega o contaneiner do pop up, que está com uma classe com display none,
    tira a classe 'container-pop' e adiciona a classe 'mostrar' que tem um display flex 
*/
function abrirPopUp(){
    container.classList.remove('container-pop');
    container.classList.add('mostrar')
} 

/*
    Função que vai fechar o pop up:
    Ele pega o contaneiner do pop up, que está com uma classe com display flex,
    tira a classe 'mostrar' e adiciona a classe 'container-pop' que tem um display none,
    fazendo ele voltar ao normal como era antes de ser aberto
*/

function fecharPopUp(){
    container.classList.remove('mostar')
    container.classList.add('container-pop')
}

/*
    Função para criar o pop up:
    Cria uma div com id e class = 'container-pop'
    Depois cria uma div com a class = 'pop-up'
    depois cria uma div com a class = 'botoes', e dentro dessa div coloco um h3 para o titulo do pop up,
    em seguida faço um for para criar os botões da navegação, colocando como href
    os elementos que estão dentro do array htmls
    Coloco um span 'X' que quando clicado vai chamar o métoddo fecharPopUp()
*/
function criarBotoes(){
    document.write('<div class="container-pop" id="container-pop">')
    document.write('<div class="popup">')
    document.write('<div class="botoes">')
    document.write('<h3>Navegação de Questões</h3>')
    for(let i = 0;i < htmls.length;i++){
        if(i <= 8){
            document.write('<a href = "'+htmls[i]+'" class="bt-pop">0'+ (i+1) +'</a>')
        }else{
            document.write('<a href= "'+htmls[i]+'" class="bt-pop">'+ (i+1) +'</a>')
        }
    }  
    document.write('</div><span class="fechar" onClick = "fecharPopUp()" >X</span></div></div>')
}