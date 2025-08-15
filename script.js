const inputNumber = document.getElementById('inputNumber');
const validateBtn = document.getElementById('validateBtn');
const resultDiv = document.getElementById('result');

// Remove caracteres não numéricos
function cleanInput(input) {
    return input.replace(/\D/g, '');
}

// Valida CPF
function validateCPF(cpf) {
    cpf = cleanInput(cpf);
    if(cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let sum = 0;
    for(let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
    let firstCheck = (sum * 10) % 11;
    if(firstCheck === 10) firstCheck = 0;
    if(firstCheck !== parseInt(cpf.charAt(9))) return false;

    sum = 0;
    for(let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
    let secondCheck = (sum * 10) % 11;
    if(secondCheck === 10) secondCheck = 0;
    if(secondCheck !== parseInt(cpf.charAt(10))) return false;

    return true;
}

// Valida CNPJ
function validateCNPJ(cnpj) {
    cnpj = cleanInput(cnpj);
    if(cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

    let length = cnpj.length - 2;
    let numbers = cnpj.substring(0, length);
    let digits = cnpj.substring(length);
    let sum = 0;
    let pos = length - 7;
    for(let i = length; i >= 1; i--) {
        sum += parseInt(numbers.charAt(length - i)) * pos--;
        if(pos < 2) pos = 9;
    }
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if(result !== parseInt(digits.charAt(0))) return false;

    length += 1;
    numbers = cnpj.substring(0, length);
    sum = 0;
    pos = length - 7;
    for(let i = length; i >= 1; i--) {
        sum += parseInt(numbers.charAt(length - i)) * pos--;
        if(pos < 2) pos = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if(result !== parseInt(digits.charAt(1))) return false;

    return true;
}

validateBtn.addEventListener('click', () => {
    const value = inputNumber.value.trim();
    let isValid = false;
    if(cleanInput(value).length === 11) {
        isValid = validateCPF(value);
    } else if(cleanInput(value).length === 14) {
        isValid = validateCNPJ(value);
    }

    if(isValid) {
        resultDiv.textContent = 'Válido';
        resultDiv.className = 'valid';
    } else {
        resultDiv.textContent = 'Inválido';
        resultDiv.className = 'invalid';
    }
});
