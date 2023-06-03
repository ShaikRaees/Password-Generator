const inputSlider = document.querySelector("[slider-range]");
const displayLength = document.querySelector("[data-length]")
const passwordDisplay = document.querySelector("[password-display]");
const dataCopy = document.querySelector("[copy-message]");
const copyMessage = document.querySelector("[data-copy]");
const upperCase = document.querySelector("#uppercase");
const lowerCase = document.querySelector("#lowercase");
const numberCase = document.querySelector("#numbers");
const symbolsCase = document.querySelector("#symbols");
const lightIndicator = document.querySelector("[light-indicator]");
const generateButton = document.querySelector(".button-generate");
const allCheckBoxes = document.querySelectorAll("input [type=checkBox]");
const symbols = '!@#$%^&*()_+{}[]\|?/><.,';


let password = "";
let passwordLength = 10;
let checkCount = 0;
rangeSlider();


//range slider 
function rangeSlider() {
    inputSlider.value = passwordLength;
    displayLength.innerText = passwordLength;
}

//color indicator

function colorIndicator(color) {
    lightIndicator.style.backgroundColor = color;

}

//random number generator
function gntrandomInteger(min , max) { 
    return Math.floor(Math.random() * (max - min) + min);
}

function generateRandomNumber() {
    return gntrandomInteger(0,9);
}

function generateLowerCase() {
    return String.fromCharCode(gntrandomInteger(97,123));
}

function generateUpperCase() {
    return String.fromCharCode(gntrandomInteger(65,91));
}

function generateSymbols() {
    const randmNum = gntrandomInteger(0,symbols.length);
    return symbols.charAt(randmNum);
}

function strengthCalc() {
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;
    if(upperCase.checked) hasUpper = true;
    if(lowerCase.checked) hasLower = true;
    if(number.checked) hasNumber = true;
    if(symbols.checked) hasSymbol = true;

    if(hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >= 8) {
        setlightIndicator("#0f0");
    }
    else if((hasLower || hasUpper) && (hasNumber || hasSymbol) && passwordLength >=6) {
        setlightIndicator("#ff0");
    }
    else {
        setlightIndicator("#f00");
    }
}

async function copyContent () {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        dataCopy.innerText = "copied"; 
    } catch (e) {
        dataCopy.innerText = "Failed";
    }
    dataCopy.classList.add("active");

    setTimeout( () => {
         dataCopy.classList.remove("active");
    }, 2000);
}

function shufflePassword(array) {
    for(let i = array.length - 1;i>0;i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
}
    let  str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBoxes.forEach((checkBox) => {
        if(checkBox.checked)
         checkCount++;
    });

if(passwordLength < checkCount) {
    passwordLength = checkCount;
    rangeSlider();
}

}

allCheckBoxes.forEach( (checkbox) => {
    checkbox.addEventListener('change',handleCheckBoxChange);
})

inputSlider.addEventListener('input',(e) => {
    passwordLength = e.target.value;
    rangeSlider();
})

copyMessage.addEventListener('click',() => {
    if(passwordDisplay.value)
     copyContent();
})


generateButton.addEventListener('click',() => {
    if(checkCount == 0)
    return;

    if(passwordLength < checkCount) {
        passwordLength=checkCount;
        rangeSlider();
    }
    
    password="";
    
    let funcArr = [];

    if(upperCaseCheck.checked)
    funcArr.push(generateUpperCase);

    if(LowerCaseCheck.checked)
    funcArr.push(generateLowerCase);

    if(numberCheck.checked)
    funcArr.push(generateRandomNumber);

    if(symbolCheck.checked)
    funcArr.push(generateSymbols);

    for(let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]();
        
    }
    

    for(let i = 0; i < passwordLength-funcArr.length; i++)  {
        let randomIndex = gntrandomInteger(0,funcArr.length);
        password += funcArr[randomIndex]();
       
    }
     
    password = shufflePassword(Array.from(password));
    
    passwordDisplay.value = password;
    strengthCalc();
    
});