var home=document.getElementById('home');
var prof=document.getElementById('profesori');
var galerie=document.getElementById('galerie');
var inscriere=document.getElementById('inscriere');
var fb=document.getElementById('facebook');

function change1()
{
home.href = "index.html";
}

function change2()
{
prof.href = "profesori.html";
}

function change3()
{
galerie.href = "galerie.html";
}

function change4()
{
inscriere.href = "contact.html";
}

function change5()
{
fb.href = "https://www.facebook.com/C.N.Nichita.Stanescu.Ploiesti"
fn.target ="_blank" 
fb.rel ="noopener noreferrer";
}


home.addEventListener('click', change1);
prof.addEventListener('click', change2);
galerie.addEventListener('click', change3);
inscriere.addEventListener('click', change4);
fb.addEventListener('click',change5);