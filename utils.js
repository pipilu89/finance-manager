//-------------Date Utils--------------------//
//combined current month year function
export function currentMonthYear() {
  const today = new Date();
  const month = today.getMonth() + 1
  const year = today.getFullYear()
  return [month, year]
}

//last month and year
export function lastMonthYearFunc() {
  const [month, year] = currentMonthYear()
  let lastMonthYear = year
  if (month == 1) {
    lastMonthYear = year - 1
  }
  let lastMonth = month - 1
  if (month == 1) {
    lastMonth = 12
  }
  return [lastMonth, lastMonthYear]
}

// monthNameArray
export const monthNameArray = new Array();
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

//month names
export function monthNameFunction() {
  const today = new Date();
  const monthName = monthNameArray[today.getMonth()];
  const month = today.getMonth()
  let lastMonth = month - 1
  if (month == 0) {
    lastMonth = 11
  }
  const lastMonthName = monthNameArray[lastMonth];
  return [monthName, lastMonthName]
}
//get current month /year and previous month /year (year will be different if current month = december)
// const year = today.getFullYear()
// const month = today.getMonth() + 1

// let lastMonthYear = year
// if (month == 1) {
//   lastMonthYear = year - 1
// }
// let lastMonth = month - 1
// if (month == 1) {
//   lastMonth = 12
// }
// const lastMonthName = monthNameArray[lastMonth - 1];

// document.getElementById('currentMonth').textContent = monthName + " " + year
// document.getElementById('lastMonth').textContent = lastMonthName + " " + lastMonthYear

//date query
// const firstDayOfMonth = new Date(
//   today.getFullYear(),
//   today.getMonth(),
//   2, //day?
//   0, //change to 2am to catch after midnight records.
//   0,
//   0
// );

// const lastDayOfMonth = new Date(
//   today.getFullYear(),
//   today.getMonth() + 1,
//   1, //day?
//   0, //change to 2am to catch after midnight records.
//   0,
//   0
// );

// console.log('today', today);
// console.log('today', today.toISOString().slice(0, 10));
// console.log('firstDayOfMonth', firstDayOfMonth.toISOString().slice(0, 10));
// console.log('lastDayOfMonth', lastDayOfMonth.toISOString().slice(0, 10));
// console.log("month year", month, year);