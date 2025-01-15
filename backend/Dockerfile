FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm i
CMD ["node", "index.js"]


EXPOSE 80