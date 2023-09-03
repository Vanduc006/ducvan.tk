function includeHeader() {
  if (localStorage.getItem('userselect')) {
    const uerselect = localStorage.getItem('userselect')
    loadLanguage(uerselect)
  }
  else {
    console.log('language was not selected')
  }
  const forLocal = '../components/header.html'
  const forGithub = 'https://raw.githubusercontent.com/Vanduc006/ducvan/main/components/header.html'
  fetch(forGithub)
    .then(response => response.text())
    .then(data => {
      const headerContainer = document.querySelector('#header-container');
      headerContainer.innerHTML = data;

      // Thêm sự kiện change vào languageSelector sau khi header đã được tải
      // const languageSelector = document.getElementById('languageSelector');
      // languageSelector.addEventListener('change', function() {
      //   const selectedLanguage = languageSelector.value;
      //   loadLanguage(selectedLanguage);
      // });

      const selectLang = document.querySelector('.selectlang')
      const selectLangClose = document.querySelector('.selectlang-close')
      const showSelectLang = document.querySelector('.languageSelector')
      // languageSelector
      showSelectLang.addEventListener('click', e => {
 
        selectLang.classList.add('modal-open')

      })
      selectLangClose.addEventListener('click', e => {
 
        selectLang.classList.remove('modal-open')
      })

      //Ngôn ngữ dc chọn
      const langsElements = document.querySelectorAll('.langs');

      // Lặp qua từng phần tử và thêm sự kiện click
      langsElements.forEach(lang => {
          lang.addEventListener('click', () => {
              const langValue = lang.getAttribute('value'); // Lấy giá trị 'value'
              //console.log(langValue); // In ra giá trị khi người dùng nhấp vào
              selectLangClose.click()
              localStorage.setItem('userselect',langValue)
                      
              Toastify({
                text: "Language : " + langValue,
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
              loadLanguage(langValue)
          });
      });
    });
}

document.addEventListener("DOMContentLoaded", function() {
  const headerHeight = document.querySelector(".header").clientHeight;
  const contentElement = document.querySelector(".sections");
  contentElement.style.paddingTop = headerHeight + "px";
  
  // Gọi includeHeader để tải header sau khi DOMContentLoaded
  includeHeader();
});



function loadLanguage(language) {
fetch(`../${language}.json`)
  .then(response => response.json())
  .then(data => {
    applyLanguage(data);
  });
}

function applyLanguage(languageData) {
const elementsToTranslate = document.querySelectorAll('[data-translate]');
elementsToTranslate.forEach(element => {
  const translationKey = element.getAttribute('data-translate');
  element.textContent = languageData[translationKey];
});
}


// Mặc định, tải ngôn ngữ tiếng Anh
loadLanguage('en');


