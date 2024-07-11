FROM node:20.14.0 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# RUN npm run build
RUN npm run build --configuration=production

FROM nginx:latest
WORKDIR /usr/share/nginx/html
RUN rm -rf *

#copy the built angular app from the build stage
COPY --from=build /app/dist/angular-app/browser .
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]