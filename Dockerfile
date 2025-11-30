FROM node:20.19-alpine3.21
WORKDIR /app
# COPY package.json .
# RUN npm install
COPY ./backend/. .
EXPOSE 3000
CMD ["npm", "run", "start"]

# docker build -t adomargon/server_playmobil:0.24 .
# docker push adomargon/server_playmobil:0.24
# docker start adomargon/server_playmobil:0.24
