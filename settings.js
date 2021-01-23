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