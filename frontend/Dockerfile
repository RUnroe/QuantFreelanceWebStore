FROM node AS build
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm index.html
COPY --from=build /app/build/. .

EXPOSE 80