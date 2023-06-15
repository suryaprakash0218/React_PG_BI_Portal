FROM node:12.22.9

WORKDIR /react-web-app

COPY package.json ./

COPY package-lock.json ./

RUN npm install

COPY . ./

EXPOSE 9000

# ENTRYPOINT [ "npm" ]

CMD ["npm", "run", "start"]
