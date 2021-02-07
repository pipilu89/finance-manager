import { API_URL_EXPENSE_AGG } from './apiUrls.js';
import { mustacheRenderFunction2 } from './mustache/mustacheModule.mjs'

//get current date
const today = new Date();
const monthNameArray = new Array();
monthNameArray[0] = "January";
monthNameArray[1] = "February";
monthNameArray[2] = "March";
monthNameArray[3] = "April";
monthNameArray[4] = "May";
monthNameArray[5] = "June";
monthNameArray[6] = "July";
monthNameArray[7] = "August";
monthNameArray[8] = "September";
monthNameArray[9] = "October";
monthNameArray[10] = "November";
monthNameArray[11] = "December";
const monthName = monthNameArray[today.getMonth()];
// const month = today.getMonth() + 1
const year = today.getFullYear()
document.getElementById('date').textContent = monthName + " " + year

//date query
const firstDayOfMonth = new Date(
  today.getFullYear(),
  today.getMonth(),
  2, //day?
  0, //change to 2am to catch after midnight records.
  0,
  0
);

const lastDayOfMonth = new Date(
  today.getFullYear(),
  today.getMonth() + 1,
  1, //day?
  0, //change to 2am to catch after midnight records.
  0,
  0
);

console.log('today', today.toISOString().slice(0, 10));
console.log('firstDayOfMonth', firstDayOfMonth.toISOString().slice(0, 10));
console.log('lastDayOfMonth', lastDayOfMonth.toISOString().slice(0, 10));


// let [month2, date2, year2] = today.toISOString().split("-")
// console.log(month2, date2, year2);

const agg = [
  {
    "$match": {
      "date": {
        "$gte": firstDayOfMonth,
        "$lte": lastDayOfMonth
      }
    }
  }, {
    "$group": {
      // "_id": null, //give full total
      "_id": "$category",
      "total": {
        "$sum": "$amount"
      }
    }
  }, {
    "$sort": {
      "total": -1
    }
  }
];

document.getElementById('queryBtn').addEventListener('click', () => {
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
      mdbAggreation.push({ _id: "total", total: total })
      console.log('total:', total);
      //render
      mustacheRenderFunction2(mdbAggreation
        , './mustache/currentMonthTransactions.mustache', "data")
    })

})
