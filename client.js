import { mustacheRenderFunction } from './mustache/mustacheModule.mjs'
import { API_URL_EXPENSE_ADD, API_URL_EXPENSE } from './apiUrls.js'
import { subCatDropdown } from './category.js'


const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading')

//set date input to current date
document.getElementById('date').value = new Date().toISOString().slice(0, 10)

loadingElement.style.display = 'none';

getExpenseData2()

form.addEventListener('submit', (event) => {
  event.preventDefault()
  form.style.display = 'none'
  loadingElement.style.display = ''

  const formData = new FormData(form)
  const date = formData.get('date')
  // const account = formData.get('account')
  const e = document.getElementById("account");
  const account = e.options[e.selectedIndex].text;

  const amount = formData.get('amount')

  // const category = formData.get('category')
  const e1 = document.getElementById("category");
  const category = e1.options[e1.selectedIndex].text;

  // const subCategory = formData.get('subCategory')
  const e2 = document.getElementById("subCategory");
  const subCategory = e2.options[e2.selectedIndex].text;

  const notes = formData.get('notes')
  console.log('amount', amount);
  const transaction = JSON.stringify({ date, account, amount, category, subCategory, notes })
  console.log(transaction);

  fetch(API_URL_EXPENSE_ADD, {
    method: 'POST',
    body: transaction,
    headers: {
      'content-type': 'application/json',
      'auth-token': localStorage.getItem('auth-token')
    }
  }).then(response => response.json())
    .then(createdTransaction => {
      console.log(createdTransaction);
      form.reset()
      subCatDropdown() //reset subcat dropdown select
      //date picker
      document.getElementById('date').value = new Date().toISOString().slice(0, 10)
      form.style.display = ''
      // recentTransactions()
      getExpenseData2()
      loadingElement.style.display = 'none'
    })
})

async function getExpenseData2() {
  fetch(API_URL_EXPENSE, {
    headers: {
      'auth-token': localStorage.getItem('auth-token')
    }
  })
    .then((response) => {
      return response.json()
    })
    .then((res) => {
      console.log(res)
      mustacheRenderFunction(res
        , './mustache/transactionHistory.mustache', "transactions")
      loadingElement.style.display = 'none'
    })
    .catch((err) => console.log(err))
}
