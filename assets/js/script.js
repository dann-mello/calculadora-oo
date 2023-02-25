//Elements
const previousOperationText = document.querySelector('#previous-operation');
const currentOperationText = document.querySelector('#current-operation');
const button = document.querySelectorAll('#buttons-container button');

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = ''
    }

    //process all calculator operations
    processOperation(operation) {
        //check if current is empty
        if(this.currentOperationText.innerText === '' && operation !== 'C'){
            //Change operation
            if(this.previousOperationText.innerText !== ''){
                this.changeOperation(operation)
            }
            return
        }

        //get current and previous value
        let operationValue;
        const previous = +this.previousOperationText.innerText.split(' ')[0];
        const current = +this.currentOperationText.innerText;

        switch (operation) {
            case '+':
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case '-':
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case '/':
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case '*':
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case 'DEL':
                this.precessDelOperator();
                break;
            case 'CE':
                this.precessClearCurrentOperator();
                break;
            case 'C':
                this.processClearOperation();
                break;
            case '=':
                this.processEqualOperator();
                break;
            default:
                return;
        }
    }

    //add digit to calculator screen
    addDigit(digit) {
        //check if current operation already has a dot
        if (digit === '.' && this.currentOperationText.innerText.includes('.')) {
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();
    }

    //Change values of the calculator screen
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null) {

        if(operationValue === null){
            this.currentOperationText.innerText += this.currentOperation;
        }else{
            //check if value is zero, if it is just add current value
            if(previous === 0){
                operationValue = current;
            }

            //Add current value to previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = '';
        };
    }

    //change math operation
    changeOperation(operation){
        const mathOperations = ['*', '/', '+', '-'];

        if(!mathOperations.includes(operation)){
            return;
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    //delete the last digit
    precessDelOperator(){
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
    }

    //Clear Current Operation 
    precessClearCurrentOperator(){
        this.currentOperationText.innerText = '';
    }

    //Clear All Operations 
    processClearOperation(){
        this.currentOperationText.innerText = '';
        this.previousOperationText.innerText = '';
    }

    //Process an operation
    processEqualOperator(){

        const opration = previousOperationText.innerText.split(' ')[1];
        this.processOperation(opration);
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

button.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === '.') {//Operador mais tenta converter o valor em número
            calc.addDigit(value)
        } else {
            calc.processOperation(value)
        }
    })
})