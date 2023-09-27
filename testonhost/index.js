import mysql from 'mysql'
var connection = mysql.createConnection({
    host: "localhost",
    user: "tsrobuxc_api",
    password: "tsrobuxc_api",
    database: "tsrobuxc_api"
});
  // Kết nối đến cơ sở dữ liệu
connection.connect((err) => {
if (err) {
    console.error('Lỗi kết nối đến cơ sở dữ liệu:', err);
    return;
}
console.log('Kết nối thành công đến cơ sở dữ liệu');
});