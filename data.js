// export const accountsArray = JSON.parse(localStorage.getItem('accounts'))
// export const accountsObj = { accounts: ["wechat", "alipay", "cash", "boc", "other"] };


export const categories = [{
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


const settings = {
  id: "settings",
  accounts: ["wechat", "alipay", "cash", "boc", "other"],
  categories: [{
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
  }
  ]
}

function saveInitialCatData() {
  const settings = {
    id: "settings",
    accounts: ["wechat", "alipay", "cash", "boc", "other"],
    categories: [{
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
    }
    ]
  }
  localStorage.setItem("settings", JSON.stringify(settings));
}

//white space id problem solution
const settingsTEST2 = {
  id: "settings",
  accounts: ["wechat", "alipay", "cash", "boc", "other"],
  categories: [{
    category: "hostel supplies",
    subCategory: [
      { name: "soft drinks", id: 1 },
      { name: "beer", id: 2 },
      { name: "spirits", id: 3 },
      { name: "kitchen", id: 4 }
    ]
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
  }
  ]
}
