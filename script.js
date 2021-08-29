//UI variables
const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const deleteAllBtn=document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#taskList');
let items;




eventListeners();
loadItems();


function loadItems() {
    items = getItemsFromLocalStorage();
    items.forEach(function (item) {
        createItem(item);
    });
}

function getItemsFromLocalStorage() {
    if(localStorage.getItem('items')===null){
        items=[];
    }
    else{
        items=JSON.parse(localStorage.getItem('items'));
    }
    return items;
}
function setItemsToLocalStorage(text) {
    items = getItemsFromLocalStorage();
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items));
}


function eventListeners() {
    form.addEventListener('submit',addNewItem);
    taskList.addEventListener('click',deleteItem);
    deleteAllBtn.addEventListener('click',deleteAllItems);

}
function deleteAllItems(e) {

    if (confirm('are you sure ?')) {
        // taskList.innerHTML='';
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();
    }
    e.preventDefault();
}
function deleteItem(e) {
    if(e.target.className==='fas fa-times'){
        e.target.parentElement.parentElement.remove();
        deleteItemFromLocalStorage(e.target.parentElement.parentElement.textContent);
    }

}

function deleteItemFromLocalStorage(text){
    items = getItemsFromLocalStorage();
    items.forEach(function(item,index){
        if(item === text){
            items.splice(index,1);   
        }
    });
    localStorage.setItem('items',JSON.stringify(items));
}

function createItem(text) {
    const li=document.createElement('li');
        li.className='list-group-item list-group-item-secondary';
        li.appendChild(document.createTextNode(text));
        //CREATE A
        const a = document.createElement('a');
        a.classList='delete-item float-right';
        a.setAttribute('href','#');
        a.innerHTML='<i class="fas fa-times"></i>';

        li.appendChild(a);

        //addLiToUL

        taskList.appendChild(li);
}


function addNewItem(e) {
    if(input.value===''){
        alert('Add new item!');
    }
    else{
        createItem(input.value);
        
        setItemsToLocalStorage(input.value);
        input.value='';
    }
        
    e.preventDefault();
    
}











