# SpaceHub – Sistema de Reserva de Salas

O **SpaceHub** é um site de reserva de salas desenvolvido para facilitar o agendamento e a gestão de espaços de forma simples e eficiente.

O projeto utiliza um **frontend em React** e um **servidor em JavaScript** que atua como **API**, responsável pela comunicação com o banco de dados **MongoDB**.

---

## Visão Geral da Arquitetura

- **Frontend**: React  
- **Backend / API**: JavaScript (Node.js)  
- **Banco de Dados**: MongoDB  
- **Comunicação**: API REST entre frontend e backend  

O frontend consome a API para realizar operações como:
- Criar reservas
- Consultar disponibilidade de salas
- Listar e gerenciar reservas

---

## Funcionalidades

- Reserva de salas
- Consulta de disponibilidade
- Integração com banco de dados MongoDB
- Comunicação segura via API

---

## Scripts Disponíveis

No diretório do projeto, você pode executar:

### `yarn start`
Executa o aplicativo em modo de desenvolvimento.  
Abra [http://localhost:3000](http://localhost:3000) para visualizar no navegador.

A página será recarregada automaticamente quando houver alterações no código.

---

### `yarn test`
Inicia o executor de testes em modo interativo.

---

### `yarn build`
Cria a versão de produção do aplicativo na pasta `build`.

- Código otimizado para melhor desempenho
- Arquivos minificados
- Pronto para deploy

---

### `yarn eject`
**Atenção:** Esta é uma operação sem volta.

Remove a abstração do Create React App e copia todas as configurações (Webpack, Babel, ESLint, etc.) para o projeto, permitindo total controle da configuração.

---

## API e Banco de Dados

O backend foi desenvolvido em **JavaScript** e funciona como uma **API REST**, sendo responsável por:

- Receber requisições do frontend
- Processar regras de negócio
- Comunicar-se com o banco de dados **MongoDB**
- Retornar dados de reservas e salas

---

## Tecnologias Utilizadas

- React
- JavaScript (Node.js)
- MongoDB
- Yarn

---

## Deploy

Após executar `yarn build`, o projeto estará pronto para ser publicado em qualquer serviço de hospedagem compatível com aplicações React.

---

## Mais Informações

- Documentação do React: https://reactjs.org/
- Documentação do Create React App: https://create-react-app.dev/

