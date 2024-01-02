const form = document.getElementById("todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group"); 
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.getElementById("filter");
const clearButton =document.getElementById("clear-todos");

eventListeners();

function eventListeners(){
    //Tüm event listenerlar

    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",deleteAllTodos);

}





function addTodo(e){

    const newTodo=todoInput.value.trim();//trim fonksiyonu inputa girilen değerin başındaki boşlukları siler.

    if(newTodo!=""){
        addTodoUI(newTodo);
        addTodoToStorage(newTodo);
    }
    else {
        showAlert("danger","Lütfen bir TODO girin");
    }
    





    e.preventDefault();

}

function deleteTodo(e){
    let targ =e.target;

    if(e.target.className=="fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    }


}


function filterTodos(e){
    const filterValue=e.target.value.toLowerCase();
    const listItems=document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text =  listItem.textContent.toLowerCase();

        if(text.indexOf(filterValue) === -1){
            listItem.setAttribute("style","display : none !important");
        }
        else {
            listItem.setAttribute("style","display : block ");
        }


    })

}

function deleteAllTodos(){
    
    if(confirm("Tümün silmek istediğinizden emin misiniz ?")){
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }

}

function deleteTodoFromStorage(deletetodo){
    let todos=getTodosFromStorage();
    todos.forEach(function(todo,index){
        if(todo === deletetodo){
            todos.splice(index,1);
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodosToUI(){
    let todos=getTodosFromStorage();
    
    todos.forEach(function(todo){
        addTodoUI(todo);
    })

   


}

//Storage dan todoları alma
function getTodosFromStorage(){ 
    let todos;
    if(localStorage.getItem("todos")===null){
        todos = [];
    }

    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}


function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();
    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));
}

function showAlert(type,message){

    const divAlert = document.createElement("div");

    divAlert.className= `alert alert-${type}`;
    divAlert.textContent= message;

    firstCardBody.appendChild(divAlert);

    //set timeout

    setTimeout(function(){
        divAlert.remove();
    },1000);



}
function addTodoUI(newTodo){
    //Link Item oluşturma
    const listItem = document.createElement("li");
    
    //link oluşturma
    const link = document.createElement("a");
    link.href="#";
    link.className="delete-item";
    link.innerHTML= "<i class= 'fa fa-remove'></i>";

    listItem.className="list-group-item d-flex justify-content-between";

    //TextNode ekleme

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    //Todo liste yeni elemanı ekleme
    todoList.appendChild(listItem);
    
    todoInput.value="";//Elemanı ekledikten sonra input kısmını boşaltır.

}




