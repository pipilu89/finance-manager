import { API_URL_LOGIN } from './apiUrls.js'
import { topnavResponsive } from './navbar.js'

//event listener for top nav bar
document.getElementById('topnavicon').addEventListener('click', topnavResponsive)

login()

//if has jwt in ls show already logged in.
if (localStorage.getItem("auth-token") !== null) {
  document.getElementById('status').textContent = 'Already Logged In'
} else {
  document.getElementById('status').textContent = 'Please Log In'
}
//login
export async function login() {

  document.getElementById('login').addEventListener('click', () => {
    console.log("login clicked");
    // document.getElementById('loading').style.display = '';
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
        //reset inputs
        document.getElementById('email').value = ''
        document.getElementById('pw').value = ''
        document.getElementById('status').textContent = 'Logged In'
      })
      .catch((err) => { console.log(err); })
  })

  //logout
  document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('auth-token')
    console.log('logged out');
    document.getElementById('status').textContent = 'Logged Out'
    // document.getElementById('electricity').style.display = 'none'
    // document.getElementById('loading').style.display = 'none'

  })

}