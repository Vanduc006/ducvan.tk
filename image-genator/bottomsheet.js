// Copyright (c) 2022 Ivan Teplov

const $ = document.querySelector.bind(document)

const openSheetButton = $(".open-sheet")
const sheet = $("#sheet")
const sheetContents = sheet.querySelector(".contents")
const draggableArea = sheet.querySelector(".draggable-area")
const sheetBody = document.querySelector('.bodysheet')
const bodyContents = document.createElement('div')
let sheetHeight // in vh

let idToFind = 0
let findInData = ''
function infoModal(clicked_id) {
    findInData = JSON.parse(localStorage.getItem("current_list"))
    

    openSheetButton.click()
    console.log(JSON.parse(localStorage.getItem("current_list")))
    // alert(clicked_id);
    idToFind = clicked_id
    showModalInfo(findInData, parseInt(idToFind));


}

function showModalInfo(data, id) {
    const item = data.find(obj => obj.id === id);
    if (item) {
        let authorsInfo = item.authors
        let datecreateInfo = item.datecreate
        let modalsInfo = item.modals
        let promptInfo = item.prompt
        let settingsInfo = item.settings
        let urlimagesInfo = item.urlimages

        console.log("modals: " + authorsInfo);
        console.log("idimages: " + datecreateInfo);

        
        bodyContents.innerHTML = `
        <h2>${datecreateInfo}</h2>
        <img class='imgs load-sucess' src="${urlimagesInfo}" alt="">
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit explicabo vero quas eligendi, eos cupiditate sint aliquam a omnis commodi quos in libero veniam. Quidem, non a quibusdam consequuntur mollitia officia numquam sit quos dolorum quaerat reprehenderit laboriosam perspiciatis consequatur odit error dolore recusandae iste id quam magnam ut! Sint nulla minus excepturi libero officiis, deleniti, delectus obcaecati saepe natus rerum nesciunt! Nemo quo id ipsum fugiat voluptas ducimus incidunt nulla sed, voluptates modi exercitationem quod obcaecati corporis perspiciatis dolorum ullam provident sint iusto consequatur totam dolorem. Amet, praesentium accusamus dolore hic ad iusto nostrum exercitationem velit ex optio nihil obcaecati provident enim nobis molestiae cupiditate possimus error itaque facilis eligendi placeat eos quam! Consequatur eveniet corporis nam accusantium nemo harum non explicabo accusamus. Voluptatem laborum dolores magni voluptatibus doloribus sunt? Id quae vero, nemo nam dolore ab amet distinctio molestias excepturi blanditiis quia eos et eligendi magnam voluptas iusto.</p>
    
        <p>Here is a little form to test this sheet:</p>
        <form action="" method="get" class="column">
          <input type="email" placeholder="Email field">
          <textarea placeholder="Text field"></textarea>
          <div contenteditable="true">Contenteditable block</div>
        </form>
        
        `;
        sheetBody.appendChild(bodyContents)
    } else {
        console.log("Không tìm thấy thông tin với id " + id);
    }
}

const setSheetHeight = (value) => {
    sheetHeight = Math.max(0, Math.min(100, value))
    sheetContents.style.height = `${sheetHeight}vh`

    if (sheetHeight === 100) {
    sheetContents.classList.add("fullscreen")
    } else {
    sheetContents.classList.remove("fullscreen")
    }
}

const setIsSheetShown = (isShown) => {
    sheet.setAttribute("aria-hidden", String(!isShown))
}

// Open the sheet when clicking the 'open sheet' button
openSheetButton.addEventListener("click", () => {
    document.body.style.overflow = 'hidden';
    setSheetHeight(Math.min(50, 720 / window.innerHeight * 100))
    setIsSheetShown(true)
})

// Hide the sheet when clicking the 'close' button
sheet.querySelector(".close-sheet").addEventListener("click", () => {
    setIsSheetShown(false)
    document.body.style.overflow = 'auto';
    bodyContents.innerHTML = '';
    
})

// Hide the sheet when clicking the background
sheet.querySelector(".overlay").addEventListener("click", () => {
    setIsSheetShown(false)
    document.body.style.overflow = 'auto';
    bodyContents.innerHTML = '';
})

const isFocused = element => document.activeElement === element

// Hide the sheet when pressing Escape if the target element
// is not an input field
window.addEventListener("keyup", (event) => {
    const isSheetElementFocused =
    sheet.contains(event.target) && isFocused(event.target)

    if (event.key === "Escape" && !isSheetElementFocused) {
    setIsSheetShown(false)
    document.body.style.overflow = 'auto';
    bodyContents.innerHTML = '';
    }
})

const touchPosition = (event) =>
    event.touches ? event.touches[0] : event

let dragPosition

const onDragStart = (event) => {
    dragPosition = touchPosition(event).pageY
    sheetContents.classList.add("not-selectable")
    draggableArea.style.cursor = document.body.style.cursor = "grabbing"
}

const onDragMove = (event) => {
    if (dragPosition === undefined) return

    const y = touchPosition(event).pageY
    const deltaY = dragPosition - y
    const deltaHeight = deltaY / window.innerHeight * 100

    setSheetHeight(sheetHeight + deltaHeight)
    dragPosition = y
}

const onDragEnd = () => {
    dragPosition = undefined
    sheetContents.classList.remove("not-selectable")
    draggableArea.style.cursor = document.body.style.cursor = ""

    if (sheetHeight < 25) {
    setIsSheetShown(false)
    document.body.style.overflow = 'auto';
    bodyContents.innerHTML = '';
    } else if (sheetHeight > 75) {
    setSheetHeight(100)
    } else {
    setSheetHeight(50)
    }
}

draggableArea.addEventListener("mousedown", onDragStart)
draggableArea.addEventListener("touchstart", onDragStart)

window.addEventListener("mousemove", onDragMove)
window.addEventListener("touchmove", onDragMove)

window.addEventListener("mouseup", onDragEnd)
window.addEventListener("touchend", onDragEnd)