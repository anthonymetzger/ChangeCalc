//PLEASE NOTE COMMENTS ON RIGHT PORTION OF CODE!!! THIS CODE IS WRITTED TO PASS THE INDICATED TEST, HOWEVER
//IT GOES BEYOND THE SCOPE OF THE REQUIRED TEST. PLEASE TAKE NOTE OF THIS WHEN VIEWING THE UI!!





/*Created by: Anthony Metzger
Date: 23 October 2025
/*in this project, I've decided to use an object to hold the denominations of currency
and an array to hold the count of each denomination to be given back as change.
at first I wanted to use if statements to check each denomination, but I realized a for...in
loop would be more efficient, especially when paired with a for...of loop to iterate through an array.

//this project will be labeled with comments to explain each section of code.*/

//declaring an object to hold the denominations of currency
let cashierGiveBack = new Object();
/*cashierGiveBack.hundred = 100.00;                                                                       DELETE COMMENT INDICATOR FROM THIS LINE
cashierGiveBack.fifty = 50.00;
cashierGiveBack.twenty = 20.00;
cashierGiveBack.ten = 10.00;
cashierGiveBack.five = 5.00;                                                                              AND THIS LINE TO ENDABLE 100s TO PENNIES  */
cashierGiveBack.one = 1.00;
cashierGiveBack.quarters = 0.25;
cashierGiveBack.dime = 0.10;
cashierGiveBack.nickel = 0.05;
cashierGiveBack.penny = 0.01;
//declaring an array to hold the count of each denomination to be given back as change
let cashArray = [/*0, 0, 0, 0, 0,*/ 0, 0, 0, 0, 0];                                                       //DELETE THE COMMENT IN THIS LINE TO ENABLE 100s TO PENNIES
//function to check if customer paid enough, gets passed customer payment and price of item
function didCustomerPayEnough(customer, price) {
  console.log("Calculating if customer paid enough...");
  //assigning parameters to local variables for typing convenience
  let c = customer;
  let p = price;
  //if statement to see if customer paid less than price, if so, return false
  if (c < p) {
    document.getElementById("amounnt-due").innerText = "Insufficient Payment";
    console.log("Customer did not pay enough.");
    return false;
  }
    //in case the user attempts to input negative values
  else if (c <= 0 || p <= 0) {
    document.getElementById("amounnt-due").innerText = "Invalid Input";
    return false;
  }
    //else if statement to see if customer paid enough or more, if so, return true
  else if (c >= p) {
    console.log("Customer paid enough.");
    return true;
  }
    //catch-all else statement in case something unexpected happens
  else {
    console.log("Error in didCustomerPayEnough() function."); 
    return false;
  }
}
//this function is the main bread and butter of the program, it calculates the change due
//and determines how many of each denomination to give back. It also gets passed the
//customer payment and price of item.
function calculateChange(customer, price) {
  
  //similar to the previous function, assigning parameters to local variables
  //and parsing them to floats for calculation purposes. I had problems with
  //JavaScript being 0.01 off in some calculations due to floating point precision.
  var c = parseFloat(customer);
  var p = parseFloat(price);
  //calculating change due by subtracting price from customer payment
  let due = parseFloat(c - p);
  console.log("Customer paid: " + c);
  console.log("Price of item: " + p);
  console.log("Calculating change...");
  console.log("Change due: " + due);
  //parsing float due to problem stated above
  parseFloat(due);
  //updating HTML to show change due
  document.getElementById("amount-due").innerText = ("$" + due.toFixed(2) + " due");
  //checking if customer paid enough, if not, return 0 to end function
  if (didCustomerPayEnough(c, p) == false) {
    return 0;
  }
    //else if customer did pay enough, proceed to calculate change
  else if(didCustomerPayEnough(c, p) == true) {
    console.log("Calculating change...");
    //This is where I got creative with the for...in loop to iterate through the
    //cashierGiveBack object. I also created a variable 'i' to keep track of
    //which index of the cashArray to increment for each denomination.
    let i = 0;
    for (let bill in cashierGiveBack) {
      if (due >= cashierGiveBack[bill]) {
        while (due >= cashierGiveBack[bill]) {
          due -= cashierGiveBack[bill];
          cashArray[i] += 1;
          console.log(cashArray);
          due = due.toFixed(2);
          parseFloat(due);
        }
        i++;
      }
      else {
        i++;
      }
    }
  }
  //calling displayChange() function to update HTML with change breakdown
  displayChange();
  //resetting cashArray for next transaction
  resetArray(cashArray);
  return 0;
}
//function to update HTML with change for the customer
function displayChange() {
  //logging cashArray to console for testing and debugging purposes
  for (let i in cashArray) {
    console.log(cashArray[i]);
  }
  //This is new to me. I wanted to add sound effects to the program when you press
  //the calculate button, so I found a way to play audio in JavaScript. even more,
  //i discovered you can play audio files stored in your project folder.
  let audio = new Audio('assets/chaching.mp3');
  audio.play();
  //ENABLE FOR ALT CODE vv
  /*document.getElementById("hundreds-output").innerHTML = "Hundreds: " + cashArray[0]; 
  document.getElementById("fifties-output").innerHTML = "Fifties: " + cashArray[1];
  document.getElementById("twenties-output").innerHTML = "Twenties: " + cashArray[2]; 
  document.getElementById("tens-output").innerHTML = "Tens: " + cashArray[3]; 
  document.getElementById("fives-output").innerHTML = "Fives: " + cashArray[4];                              DELETE THE COMMENT START AND END TO ENABLE
  document.getElementById("dollars-output").innerHTML = "Ones: " + cashArray[5];                             THE CODE BETWEEN THE INDICATORS TO
  document.getElementById("quarters-output").innerHTML = "Quarters: " + cashArray[6];                        ENABLE MY VERSION OF THE CODE THAT
  document.getElementById("dimes-output").innerHTML = "Dimes: " + cashArray[7];                              DISPLAYS 100s TO PENNIES!!!
  document.getElementById("nickels-output").innerHTML = "Nickels: " + cashArray[8];
  document.getElementById("pennies-output").innerHTML = "Pennies: " + cashArray[9]; */
  //ENABLE FOR ALT CODE ^^



  //DELETE FOR ALT CODE ^^
  document.getElementById("dollars-output").innerHTML = cashArray[0];
  document.getElementById("quarters-output").innerHTML = cashArray[1];
  document.getElementById("dimes-output").innerHTML = cashArray[2];
  document.getElementById("nickels-output").innerHTML = cashArray[3];
  document.getElementById("pennies-output").innerHTML = cashArray[4];
  //DELETE FOR ALT CODE ^^



  //logging cashierGiveBack key and value pairs to console for testing and debugging purposes
  for (let key in cashierGiveBack) {
    console.log(key + ": " + cashierGiveBack[key]);
  }
  return 0;
}
//function to reset cashArray to all zeros for next transaction
function resetArray(arr) {
  for (let i in arr) { 
    arr[i] = 0;
  } 
}
