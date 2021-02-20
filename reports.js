import { API_URL_EXPENSE_AGG } from './apiUrls.js';
import { mustacheRenderFunction2 } from './mustache/mustacheModule.mjs'

//get current date
const today = new Date();
// const today = new Date(
//   2021, 0, 31
// );
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

//get current month /year and previous month /year (year will be different if current month = december)
const year = today.getFullYear()
const month = today.getMonth() + 1

let lastMonthYear = year
if (month == 1) {
  lastMonthYear = year - 1
}
let lastMonth = month - 1
if (month == 1) {
  lastMonth = 12
}
const lastMonthName = monthNameArray[lastMonth - 1];

document.getElementById('currentMonth').textContent = monthName + " " + year
document.getElementById('lastMonth').textContent = lastMonthName + " " + lastMonthYear

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

console.log('today', today);
console.log('today', today.toISOString().slice(0, 10));
console.log('firstDayOfMonth', firstDayOfMonth.toISOString().slice(0, 10));
console.log('lastDayOfMonth', lastDayOfMonth.toISOString().slice(0, 10));
console.log("month year", month, year);

const agg = [
  {
    "$match": {
      "month": month,
      "year": year

      // "date": {
      //   "$gte": firstDayOfMonth,
      //   "$lte": lastDayOfMonth
      // }
    },
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

const agg2 = [
  {
    "$match": {
      "month": month,
      "year": year

      // "date": {
      //   "$gte": firstDayOfMonth,
      //   "$lte": lastDayOfMonth
      // }
    },
  },

  {
    "$group": {
      // "_id": null, //give full total
      "_id": "$subCategory",
      "total": {
        "$sum": "$amount"
      },
      cat: { $first: "$category" },
      month: { $first: "$month" },
      year: { $first: "$year" }


    }
  },
  {
    "$sort": {
      "total": -1
    }
  }
];
//last month 
const agg3 = [
  {
    "$match": {
      "month": lastMonth,
      "year": lastMonthYear

      // "date": {
      //   "$gte": firstDayOfMonth,
      //   "$lte": lastDayOfMonth
      // }
    },
  },

  {
    "$group": {
      // "_id": null, //give full total
      "_id": "$subCategory",
      "total": {
        "$sum": "$amount"
      },
      cat: { $first: "$category" },
      month: { $first: "$month" },
      year: { $first: "$year" }


    }
  },
  {
    "$sort": {
      "total": -1
    }
  }
];

document.getElementById('queryBtn').addEventListener('click', () => {
  console.log("send agg to mdb...");
  //get this month summary
  fetch(API_URL_EXPENSE_AGG, {
    method: 'POST',
    body: JSON.stringify(agg2),
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
        , './mustache/currentMonthTransactions.mustache', "data")
    }).catch((e) => console.log(e))

  //get last month summary
  fetch(API_URL_EXPENSE_AGG, {
    method: 'POST',
    body: JSON.stringify(agg3),
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
      mdbAggreation.push({ _id: "total", total: total, month: lastMonth, year: lastMonthYear })

      console.log('total:', total);
      //render
      mustacheRenderFunction2(mdbAggreation
        , './mustache/currentMonthTransactions.mustache', "data2")
    }).catch((e) => console.log(e))

})
