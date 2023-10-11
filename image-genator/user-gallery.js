const getUserGallary = document.querySelector('.test-user-data')
function addToGallery(id,authors,urlimages) {
    const imgContainer = document.querySelector('.user-gallery-test');
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
function callUserGallery() {
    fetch("http://127.0.0.1:5000/userlistimages", {
        
        // Adding method type
        method: "POST",
    })
    
    // Converting to JSON
    .then(response => response.json())
    
    // Displaying results to console
    .then(json => {
//listimages►images►0►urlimages
//authors,urlimages,datecreate,modals,prompt,settings,isdelete
        json.listimages.images.forEach((image) => {
            const id = image.id;
            const authors = image.authors;
            const urlimages = image.urlimages;
            const datecreate = image.datecreate;
            const modals = image.modals;
            const prompt = image.prompt;
            const settings = image.settings;
            const isdelete = image.isdelete;
            console.log("ID:",id)
            console.log("Authors:", authors);
            console.log("URL Images:", urlimages);
            console.log("Date Create:", datecreate);
            console.log("Modals:", modals);
            console.log("Prompt:", prompt);
            console.log("Settings:", settings);
            console.log("Is Delete:", isdelete);
            addToGallery(id,authors,urlimages)

          });

    });
}