# Clean_TS_API

**API para gerenciamento de Enquetes**

- [CLEAN-TYPESCRIPT-API](#CLEAN-TYPESCRIPT-API)
  - [Acesso ao Projeto pelo Heroku](#https://api-node-adam.herokuapp.com/api-docs/)
  - [Execução local](#execução-local)
    - [Pré-requisitos](#pré-requisitos)
    - [Executando o projeto](#executando-o-projeto)
  - [Sobre o projeto](#sobre-o-projeto)
    - [Estrutura de diretórios](#estrutura-de-diretórios)
    - [Documentação](#documentação)
    - [Testes](#testes)
      - [Executando os testes](#executando-os-testes)
      - [Resultado](#resultado)



## Acesso ao projeto pelo Heroku

- Primeiramente, o deploy do projeto foi feito no [Heroku](https://www.heroku.com/) e usa o banco de dados do [MongoDbAtlas](https://www.mongodb.com/cloud) e pode ser acessado através do [Link_do_Swagger_da_Api](https://api-node-adam.herokuapp.com/api-docs/)
- Use o email - admin@gmail.com - e a senha admin - e terá acesso de administrador no swagger.

## Como usar a Api

1. [Cadastro](./requirements/signup.md)
2. [Login](./requirements/login.md)
3. [Criar enquete](./requirements/add-survey.md)
4. [Listar enquetes](./requirements/load-surveys.md)
5. [Responder enquete](./requirements/save-survey-result.md)
6. [Resultado da enquete](./requirements/load-survey-result.md)
## Execução local

### Pré-requisitos

- [Git](https://git-scm.com/download/), [Node.js](https://nodejs.org/en/download/),[Docker](https://docs.docker.com/get-docker/), [Docker-Compose](https://docs.docker.com/compose/install/) e [MongoDb](https://www.mongodb.com/try/download/community) instalados.

### Executando o projeto

Todos os comandos abaixo são feitos no terminal

**1** - Faça um clone do repositório e acesse o diretório criado pelo clone.

```sh
git clone https://github.com/AdamHenrique67/Clean_TS_API.git && cd CLEAN_TS_API
```

**2** - Inicie a aplicação:

```sh
npm run up
```

> O comando `npm run up` executa o serviço `app` do [docker-compose](./docker-compose.yml), que baixa a imagem do mongo, nodejs, builda o projeto e inicia a aplicação na porta 5050.
>
> Caso queira remover a aplicação execute `npm run down`.

## Sobre o projeto

### Estrutura de diretórios

```
src/
 ├─ data/
 |   ├─ protocols/
 |   ├─ tests/
 |   └─ usecases/
 ├─ domain/
 |   ├─ models/
 |   ├─ test/
 |   ├─ usecases/
 ├─ infra/
 |   ├─ criptography/
 |   ├─ db/
 |   ├─ validators/
 ├─ main/
 |   ├─ adapter/
 |   ├─ config/
 |   ├─ decorators/
 |   ├─ docs(swagger)/
 |   ├─ factories/
 |   ├─ middlewares/
 |   ├─ routes/
 |   ├─ server.ts/
 ├─ presentation/
 |   ├─ controllers/
 |   ├─ errors/
 |   ├─ helpers/
 |   ├─ middlewares/
 |   ├─ protocols/
 |   ├─ test/
 ├─ validation/
 |   ├─ protocols/
 |   ├─ test/
 |   ├─ validators/
 └─ package.json
```

- **data**: Implementação de interfaces relacionadas a ações no banco de dados (adicionar, remover, etc).
- **domain**: Implementação de interfaces das regras de negócio, definição dos modelos de entrada de dados ao banco de dados.
- **infra**: Implementação de repositórios (ex: mongo-repositories)
Implementação de adaptadores utilizados por esses repositórios (bcrypt)
- **presentation**: Controllers
    errors, helpers, protocolos, utilitários relacionados a esses controllers
- **main**: Servidor propriamente dito
    configurações do servidor
    decoradores (das funcionalidades do servidor, caso necessários)
    factories (instâncias dos controladores)
    middlewares
    rotas
- **validation**: Components que serao utilizados na validação de dados essencias das outras classes. (Design Patterns Composite).

### Documentação

Após iniciar a aplicação, a documentação de toda a api estará disponível a partir do endereço <http://localhost:5050/api-docs/#/>.
Ou acesse o Online pelo link <https://api-node-adam.herokuapp.com/api-docs/>
<>
### Testes

Os testes foram divididos em unitários e integração a fim de garantir a maior cobertura de código no máximo de camadas possíveis. Os testes foram feitos utilzando o [Jest](https://www.npmjs.com/package/jest), [SuperTest](https://www.npmjs.com/package/supertest)
#### Executando os testes

Para executar os testes unitários e de integração execute o seguinte comando:

```sh
npm run test:ci
```

#### Resultado

O resultado dos testes são apresentados no terminal já com a informação de code coverage

<img src=https://user-images.githubusercontent.com/79374233/166612983-37ab8675-b536-448d-9e4b-b4af2eada928.png height="500">
