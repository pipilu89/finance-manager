import { mustacheRenderFunction } from './mustache/mustacheModule.mjs'
import { login } from './login.js'
import { API_URL_ELEC, API_URL_POS, API_URL_EXPENSE } from './apiUrls.js'

login()

document.getElementById('loading').style.display = 'none';

export async function getElecData() {
  fetch(API_URL_ELEC, {
    headers: {
      'auth-token': localStorage.getItem('auth-token')
    }
  })
    .then((response) => {
      return response.json()
    })
    .then(electricity => {
      console.log(electricity);
      // electricity.reverse()

      electricity.forEach(element => {
        element.spread_kwh = element.spread_kwh.toFixed(1)
        element.time = element.time.slice(0, 10)

      });
      document.getElementById('loading').style.display = 'none'
      mustacheRenderFunction(electricity
        , './mustache/electricityHistory.mustache', "electricity")
    })
    .catch((err) => console.log(err))
}

document.getElementById('elec').addEventListener('click', () => {
  getElecData()
})


//pos history
document.getElementById('pos').addEventListener('click', async () => {
  await getPosData()
})

async function getPosData() {
  fetch(API_URL_POS, {
    headers: {
      'auth-token': localStorage.getItem('auth-token')
    }
  }).then((response) => {
    return response.json()
  })
    .then((res) => {
      console.log(res)
      document.getElementById('loading').style.display = 'none'
      mustacheRenderFunction(res
        , './mustache/posHistory.mustache', "electricity")
    })
    .catch((err) => console.log(err))
}

//expense history
document.getElementById('expense').addEventListener('click', async () => {
  await getExpenseData()
})

async function getExpenseData() {
  fetch(API_URL_EXPENSE, {
    headers: {
      'auth-token': localStorage.getItem('auth-token')
    }
  }).then((response) => {
    return response.json()
  })
    .then((res) => {
      console.log(res)
      document.getElementById('loading').style.display = 'none'
      mustacheRenderFunction(res
        , './mustache/transactionHistory.mustache', "electricity")
    })
    .catch((err) => console.log(err))
}