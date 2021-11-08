FROM node:16.13-alpine

# Set working directory
WORKDIR /usr/src/app

COPY package*.json ./

###  Installing dependencies

RUN npm install --silent --legacy-peer-dep

# Copy local files to app folder
COPY . .

EXPOSE 3000

CMD ["npm","start"]