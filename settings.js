import { API_URL_SETTINGS_ADD } from './apiUrls.js';
import { mustacheRenderFunction2 } from './mustache/mustacheModule.mjs'
// import { getAccountsArray } from './category.js'
// import { accountsArray } from './data.js'

// const form = document.querySelector('form');
const accountForm = document.getElementById('newAccountForm');


accountForm.addEventListener('submit', (event) => {
  event.preventDefault()
  //validate

  const formData = new FormData(accountForm)
  const newAccount = formData.get('newAccountInput')

  //create new account array by pushing new account into old account array.
  // const accountsArray = JSON.parse(localStorage.getItem('accounts'))
  // accountsArray.push(newAccount);
  // localStorage.setItem("accounts", JSON.stringify(accountsArray));

  //push new account into settings object
  const newAccountObj = { name: newAccount, id: Date.now() }
  const a = JSON.parse(localStorage.getItem('settings2'))
  a.accounts.push(newAccountObj);
  localStorage.setItem("settings2", JSON.stringify(a));

  //--send settings object as string
  fetch(API_URL_SETTINGS_ADD, {
    method: 'POST',
    body: localStorage.getItem('settings2'),
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
  // const accountsArray = JSON.parse(localStorage.getItem('accounts'))
  const a = JSON.parse(localStorage.getItem('settings2'))
  const accountsArray = a.accounts
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
    const recordID = e.target.parentNode.parentNode.id;
    const recordName = e.target.parentNode.parentNode.className;
    // console.log('recordID, recordName', recordID, recordName);
    if (confirm(`确定删掉吗? Delete ${recordName}， id：${recordID}, are you sure?`)) {
      // console.log(recordID);
      //delete account from settings obj
      const a = JSON.parse(localStorage.getItem('settings2'))

      //indexof account to delete
      const index = a.accounts.findIndex(item => item.id === parseInt(recordID))
      a.accounts.splice(index, 1);
      localStorage.setItem("settings2", JSON.stringify(a));

      // delete form DB
      //--send account array as string
      fetch(API_URL_SETTINGS_ADD, {
        method: 'POST',
        // body: JSON.stringify(accountsArray),
        body: localStorage.getItem('settings2'),
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
  // console.log(categoryArray)

  await mustacheRenderFunction2(categoryArray
    , './mustache/categoryList.mustache', "categoryList")

  deleteProduct()
  editProduct()
}

//delete needs what info?
//id, object address




//SETTINGS2
///--Eg of how to extract data from settings object
const a = JSON.parse(localStorage.getItem('settings2'))

//accounts array ok
const d = a.accounts[0].name
const { accounts } = a
const accArray = accounts.map(x => x.name)
// console.log("d: ", d);
// console.log('accounts array', accounts);
// console.log('accArray', accArray);

//list of cats ok
const { categories } = a //array of vategory objects
const catArray = categories.map(x => x.name);//array of category names
// console.log("categories: ", categories);
// console.log("catArray: ", catArray);

//subcats
// const cat = 'hostel supplies'
const cat = 'hostel repair'
// console.log(cat);
//indexof
const catArrayIndex = catArray.indexOf(cat)//get index of required category.
// const b = a.categories[0].subCategory[0]
const subCatObjsArray = a.categories[catArrayIndex].subCategory //array of subcat objects
const subCatArray = subCatObjsArray.map(x => x.name);//array of subcat names at indexof cat. ok
// console.log("b: ", b);
// console.log('indexof', catArrayIndex);
// console.log("subCatObjsArray: ", subCatObjsArray);
// console.log("subCatArray: ", subCatArray);


// fix to make exports. duplicated in caegory and settings
// get settings account, category and subcat functions
function getAccountsArray() {
  const a = JSON.parse(localStorage.getItem('settings2'))
  const { accounts } = a
  const accArray = accounts.map(x => x.name)
  return accArray
}