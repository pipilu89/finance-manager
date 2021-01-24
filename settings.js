import { API_URL_ACCOUNT_ADD } from './apiUrls.js';
import { mustacheRenderFunction2 } from './mustache/mustacheModule.mjs'
// import { accountsArray } from './data.js'

// const form = document.querySelector('form');
const accountForm = document.getElementById('newAccountForm');


accountForm.addEventListener('submit', (event) => {
  event.preventDefault()
  //validate

  const formData = new FormData(accountForm)
  const newAccount = formData.get('newAccountInput')

  //create new account array by pushing new account into old account array.
  const accountsArray = JSON.parse(localStorage.getItem('accounts'))
  accountsArray.push(newAccount);
  localStorage.setItem("accounts", JSON.stringify(accountsArray));

  //--send account array as string
  fetch(API_URL_ACCOUNT_ADD, {
    method: 'POST',
    body: localStorage.getItem('accounts'),
    headers: {
      'content-type': 'application/json',
      'auth-token': localStorage.getItem('auth-token')
    }
  }).then(response => response.json())
    .then(res => {
      console.log('res from mdb: ', res);
      //reset form
      accountForm.reset()
      // accountForm.style.display = ''
    })
  //refresh list
  getAccountList()
})

getAccountList()
//delete edit accounts list. get from local or mdb?
async function getAccountList() {
  const accountsArray = JSON.parse(localStorage.getItem('accounts'))
  // console.log(accountsArray)

  await mustacheRenderFunction2(accountsArray
    , './mustache/accountsList.mustache', "accountsList")

  deleteProduct()
  editProduct()
}

//event delete button. need to run after render to create eventlistners?
function deleteProduct() {
  const deleteItem = function (e) {
    console.log(e.target.parentNode.parentNode.id);
    const recordKey = e.target.parentNode.parentNode.id;
    if (confirm(`确定删掉吗? Delete ${recordKey}, are you sure?`)) {
      console.log(recordKey);
      //delete from ls and db
      const accountsArray = JSON.parse(localStorage.getItem('accounts'))
      const filteredAry = accountsArray.filter(e => e !== recordKey)
      console.log('f arr', filteredAry);
      localStorage.setItem('accounts', JSON.stringify(filteredAry))

    }
    // delete form DB
    //--send account array as string
    fetch(API_URL_ACCOUNT_ADD, {
      method: 'POST',
      // body: JSON.stringify(accountsArray),
      body: localStorage.getItem('accounts'),
      headers: {
        'content-type': 'application/json',
        'auth-token': localStorage.getItem('auth-token')
      }
    }).then(response => response.json())
      .then(res => {
        console.log('res from mdb: ', res);
        //refresh list
        getAccountList()

      })

  };
  //add event listener for delete
  const elements = document.getElementsByClassName("deleteProductBtn");
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", deleteItem, false);
  }

}

//Event: edit product
function editProduct() {
  let recordKey;
  const editItem = function (e) {
    recordKey = e.target.parentNode.parentNode.id;
    console.log(recordKey);
    //edit from idb

    //show cancel & save btn
    document.getElementById(`${recordKey}-cancelEditProductBtn`).style.display = "block";
    document.getElementById(`${recordKey}-saveEditProductBtn`).style.display = "block";
    document.getElementById(`${recordKey}-deleteProductBtn`).style.display = "none";

    const editableElements = document.getElementsByClassName(`${recordKey}-edit`);

    for (let i = 0; i < editableElements.length; i++) {
      editableElements[i].contentEditable = true;
      editableElements[i].style.backgroundColor = '#fff';
      editableElements[i].style.color = 'gray';
    }

  };

  //add event listener for edit
  const elements = document.getElementsByClassName("editProductBtn");
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", editItem, false);
  }
  //add event listener for cancel edit
  const cancelBtnElements = document.getElementsByClassName("cancelEditProductBtn");
  for (let i = 0; i < cancelBtnElements.length; i++) {
    // document.getElementById("cancelEditProductBtn").style.display = "none";
    cancelBtnElements[i].style.display = "none";
    cancelBtnElements[i].addEventListener("click", cancelEditItem, false);
  }
  //add event listener for save edit
  const saveBtnElements = document.getElementsByClassName("saveEditProductBtn");
  for (let i = 0; i < saveBtnElements.length; i++) {
    // document.getElementById("saveEditProductBtn").style.display = "none";
    saveBtnElements[i].style.display = "none";
    saveBtnElements[i].addEventListener("click", () => { saveEditItem(recordKey) });
  }
}

function cancelEditItem() {
  console.log("cancel");
  getAccountList();
}

//save edited product
async function saveEditItem(recordKey) {
  const accountsArray = JSON.parse(localStorage.getItem('accounts'))
  const editedAccount = document.getElementById(`${recordKey}-name`).innerText;
  const filteredAry = accountsArray.filter(e => e !== recordKey)
  filteredAry.push(editedAccount)

  console.log("save:", filteredAry);
  if (confirm(`确定保存? Edit: ${recordKey}, are you sure?`)) {
    //update ls
    localStorage.setItem('accounts', JSON.stringify(filteredAry))

  }
  //--send account array as string
  fetch(API_URL_ACCOUNT_ADD, {
    method: 'POST',
    body: localStorage.getItem('accounts'),
    headers: {
      'content-type': 'application/json',
      'auth-token': localStorage.getItem('auth-token')
    }
  }).then(response => response.json())
    .then(res => {
      console.log('res from mdb: ', res);

      //refresh list
      getAccountList()
    })

}

//cateogeries


getCategoryList()
//delete edit accounts list. get from local or mdb?
async function getCategoryList() {
  const categoryArray = JSON.parse(localStorage.getItem('settings'))
  console.log(categoryArray)

  await mustacheRenderFunction2(categoryArray
    , './mustache/categoryList.mustache', "categoryList")

  deleteProduct()
  editProduct()
}

//delete needs what info?
//id, object address
const cat = 'wages'
console.log(cat);
const a = JSON.parse(localStorage.getItem('settings'))
// const b = a.categories[0].subCategory[0]
const d = a.accounts[0]
const b = a.categories[0].subCategory[0]
// const c = a.categories[2].category
const c = [a].map(x => x.categories);
const { categories } = a
const { categories: [subCategory] } = a
const { categories: [...category] } = a
const [...cat2] = category
// const { subCategory } = a
console.log("b: ", b);
console.log("c: ", c);
console.log("d: ", d);
console.log("categories: ", categories);
console.log("subCategory: ", subCategory);
console.log("category: ", category);
console.log("cat2: ", cat2);

const person = {
  name: 'John Doe',
  age: 25,
  location: {
    country: 'Canada',
    city: 'Vancouver',
    coordinates: [49.2827, -123.1207]
  }
}

// Observe how mix of object and array destructuring is being used here
// We are assigning 5 variables: name, country, city, lat, lng
const { name, location: { country, city, coordinates: [lat, lng] } } = person;

console.log(`I am ${name} from ${city}, ${country}. Latitude(${lat}), Longitude(${lng})`);