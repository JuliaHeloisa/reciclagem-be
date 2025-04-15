# Usa uma imagem oficial do Node.js
FROM node:18-alpine 

# Define o diretório de trabalho
WORKDIR /app 

# Copia os arquivos do projeto
COPY package.json package-lock.json ./ 
COPY tsconfig.json ./

# Instala as dependências
RUN rm -rf node_modules package-lock.json && npm install

# Copia o restante do código
COPY . . 

# Compila a aplicação
RUN npm run build 

# Expõe a porta usada pela aplicação
EXPOSE 3000 

# Comando para rodar o servidor
CMD ["npm", "run", "start"]
