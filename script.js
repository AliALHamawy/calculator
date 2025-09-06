const calculatorContainer =document.getElementById('calculator_container');
const displayArea =document.getElementById('display_area');
const resultArea = document.getElementById('result_area');

calculatorContainer.addEventListener('click', e =>{
    if(e.target.nodeName == "BUTTON"){
        switch(e.target.textContent){
            case "C":
                clear();
                break;
            case"DEL":
                deletOneValue();
                break;
            case"=":
                evaluate();
                break;
            default:
                addToDisplayArea(e.target.textContent);
        }
    }
})

document.addEventListener('keydown', function(e) {
    const allowedKeys = [
        '0','1','2','3','4','5','6','7','8','9',
        '(',')','.',
        '+','-','*','/',
        'Backspace','Delete','Enter','=','c','C'
    ];
    if (!allowedKeys.includes(e.key)) {
        e.preventDefault();
        return;
    }
    if (e.key >= '0' && e.key <= '9' || e.key === '(' || e.key === ')' || e.key === '.') {
        addToDisplayArea(e.key);
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
        deletOneValue();
    } else if (e.key === 'c' || e.key === 'C') {
        clear();
    } else if (e.key === 'Enter' || e.key === '=') {
        evaluate();
    }
});

function clear(){
    displayArea.textContent="";
}

let isResult = false;

function addToDisplayArea(value){
    const operators = ['+', '-', '*', '/'];
    let current = displayArea.textContent;
    let lastChar = current.slice(-1);
    // إذا كانت النتيجة ظاهرة
    if(isResult){
        if((value >= '0' && value <= '9') || value === '('){
            displayArea.textContent = value;
            isResult = false;
            return;
        } else if(operators.includes(value)){
            displayArea.textContent = current + value;
            isResult = false;
            return;
        }
    }
    // منع إدخال نقطتين متتاليتين
    if(value === '.' && lastChar === '.'){
        return;
    }
    // إذا كانت العملية الحالية عملية رياضية والأخيرة أيضاً عملية رياضية، استبدل الأخيرة
    if(operators.includes(value) && operators.includes(lastChar)){
        displayArea.textContent = current.slice(0, -1) + value;
        return;
    }
    displayArea.textContent = current + value;
}

function deletOneValue(){
    let currentContent = displayArea.textContent;
    displayArea.textContent=currentContent.substring(0,currentContent.length -1);
}

function evaluate(){
    try{
        let calculation = math.evaluate(displayArea.textContent);
        displayArea.textContent = calculation;
        isResult = true;
    }catch(error){
        displayArea.textContent = "Invalid Operation";
        isResult = false;
        console.error(error);
    }
}