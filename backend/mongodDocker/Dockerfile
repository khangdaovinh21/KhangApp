# Sử dụng image Node.js chính thức
FROM node:18

# Tạo thư mục làm việc và sao chép file vào
WORKDIR /app
COPY package*.json ./

# Cài đặt các package
RUN npm install

# Sao chép mã nguồn vào container
COPY . .

# Cấu hình port và lệnh khởi động server
EXPOSE 3000
CMD ["npm", "start"]
