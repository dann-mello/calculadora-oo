//Elements
const previousOperationText = document.querySelector('#previous-operation');
const currentOperationText = document.querySelector('#current-operation');
const button = document.querySelectorAll('#buttons-container button');

class Calculator {

}

button.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === '.') {//Operador mais tenta converter o valor em número
            console.log(value)
        }else{
            console.log('op ', value)
        }
    })
})