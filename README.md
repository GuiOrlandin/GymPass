# APP

GymPass Style app.

## RFs (Requisitos funcionais)

- [] Deve ser possivel se cadastrar;
- [] Deve ser possivel se autenticar;
- [] Deve ser possivel obter o perfil de um usuário logado;
- [] Deve ser possivel obter o numero de check-ins realizados pelo usuário logado;
- [] Deve ser possivel o usuário obter o histórico de check-ins;
- [] Deve ser possivel o usuário buscar academias próximas;
- [] Deve ser possivel o usuário buscar academias pelo nome;
- [] Deve ser possivel o usuário realizar check-in em uma academia;
- [] Deve ser possivel validar o check-in de um usuário;
- [] Deve ser possivel cadastrar uma academia;

## RNs (Regras de negócio)

- [] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [] O usuário não pode fazer 2 check-ins no mesmo dia;
- [] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [] O check-in só pode ser validado até 20 minutos após criado;
- [] O check-in só pode ser validado por administrador;
- [] A academia só pode ser cadastrada por administrador;

## RNFs (Requisitos não funcionais)

- [] A senha do usuário precisa estar criptografada;
- [] Os dados da aplicação precisam estar persistidos em um banco PostgresSQL;
- [] Todas as listas de dados precisam estar paginadas com 20 itens por pagina;
- [] O usuário deve ser identificado por um JWT (JSON web Token);
