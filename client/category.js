const categories = [{
  category: "hostel supplies",
  subCategory: ["soft drinks", "beer", "spirits", "kitchen", "cleaning", "rooms", "pets", "compensate guest"]
},
{
  category: "hostel repair",
  subCategory: ["refurb", "maintenance"]
},
{
  category: "wages",
  subCategory: ["reception", "cleaner", "cook", "staff food"]
},
{
  category: "Siwei"
},
]

// const accounts = ["wechat", "alipay", "cash", "boc"]
export const accountsObj = { accounts: ["wechat", "alipay", "cash", "boc", "other"] };

run()
async function run() {
  accountDropdown()
  categoryDropdown()
  subCatDropdown()
  //eventlistener for when first selection is made
  document.getElementById("category").addEventListener("click", subCatDropdown);
  document.getElementById("category").addEventListener("touchstart", subCatDropdown);

  function categoryDropdown() {
    //destructure
    const select = document.getElementById("category");
    for (const { category } of categories) {
      console.log(category);
      select.options[select.options.length] = new Option(category);
    }
  }

  function subCatDropdown() {
    //get value of selected option
    const e = document.getElementById("category");
    const selectedCat = e.options[e.selectedIndex].text;
    console.log("cat", selectedCat);

    //destructure. filter or map
    const selectedCatObj = categories.filter(categories => categories.category === selectedCat)[0]
    console.log(selectedCatObj);

    const { subCategory } = selectedCatObj
    console.log("subCategory", subCategory);

    const subCatSelect = document.getElementById("subCategory");

    //clear old options
    const length = subCatSelect.options.length;
    for (let i = length - 1; i >= 0; i--) {
      subCatSelect.options[i] = null;
    }
    //write new options
    for (const index in subCategory) {
      console.log(subCategory[index]);
      subCatSelect.options[subCatSelect.options.length] = new Option(
        subCategory[index],
        index
      );
    }
  }

  function accountDropdown() {
    const accountSelect = document.getElementById("account");
    //write new options
    const { accounts } = accountsObj
    // console.log(accounts);
    for (const index in accounts) {
      // console.log(accounts[index]);
      accountSelect.options[accountSelect.options.length] = new Option(
        accounts[index],
        index
      );
    }
  }
}