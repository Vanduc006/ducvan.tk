//index.js
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { checkLogin } from './routes/LoginRouter.js'
import { createUser } from './routes/RegisterRouter.js'

const app = express();
app.use(cors({ origin: 'http://127.0.0.1:5500' }));
app.use(morgan('combined'))

app.use(express.json());
app.post('/register', (req,res) => {
  const requestRegister = req.body
  console.log(requestRegister)
})
app.post('/login', (req, res) => {
  // Lấy dữ liệu JSON từ yêu cầu của client
  const requestLogin = req.body;
  const username = requestLogin.username
  const password = requestLogin.password

  checkLogin(username, password, (result) => {


    if (result === 'Login True') {
      // Xử lý khi đăng nhập thành công
      
      res.json({login_status : 'True'});
    } else if (result === 'Login False') {
      // Xử lý khi đăng nhập không thành công
      res.json({login_status : 'False'});
    } else {
      // Xử lý lỗi kết nối
      res.json({login_status : 'Erro Connect'});
    }
  });
  // const username = { username : requestLogin.username}
  // res.json(username)
  // Kiểm tra nếu requestLogin chứa số và làm phép tính
  // if (typeof requestLogin.number === 'number') {
  //   // Thực hiện phép tính và trả kết quả về client
  //   const result = requestLogin.number * 2; // Phép nhân 2
  //   const responseData = { result };
  //   res.json(responseData);
  // } else {
  //   // Trường hợp dữ liệu không hợp lệ
  //   res.status(400).json({ error: 'Dữ liệu không hợp lệ' });
  // }
});

app.get('/',(req,res) => {
	res.send('<h1>haha</h1>');
})

app.post('/haha', (req, res) => {
    // res.send('POST request to the homepage')
    const imageOutput = 'https://pbxt.replicate.delivery/8FHhVn0AQ3YlBVbUS9OMpmPISHfiHHtWki8An8Vfx0WuUIjRA/out-0.png'
    const responseData = {
        output: imageOutput,
        // data: {
        //   key1: 'value1',
        //   key2: 'value2',
        // },
      };
    
      // Sử dụng .json() để gửi dữ liệu dưới dạng JSON
    res.json(responseData);
})
const PORT = 5000;

app.listen(PORT,() => {
	console.log(`Running on PORT ${PORT}`);
})
