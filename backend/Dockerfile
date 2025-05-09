#FROM node:18-alpine

#WORKDIR /app

#COPY package.json ./

#RUN apk add --no-cache sqlite

#RUN npm install

#RUN npm install bcrypt

#RUN npm install jsonwebtoken

#RUN npm install @fastify/cookie

#COPY . .

#EXPOSE 8080

#EXPOSE 5050

#CMD ["npm", "start"]


FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
# COPY package.json ./
COPY . .

# Install sqlite and dependencies
RUN apk add --no-cache sqlite

# Install Node.js dependencies
RUN npm install

# Install @fastify/multipart
#RUN npm install @fastify/multipart

# Install pip for Python
RUN apk add --no-cache py3-pip

# Install sqlite-web
RUN pip install sqlite-web --break-system-packages

# Copy the rest of your application code

# Expose the Fastify port
EXPOSE 8080

# Optional: expose a dev/debugging port
EXPOSE 5050

# Start the application
CMD ["npm", "start"]
