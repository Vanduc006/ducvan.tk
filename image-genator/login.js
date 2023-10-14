const usernameLogin = document.querySelector('.username-login');
const passLogin = document.querySelector('.password-login');
const loginBtn = document.querySelector('.password-login')
const loginCLose = document.querySelector('.close-login')
// loginBtn.addEventListener('click', e => {
//     callLogin()
// })
function checkEmpty() {
    const json_username_login = usernameLogin.value
    const json_password_login = passLogin.value
    if (json_username_login == '' || json_password_login == '' )  {
        Toastify({
            text: 'Vui lòng điền đủ mail và mật khẩu',
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
    else {
        callLogin(json_username_login,json_password_login)
    }

}
function callLogin(json_username_login,json_password_login) {
    const json_data = {
        username: json_username_login,
        password: json_password_login
    }
    console.log(json_username_login)
    fetch('https://ducvan-backend.onrender.com/login', {
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
function statusLogin(statuslogin) {
    console.log(statuslogin)
    if (statuslogin === 'True') {
        loginCLose.click()
        Toastify({
            text: "Đăng nhập thành công",
            duration: 2000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
        }).showToast();
    }
    if (statuslogin === 'Erro Connect') {
        Toastify({
            text: 'Lỗi kết nối máy chủ 😿',
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
    if (statuslogin === 'False') {
        Toastify({
            text: 'Sai địa chỉ mail hoặc mật khẩu',
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


function test() {
    console.log('1')
}