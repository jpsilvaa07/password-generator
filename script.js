function getCharTypes() {
    const uppercase = document.querySelector('#include_uppercase').checked;
    const lowercase = document.querySelector('#include_lowercase').checked;
    const number = document.querySelector('#include_number').checked;
    const specialCharacter = document.querySelector('#include_special_character').checked;

    const charTypes = [];

    if (uppercase) charTypes.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    if (lowercase) charTypes.push('abcdefghijklmnopqrstuvwxyz');
    if (number) charTypes.push('0123456789');
    if (specialCharacter) charTypes.push('!@#$%^&*()_-+={}|?><:;".,~');

    return charTypes;
}

function getRandomChar(charTypes) {
    const typeIndex = Math.floor(Math.random() * charTypes.length);
    const chars = charTypes[typeIndex];
    const charIndex = Math.floor(Math.random() * chars.length);

    return chars[charIndex];
}

const passwordSpan = document.querySelector('#password');
const generateBtn = document.querySelector('#generate');
const copyBtn = document.querySelector('#copy');

generateBtn.addEventListener('click', function () {
    const size = Number(document.querySelector('#size').value);
    const charTypes = getCharTypes();

    if (!size || size <= 0) {
        passwordSpan.textContent = 'Informe o tamanho da senha';
        return;
    }

    if (charTypes.length === 0) {
        passwordSpan.textContent = 'Selecione pelo menos uma opção';
        return;
    }

    let password = '';

    for (let i = 0; i < size; i++) {
        password += getRandomChar(charTypes);
    }

    passwordSpan.textContent = password;
});

copyBtn.addEventListener('click', function () {
    const password = passwordSpan.textContent;

    if (!password) return;

    navigator.clipboard.writeText(password)
        .then(() => {
            copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';

            setTimeout(() => {
                copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i>';
            }, 1500);
        })
        .catch(() => {
            alert('Não foi possível copiar a senha');
        });
});
