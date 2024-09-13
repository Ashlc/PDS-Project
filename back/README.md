## Como Executar

Para executar o projeto localmente, siga estas etapas:

1. Certifique-se de ter o Node.js e o npm instalados em sua máquina.
2. Clone este repositório.
3. Navegue até o diretório do projeto.

4. Instale as dependências.

```
npm install
```

5. Copie o arquivo `.env.example` para `.env` e configure suas variáveis de ambiente conforme necessário:
    
    `cp .env.example .env` 
    
    Em sistemas Windows, você pode usar:
    
    `copy .env.example .env` 

6. Execute a imagem do banco com docker.

```
docker compose up -d
```

7. Execute o comando prisma para criar as tabelas do banco.

```
npx prisma db push
```

8. Execute o comando prisma para gerar os seeds.

```
npx prisma db seed
```

9. Execute o projeto.

```
npm start
```


## Documentação da API

A documentação da API está disponível na pasta `/api-documentation/wkr_scratchpad.json`.

Para fazer a importação do arquivo no postman ou outro cliente de API, você pode seguir o seguinte passo a passo:

1. Abra o Postman.
2. Clique em "Import" (ou "Importar" no português).
3. Selecione "File" (ou "Arquivo" no português).
4. Navegue até o arquivo `wkr_scratchpad.json` na pasta `api-documentation`.
5. Clique em "Open" (ou "Abrir" no português).
6. Confirme a importação.
