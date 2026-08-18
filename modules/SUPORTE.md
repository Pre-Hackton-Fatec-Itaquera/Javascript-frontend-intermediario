# Suporte do Projeto (Frontend)

Este arquivo centraliza as tecnologias usadas neste material e serve como
ponto de partida para quem estiver acompanhando os módulos do frontend.

## Objetivo

O projeto foi organizado para explicar, na prática, como um frontend React
+ TypeScript evolui de uma base simples até uma aplicação completa,
consumindo a API do backend `Professor-mensuring`: setup, roteamento,
estilização, consumo de dados, formulários validados e composição de
telas.

## Tecnologias usadas

### Vite

Ferramenta de build e servidor de desenvolvimento. É a base de todo o
projeto e aparece desde o módulo introdutório.

Documentação oficial: [vitejs.dev](https://vitejs.dev/guide/)

### React

Biblioteca usada para construir a interface através de componentes.

Documentação oficial: [react.dev](https://react.dev/learn)

### TypeScript

Adiciona tipagem estática ao JavaScript, melhorando organização,
previsibilidade e manutenção do código — o mesmo papel que já cumpre no
backend.

Documentação oficial: [typescriptlang.org/docs](https://www.typescriptlang.org/docs/)

### React Router (react-router-dom)

Biblioteca de roteamento, responsável por trocar de tela conforme a URL
muda, sem recarregar a página.

Documentação oficial: [reactrouter.com](https://reactrouter.com/en/main)

### Tailwind CSS

Framework de CSS baseado em classes utilitárias, usado para estilizar
todas as telas do projeto.

Documentação oficial: [tailwindcss.com/docs](https://tailwindcss.com/docs)

### TanStack Query (React Query)

Biblioteca de busca, cache e sincronização de dados vindos da API.

Documentação oficial: [tanstack.com/query](https://tanstack.com/query/latest/docs/framework/react/overview)

### React Hook Form

Biblioteca de formulários, responsável pelo estado dos campos, envio e
exibição de erros de validação.

Documentação oficial: [react-hook-form.com](https://react-hook-form.com/get-started)

### Zod

Biblioteca de validação e inferência de tipos — usada tanto no backend
quanto no frontend, aqui para validar os dados dos formulários.

Documentação oficial: [zod.dev](https://zod.dev/)

### @hookform/resolvers

Conecta o React Hook Form a bibliotecas de validação como o Zod.

Documentação do pacote: [github.com/react-hook-form/resolvers](https://github.com/react-hook-form/resolvers)

### lucide-react

Biblioteca de ícones usada em toda a interface do projeto.

Documentação oficial: [lucide.dev](https://lucide.dev/guide/packages/lucide-react)

## Onde cada parte aparece

### Base e configuração

- [Module-00-Setup-Projeto/configuracao-inicial.md](Module-00-Setup-Projeto/configuracao-inicial.md)

### Estrutura e organização

- [Module-01-Estrutura-Pastas/arquitetura.md](Module-01-Estrutura-Pastas/arquitetura.md)

### Roteamento

- [Module-02-Roteamento/roteamento.md](Module-02-Roteamento/roteamento.md)

### Estilização

- [Module-03-Estilizacao-Tailwind/estilizacao-tailwind.md](Module-03-Estilizacao-Tailwind/estilizacao-tailwind.md)

### Consumo da API

- [Module-04-Camada-HTTP/readme.md](Module-04-Camada-HTTP/readme.md)
- [Module-04-Camada-HTTP/react-query-e-config.md](Module-04-Camada-HTTP/react-query-e-config.md)
- [Module-04-Camada-HTTP/hooks-de-leitura.md](Module-04-Camada-HTTP/hooks-de-leitura.md)
- [Module-04-Camada-HTTP/mutations.md](Module-04-Camada-HTTP/mutations.md)

### Formulários e validação

- [Module-05-Formularios-Validacao/formularios-validacao.md](Module-05-Formularios-Validacao/formularios-validacao.md)

### Páginas e componentes

- [Module-06-Paginas-e-Componentes/readme.md](Module-06-Paginas-e-Componentes/readme.md)
- [Module-06-Paginas-e-Componentes/hooks-da-pagina.md](Module-06-Paginas-e-Componentes/hooks-da-pagina.md)
- [Module-06-Paginas-e-Componentes/composicao-da-home.md](Module-06-Paginas-e-Componentes/composicao-da-home.md)

## Observação para estudo

Assim como no material do backend, a ideia aqui é mostrar o caminho
completo de um frontend real consumindo uma API real, então os exemplos
crescem em complexidade conforme os módulos avançam. O melhor uso é seguir
a ordem dos módulos e observar como cada conceito do backend (domínios,
camadas, validação) reaparece do lado do frontend.
