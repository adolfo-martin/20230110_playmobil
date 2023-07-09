FROM node:lts-alpine3.17
WORKDIR /app
# COPY package.json .
# RUN npm install
COPY ./backend/. .
EXPOSE 80
CMD ["npm", "run", "start"]

# docker build -t adomargon/server_playmobil:0.20 .
# docker push adomargon/server_playmobil:0.20
# docker start adomargon/server_playmobil:0.20
