let sectionUsers = document.querySelector(".section__users");
let sectionTotal = document.querySelector(".section__total");
let asideLink = document.querySelector(".main__aside-links");

// array of  8 users
const data = [
  {
    name: "Keith J",
    money: 100000,
  },
  {
    name: "John B",
    money: 200000,
  },
  {
    name: "Colin B",
    money: 300000,
  },
  {
    name: "Christen S",
    money: 400000,
  },
  {
    name: "David M",
    money: 500000,
  },
  {
    name: "David B",
    money: 600000,
  },
  {
    name: "Ruth M",
    money: 700000,
  },
  {
    name: "Tony S",
    money: 800000,
  },
  {
    name: "Murry S",
    money: 900000,
  },
];

//default users to display in dom
const defaultUsers = () => {
  data.forEach((u, index) => {
    if (index <= 2) {
      addUser(u, index);
    }
  });
};

//number to money
const numToMoney = (num) => {
  return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

//number to money
const moneyToNum = (num) => {
  return parseFloat(num.replace(/,/g, ""));
};

//add user
const addUser = (u, index) => {
  let user = document.createElement("div");
  user.classList.add("section__user");
  user.setAttribute("id", index);
  sectionUsers.appendChild(user);

  let name = document.createElement("p");
  name.classList.add("section__user-name");
  name.innerText = u.name;

  let money = document.createElement("p");
  money.classList.add("section__user-money");
  money.innerText = numToMoney(u.money);

  user.appendChild(name);
  user.appendChild(money);
};

const checkLastUser = () => {
  let firstChild = asideLink.firstElementChild;
  let lastChild = sectionUsers.lastElementChild;

  if (lastChild == null) {
    defaultUsers();
    firstChild.style.cursor = "pointer";
    firstChild.style.backgroundColor = "cornsilk";
    return;
  }

  let lastChildId = lastChild.id;
  let shouldSkip = false;

  data.forEach((u, index) => {
    //contains hack to skip forEach loop once it meet the criteria
    if (shouldSkip) {
      return;
    }

    if (index > lastChildId) {
      addUser(u, index);
      shouldSkip = true;
      return;
    }

    //check if the last child id is same to the last index of array
    if (data.length - 1 === sectionUsers.children.length) {
      firstChild.style.cursor = "not-allowed";
      firstChild.style.backgroundColor = "red";
    }
  });
};

//Double the money
const doubleMoney = () => {
  const money = getMoney();
  let doubledMoney = money.map((m) => m * 2);
  updateMoney(doubledMoney);
};

const getMoney = () => {
  let money = [];
  const children = sectionUsers.children;
  for (child of children) {
    money.push(moneyToNum(child.lastElementChild.textContent));
  }
  return money;
};

const updateMoney = (doubledMoney) => {
  const children = sectionUsers.children;
  doubledMoney.forEach((e, index) => {
    for (child of children) {
      if (child.id == index) {
        child.lastElementChild.textContent = numToMoney(e);
      }
    }
  });
};

//get the users
const getUser = () => {
  let domData = [];
  const children = sectionUsers.children;
  const firstChild = asideLink.firstElementChild;

  if (children.length !== data.length) {
    console.log(sectionUsers.children.length);
    firstChild.style.cursor = "pointer";
    firstChild.style.backgroundColor = "cornsilk";
  }

  for (child of children) {
    domData.push({
      name: child.firstChild.textContent,
      money: moneyToNum(child.lastChild.textContent),
    });
  }

  
  return domData;
};

//remove users
const removeUser = () => {
  while (sectionUsers.firstChild) {
    sectionUsers.removeChild(sectionUsers.firstChild);
  }
};

//find the millionaires
const findMillionaires = () => {
  const domData = getUser();
  const millNum = domData.filter((u, index) => {
    if (u.money >= 1000000) {
      return true;
    }
  });

  if (millNum.length === 0) {
    removeUser();
    getUser();
    return;
  }

  removeUser();
  millNum.forEach((u, index) => {
    addUser(u, index);
  });
};

//sort by the richest
const sortByRichest = () => {
  const getUserData = getUser();
  const sortedData =  [...getUserData].sort((a, b) => b.money - a.money);
  removeUser();
  sortedData.forEach((u, index) =>{
    addUser(u,index);
  })
};

const updateTotal = () =>{
  const totalMoney = entireWealth();
  sectionTotal.innerHTML = `<p > Total: </p> <p>${numToMoney(totalMoney)}</p>`;
  
}

//calculate the entire wealth
const entireWealth = () => {
  const getUserData = getUser();
  const initialValue = 0;
  const sumMoney = getUserData.reduce((a,b) =>
   a+b.money
  ,initialValue);

  return sumMoney;
}

//click Handlers
document.addEventListener("click", (e) => {
  if (e.target.matches(".main__aside-links-list:nth-child(1)")) {
    checkLastUser();
  }

  if (e.target.matches(".main__aside-links-list:nth-child(2)")) {
    doubleMoney();
   
  }

  if (e.target.matches(".main__aside-links-list:nth-child(3)")) {
    findMillionaires();
    
  }

  if (e.target.matches(".main__aside-links-list:nth-child(4)")) {
    sortByRichest();
    
  }

  if (e.target.matches(".main__aside-links-list:nth-child(5)")) {
    updateTotal();
    sectionTotal.style.display = "flex";
  }else{
    sectionTotal.style.display = "none";
  }

  
});

defaultUsers();
