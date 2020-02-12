FROM node:7

WORKDIR /src/app

COPY . /src/app

RUN npm install
RUN npm run build
RUN npm run 

EXPOSE 5555