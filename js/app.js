let inputBox = document.querySelector(".inputField input");
let addBtn = document.querySelector(".inputField button");
let todoList = document.querySelector(".todoList");
let clearAllBtn = document.querySelector(".footer button");
// let darkLightMood = document.querySelector(".darkMood .moonPhoto");


// darkLightMood.onclick = () => {
//   let bodyDarkLight = document.querySelector("body");
//   darkLightMood.classList.toggle(".moonPhoto");
// };

inputBox.onkeyup = () => {
  let userData = inputBox.value; // ناخد المهام من المستخدم
  if (userData.trim() != 0) {
    addBtn.classList.add("active"); // active add button
  } else {
    addBtn.classList.remove("active"); //unactive add button
  }
};
showTasks();

addBtn.onclick = () => {
  let userData = inputBox.value;
  let getLocalStorage = localStorage.getItem("New Todo");
  if (getLocalStorage == null) {
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage); // transforming json sting into js pbject
  }
  listArr.push(userData); // adding ot pushing user data
  localStorage.setItem("New Todo", JSON.stringify(listArr)); // transforming js pbject into json sting
  showTasks();
  addBtn.classList.remove("active"); //unactive add button
};

// function to add task list inside ul
function showTasks() {
  let getLocalStorage = localStorage.getItem("New Todo");
  if (getLocalStorage == null) {
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage); // transforming json sting into js pbject
  }
  if (listArr.length > 0) {
    clearAllBtn.classList.add("active");
  } else {
    clearAllBtn.classList.remove("active");
  }
  const pendingNumber = document.querySelector(".pendingNumber");
  pendingNumber.textContent = listArr.length;
  let newLiTag = "";
  listArr.forEach((element, index) => {
    newLiTag += `<li> ${element} <span onclick="deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag; // adding new li tag inside ul tag
  inputBox.value = ""; // reset input box yo blank
}

// delete task function
function deleteTask(index) {
  let getLocalStorage = localStorage.getItem("New Todo");
  listArr = JSON.parse(getLocalStorage);
  // بعد ما نحذف المهمة الخالصة منجدد الليست تبعهم
  listArr.splice(index, 1); // delete or remove the particular indexed li
  localStorage.setItem("New Todo", JSON.stringify(listArr)); // transforming js pbject into json sting
  showTasks();
}

// clear all button function
clearAllBtn.onclick = () => {
  listArr = [];
  // clearing all itlem from lical storage
  localStorage.setItem("New Todo", JSON.stringify(listArr)); // transforming js pbject into json sting
  showTasks();
};
