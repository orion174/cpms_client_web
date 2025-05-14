FROM node:22-slim as build

WORKDIR /home/cpms_client_web

COPY . .

RUN npm install && npm run build

FROM nginx:alpine

COPY --from=build /home/cpms_client_web/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
