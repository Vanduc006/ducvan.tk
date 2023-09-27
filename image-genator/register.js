const usernameRegister = document.querySelector('.username-register');
const passwordRegister = document.querySelector('.password-register');
const repasswordRegister = document.querySelector('.repassword-register');


let passwordChecklist = document.querySelectorAll('.checklist-item');

let passOk = ''

passwordRegister.addEventListener('keyup', () => {
    let validationRegex = [
        { regex: /.{8,}/ }, // min 8 letters,
        { regex: /[0-9]/ }, // numbers from 0 - 9
        { regex: /[A-Z]/}, // letters from A-Z (uppercase),
    ]
    validationRegex.forEach((item, i) => {
        let isValid = item.regex.test(passwordRegister.value);
        if(isValid) {
            if (item == "{regex: /.{8,}/}") {
                is8chuso = 'TRUE';
                console.log(is8chuso)
            }
            passwordChecklist[i].classList.add('checked');
        } else{
            passwordChecklist[i].classList.remove('checked');
        }
    })
    const checklistItems = document.querySelectorAll('.checklist-item');
    // Khởi tạo biến đếm
    let checkedCount = 0;

    // Lặp qua từng phần tử và kiểm tra xem có class "checked" hay không
    checklistItems.forEach(item => {
    if (item.classList.contains('checked')) {
        checkedCount++;
    }
    });

    // Kiểm tra nếu có đủ 3 phần tử có class "checked"
    if (checkedCount === 3) {
        passOk = 'true'
    } else {
        passOk = 'false'
    }
})


function checkRepassword() {
    console.log(repasswordRegister.value)
    console.log(passwordRegister.value)
    if(passwordRegister.value != repasswordRegister.value) {
        console.log('fasle')
    }
    if(passwordRegister.value == repasswordRegister.value) {
        console.log('true')
    }
}

function testCase() {
    if (passOk == 'true') {
        checkRepassword()
    }
    if (passOk == 'false') {
        Toastify({
            text: "Vui lòng nhập mật khẩu đáp ứng đủ các điều kiện",
            duration: 2000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #F3696E, #F8A902)",
            },
        }).showToast();
    }
    
}

let json_username_register = usernameRegister.value
let json_password_register = passwordRegister.value

function callRegister() {

    const json_data = {
        username: json_username_register,
    }
    console.log(json_username_register)
    fetch('http://127.0.0.1:5000/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(json_data)
    })
    .then(response => response.json())
    .then(json => {
        console.log(json)
        statusLogin(json.login_status)
    })
}