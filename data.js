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

const settings2 = {
  "_id": "60164ba69f2e6333ece19062", "id": "settings", "updatedAt": "2021-02-06T06:14:50.897Z",
  "accounts": [{ "_id": "60165d2ff203013c10f7fd1d", "name": "wechat", "id": 60165895 },
  { "_id": "60165d2ff203013c10f7fd1e", "name": "alipay", "id": 60165203013 },
  { "_id": "60166ab6f203013c10f800ae", "name": "boc", "id": 1612081177945 },
  { "_id": "60166ab6f203013c10f800af", "name": "cash", "id": 1612081189523 }],
  "categories": [{
    "_id": "60165d2ff203013c10f7fd23", "name": "hostel supplies", "id": 101652,
    "subCategory": [
      { "_id": "60165d2ff203013c10f7fd24", "name": "soft drinks", "id": 1203013 },
      { "_id": "60165d2ff203013c10f7fd25", "name": "beer", "id": 2203013 },
      { "_id": "60165d2ff203013c10f7fd26", "name": "spirits", "id": 3203013 },
      { "_id": "60165d2ff203013c10f7fd27", "name": "kitchen", "id": 4203013 },
      { "_id": "601e33da4c34870015316445", "name": "hs test", "id": 1612592077869 }]
  },
  {
    "_id": "60165d2ff203013c10f7fd28", "name": "hostel repair", "id": 2077869133,
    "subCategory": [
      { "_id": "60165d2ff203013c10f7fd29", "name": "refurb", "id": 1077869 },
      { "_id": "60165d2ff203013c10f7fd2a", "name": "maintenance", "id": 2077869 }]
  }, {
    "_id": "60165d2ff203013c10f7fd2b", "name": "wages", "id": 349172763,
    "subCategory": [
      { "_id": "60165d2ff203013c10f7fd2c", "name": "reception", "id": 11244917276 },
      { "_id": "60165d2ff203013c10f7fd2d", "name": "cleaner", "id": 21244917276 },
      { "_id": "60165d2ff203013c10f7fd2e", "name": "cook", "id": 31244917276 },
      { "_id": "60165d2ff203013c10f7fd2f", "name": "staff food", "id": 41244917276 }]
  },
  {
    "_id": "601e33da4c3487001531644e", "name": "home", "id": 1612449172763,
    "subCategory": []
  },
  {
    "_id": "601e33da4c3487001531644f", "name": "siwei", "id": 1612449189319, "subCategory": [{ "name": "allowance ", "id": 1612592433609 }, { "name": "food", "id": 1612592484713 }]
  }, { "name": "pete", "id": 1612600061177, "subCategory": [{ "name": "food", "id": 1612600078756 }] }]
}