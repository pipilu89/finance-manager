import { getElecData } from './electricity.js'
import { API_URL_LOGIN } from './apiUrls.js'
//login
export async function login() {

  document.getElementById('login').addEventListener('click', () => {
    console.log("login clicked");
    document.getElementById('loading').style.display = '';
    //get login from form
    const email = document.getElementById('email').value
    const pw = document.getElementById('pw').value

    const loginUser = {
      "email": email,
      "password": pw
    }


    fetch(API_URL_LOGIN, {
      method: 'POST',
      body: JSON.stringify(loginUser),
      headers: {
        'content-type': 'application/json'
      },

    })

      // Retrieve jwt in its body as ReadableStream
      .then(response => response.text())
      .then(data => {
        console.log(data)
        //store jwt in localstorage
        localStorage.setItem("auth-token", data)
      })
      .then(() => {
        // fetch data from db
        document.getElementById('electricity').style.display = '';
        getElecData()
        document.getElementById('loading').style.display = 'none'
      })
      .catch((err) => { console.log(err); })
  })

  //logout
  document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('auth-token')
    console.log('logged out');
    document.getElementById('electricity').style.display = 'none'
    document.getElementById('loading').style.display = 'none'

  })

}