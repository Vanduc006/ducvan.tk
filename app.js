
function includeHeader() {
    fetch('https://raw.githubusercontent.com/Vanduc006/ducvan/main/components/header.html')
      .then(response => response.text())
      .then(data => {
        const headerContainer = document.querySelector('#header-container');
        headerContainer.innerHTML = data;
      });
}
  
document.addEventListener("DOMContentLoaded", function() {
    const headerHeight = document.querySelector(".header").clientHeight;
    const contentElement = document.querySelector(".sections");
    contentElement.style.paddingTop = headerHeight + "px";
});