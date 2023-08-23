const userInput = document.querySelector('#user-input')
const sendBtn = document.querySelector('#send-button')
const chatArea = document.querySelector('.history')
const testBtn = document.querySelector('.send-button')


function adduserInput() {
    const userChats = document.createElement('div');

    userChats.innerHTML = `
        <div class="user-chats">
            <p><i class="fa-solid fa-user"></i></p>
            <p> ${userInput.value} </p>
        </div>
    `;
    chatArea.appendChild(userChats)


}
function scrollToBottom() {
    chatArea.scrollTop = chatArea.scrollHeight;
}
sendBtn.addEventListener('click', e => {
    if (userInput.value !== '') {
        adduserInput()
        scrollToBottom()
        userInput.value = ''
    }
    else {

        Toastify({
            text: 'Empty',
            duration: 2000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #F3696E, #F8A902)",
            },
            onClick: function(){
                alert('Please try again :D')
            } // Callback after click
          }).showToast();

    }
})
testBtn.addEventListener('click', async e => {
    const apiUrl = "https://free.churchless.tech/v1/chat/completions"; // Thay thế bằng API URL của bạn
    const questionData = []
    questionData.push({
        "role": "assistant",
        "content": 'hello'
    })
// Tạo một hàm để gọi API và xử lý phản hồi
async function callApi() {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Accept': 'text/event-stream',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ChatGPT-Hackers', // Thay thế bằng mã xác thực của bạn
        },
        body: JSON.stringify({
          'model': 'gpt-3.5-turbo',
          'messages': questionData, // Thay thế bằng dữ liệu tin nhắn của bạn
          'stream': true,
        }),
      }, timeout = 60000);
  
      const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
  
      // Tạo một biến để tích lũy dữ liệu
      const responseData = await reader.read();
      console.log(responseData)
      parts = responseData.split("\n\n")
      for (var part of parts) {
        var json = part.substring(6)
        var data = JSON.parse(json)
        var content = data.choices[0].delta.content
        console.log(content)
      }

      // Bắt đầu đọc dữ liệu từ reader
    //   while (true) {
    //     const { value, done } = await reader.read();
    // if (done) break;
    // test2 = value
    // //console.log('Received', value);
    // if (value == "[DONE]") break;
    // //Value produce
    // parts = value.split("\n\n")
    
    // for (var part of parts) {
    //   var json = part.substring(6)
    //   //console.log(json)
    //   try {
    //     if (json != "") {
    //       var data = JSON.parse(json)
    //       var content = data.choices[0].delta.content
    //       console.log(content)
    //       if (content == null)
    //         continue;
    //       //TEXT += content
    //       //console.log(TEXT)
    //     //   repli.innerHTML = converter.makeHtml(TEXT)
    //     //   document.getElementById("messages").scrollTo(0, document.getElementById("messages").scrollHeight);
    //     }
    //   } catch (e) {
    //     //Who care
    //   }
    // }
    //   }
  
      // Kết quả đã được lưu trong biến responseData
    //   console.log('Result JSON:', responseData);
  
      console.log('Response fully received');
    } catch (error) {
      console.error('Có lỗi xảy ra:', error);
    }
  }
  
  // Gọi hàm callApi để thực hiện cuộc gọi API và xử lý phản hồi
  callApi();


})
// Lắng nghe sự kiện ấn phím "Enter"
userInput.addEventListener('keypress', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault(); 
        sendBtn.click(); 
    }
    
})