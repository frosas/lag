FROM node:9.2
EXPOSE 80

WORKDIR /app
# See http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/
COPY package.json .
RUN npm i -q
COPY . .
RUN node_modules/.bin/webpack -p
CMD ["npm", "start"]