
const URLvideo = document.getElementById('url-video').value
    const SreachBtn = document.querySelector('#download-video')
    const Loading = document.getElementById('loading')
    SreachBtn.addEventListener('click', async e => {
      
      const videoInforDiv = document.querySelector('.video-infor');
      if (videoInforDiv) {
        SreachBtn.disabled = false;
        return 
      } 
      
  try {
    const URLvideo = document.getElementById('url-video').value
    function isValidUrl(URLvideo) {
  const regex = /^(http|https):\/\/([a-z0-9]+\.)*[a-z0-9]+\.[a-z]+(\/.*)*$/;
  return regex.test(URLvideo);
  
}

if (!isValidUrl(URLvideo)) {
  alert('Wrong URL 😥');
  return;
}
SreachBtn.disabled = true;
Loading.style.display = 'block';
    const CALLapi = `https://tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com/vid/index?url=${encodeURIComponent(URLvideo)}`
    console.log(CALLapi)
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '2bdc1f0810mshfc6e44c69c98822p1bdb0bjsn85b73f91c2d1',
        'X-RapidAPI-Host': 'tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com'
      }
    }
    const response = await fetch(CALLapi, options)
    const result = await response.text()
    console.log(result)
    const jsonObj = JSON.parse(result)
        const videoUrls = jsonObj.video
        const Username = jsonObj.author
        const VideoID = jsonObj.videoid
        const Caption = jsonObj.description
        const Thumb = jsonObj.cover
        const Region = jsonObj.region
    Loading.style.display = 'none';    
    SreachBtn.disabled = false;
  let InforElenments = document.createElement('div');
    InforElenments.innerHTML = `
    <div class="video-infor" class="notranslate">
        <img src="${Thumb}" alt="VIDEO THUMBNAIL">
        <div class="title-video">
            <p>Auther Video Username : ${Username} | Nation :${Region}</p>
            <p>Video ID : ${VideoID}</p>
            <p>Caption : ${Caption}</p>

        </div>
        
    </div>
    <div class="down-load" id="down-load" class="notranslate">
        <i class="ti-download fa-solid fa-magnifying-glass"></i>
        <a href="">Download Video</a>

    </div>

      `;

      document.body.appendChild(InforElenments);
    const DownloadBtn = document.getElementById('down-load')
    DownloadBtn.addEventListener('click', e => {
      e.preventDefault();
      downloadVideo(videoUrls);
    })
    function downloadVideo(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob'; // sử dụng blob để lưu trữ video
    xhr.onload = function() {
        if (this.status === 200) {
            const videoBlob = this.response;
            const url = URL.createObjectURL(videoBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = Username + '-' + VideoID + '.mp4';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        }
    document.body.removeChild(InforElenments);    
    };
    xhr.send();
    alert('DOWNLOAD SUCESSFUL')
    document.body.removeChild(InforElenments);
}
    

  } catch (error) {
    console.error(error)
  }
  
});

        
        
