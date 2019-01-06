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
// fetch the dogs list
function getPersons() {
    fetch('http://localhost:3001/persoane')
        .then(function (response) {
            
            response.json().then(function (persons) {
                appendToDOM(persons);
            });
        });
        
};

// post 
function postPersons() {
    
    // creat post object
    const postObject = {
        name: formName.value,
        Mail: formEmail.value,
        CNP: formCnp.value
    }
    // post 
    fetch('http://localhost:3001/persoane', {
        method: 'post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(postObject)
    }).then(function () {
        // Get the new persons list
        getPersons();
        // Reset Form
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

// delete 
function deletePerson() {
    // delete 
    console.log(idx);
    fetch(`http://localhost:3001/persoane/`+idx , {
        method: 'DELETE',
    }).then(function () {
        // Get the new  list
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

// update 
function updatePerson(id) {
    // creat put object
    const putObject = {
        name: formName1.value,
        Mail: formEmail1.value,
        CNP: formCnp1.value
    }
    // update 
    fetch(`http://localhost:3001/persoane/`+idx, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(putObject)
    }).then(function () {
        // Get the new 
        getPersons();
        backButton.style.visibility="visible";

        backButton.style.visibility="visible";
        
       
        
    });
}




// copy edited dog information to form and add event listener on update button
function editPerson(person) {
    // copy dog information to form
    formName.value = person.name;
    formEmail.value = person.Mail;
    formCnp.value = person.CNP
    
    
    // disable add button
    addButton.disabled = true;

    // clear all events update button events
    clearUpdateButtonEvents();

    // enable and add event on update button
    updateButton.disabled = false;
    updateButton.addEventListener('click', function () {
        updatePerson(dog.id)
    });

}

// Create and append img and name DOM tags
function appendToDOM(persons) {
    // remove persons list if exist
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    // create and append tags
    for (let i = 0; i < persons.length; i++) {
       
       
        // create name obj
        let name = document.createElement('span');
        name.innerText = persons[i].name;

        let mail = document.createElement('span');
        mail.innerText = persons[i].Mail;

        let cnp = document.createElement('span');
        cnp.innerText = persons[i].CNP;

         
       

        // create a container 
        let container = document.createElement('div');
        // append elements to container
       
        container.appendChild(name);
        container.appendChild(mail);
        container.appendChild(cnp);

      

        // append container to DOM (list div)
        list.appendChild(container);
        idx=(persons[persons.length-1].id);
    }
}

// reset form
function resetForm() {
    formName.value = '';
    formEmail.value = '';
    formCnp.value = '';
}
//  remove Update Button to clear events 
function clearUpdateButtonEvents() {
    let newUpdateButton = updateButton.cloneNode(true);
    updateButton.parentNode.replaceChild(newUpdateButton, updateButton);
    updateButton = document.getElementById('updateButton');
}



// add event listener on add button
addButton.addEventListener('click', postPersons);
deleteButton.addEventListener('click', deletePerson);
updateButton.addEventListener('click',updatePerson);
backButton.addEventListener('click',back)

// get dogs
getPersons();