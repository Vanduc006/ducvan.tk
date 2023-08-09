import sys
from PyQt5.QtWidgets import QApplication, QWidget, QLabel, QTextEdit, QPushButton, QVBoxLayout, QMessageBox

class MyApp(QWidget):
    def __init__(self):
        super().__init__()
        self.initUI()

    def initUI(self):
        self.label1 = QLabel("Nhập chữ ở ô 1:")
        self.input1 = QTextEdit()

        self.label2 = QLabel("Nhập chữ ở ô 2:")
        self.input2 = QTextEdit()

        self.result_label = QLabel("Kết quả:")

        self.button = QPushButton("In kết quả")
        self.button.clicked.connect(self.printResult)

        self.copy_button = QPushButton("Copy kết quả")
        self.copy_button.clicked.connect(self.copyResult)

        layout = QVBoxLayout()
        layout.addWidget(self.label1)
        layout.addWidget(self.input1)
        layout.addWidget(self.label2)
        layout.addWidget(self.input2)
        layout.addWidget(self.result_label)
        layout.addWidget(self.button)
        layout.addWidget(self.copy_button)

        self.setLayout(layout)

        self.setWindowTitle("Ứng dụng PyQt5")

    def printResult(self):
        text1 = self.input1.toPlainText()
        text2 = self.input2.toPlainText()
        
        result = f'"{text1}" : "{text2}",'
        self.result_label.setText("Kết quả: " + result)

    def copyResult(self):
        result_text = self.result_label.text().replace("Kết quả: ", "")
        clipboard = QApplication.clipboard()
        clipboard.setText(result_text)
        #QMessageBox.information(self, "Thông báo", "Đã sao chép kết quả")

if __name__ == '__main__':
    app = QApplication(sys.argv)
    ex = MyApp()
    ex.show()
    sys.exit(app.exec_())
