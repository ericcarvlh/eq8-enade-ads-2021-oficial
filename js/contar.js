var altCorreta = ''
var idPagina
var perguntasRespondidas

/* Armazenando a alternativa correta. */
altCorreta = document.getElementById('alt-correta').value
/* Armazenando o ID da página (Questão). */
idPagina = document.querySelector('Body').id

/* 
    Verificando a existência de uma sessão
    para salvar as respostas do usuário. 
    Se existir...
*/
if(sessionStorage.getItem('gabaritoUsuario')){
    /* Armazenando o gabarito do usuário em uma variável. */
    perguntasRespondidas = sessionStorage.getItem('gabaritoUsuario')
    

}
/* 
    Senão, criamos um sessionStorage 
    para armazenamos os dados.
*/
else {
    sessionStorage.setItem('gabaritoUsuario', '')
    perguntasRespondidas = ''
}