FROM node:lts-alpine3.17
WORKDIR /app
# COPY package.json .
# RUN npm install
COPY ./backend/. .
EXPOSE 80
CMD ["npm", "run", "start"]

<<<<<<< HEAD
# docker build -t adomargon/server_playmobil:0.22 .
# docker push adomargon/server_playmobil:0.22
# docker start adomargon/server_playmobil:0.22
=======
# docker build -t adomargon/server_playmobil:0.20 .
# docker push adomargon/server_playmobil:0.20
# docker start adomargon/server_playmobil:0.20
>>>>>>> 855eb60a9e8845a4acbafeb6248f6b39cdb17ac5
