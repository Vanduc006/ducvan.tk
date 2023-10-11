import fetch from 'node-fetch';
import mysql  from 'mysql'
// Tạo kết nối đến cơ sở dữ liệu

let i = 0
while (i < 20) {
  fetchImageURL()
  i++;
}
async function fetchImageURL() {
    try {
      const response = await fetch('https://picsum.photos/1280/1280/?random');
      const imageURL = response.url; // Truy cập đường dẫn từ thuộc tính 'url'
      console.log('Img :',imageURL)
      insert(imageURL)
    } catch (error) {
      console.log('Erro')
    }
  }

function insert(url) {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@Matkhau12345",
    database: "ducvan"
});
  connection.connect((err) => {
    if (err) {
      console.error('Lỗi kết nối đến cơ sở dữ liệu:', err);
      return;
    }
    console.log('Kết nối thành công đến cơ sở dữ liệu');
    
    // Dữ liệu để chèn vào bảng
    const userData = {
      authors: 'Van Duc',
      idimages: 1,
      urlimages: url,
      datecreate: new Date(),
      modals: 'Random Img',
      prompt: 'This is random img from API',
      settings: 'Default settings',
      isdelete: 'false'
    };
  
    // Truy vấn SQL để chèn dữ liệu
    const sql = 'INSERT INTO user_images SET ?';
  
    // Thực hiện truy vấn chèn dữ liệu
    connection.query(sql, userData, (err, result) => {
      if (err) {
        console.error('Lỗi chèn dữ liệu:', err);
      } else {
        console.log('Dữ liệu đã được chèn thành công!');
      }
  
      // Đóng kết nối đến cơ sở dữ liệu sau khi hoàn thành
      connection.end();
    });
});
}


