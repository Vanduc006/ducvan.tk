function includeHeader() {
  fetch('components/header.html')
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
fetch(`${language}.json`)
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


