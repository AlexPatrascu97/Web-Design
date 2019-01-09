const list = document.getElementById('list');
const formName = document.getElementById("form-control-name");
const formEmail = document.getElementById("form-control-email");
const formCnp = document.getElementById("form-control-cnp");
const addButton = document.getElementById('addButton');
let updateButton = document.getElementById('updateButton');
let deleteButton = document.getElementById('deleteButton');
let backButton = document.getElementById('backButton');
const formName1 = document.getElementById("form-control-name1");
const formEmail1 = document.getElementById("form-control-email1");
const formCnp1 = document.getElementById("form-control-cnp1");
formName1.style.visibility="hidden";
formEmail1.style.visibility="hidden";
formCnp1.style.visibility="hidden";
updateButton.style.visibility="hidden";
deleteButton.style.visibility="hidden";
backButton.style.visibility="hidden";
let idx = 0;



function back(){
    formName1.style.visibility="hidden";
    formEmail1.style.visibility="hidden";
    formCnp1.style.visibility="hidden";
    updateButton.style.visibility="hidden";
    deleteButton.style.visibility="hidden";
    backButton.style.visibility="hidden";
    addButton.disabled = false;
    formName.disabled = false;
    formEmail.disabled = false;
    formCnp.disabled = false;



}



function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function validateCnp(cnp) {
    var re = /^((?!(0))[0-9]{13})$/;
    return re.test(String(cnp).toLowerCase());
}
function validateName(name) {
    var re =  /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
    return re.test(String(name).toLowerCase());
}

function getPersons() {
    fetch('http://localhost:3001/persoane')
        .then(function (response) {
            
            response.json().then(function (persons) {
                appendToDOM(persons);
            });
        });
        
};

 
function postPersons() {
    
  
    const postObject = {
        name: formName.value,
        Mail: formEmail.value,
        CNP: formCnp.value
    }
    if(validateName(formName.value)==0){
        alert("bad name format");
        return;
       
    
    }
   if(validateEmail(formEmail.value)==0){
       alert("bad email format");
       return;
      

   }
   if(validateCnp(formCnp.value)==0){
    alert("bad cnp format");
    return;
   

}

  

    fetch('http://localhost:3001/persoane', {
        method: 'post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(postObject)
    }).then(function () {
        
        getPersons();
        
        resetForm();
        
    });
    
    formName1.style.visibility="visible";
    formEmail1.style.visibility="visible";
    formCnp1.style.visibility="visible";
    updateButton.style.visibility="visible";
    deleteButton.style.visibility="visible";
    addButton.disabled = true;
    formName.disabled = true;
    formEmail.disabled = true;
    formCnp.disabled = true;

    formName1.value = formName.value;
    formEmail1.value = formEmail.value;
    formCnp1.value = formCnp.value;
    backButton.style.visibility="visible";
}


function deletePerson() {
    
    console.log(idx);
    fetch(`http://localhost:3001/persoane/`+idx , {
        method: 'DELETE',
    }).then(function () {
        
        getPersons();
        
    });
    
    formName1.style.visibility="hidden";
    formEmail1.style.visibility="hidden";
    formCnp1.style.visibility="hidden";
    updateButton.style.visibility="hidden";
    deleteButton.style.visibility="hidden";
    addButton.disabled = false;
    formName.disabled = false;
    formEmail.disabled = false;
    formCnp.disabled = false;
    backButton.style.visibility="hidden";
}


function updatePerson(id) {
    
    const putObject = {
        name: formName1.value,
        Mail: formEmail1.value,
        CNP: formCnp1.value
    }
    if(validateName(formName1.value)==0){
        alert("bad name format");
        return;
       
    
    }
   if(validateEmail(formEmail1.value)==0){
       alert("bad email format");
       return;
      

   }
   if(validateCnp(formCnp1.value)==0){
    alert("bad cnp format");
    return;
   

}
    
    fetch(`http://localhost:3001/persoane/`+idx, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(putObject)
    }).then(function () {
        
        getPersons();
        backButton.style.visibility="visible";

        backButton.style.visibility="visible";
        
       
        
    });
}



function appendToDOM(persons) {
    
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    
    for (let i = 0; i < persons.length; i++) {
       
       
        
        let name = document.createElement('span');
        name.innerText = persons[i].name;

        let mail = document.createElement('span');
        mail.innerText = persons[i].Mail;

        let cnp = document.createElement('span');
        cnp.innerText = persons[i].CNP;

         
       

        
        let container = document.createElement('div');
        
       
        container.appendChild(name);
        container.appendChild(mail);
        container.appendChild(cnp);

      

        
        list.appendChild(container);
        idx=(persons[persons.length-1].id);
    }
}


function resetForm() {
    formName.value = '';
    formEmail.value = '';
    formCnp.value = '';
}






addButton.addEventListener('click', postPersons);
deleteButton.addEventListener('click', deletePerson);
updateButton.addEventListener('click',updatePerson);
backButton.addEventListener('click',back)



getPersons();