const username = document.querySelector('.username');
const pass = document.querySelector('.password');
const loginBtn = document.querySelector('.log-btn')
loginBtn.addEventListener('click', e => {
    callLogin()
})
function callLogin() {
    const json_username = username.value
    const json_password = pass.value
    const json_data = {
        username: json_username,
        password: json_password
    }
    console.log(json_username)
    fetch('http://127.0.0.1:5000/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(json_data)
    })
    .then(response => response.json())
    .then(json => {

        console.log(json)
    });
}