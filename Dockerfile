# Chọn base image
FROM node:20-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy file package.json và package-lock.json (nếu có)
COPY package.json package-lock.json ./

# Cài đặt các phụ thuộc
RUN npm install

# Copy tất cả mã nguồn vào thư mục làm việc
# COPY --from=deps /app/node_modules ./node_modules

COPY . .

# Build ứng dụng Next.js
RUN npm run build
ENV PORT 3001
# Mở cổng mà ứng dụng sẽ chạy trên đó
EXPOSE 3001

# Chạy ứng dụng Next.js
CMD ["npm", "start"]