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
function saveInitialCatData2() {
  const settings2 = {
    id: "settings",
    accounts: [
      { name: "wechat", id: 1 },
      { name: "alipay", id: 2 },
      { name: "cash", id: 3 },
      { name: "boc", id: 4 },
      { name: "other", id: 5 }],
    categories: [{
      name: "hostel supplies",
      id: 1,
      subCategory: [
        { name: "soft drinks", id: 1 },
        { name: "beer", id: 2 },
        { name: "spirits", id: 3 },
        { name: "kitchen", id: 4 }
      ]
    },
    {
      name: "hostel repair",
      id: 2,
      subCategory: [
        { name: "refurb", id: 1 },
        { name: "maintenance", id: 2 }
      ]
    },
    {
      name: "wages",
      id: 3,
      subCategory: [
        { name: "reception", id: 1 },
        { name: "cleaner", id: 2 },
        { name: "cook", id: 3 },
        { name: "staff food", id: 4 }
      ]
    },
    {
      name: "Siwei",
      id: 4
    }
    ]
  }
  localStorage.setItem("settings2", JSON.stringify(settings2));
}