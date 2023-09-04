const userInput = document.querySelector('#user-input')
const sendBtn = document.querySelector('#send-button')
const chatArea = document.querySelector('.history')
const testBtn = document.querySelector('.send-button')

console.log(localStorage.getItem('chats'))
if(localStorage.getItem('chats')) {
  chatArea.innerHTML = localStorage.getItem('chats');
}
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
function chatStorage(keyvalue,value) {
    localStorage.setItem(keyvalue,value)
}
sendBtn.addEventListener('click', e => {
    if (userInput.value !== '') {
        adduserInput()
        scrollToBottom()
        botRespone()

        userInput.value = ''
        stopPrinting = false;
        
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

// testBtn.addEventListener('click', async e => {
  
// })
// function alphaBot() {
//   const alphaJson = {
//     "id": "chatcmpl-yhRIeKoloANYJqh5feOhMztftbrAB",
//     "object": "chat.completion",
//     "created": 1693196474,
//     "model": "gpt-3.5-turbo-0301",
//     "usage": {
//         "completion_tokens": 36,
//         "prompt_tokens": 15,
//         "total_tokens": 51
//     },
//     "choices": [
//         {
//             "message": {
//                 "role": "assistant",
//                 "content": "Xin chào! Làm ơn cho tôi biết bạn cần giúp đỡ về vấn đề gì."
//             },
//             "finish_reason": "stop",
//             "index": 0
//         }
//     ]
//   }

//   // const alphaContent = alphaJson.choices[0].message.content;
//   // console.log(alphaContent)
// }
 //const alphaContent = "A wormhole, in theoretical physics, is a hypothetical concept that suggests the existence of a shortcut or tunnel connecting two separate regions in spacetime. It is often referred to as a \"shortcut\" through space and time, allowing for potentially faster-than-light travel. Wormholes are a theoretical result of Einstein's general theory of relativity, which describes gravity as the curvature of spacetime caused by mass and energy.\n\nAccording to current theories, a wormhole can be visualized as a tunnel-like structure that connects two distant points in the universe. It is represented as a \"throat\" that connects two separate \"mouths\" or openings. While wormholes are mathematically possible based on the equations of general relativity, their actual existence in the universe is purely speculative and hasn't been observed or confirmed.\n\nIf wormholes were to exist, they could potentially provide a way to travel vast distances in a much shorter time or even enable time travel. However, creating, stabilizing, and traversing wormholes would require exotic matter or negative energy, which are not yet understood or observed in nature. Their existence and properties remain a topic of intense scientific research and exploration."
// cái add bot output kia nó chỉ có tácdụng khi user vừa nhập thôi, khi truy cập lại hay reload lại sẽ dùngc cái này
// const alphaContent = 'Trong Java, bạn có thể sử dụng thư viện Apache HttpClient để thực hiện các yêu cầu HTTP. Dưới đây là ví dụ về cách sử dụng Apache HttpClient để gửi một yêu cầu GET đơn giản:\n\n1. Đầu tiên, bạn cần thêm thư viện Apache HttpClient vào dự án của mình. Bạn có thể thực hiện điều này bằng cách thêm dependency sau vào file pom.xml (nếu bạn đang sử dụng Maven):\n\n```xml\n<dependency>\n    <groupId>org.apache.httpcomponents</groupId>\n    <artifactId>httpclient</artifactId>\n    <version>4.5.13</version>\n</dependency>\n```\n\n2. Tiếp theo, bạn có thể sử dụng mã sau để gửi một yêu cầu GET và nhận phản hồi từ máy chủ:\n\n```java\nimport org.apache.http.HttpEntity;\nimport org.apache.http.HttpResponse;\nimport org.apache.http.client.methods.HttpGet;\nimport org.apache.http.impl.client.CloseableHttpClient;\nimport org.apache.http.impl.client.HttpClients;\nimport org.apache.http.util.EntityUtils;\n\nimport java.io.IOException;\n\npublic class HttpRequestExample {\n    public static void main(String[] args) {\n        // Tạo đối tượng CloseableHttpClient\n        CloseableHttpClient httpClient = HttpClients.createDefault();\n\n        // Tạo đối tượng HttpGet với URL mục tiêu\n        HttpGet httpGet = new HttpGet(\"https://reqres.in/api/users/1\");\n\n        try {\n            // Gửi yêu cầu GET và nhận phản hồi từ máy chủ\n            HttpResponse response = httpClient.execute(httpGet);\n\n            // Lấy phần thân của phản hồi\n            HttpEntity entity = response.getEntity();\n            String responseString = EntityUtils.toString(entity, \"UTF-8\");\n\n            // In nội dung phản hồi\n            System.out.println(responseString);\n        } catch (IOException e) {\n            e.printStackTrace();\n        } finally {\n            // Đảm bảo đóng HttpClient sau khi sử dụng xong\n            try {\n                httpClient.close();\n            } catch (IOException e) {\n                e.printStackTrace();\n            }\n        }\n    }\n}\n```\n\nTrong ví dụ trên, chúng ta sử dụng URL \"https://reqres.in/api/users/1\" để gửi yêu cầu GET và nhận phản hồi từ máy chủ. Phản hồi được in ra bằng cách sử dụng phương thức `System.out.println()`.'
function addWhenLoad() {
  const botwhenload = document.createElement('div');
  botwhenload.innerHTML = `
      <div class="user-chats">
          <p><i class="fa-solid fa-robot"></i></p>
          <p class="chats-container output"></p>
          <div class="respone-btns">
            <button><i class="fa-solid fa-link"></i> Current Chat </i></button>            
          </div>
      </div>
      
  `;
  chatStorage('bot-chats',botwhenload.innerHTML)
}
function addBotOutput(alphaContent) {
  const converter = new showdown.Converter();
  const parsedHTML = converter.makeHtml(alphaContent);
  let stopPrinting = false;
  const botChats = document.createElement('div');
  botChats.innerHTML = `
      <div class="user-chats">
          <p><i class="fa-solid fa-robot"></i></p>
          <p class="chats-container output"></p>
          <div class="respone-btns">
            <button class="stop-generate"><i class="fa-solid fa-circle-stop"></i> Stop Generate </i></button>            
          </div>
      </div>
      
  `;
  chatArea.appendChild(botChats)
  // const chatsContainer = botChats.querySelector('.chats-container');          
  // slowDown(chatsContainer);
  const OutputContainer = botChats.querySelector('.output');
  let currentIndex = 0;
  let displayText = '';
  function printNextCharacter() {
      if (stopPrinting) {
        chatStorage('chats',chatArea.innerHTML)
        return;
      }
      displayText += parsedHTML[currentIndex];
      OutputContainer.innerHTML = displayText;
      currentIndex++;

      if (currentIndex < parsedHTML.length) {
          // const randomCoolDown = Math.floor(Math.random() * 30);
          // console.log(currentIndex + ':' + randomCoolDown)
          setTimeout(printNextCharacter, 2); // Adjust the timeout for the typing speed
          scrollToBottom() 
          chatStorage('chats',chatArea.innerHTML)
      }
  }
  printNextCharacter();
// Lặp qua từng phần tử trong NodeList (nếu có nhiều phần tử)
  const stopButtons = document.querySelectorAll('.stop-generate');
  stopButtons.forEach((stopButton) => {
      stopButton.addEventListener('click', () => {
          stopPrinting = true; // Thiết lập biến cờ dừng khi nhấn nút
          console.log(stopPrinting);
      });
  });

}



function botRespone(){
  const url = 'https://api.nova-oss.com/v1/chat/completions';
  const authToken = 'Bearer nv-Yzw1RMZ3qM3gxYZ8iNJPN0V4x0SSVEqNHMWl0ftyFKBdnxnw'; // Thay thế bằng mã thông báo xác thực thực tế

  const requestData = {
      model: 'gpt-3.5-turbo',
      messages: [
          {
              role: 'user',
              content: userInput.value
          }
      ]
  };
  Toastify({
    text: 'Being send your message to server',
    duration: 5000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function(){} // Callback after click
  }).showToast();
  fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken
      },
      body: JSON.stringify(requestData)
  })
  .then(response => response.json())
  .then(data => {
    Toastify({
        text: 'VIE-GPT got respone, pls wait...',
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
      // Xử lý dữ liệu trả về ở đây
      //console.log(data);
      resdata = data;
        console.log(resdata);
        const content = resdata.choices[0].message.content;
        let totalToken = resdata.usage.total_tokens;
        console.log(totalToken)
        if (localStorage.getItem('total_tokens')) {
            totalToken = totalToken + localStorage.getItem('total_tokens')
            localStorage.setItem('total_tokens',totalToken)
        }
        localStorage.setItem('total_tokens',totalToken)
        console.log(content)
        Toastify({
            text: "Enjoy 🤩",
            duration: 2000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function(){} // Callback after click
          }).showToast();
        addBotOutput(content)
  })
  .catch(error => {
      // Xử lý lỗi ở đây
      console.error(error);
  });

}

// Lắng nghe sự kiện ấn phím "Enter"
userInput.addEventListener('keypress', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault(); 
        sendBtn.click(); 
    }
    
})