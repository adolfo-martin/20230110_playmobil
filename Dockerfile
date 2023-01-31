FROM node:lts-alpine3.17
WORKDIR /app
# COPY package.json .
# RUN npm install
COPY ./backend/. .
EXPOSE 8082
CMD ["npm", "run", "start"]

# docker build -t adomargon/server_playmobil:0.16 .
# docker push adomargon/server_playmobil:0.16
# docker start adomargon/server_playmobil:0.16
