# Usar uma imagem oficial do Node.js
FROM node:16

# Criar e definir o diretório de trabalho no contêiner
WORKDIR /app

# Copiar o package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar o restante do código da aplicação
COPY . .

# Expôr a porta em que a aplicação vai rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]
