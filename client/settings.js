import { API_URL_ACCOUNT_ADD } from './apiUrls.js'
// import { accountsObj as accObj } from './category.js'

// const form = document.querySelector('form');
const accountForm = document.getElementById('newAccountForm');

accountForm.addEventListener('submit', (event) => {
  event.preventDefault()
  // accountForm.style.display = 'none'
  // loadingElement.style.display = ''

  const formData = new FormData(accountForm)
  const account = formData.get('newAccountInput')

  //create new account object by pushing new account into old account array. Then send new obj.
  const newAccount = JSON.stringify({ account })
  console.log(newAccount);

  fetch(API_URL_ACCOUNT_ADD, {
    method: 'POST',
    body: newAccount,
    headers: {
      'content-type': 'application/json',
      'auth-token': localStorage.getItem('auth-token')
    }
  }).then(response => response.json())
    .then(createdTransaction => {
      console.log(createdTransaction);
      form.reset()
      form.style.display = ''
      // // displayAddedAccount()
      // getExpenseData2()
      // loadingElement.style.display = 'none'
    })
})