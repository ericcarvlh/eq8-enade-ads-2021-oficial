var gabarito = []
var acertos = []
var erros = []

const total = sessionStorage.getItem('gabaritoUsuario').split(" ").length
console.log(total)

document.getElementById('total').innerHTML = total