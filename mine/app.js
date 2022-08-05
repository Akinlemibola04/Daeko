// Steps to take
// 1. assign each button to a variable
// 2. add click events to number buttons
// 3. add click events to operator buttons
// 4. add click event to the clear button
// 5. add logic for each operator and assign an event handler to equal to button

// Step 1
var input = document.getElementById('input');

var operators = document.querySelectorAll('.operators div');

var numbers = document.querySelectorAll('.numbers div');

var clear = document.getElementById('clear');

var result = document.getElementById('result');

resultDisplayed = false   
// initial state of the input is always empty

// Step 2
// Using loops
for(i = 0; i < numbers.length; i++){
    numbers[i].addEventListener('click', function(e){
        currentString = input.innerHTML;
        lastChar = currentString[currentString.length - 1]
        // lastChar is gotten assuming the last character typed will be an operator before another number
        // E.G. 10 + ... then whatever user wishes to add
        // this is my best guess
        if(resultDisplayed === false){
            input.innerHTML += e.target.innerHTML
        } else if(resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷"){
            resultDisplayed = false
            input.innerHTML += e.target.innerHTML
            // my guess only applies to the else if conditional. Here if the the lastChar is an operator, user can keep typing numbers
        } else{
            resultDisplayed = false;
            input.innerHTML = "";
            input.innerHTML += e.target.innerHTML;
            // Here if next button pressed is a number, the result clears and the user can continue
        }
    })
}

// step 3
// using loops
for(i = 0; i < operators.length; i++){
    operators[i].addEventListener('click', function(e){
        currentString = input.innerHTML;
        lastChar = currentString[currentString.length - 1]

        if(lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷"){
            // if an operator button is pressed when the lastChar is an operator, the new operator replaces the old one
            var newString = currentString.substring(0, currentString.length - 1) += e.target.innerHTML;
            input.innerHTML = newString;
        } else if(currentString.length == 0){
            // if an operator is the firstChar, output the alert
            alert('Please enter a number')
        } else{
            // if an operator button is pressed when the lastChar is a number, the string continues normally
            input.innerHTML += e.target.innerHTML
        }
    })
}

// Step 4
clear.addEventListener('click', function(){
    input.innerHTML = ""
})

// Step 5: MOST COMPLEX STEP
result.addEventListener('click', function(e){
    inputString = input.innerHTML;
    var numbers = inputString.split(/\+|\-|\×|\÷/g);
    var operators = inputString.replace(/[0-9]|\./g, "").split("");
    console.log(inputString);
    console.log(numbers);
    console.log(operators);
    console.log("---------------");

    // 100-43
    // ["100", "43"]
    // ["-"]
    var divide = operators.indexOf('÷')
    while(divide != -1){
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1])
        operators.splice(divide, 1);
        divide = operators.indexOf('÷');
    }

    var multiply = operators.indexOf('×');
    while(multiply != -1){
        numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
        operators.splice(multiply, 1);
        multiply = operators.indexOf('×')
    }

    var subtract = operators.indexOf('-');
    while(subtract != -1){
        numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
        operators.splice(subtract, 1);
        subtract = operators.indexOf('-');
    }

    var add = operators.indexOf('+');
    while(add != -1){
        numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]))
        operators.splice(add, 1);
        add = operators.indexOf('+')
    }

    input.innerHTML = numbers[0];

    resultDisplayed = true;
})