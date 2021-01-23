import { categories } from './data.js'
import { API_URL_ACCOUNT_GET } from './apiUrls.js'

run()
async function run() {
  // let accounts;
  getAccountsFromMdb()
  categoryDropdown()
  subCatDropdown()
  //eventlistener for when first selection is made
  // document.getElementById("category").addEventListener("click", subCatDropdown);
  // document.getElementById("category").addEventListener("touchstart", subCatDropdown);
  document.getElementById("category").addEventListener("change", subCatDropdown);

}

function categoryDropdown() {
  //destructure
  const select = document.getElementById("category");
  for (const { category } of categories) {
    console.log(category);
    select.options[select.options.length] = new Option(category);
  }
}

function subCatDropdown() {
  //get value of selected option
  const e = document.getElementById("category");
  const selectedCat = e.options[e.selectedIndex].text;
  console.log("cat", selectedCat);

  //destructure. filter or map
  const selectedCatObj = categories.filter(categories => categories.category === selectedCat)[0]
  console.log(selectedCatObj);

  const { subCategory } = selectedCatObj
  console.log("subCategory", subCategory);

  const subCatSelect = document.getElementById("subCategory");

  //clear old options
  const length = subCatSelect.options.length;
  for (let i = length - 1; i >= 0; i--) {
    subCatSelect.options[i] = null;
  }
  //write new options
  for (const index in subCategory) {
    console.log(subCategory[index]);
    subCatSelect.options[subCatSelect.options.length] = new Option(
      subCategory[index],
      index
    );
  }
}

function accountDropdown() {
  const accountSelect = document.getElementById("account");
  //write new options
  // const { accounts } = accountsObj
  const accounts = JSON.parse(localStorage.getItem('accounts'))

  // console.log(accounts);
  for (const index in accounts) {
    // console.log(accounts[index]);
    accountSelect.options[accountSelect.options.length] = new Option(
      accounts[index],
      index
    );
  }
}

//get initial account data
async function getAccountsFromMdb() {
  fetch(API_URL_ACCOUNT_GET, {
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
      const { accounts } = res[0]
      localStorage.setItem("accounts", JSON.stringify(accounts));
      //refresh dropdown select
      accountDropdown()
    })
    .catch((err) => {
      console.log(err)
      accountDropdown()
    })
}