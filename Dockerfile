FROM node:22-bullseye AS dev

RUN apt-get update; apt-get install -y git
RUN curl -fsSL https://dl.google.com/linux/linux_signing_key.pub | apt-key add - && \
  echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list && \
  apt-get update && apt-get install -y google-chrome-stable

RUN npm i -g npm@latest; npm i -g @angular/cli@~19 nodemon

WORKDIR /var/www

# COPY package.json package-lock.json ./

# RUN npm install

COPY . .


USER 1000:1000

# RUN npm run test
# RUN npm run build

CMD [ "bash", "./start.sh" ]

FROM nginx:alpine AS prod

WORKDIR /var/www
COPY --from=dev /var/www/dist/convert/browser/ ./
COPY nginx.conf /etc/nginx/conf.d/default.conf

