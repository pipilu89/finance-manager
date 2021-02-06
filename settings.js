import { API_URL_SETTINGS_ADD } from './apiUrls.js';
import { mustacheRenderFunction2 } from './mustache/mustacheModule.mjs'
// import { getAccountsArray } from './category.js'
// import { accountsArray } from './data.js'

// const form = document.querySelector('form');
const accountForm = document.getElementById('newAccountForm');
const categoryForm = document.getElementById('newCatForm');
const subCategoryForm = document.getElementById('newSubCatForm');

//add new account
accountForm.addEventListener('submit', (event) => {
  event.preventDefault()
  //validate

  const formData = new FormData(accountForm)
  const newAccount = formData.get('newAccountInput')

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

//todo: save edited product. doesn't work anymore.
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

//categories


getCategoryList()
//delete edit accounts list. get from local or mdb?
async function getCategoryList() {
  const a = JSON.parse(localStorage.getItem('settings2'))

  await mustacheRenderFunction2(a
    , './mustache/categoryList.mustache', "categoryList")

  deleteCategory()
  deleteSubCategory()
  editProduct()
}

//delete needs what info?
//id, object address




//SETTINGS2
///--Eg of how to extract data from settings object
// const a = JSON.parse(localStorage.getItem('settings2'))

//accounts array ok
// const d = a.accounts[0].name
// const { accounts } = a
// const accArray = accounts.map(x => x.name)


//list of cats ok
// const { categories } = a //array of vategory objects
// const catArray = categories.map(x => x.name);//array of category names
// const b = JSON.parse(localStorage.getItem('settings2'))
// const recordIDtest = 2
// const index = b.categories.findIndex(item => item.id === parseInt(recordIDtest))




//subcats

// const cat = 'hostel repair'

// const catArrayIndex = catArray.indexOf(cat)//get index of required category.

// const subCatObjsArray = a.categories[catArrayIndex].subCategory //array of subcat objects
// const subCatArray = subCatObjsArray.map(x => x.name);//array of subcat names at indexof cat. ok





//test adding/deleting data from cat and sub cat

//add new category
categoryForm.addEventListener('submit', (event) => {
  event.preventDefault()
  console.log('clicked cat form submit');
  //validate

  const formData = new FormData(categoryForm)
  const newCat = formData.get('newCatInput')

  //push new account into settings object
  const newCatObj = { name: newCat, id: Date.now(), subCategory: [] }
  const a = JSON.parse(localStorage.getItem('settings2'))
  a.categories.push(newCatObj);
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
      categoryForm.reset()
      //update sub cat dropdown
      categoryDropdown()
    })
  //refresh list
  getCategoryList()
})


//event delete button. need to run after render to create eventlistners?
function deleteCategory() {
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
      const index = a.categories.findIndex(item => item.id === parseInt(recordID))
      if (index !== -1) { //check if found id.(-1 = not found)
        a.categories.splice(index, 1);
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
            getCategoryList()

          })
      } else { console.log("id not found"); }


    }
  };
  //add event listener for delete
  const elements = document.getElementsByClassName("deleteProductBtn");
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", deleteItem, false);
  }

}

//add sub cat parent cat dropdown
categoryDropdown()
function categoryDropdown() {
  const select = document.getElementById("parentCatInput");
  const categoryArray = getCategoryArray()

  for (const index in categoryArray) {
    select.options[select.options.length] = new Option(
      categoryArray[index], index);
  }
}

//todo: repeat from category.js refactor to be import.
function getCategoryArray() {
  const a = JSON.parse(localStorage.getItem('settings2'))
  const { categories } = a //array of vategory objects
  const catArray = categories.map(x => x.name);//array of category names
  return catArray
}

//add new sub cat (form submit)
subCategoryForm.addEventListener('submit', (event) => {
  event.preventDefault()
  //validate

  const formData = new FormData(subCategoryForm)
  const newSubCat = formData.get('newSubCatInput')
  const e = document.getElementById("parentCatInput");
  const parentCategory = e.options[e.selectedIndex].text;
  // console.log(parentCategory);

  //push new sub cat into settings object
  const newSubCatObj = { name: newSubCat, id: Date.now() }
  const a = JSON.parse(localStorage.getItem('settings2'))
  //get cat array where cat name = parentCategory
  const { categories } = a //array of category objects
  const catArray = categories.map(x => x.name);//array of category names
  //indexof
  const catArrayIndex = catArray.indexOf(parentCategory)//get index of required category.
  const subCatObjsArray = a.categories[catArrayIndex].subCategory //array of subcat objects
  subCatObjsArray.push(newSubCatObj);//?
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
      subCategoryForm.reset()
    })
  //refresh list
  getCategoryList()
})

//Event delete sub cat
function deleteSubCategory() {
  const deleteSubCat = function (e) {
    console.log(e.target.parentNode.parentNode.id);
    const recordID = e.target.parentNode.parentNode.id;
    const recordName = e.target.parentNode.parentNode.className;
    // console.log('recordID, recordName', recordID, recordName);
    if (confirm(`确定删掉吗? Delete ${recordName}， id：${recordID}, are you sure?`)) {
      console.log('delete subcat', recordID);
      //delete account from settings obj
      const a = JSON.parse(localStorage.getItem('settings2'))
      const { categories } = a //array of category objects

      //loop thru array if matching id get parent id
      function getIndexOfK(arr, k) {
        for (var i = 0; i < arr.length; i++) {
          var index = arr[i].subCategory.findIndex(item => item.id === parseInt(k));
          if (index > -1) {
            return [i, index];
          }
        }
      }
      const [catArrayIndex, index] = getIndexOfK(categories, recordID)

      if (index !== -1) { //check if found id.(-1 = not found)
        a.categories[catArrayIndex].subCategory.splice(index, 1);//
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
            getCategoryList()

          })
      } else { console.log("id not found"); }


    }
  };
  //add event listener for delete
  const elements = document.getElementsByClassName("deleteSubCatBtn");
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", deleteSubCat, false);
  }

}