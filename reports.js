import { API_URL_EXPENSE_AGG } from './apiUrls.js';
import { mustacheRenderFunction2 } from './mustache/mustacheModule.mjs'
import { topnavResponsive } from './navbar.js'
import { currentMonthYear, lastMonthYearFunc, monthNameFunction, monthNameArray } from './utils.js'

// let monthtest, yeartest
const [month, year] = currentMonthYear()
const [lastMonth, lastMonthYear] = lastMonthYearFunc()
const [monthName, lastMonthName] = monthNameFunction()

document.getElementById('currentMonth').textContent = monthName + ' ' + year
document.getElementById('lastMonth').textContent = lastMonthName + ' ' + lastMonthYear

//event listener for top nav bar
document.getElementById('topnavicon').addEventListener('click', topnavResponsive)

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


//full list year select
const yearSelect = document.getElementById("yearSelect");
const yearArray = [year, year - 1, year - 2, year - 3]
for (const index in yearArray) {
  yearSelect.options[yearSelect.options.length] = new Option(
    yearArray[index], yearArray[index]);
}

//month select
const selectMonth = document.getElementById("monthSelect");
for (const index in monthNameArray) {
  selectMonth.options[selectMonth.options.length] = new Option(
    monthNameArray[index], index);
}
// document.getElementById('monthSelect').addEventListener('change', () => {
//   console.log(parseInt(selectMonth.value) + 1);
// })
// document.getElementById('yearSelect').addEventListener('change', () => {
//   console.log(parseInt(yearSelect.value));
// })


document.getElementById('getFullList').addEventListener('click', () => {
  const month = parseInt(selectMonth.value) + 1
  const year = parseInt(yearSelect.value)
  console.log('month year', month, year);

  const aggFullList = [
    {
      "$match": {
        "month": month,
        "year": year
      },
    },
    {
      "$sort": {
        "date": -1
      }
    }
  ];

  //get last month summary
  fetch(API_URL_EXPENSE_AGG, {
    method: 'POST',
    body: JSON.stringify(aggFullList),
    headers: {
      'content-type': 'application/json',
      'auth-token': localStorage.getItem('auth-token')
    }
  }).then(response => response.json())
    .then(mdbAggreation => {
      console.log(mdbAggreation);
      //sum group by to get total
      const total = mdbAggreation.reduce((accumulator, currentValue, currentIndex, array) => {
        return accumulator + currentValue.amount
      }, 0)
      mdbAggreation.push({ account: "total", amount: total })

      console.log('total:', total);
      //render
      mustacheRenderFunction2(mdbAggreation
        , './mustache/transactionHistory.mustache', "data3")
    }).catch((e) => console.log(e))
})