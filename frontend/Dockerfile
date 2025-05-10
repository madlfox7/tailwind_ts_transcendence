# Use lightweight Node image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy all project files (frontend code, tsconfig.json, etc.)
COPY . .

# Install dependencies
RUN npm install && \
    npm install typescript sass tailwindcss && \
    npm install -g http-server

# Compile SCSS and TS at build time
RUN npx tsc --project tsconfig.json

# 🟢 Compile Tailwind CSS (Local build instead of CDN)
RUN npx tailwindcss -i ./static/css/input.css -o ./static/css/output.css --minify

# Expose frontend dev port
EXPOSE 6060

# Serve static files from root directory
CMD ["http-server", ".", "-p", "6060", "-s", "-d"]
