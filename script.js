let $form = document.querySelector("form");
let $showUserBtn = document.querySelector("#button");
let $list = document.querySelector("#list");
let $sort = document.querySelector("#sort");
let $search = document.querySelector("#search");
let $searchTxtBox = document.querySelector("#searchText");

let person = {};
let listOfUsers = [];

$form.submit.addEventListener("click", createUser);
$showUserBtn.addEventListener("click", showUsers);
$sort.addEventListener("click", listSort);
$search.addEventListener("click", s);

function createUser(e) {
  e.preventDefault();
  person.name = $form.name.value;
  person.phone = $form.phone.value;
  person.email = $form.email.value;
  // FIXME: fixed losing old data
  if (localStorage.getItem("list") != null) {
    listOfUsers = getData("list");
  }
  // end
  listOfUsers.push(person);
  person = {};
  $form.reset();
  dataToJSON(listOfUsers);
}
function dataToJSON(data) {
  let str = JSON.stringify(data);
  sendData(str);
}
function sendData(dataJSON) {
  localStorage.setItem("list", dataJSON);
}
function getData(key) {
  let data = localStorage.getItem(key);
  return JSONToData(data);
}
function JSONToData(json) {
  return JSON.parse(json);
}
function showUsers(a = false) {
  // FIXME: fixed doublicating data when print;
  $list.innerHTML = "";
  // end
  let data
  if (a == false) {
    data = getData("list");
  } else {
    data = a;
  }
  data.forEach((element) => {
    $list.insertAdjacentHTML(
      "afterbegin",
      `
    <div class="user">
    <h1>${element.name}</h1>
    <h2>${element.phone}</h2>
    <br>
    </div>
    
    `
    );
  });
}

// TODO: search and sort;
function compare(a, b) {
  if (a.name > b.name) {
    return 1;
  }
  if (a.name < b.name) {
    return -1;
  }
  return 0;
}
function listSort() {
  let x = getData("list");
  x.sort(compare);
  dataToJSON(x);
}

function s() {
  let x = $searchTxtBox.value;
  let data = getData("list");
  let flag = false;
  let list = [];
  data.forEach((element, index) => {
    if (x == element.name) {
      flag = true;
      // console.log(element, index);
      list.push(element);
    }
  });
  if (flag == false) {
    alert("no such element");
  }else{
    showUsers(list)
  }
}
//end

// // let inputs = document.querySelectorAll('input')
// let submit = document.querySelector('#submit')
// let userName = document.querySelector('#name')
// let userPhone = document.querySelector('#phone')

// let person = {}
// let listOfUsers = []
// submit.addEventListener('click', function(e){
//     e.preventDefault()
//     person.name = userName.value
//     person.phone = userPhone.value
//     listOfUsers.push(person)
//     person = {}
// })

// let inputs = document.querySelectorAll("input");
// let buttons = document.querySelectorAll("button");
// let result = document.querySelector("h1");

// buttons[0].addEventListener('click',function(){
//     result.textcontent = Number(inputs[0].value)+Number(inputs[1].value)

// })
// buttons[1].addEventListener('click',function(){
//     result.textcontent = Number(inputs[0].value)- Number(inputs[1].value)

// })
// buttons[2].addEventListener('click',function(){
//     result.textcontent = Number(inputs[0].value) *  Number(inputs[1].value)

// })
// buttons[3].addEventListener('click',function(){
//     result.textcontent = Number(inputs[0].value) / Number(inputs[1].value)

// })

// // buttons.forEach(function (elem) {
// //   elem.addEventListener("click", function () {
// //     if (elem.textContent == "+") {
// //       result.textcontent = Number(inputs[0].value) + Number(inputs[1].value);
// //     } else if (elem.textContent == "-") {
// //       result.textcontent = Number(inputs[0].value) - Number(inputs[1].value);
// //     } else if (elem.textContent == "*") {
// //       result.textcontent = Number(inputs[0].value) * Number(inputs[1].value);
// //     } else if (elem.textContent == "/") {
// //       result.textcontent = Number(inputs[0].value) / Number(inputs[1].value);
// //     }
// //   });
// // });
