FROM node:18-alpine
WORKDIR /api
COPY package* .
RUN npm install

COPY . .

EXPOSE 3500

CMD [ "npx" , "nodemon" ]