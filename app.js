const form=document.getElementById("todo-form");
const todoTitle=document.getElementById("todo");
const lists=document.querySelector(".list-group");
const firstCardBody=document.querySelectorAll(".card-body")[0];
const secondCardBody=document.querySelectorAll(".card-body")[1];
const todoSearch=document.getElementById("filter");
const clearAllTodos=document.getElementById("clear-todos");
form.addEventListener("submit",addTodos);
document.addEventListener("DOMContentLoaded",loadTodoUI);
secondCardBody.addEventListener("click",removeTodo);
clearAllTodos.addEventListener("click",clearAll);
todoSearch.addEventListener("keyup",filterTodos);
function addTodos(e){
  const newTodo=todoTitle.value.trim();
if(newTodo==null||newTodo==""){
ShowAlert("danger","Enter value please!");

}else{
    //add todo UI
    addTodosUI(newTodo);
    //add todo STORAGE
    addTodosStorage(newTodo);
    //show alert
    ShowAlert("success","Successful");
 
}
removeText();
e.preventDefault();
}

function addTodosUI(newTodo){
  /*
   <li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>

                        </li>
  */
 const listitem=document.createElement("li");
 listitem.className="list-group-item d-flex justify-content-between";

 const a=document.createElement("a");
 a.className="delete-item";
 a.href="#";
 a.innerHTML="   <i class ='fa fa-remove'></i>";
listitem.appendChild(document.createTextNode(newTodo));
listitem.appendChild(a)
lists.appendChild(listitem);
}


function ShowAlert(type,message){
  /*<div class="alert alert-primary" role="alert">
  A simple primary alert—check it out!
</div> */
const div=document.createElement("div");
div.className=`alert alert-${type}`;
div.style.position="absolute"

div.textContent=message;
firstCardBody.appendChild(div);
setTimeout(function(){
  div.remove();
},500);


}
function removeText(){
  todoTitle.value="";
}
function addTodosStorage(newTodo){
  
  let todos=checkStorage();
  todos.push(newTodo);
  localStorage.setItem("todos",JSON.stringify(todos));

}
function checkStorage(){
  let todos;
  if(localStorage.getItem("todos")==null){
    todos=[];
  }else{
    todos=JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}
function loadTodoUI(){
  let todos=checkStorage();
  todos.forEach(function(todo){
    addTodosUI(todo);
  });
}
function removeTodo(e){

if(e.target.className=="fa fa-remove"){

let target=e.target.parentElement.parentElement;
target.remove();
clearTodos(target.textContent);
ShowAlert("success","Successful");
}
}

function clearTodos(deleteTodo) {
  let todos = checkStorage();

  // DeleteTodo'yu diziden sil
  todos.splice(todos.indexOf(deleteTodo), 1);

  // Değişiklikleri localStorage'a kaydet
  localStorage.setItem("todos", JSON.stringify(todos));
}
function clearAll(e){
  clearAllUI();
  clearAllStorage();
}
function  clearAllStorage()
{
 
  let todos=checkStorage();
  todos=[];
  localStorage.setItem("todos",JSON.stringify(todos));
}
function clearAllUI(){
if(lists.firstElementChild===null){
  ShowAlert("danger","not function")
}else{
  while(lists.firstElementChild!=null){
    lists.removeChild(lists.firstElementChild);
  }
  ShowAlert("success","Successful");
}
}
/*function filterTodos(e){
const filtervalue=e.target.value.toLowerCase();
const listitems=document.querySelector(".list-group-item");
listitems.forEach(function(listitem){
  const text=listitem.textContent.toLowerCase();
  if(text.indexOf(filtervalue)===-1){

    listitem.setAttribute("style","display:none!import");
  }else{
listitem.setAttribute("style,","display:block");
  }
});
}*/
function filterTodos(e){
  const filtervalue=e.target.value.toLowerCase();
  const listitems=document.querySelectorAll(".list-group-item");
  listitems.forEach(function(listitem){
    const text=listitem.textContent.toLowerCase();
    if(text.indexOf(filtervalue)===-1){
      listitem.setAttribute("style","display:none !important");
    }else{
      listitem.setAttribute("style","display:block");
    }
  });
}





