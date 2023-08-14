const form = document.querySelector('.wish-containier');
const submitBtn = document.querySelector('#submitBtn');
const wishContanier = document.querySelector('.show-wish')
submitBtn.addEventListener('click', function(event) {
  event.preventDefault(); // Ngăn chặn form submit mặc định của trình duyệt
  const name = document.querySelector('#name').value;
  const content = document.querySelector('#content').value;

  // Gửi request POST tới API để lưu thông tin comment
fetch('https://640c374f94ce1239b0a7ebd5.mockapi.io/api/v1/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      content: content
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data); // In ra kết quả trả về từ API trong console
    // Hiển thị comment mới lên trang web
    let commentElement = document.createElement('div');
    commentElement.innerHTML = `  
      <div class="sections-pharagraph " style="width: 100%;">
        <p class="p-pc-tablet p-mobile" ><i class="fa-solid fa-user" style="color: #000000;"></i> ${data.name} : ${data.content}</p>

      </div>
    `;
    wishContanier.appendChild(commentElement);
  })
  .catch(error => {
    console.error(error); // In ra lỗi trong console nếu có
  });

  // Reset form sau khi submit thành công
  form.reset();
});
// Lấy danh sách các comments từ API
fetch('https://640c374f94ce1239b0a7ebd5.mockapi.io/api/v1/comments')
  .then(response => response.json())
  .then(data => {
    // Tạo phần tử cha để chứa các comments
    let commentsContainer = document.createElement('div');
    commentsContainer.id = 'comments';

    // Tạo các phần tử HTML tương ứng với mỗi comment
    data.forEach(comment => {
      let commentElement = document.createElement('div');
      commentElement.innerHTML = `
      <div class="sections-pharagraph " style="width: 100%;">
        <p class="p-pc-tablet p-mobile" ><i class="fa-solid fa-user" style="color: #000000;"></i> ${comment.name} : ${comment.content}</p>

      </div>
      `;
      wishContanier.appendChild(commentElement);
    });

    // Thêm phần tử cha vào trong DOM
    document.body.appendChild(commentsContainer);
  })
  .catch(error => {
    console.error(error); // In ra lỗi trong console nếu có
  });