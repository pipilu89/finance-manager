//populate account and category dropdown selects. runs when open home page
// import { categories } from './data.js'
import { API_URL_SETTINGS_GET } from './apiUrls.js'

run()
async function run() {

  getSettingsFromMdb()
  accountDropdown()
  categoryDropdown()
  subCatDropdown()
  //eventlistener for when first selection is made
  // document.getElementById("category").addEventListener("click", subCatDropdown); //click doesn't work properly with mobile. "change" seems best event.
  // document.getElementById("category").addEventListener("touchstart", subCatDropdown);
  document.getElementById("category").addEventListener("change", subCatDropdown);

}

function categoryDropdown() {
  const select = document.getElementById("category");
  select.length = 0;
  const categoryArray = getCategoryArray()

  for (const index in categoryArray) {
    select.options[select.options.length] = new Option(
      categoryArray[index], index);
  }
}

function subCatDropdown() {
  //get value of selected option
  const e = document.getElementById("category");
  const selectedCat = e.options[e.selectedIndex].text;
  // console.log("selectedCat", selectedCat);
  // console.log('categories', categories);

  const subCategoryArray = getSubCategoryArray(selectedCat)
  const subCatSelect = document.getElementById("subCategory");
  //clear old options
  subCatSelect.length = 0;
  // const length = subCatSelect.options.length;
  // for (let i = length - 1; i >= 0; i--) {
  //   subCatSelect.options[i] = null;
  // }
  //write new options
  for (const index in subCategoryArray) {
    // console.log(subCategory[index]);
    subCatSelect.options[subCatSelect.options.length] = new Option(
      subCategoryArray[index],
      index
    );
  }
}

function accountDropdown() {
  const accountSelect = document.getElementById("account");
  accountSelect.length = 0;
  //write new options from settings obj
  const accArray = getAccountsArray()

  for (const index in accArray) {
    accountSelect.options[accountSelect.options.length] = new Option(
      accArray[index],
      index
    );
  }
}

//get initial account data
async function getSettingsFromMdb() {
  console.log('getting accounts from mdb...');
  fetch(API_URL_SETTINGS_GET, {
    headers: {
      'auth-token': localStorage.getItem('auth-token')
    }
  })
    .then((response) => {
      return response.json()
    })
    .then((res) => {
      // console.log(res[0])
      //store accounts
      // const { accounts } = res[0]
      localStorage.setItem("settings2", JSON.stringify(res[0]));


      //refresh dropdown select
      accountDropdown()
      categoryDropdown()
      subCatDropdown()
      console.log('settings retrieve success');
    })
    .catch((err) => {
      console.log('error getting settings from mdb: ', err)
      accountDropdown()
      categoryDropdown()
      subCatDropdown()
    })
}


// get settings account, category and subcat functions
function getAccountsArray() {
  const a = JSON.parse(localStorage.getItem('settings2'))
  const { accounts } = a
  const accArray = accounts.map(x => x.name)
  return accArray
}

function getCategoryArray() {
  const a = JSON.parse(localStorage.getItem('settings2'))
  const { categories } = a //array of vategory objects
  const catArray = categories.map(x => x.name);//array of category names
  return catArray
}

//params: category from which to retrieve subcat
function getSubCategoryArray(category) {
  const a = JSON.parse(localStorage.getItem('settings2'))
  // const category = 'hostel repair'
  const { categories } = a //array of category objects
  const catArray = categories.map(x => x.name);//array of category names
  //indexof
  const catArrayIndex = catArray.indexOf(category)//get index of required category.
  // const b = a.categories[0].subCategory[0]
  const subCatObjsArray = a.categories[catArrayIndex].subCategory //array of subcat objects

  //if no subcats return []. if prop doesn't exist
  if (subCatObjsArray == undefined) {
    return []
  }
  const subCatArray = subCatObjsArray.map(x => x.name);//array of subcat names at indexof cat. ok
  return subCatArray
}