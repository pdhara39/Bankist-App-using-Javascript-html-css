'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2023-09-10T17:01:17.194Z',
    '2023-09-11T23:36:17.929Z',
    '2023-09-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2023-09-10T17:01:17.194Z',
    '2023-09-11T23:36:17.929Z',
    '2023-09-12T10:51:36.790Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2023-09-10T17:01:17.194Z',
    '2023-09-11T23:36:17.929Z',
    '2023-09-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2023-09-10T17:01:17.194Z',
    '2023-09-11T23:36:17.929Z',
    '2023-09-12T10:51:36.790Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];

const loginHeading = document.querySelector("#loginHeading");
const uesrName = document.querySelector(".uesrName");
const pin = document.querySelector(".pin");
const submit = document.querySelector(".submit");

//--------------------application container elements----------
const application = document.querySelector(".application");

// ------ current balance----------
const date = document.querySelector(".date");
const  balanceValue = document.querySelector(".balanceValue");

//------------  Movements --------------
const allmovements = document.querySelector(".movement");
const movmentRow = document.querySelector(".movmentRow");
const movType= document.querySelector(".movType");
const movDate = document.querySelector(".movDate");
const movValue = document.querySelector(".movValue");

//------------summury---------------------
const summuryINvalue = document.querySelector(".summuryINvalue");
const summuryOUTvalue = document.querySelector(".summuryOUTvalue");
const summuryINTERESTvalue = document.querySelector(".summuryINTERESTvalue");
const btnSort = document.querySelector(".btnSort");

//-------------OPERATION TRANSFER------------
const transferTo = document.querySelector(".transferTo");
const transferAmount = document.querySelector(".transferAmount");
const btntransfer = document.querySelector(".btntransfer");
const error = document.querySelector(".error");

//-----------OPERATION LOAN-------------------
const inputLoanAmount = document.querySelector(".inputLoanAmount");
const formBTNLoan = document.querySelector(".formBTNLoan");
const errorLoan = document.querySelector(".errorLoan");


//---------------- OPERATION CLOSE  --------------
const inputUser = document.querySelector(".inputUser");
const formConPin = document.querySelector(".formConPin");
const formBTNClose = document.querySelector(".formBTNClose");
const errorClose = document.querySelector(".errorClose");

//---------logOut--------------------------
const displaytime = document.querySelector(".time");



//--------------- to create username  -------------
const createName = function(account){
  account.forEach(acc => {
      acc.userName = acc.owner.toLowerCase().split(' ').map(name=>name[0]).join('');
  });
}
createName(accounts);
//===================Date Formate=========================
const dateFormteForMovments = function(date,locale){
  const calcdaysPassed = (date1,date2)=>Math.round(Math.abs(date2-date1)/(1000*60*60*24));
  const daysPassed= calcdaysPassed(new Date(),date);
 
  if (daysPassed === 0) return `Today`;
  if(daysPassed === 1) return `Yeasterday`;
  if (daysPassed <= 7) return `${daysPassed} Days Ago`;
  
  return new Intl.DateTimeFormat(locale).format(date);
}

//===================Number Formate=========================
const numberFormat = (value,locale,currency)=>{
 return new Intl.NumberFormat(locale).format(value);
}

// Formate Numbers 
const formateNumbers = function(value,locale,currency){
  return new Intl.NumberFormat(locale,{
    style:'currency',
    currency: currency,
  }).format(value);
}



// --------- logic to display movments--------

const displayMovements = function(acc){
    allmovements.textContent=' ';     
    acc.movements.forEach(function(mov,i){
      const type = mov > 0 ? 'Depo' : 'Withdrew';

      const movDate =new Date(acc.movementsDates[i]);      
      const displayMOVDate = dateFormteForMovments(movDate,acc.locale);
      const forMovNum = formateNumbers(mov,acc.locale,acc.currency);

        const htmlstring = `<div class="movmentRow">
            <div class="movType movType${type}">${i+1} ${type}</div>
            <div class="movDate">${displayMOVDate}</div>
            <div class="movValue">${forMovNum}</div>
        </div>    
        `;
        allmovements.insertAdjacentHTML("afterbegin",htmlstring);       
    });
}
//===================Display  current Balance=========================
const calcDisplayBalance=function(acc) {
  acc.balance = acc.movements.reduce((accumula,mov,i,arr)=>{
    accumula+=mov;
    return accumula;
  },0);
  balanceValue.textContent=formateNumbers(acc.balance,acc.locale,acc.currency);
}
//=================== Summury Section =========================
const displaySummry = function(acc){
    // for income value 
    const income = acc.movements
    .filter(mov=>mov>0)
    .reduce((acc,mov,i,arr)=>
    {
      acc+=mov;
      return acc;
    },0);
   summuryINvalue.textContent=formateNumbers(income,acc.locale,acc.currency);

  // for out values----
    const out = acc.movements
      .filter(mov=>mov<0)
      .reduce((acc,mov)=> acc+mov,0);
      summuryOUTvalue.textContent = formateNumbers(Math.abs(out),acc.locale,acc.currency);

  // if intrest is > 1 then only add in balance 
    const interest = acc.movements
      .filter((mov,i,arr)=> mov>0)
      .map(depo => depo * acc.interestRate / (100))
      .filter((int)=> int >1)
      .reduce((acc,int)=>acc+int,0);
      summuryINTERESTvalue.textContent = formateNumbers(interest,acc.locale,acc.currency);
}
//=========== Global Variable Declaration=================
let currentAccount , timer;

const displayUI=function(currentAccount)
{  
  displayMovements(currentAccount);
  calcDisplayBalance(currentAccount);
  displaySummry(currentAccount);
}

const autoLogOut = function(){
  let time = 120;
  const tick = function(){
    const min =String(Math.trunc(time/60)).padStart(2,0);
    const sec= String(time%60).padStart(2,0);

      displaytime.textContent= `${min}:${sec}`;
      if (time===0) {
        clearInterval(timer);
        loginHeading.textContent=`Log In to Access Bank`;
         application.style.opacity=0;
      }
      time--; 
  };
  tick();
    timer = setInterval(tick,1000);
   return timer;
}
//================================ Login process =========================
submit.addEventListener("click",function(event){
  event.preventDefault();
     currentAccount= accounts.find(acc=>acc?.userName===uesrName.value);
     console.log(currentAccount);
     if(currentAccount?.pin=== +(pin.value)){
      // display welcome msg on heading

      loginHeading.textContent=` Welcome Back ${currentAccount.owner.split(' ')[0]}`;
      application.style.opacity="100";
      
      const balancedate = new Date();
      const locale = navigator.languages;
      const options={
        hour:'numeric',minute:'numeric',day:'numeric',month:'numeric',year:'numeric',
      };
      date.textContent= new Intl.DateTimeFormat(currentAccount.locale,options).format(balancedate);
      
      // after login username and pin input field are reset
      uesrName.value=pin.value= "";
      uesrName.blur();
      pin.blur();

      if(timer) clearInterval(timer);
     timer = autoLogOut();
    displayUI(currentAccount);

    console.log("login");
   }
  });

//  transfer money to valid account
btntransfer.addEventListener("click",function(event){
  event.preventDefault();

  const amount = +(transferAmount.value);
  console.log(amount);
  const reciverAcc = accounts.find(acc=>acc.userName===transferTo.value);
  console.log(reciverAcc);

  // check that user is valid , enough balance in current account and can not transfer in own acc

  if(reciverAcc){
    if(reciverAcc===currentAccount){
      errorTransfer.textContent="can not trasfer in same account"
    }else if (currentAccount.balance>=amount) {
      // add negetiva movement to cuurent account
      currentAccount.movements.push(-amount);
      // add positive movement to receiver account
      reciverAcc.movements.push(amount);
    
        // to add date of transaction in movements
      currentAccount.movementsDates.push(new Date().toISOString());
      reciverAcc.movementsDates.push(new Date().toISOString());
      
      displayUI(currentAccount);
       // to reset timer
      clearInterval(timer);
      timer=autoLogOut();

      transferAmount.value=transferTo.value='';
      error.textContent=`transfer of ${amount} is ${"successfull".toUpperCase()} to ${reciverAcc.owner}`
      

    }else{
      error.textContent=`Sorry, Balance is Not Enough`

    }
  }else{
    error.textContent="Enter valid user";
  }
});

// to get loan 
formBTNLoan.addEventListener("click",function(event){
    event.preventDefault();
    const amount = +(Math.floor(inputLoanAmount.value));
    if(amount>0 && currentAccount.movements.some(mov=>mov>=amount/10)){
     
      setTimeout(function(){
      currentAccount.movements.push(amount);

      // to add date of loan in movements
     currentAccount.movementsDates.push(new Date().toISOString());   
    
     errorLoan.textContent="Loan approved";
     displayUI(currentAccount);
     },3000)
     
      // to reset timer
           
    }else{
      errorLoan.textContent="sorry we can't give you loan";
    }
    inputLoanAmount.value='';
    clearInterval(timer);
      timer=autoLogOut();
});



// to close the account
formBTNClose.addEventListener("click",function(event){
    event.preventDefault();

  // check username and pin are correct from the account then only close account
  if(inputUser.value === currentAccount.userName && +(formConPin.value) === currentAccount.pin){
    const index= accounts.findIndex(acc=>acc.userName===currentAccount.userName);
    accounts.splice(index,1); 
    loginHeading.textContent = " Log In to Access Bank";
      
    //hide UI
    application.style.opacity=0;
    

    console.log("account closed"); 
  }else{
  errorClose.textContent="enter valid userName or PIN"; 3


  }
  // set input fields blank
  inputUser.value=formConPin.value='';

});



// to get nodelist of movements of user on clicking current balance 

// balanceValue.addEventListener("click",function(){
//   const movementUI = Array.from(document.querySelectorAll(".movValue"), el =>el.textContent.replace("$", "")) ;

//   //this is as work as above line
//   // const movementUI = [...document.querySelectorAll(".movValue")].map(el=>el.textContent.replace("$",""));
  

//   console.log(movementUI);

// });









