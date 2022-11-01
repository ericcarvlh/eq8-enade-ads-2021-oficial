let show = true;

/* definndo 2 variáveis para salvar os elementos. */
const menuSection = document.querySelector(".menu-section");
const menuToggle = menuSection.querySelector(".menu-toggle");

/* Quando ocorrer um click no menuToggle, o seguinte evento vai ser iniciado: */
menuToggle.addEventListener("click", () =>{

    /* 
        Se show for true, oculta-se aquilo que excede a pagina,
        caso contrário, deixamos padrão
    */
    document.body.style.overflow = show ? "hidden" : "initial"

    /* Fazemos com que ele apareça. */
    menuSection.classList.toggle("on", show)

    /* 
        show recebe um valor diferente 
        daquele que ele possuí. 
    */
    show = !show;
});