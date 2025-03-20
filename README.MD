# APP

GymPass style app.

## RFs (Requisitos funcionais)

- [✅] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuario logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [✅] O usuário não pode se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não pode fazer check-in a mais de 100m da academia;
- [ ] O check-in só pode ser validado até 20 minutos depois de ser criados;
- [ ] O check-in só pode ser validado por administradores;  
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [✅] A senha do usuário deve ser criptografada;
- [ ] Os dados da aplicação precisam estar persistodos em um banco PostgresSQL;
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token)


## Installs / Libs

~~~~ javaScript
npm i typescript @types/node tsx tsup -D
~~~~
~~~~ javaScript
npm i fastify
~~~~
~~~~ javaScript
npm i dotenv
~~~~
~~~~ javaScript
npm i zod
~~~~
~~~~ javaScript
npm i prisma -D
~~~~
~~~~ javaScript
npm i @prisma/client
~~~~
~~~~ javaScript
npm i bcryptjs
~~~~
~~~~ javaScript
npm i -D @types/bcryptjs
~~~~
~~~~ javaScript
npm i vitest vite-tsconfig-paths -D
~~~~
~~~~ javaScript
npm i -D @vitest/ui
~~~~

## Executar Pacotes

~~~~ javaScript
npx tsc --init
~~~~
~~~~ javaScript
npx prisma init 
~~~~
~~~~ javaScript
npx prisma generate
~~~~
