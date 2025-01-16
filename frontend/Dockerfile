FROM node:18-alpine AS build
WORKDIR /project
COPY . .
RUN npm i
RUN npm run build

FROM steebchen/nginx-spa:stable
WORKDIR /app
COPY --from=build /project/build/. .

EXPOSE 80

CMD ["nginx"]