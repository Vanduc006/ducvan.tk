//index.js

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';


const app = express();
app.use(cors({ origin: 'http://127.0.0.1:5500' }));
app.use(morgan('combined'))
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
