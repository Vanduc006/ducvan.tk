import pool from '../cotrollers/ConnectDatabase.js';
export function userListImage(author, callback) {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Lỗi kết nối cơ sở dữ liệu:', err);
        callback('Connect Error');
      } else {
        const sql = 'SELECT * FROM user_images WHERE authors = ? ORDER BY id LIMIT 8';
        const authorName = 'Van Duc'; // Giá trị của authors mà bạn muốn tìm
        // măch định là Van Duc
        connection.query(sql, [authorName], (error, results) => {
        if (error) {
            callback('Get User List Images Fail')
        }
        // Tạo một đối tượng JSON chứa dữ liệu
        const listUserImage = {
            listimages: {
            images: results.map((row) => ({
                id: row.id,
                authors: row.authors,
                idimages: row.idimages,
                urlimages: row.urlimages,
                datecreate: row.datecreate,
                modals: row.modals,
                prompt: row.prompt,
                settings: row.settings,
                isdelete: row.isdelete,
            })),
            },
        };

        // Hiển thị dữ liệu dưới dạng JSON
        // console.log(JSON.stringify(responseData, null, 2));
        callback (JSON.stringify(listUserImage))
        // Đóng kết nối sau khi hoàn thành
        connection.release();
        });

      }
    });
}
