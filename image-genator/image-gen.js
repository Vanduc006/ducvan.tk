const imageLoad = document.querySelector('.loading')
const imageLoadSucess = document.getElementsByClassName('load-sucess')
let numb = 0

function addImage(imageUrl) {

    const imgContainer = document.querySelector('.img-container');
    const imgShow = document.createElement('div');
    imgShow.classList.add('items');
    imgShow.innerHTML = `
            <img class='imgs' src="${imageUrl}" alt="">
            <div class="item-bottom">
                <a class="author-image">
                    <i class="fa-solid fa-user"></i> Nguyen Van Duc
                </a>
                <a class="react">
                    <i onclick="myFunction(this)" class="fa-regular fa-heart btn-react" style="color: #080808;"></i>
                </a>
            </div>   
    `;

    // Lấy phần tử đầu tiên trong .img-container (nếu có)
    const firstItem = imgContainer.querySelector('.items');

    // Chèn imgShow trước firstItem (hoặc vào đầu .img-container nếu không có firstItem)
    if (firstItem) {
        imgContainer.insertBefore(imgShow, firstItem);

        
    } else {
        imgContainer.appendChild(imgShow);

    }
}
function myFunction(x) {
    x.classList.toggle("fa-solid");
}


function loadingImage(type) {

}
// ...

// Sau đó khi gọi hàm addImage(imageFromAPI), nó sẽ thêm hình ảnh mới vào đầu .img-container

function callServer() {
    // fetch("http://127.0.0.1:5000/haha", {
        
    //     // Adding method type
    //     method: "POST",
    // })
    
    // // Converting to JSON
    // .then(response => response.json())
    
    // // Displaying results to console
    // .then(json => {

    // const imageFromAPI = json.output;
    // console.log(imageFromAPI)
    // addImage(imageFromAPI)
    // });
    const imageFromAPI = 'https://pbxt.replicate.delivery/8FHhVn0AQ3YlBVbUS9OMpmPISHfiHHtWki8An8Vfx0WuUIjRA/out-0.png'
    addImage(imageFromAPI)
}


