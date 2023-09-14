# Đường dẫn tới tệp văn bản chứa dữ liệu
file_path = 'haha.txt'  # Thay đổi thành đường dẫn thực tế của bạn

# Mở tệp và đọc nội dung
with open(file_path, 'r') as file:
    file_contents = file.read()

# Tìm và trích xuất chuỗi nằm giữa các cặp <Key> và </Key>
import re

pattern = r'<Key>(.*?)<\/Key>'  # Một biểu thức chính quy để tìm chuỗi trong cặp <Key></Key>
matches = re.findall(pattern, file_contents, re.DOTALL)

# In ra danh sách các chuỗi được trích xuất
n=0
for match in matches:
    l = 'https://kaikun-ai-image.s3.ap-northeast-1.amazonaws.com/' + match.strip() 
    print(l) # Loại bỏ khoảng trắng dư thừa nếu có
    # import requests

    # # Đường dẫn URL của hình ảnh


    # # Thực hiện yêu cầu GET để tải hình ảnh
    # response = requests.get(l)

    # # Kiểm tra xem yêu cầu có thành công không (status code 200)
    # if response.status_code == 200:
    #     # Lưu hình ảnh vào tệp cục bộ
    #     filename = str(n)+"downloaded_image"+".png"
    #     print(filename)
    #     with open(filename, "wb") as f:
    #         f.write(response.content)
    #     print("Hình ảnh đã được tải xuống thành công.")
    #     n = n + 1
    # else:
    #     print("Không thể tải hình ảnh. Mã trạng thái:", response.status_code)
