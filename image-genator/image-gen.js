const imageLoad = document.querySelector('.loading')
const imageLoadSucess = document.getElementsByClassName('load-sucess')
let exitGallery; // Biến exitGallery ở mức toàn cục
let currentPage = 1;
let noMoreImages = false; // Biến để theo dõi trạng thái hết ảnh


document.addEventListener("DOMContentLoaded", function() {
    exitGallery = document.getElementById('img-container');
});
function prePage() {
    if (currentPage > 1) {
        exitGallery.innerHTML = '';
        currentPage--;
        loadData();
        callUserGallery(currentPage);
    }
}
function nextPage() {
    if (exitGallery) { // Kiểm tra xem exitGallery đã được khởi tạo chưa
        exitGallery.innerHTML = '';
        currentPage++;
        loadData();
        callUserGallery(currentPage);
    } else {
        console.error("Phần tử không tồn tại");
    }
}


function addToGallery(id,authors,urlimages) {
    const imgContainer = document.querySelector('.img-container');
    const imgShow = document.createElement('div');
    imgShow.classList.add('items');
    imgShow.setAttribute("identify",id);
    imgShow.innerHTML = `
    <img class='imgs load-sucess' src="${urlimages}" alt="">
    <div class="item-bottom load-sucess">
        <a class="author-image">
            <i class="fa-solid fa-user"></i> ${authors}

        </a>
        <a class="react">
          <span></span>
            <i class="fa-solid fa-circle-info" style="color: #000000;font-size: 20px;margin-right:5px;"></i>
            <i class="fa-solid fa-download" style="color: #000000;font-size: 20px;margin-right: 5px;"></i>
            <i onclick="myFunction(this)" class="fa-regular fa-heart btn-react" style="color: #080808;"></i>
        </a>
    </div> 
    `;
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
function showLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');

    // Kiểm tra xem phần tử có tồn tại không
    if (loadingOverlay) {
        loadingOverlay.style.display = 'flex';
    } else {
        console.error("Phần tử không tồn tại");
    }
}

function hideLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');

    if (loadingOverlay) {
        loadingOverlay.style.display = 'none';
    } else {
        console.error("Phần tử không tồn tại");
    }
}


// Mô phỏng tải dữ liệu (thay thế phần này bằng thực tế)
function loadData() {
    showLoading(); // Hiển thị hiệu ứng loading trước khi tải dữ liệu
    Toastify({
        text: "Chúng tôi đang tải dữ liệu",
        duration: 1000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
    }).showToast();
    setTimeout(() => {
        // Sau khi tải xong dữ liệu, ẩn hiệu ứng loading
        hideLoading();
    }, 1000); // Giả định dữ liệu sẽ được tải trong 2 giây
}

// Gọi loadData khi bạn muốn tải dữ liệu


// ...

// Sau đó khi gọi hàm addImage(imageFromAPI), nó sẽ thêm hình ảnh mới vào đầu .img-container
function callUserGallery(page) {
    
    const author = 'Van Duc'; // Đảm bảo bạn thiết lập giá trị tác giả tùy ý
    fetch('https://ducvan-backend.onrender.com/userlistimages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ author, page })
    })
    .then(response => response.json())
    .then(json => {
        json.listimages.images.forEach((image) => {
            const id = image.id;
            const authors = image.authors;
            const urlimages = image.urlimages;
            const datecreate = image.datecreate;
            const modals = image.modals;
            const prompt = image.prompt;
            const settings = image.settings;
            const isdelete = image.isdelete;
            // console.log("ID:", id);
            // console.log("Authors:", authors);
            // console.log("URL Images:", urlimages);
            // console.log("Date Create:", datecreate);
            // console.log("Modals:", modals);
            // console.log("Prompt:", prompt);
            // console.log("Settings:", settings);
            // console.log("Is Delete:", isdelete);
            addToGallery(id, authors, urlimages);
        });
    });
}
callUserGallery(currentPage)

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


