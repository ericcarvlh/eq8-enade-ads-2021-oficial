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

criarBotoes()

const container = document.getElementById('container-pop');
let botoes = document.getElementsByClassName('botoes');
function abrirPopUp(){
    container.classList.remove('container-pop');
    container.classList.add('mostrar')
} 

function fecharPopUp(){
    container.classList.remove('mostar')
    container.classList.add('container-pop')
}

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