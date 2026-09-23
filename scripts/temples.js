const currentYear = document.querySelector("#currentyear");
const navigationMain = document.querySelector('nav');
const hambutton = document.querySelector('#hamburger-button')

hambutton.addEventListener('click', function(){
    navigationMain.classList.toggle('show');
    hambutton.classList.toggle('open');
});

const today = new Date()
currentYear.textContent = today.getFullYear();

const lastModified = document.querySelector("#lastModified")
lastModified.textContent = `Last Modification: ${document.lastModified}`;