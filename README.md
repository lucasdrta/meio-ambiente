<p align="center">
    <img alt="Meio Ambiente" src=".github/logo.png" width="100" />
</p>

<h3 align="center">
  Atividade prática do 2º semestre de 2020. 🌱
</h3>

## 💻 Sobre o projeto
<br>

 🌱 Meio-Ambiente - é uma aplicação para gerenciar niveis de autenticação em um sitema fake para o ministério do meio ambiente. <br>
 A autenticação será por meio de analise de biometria. <br> <br>
 A aplicação consiste em mostrar informações sobre fazendas ficticias como: culuta, localização, agrotoxicos utilizados, entre outras informações em **3 diferenters niveis** de autenticação. <br>


- **Nivel 1**: 
  - Nome do fazendeiro responsavel pela terra.
  - Localização da fazenda.
- **Nivel 2**: 
  - Nome do fazendeiro responsavel pela terra.
  - Localização da fazenda.
  - CNPJ do fazendeiro
  - As culturas da fazenda.
- **Nivel 3**: 
  - Nome do fazendeiro responsavel pela terra.
  - Localização da fazenda.
  - CNPJ do fazendeiro
  - As culturas da fazenda.
  - Agrotoxicos empregados nas plantações
  - Doações no ultimo ano


<br>
<br>

 ## Tecnologias utilizadas

---

Principais tecnologias utilizadas no código.

💻 [Node.js](https://nodejs.org/)

🧰 [Typescript](https://www.typescriptlang.org/)

✅ [Jest](https://jestjs.io/)

📦 [MongoDB](https://www.mongodb.com/)

<br>
<br>

## Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

<br>

### 🎲 Rodando a aplicação

```bash
# Para rodar os proximos comandos com yarn, será necessario instala-lo
$ npm i -g yarn


# Clone este repositório
$ git clone https://github.com/lucasdrta/meio-ambiente.git
# Acesse a pasta do projeto no terminal/cmd
$ cd meio-ambiente
# Acesse a pasta server no terminal/cmd
$ cd ./server
# Instale as dependências
$ yarn ou npm install
# Na raiz do projeto, acesse a pasta server no terminal/cmd
$ cd ./frontend
# Instale as dependências
$ yarn ou npm install
# Execute a aplicação
$ yarn start

# ------------------------------------------------------------------------------------
# Para a aplicação ser executada sem erros é preciso ter o serviço do mongodb rodando.
# Para instalar, veja a documentação em https://www.mongodb.com/
# ------------------------------------------------------------------------------------

# Inicie primero o server
$ cd ./server
$ yarn start ou npm start
# O servidor inciará na porta:3000 - acesse <http://localhost:3333>

# Depois inicie o frontend
$ cd ./frontend
$ yarn start ou npm start

```

<br>
<br>


## Recursos da aplicação

| Recursos                   | Descrição                                               |
| :--------------------------| :-------------------------------------------------------|
| `GET /farms`               | Retorna uma lista com todos as informações das fazendas |
| `POST /farms`              | Rota para criação de uma nova fazenda                   |
| `POST /users`              | Rota para criação de um novo usuario                    |
| `POST /users/authenticate` | Rota login de um usuario                                |
| `GET /users/me`            | Rota para retornar informaçoes de um usuario            |

<br>
<br>


## 📝 Licença

Este projeto esta sobe a licença MIT.

Feito com ❤️ e ☕ por Lucas Duarte.
