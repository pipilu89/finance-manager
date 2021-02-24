import { mustacheRenderFunction2 } from './mustache/mustacheModule.mjs'
import { API_URL_EXPENSE_ADD, API_URL_EXPENSE, API_URL_EXPENSE_DELETE, API_URL_EXPENSE_AGG } from './apiUrls.js'
import { subCatDropdown } from './category.js'
import { topnavResponsive } from './navbar.js'
import { currentMonthYear, lastMonthYearFunc, monthNameFunction, monthNameArray } from './utils.js'


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
  const dateObj = new Date(date);

  const month = dateObj.getMonth() + 1
  const year = dateObj.getFullYear()
  // console.log('month year', month, year);

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
  // console.log('amount', amount);
  const transaction = JSON.stringify({ date, month, year, account, amount, category, subCategory, notes })
  console.log('transaction', transaction);

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
      getSummary()
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
      // console.table(res)
      render(res)
      async function render(res) {
        try {
          await mustacheRenderFunction2(res
            , './mustache/transactionHistory.mustache', "transactions")
          // loadingElement.style.display = 'none'
          deleteProduct2()
        } catch (error) { console.log(error); }


      }
    })
    .catch((err) => console.log(err))
}

//event listener for top nav bar
document.getElementById('topnavicon').addEventListener('click', topnavResponsive)

//event delete button. need to run after render to create eventlistners?
function deleteProduct2() {
  const deleteItem = function (e) {
    console.log(e.target.parentNode.parentNode.id);
    const recordID = e.target.parentNode.parentNode.id;
    // const recordName = e.target.parentNode.parentNode.className;
    // console.log('recordID, recordName', recordID, recordName);
    if (confirm(`确定删掉吗? Delete id：${recordID}, are you sure?`)) {
      const query = { "_id": recordID }
      console.log("delete query", query);

      fetch(API_URL_EXPENSE_DELETE, {
        method: 'POST',
        body: JSON.stringify(query),
        headers: {
          'content-type': 'application/json',
          'auth-token': localStorage.getItem('auth-token')
        }
      }).then(response => response.json())
        .then(res => {
          console.log('res from mdb: ', res);
          //refresh list
          getExpenseData2()
          getSummary()
          //scroll to top left of page
          document.documentElement.scrollTop = 0;
          document.documentElement.scrollLeft = 0;
        })
    }
  };
  const elements2 = document.getElementsByClassName("deleteProductBtn");

  for (let i = 0; i < elements2.length; i++) {
    elements2[i].addEventListener("click", deleteItem, false);
  }
}


//summary
getSummary()
function getSummary() {
  const [month, year] = currentMonthYear()

  const agg = [
    {
      "$match": {
        "month": month,
        "year": year
      },
    }, {
      "$group": {
        // "_id": null, //give full total
        "_id": "$category",
        "total": {
          "$sum": "$amount"
        },
        // cat: { $first: "$category" },
        month: { $first: "$month" },
        year: { $first: "$year" }
      }
    }, {
      "$sort": {
        "total": -1
      }
    }
  ];

  console.log("send agg to mdb...");
  //get this month summary
  fetch(API_URL_EXPENSE_AGG, {
    method: 'POST',
    body: JSON.stringify(agg),
    headers: {
      'content-type': 'application/json',
      'auth-token': localStorage.getItem('auth-token')
    }
  }).then(response => response.json())
    .then(mdbAggreation => {
      console.log(mdbAggreation);
      //sum group by to get total
      const total = mdbAggreation.reduce((accumulator, currentValue, currentIndex, array) => {
        return accumulator + currentValue.total
      }, 0)
      mdbAggreation.push({ _id: "total", total: total, month: month, year: year })

      console.log('total:', total);
      //render
      mustacheRenderFunction2(mdbAggreation
        , './mustache/monthSummary.mustache', "summary")
    }).catch((e) => console.log(e))
}