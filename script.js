const addBtn=document.querySelector("#liveToastBtn");
const input=document.querySelector("#task");
const list=document.querySelector("#list");
addBtn.addEventListener("click",addTodo);

function addTodo(event){
  event.preventDefault();
  
  if(!input.value==""){
    addItem(input.value);
    addTodoToStorage(input.value);
    alert("success","Başarıyla Eklendi!");
  }
  else{
    alert("danger","Boş Bırakmayınız!");
  }
  input.value="";
}

function addItem(todo){
    const liDOM=document.createElement("li");
    liDOM.innerHTML=todo;
    list.append(liDOM);
}
function alert(object,message){
    const div=document.createElement("div");
    const alert_area=document.querySelector("#alert-a");
    div.className=`alert alert-${object} position-absolute`;
    div.textContent=message;
    alert_area.append(div);
    setTimeout(function(){
        div.remove();
      },2000);
}
function loadAllTodosToUI(){
    let todos=getTodosFromStorage();
    todos.forEach(function(todo){
        addItem(todo);
    })
  }
  loadAllTodosToUI();
function getTodosFromStorage(){
    let todos;
    if(localStorage.getItem("todos")==null){
          todos=[];
    }
    else{
      todos=JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
  }
  function addTodoToStorage(NewTodo){
    let todos=getTodosFromStorage();
    todos.push(NewTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
 }
 function deleteTodoFromStorage(deletetodo){
    let todos=getTodosFromStorage();
    todos.forEach(function(todo,index){
        if(todo==deletetodo){
        todos.splice(index,1);
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos));
 }
const clearBtns=document.querySelectorAll("#list li");
clearBtns.forEach(function(clearBtn) {
    clearBtn.addEventListener("click", function(event) {
      event.preventDefault();
      clearBtn.remove();
      deleteTodoFromStorage(clearBtn.textContent);
    });
  });