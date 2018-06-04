FROM node:10
EXPOSE 80

WORKDIR /app
# See http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/
COPY package.json .
RUN npm i -q
COPY . .
RUN npm run build
CMD ["npm", "start"]