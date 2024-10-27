FROM node:18

WORKDIR /app

# Imposta l'ambiente per evitare di chiedere informazioni interattive
ENV NG_CLI_ANALYTICS=false

RUN npm install -g @angular/cli

COPY . .

RUN npm install

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]
