# JavaScript Intermediário - Pré-Hackton Fatec Itaquera

Este repositório reúne o material de apoio e o projeto prático de um curso de JavaScript intermediário, pensado como uma jornada de aprendizagem mão na massa dentro do contexto do Pré-Hackton da Fatec Itaquera.

A proposta do curso é ir além da teoria: os alunos montam, entendem e evoluem um projeto real de frontend enquanto estudam conceitos fundamentais de JavaScript, React, rotas, HTTP, formulários, validação e organização de código.

---

## Sobre o curso

Este material foi organizado para ser usado em um ambiente de aprendizado prático, com foco em:

- JavaScript intermediário
- React + Vite
- Estrutura de pastas
- Roteamento
- Requisições HTTP
- Componentização
- Formulários e validação
- Organização da aplicação em camadas

O objetivo é que o aluno tenha uma base sólida para continuar evoluindo em projetos web reais, especialmente em contextos de desafios e hackathons.

---

## Estrutura do repositório

```text
javascript-intermediario-frontend/
├── modules/
│   ├── Module-00-Setup-Projeto/
│   ├── Module-01-Estrutura-Pastas/
│   ├── Module-02-Roteamento/
│   ├── Module-03-Estilizacao-Tailwind/
│   ├── Module-04-Camada-HTTP/
│   ├── Module-05-Formularios-Validacao/
│   ├── Module-06-Paginas-e-Componentes/
│   └── SUPORTE.md
│
├── professor-mensuring-front/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   ├── index.html
│   └── README.md
│
├── .gitignore
├── README.md
└── .git
```

### Explicação rápida

- `modules/`: materiais de aula, exercícios, explicações e módulos didáticos organizados por etapa.
- `professor-mensuring-front/`: projeto prático em React que é construído ao longo do curso.

Essa separação permite que o aluno veja o conteúdo teórico e o projeto em paralelo, mantendo uma organização clara.

---

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- Node.js 18+ 
- npm ou yarn
- Git
- VS Code (recomendado)

---

## Como usar este repositório

### 1. Clone o projeto

```bash
git clone <url-do-repositorio>
cd javascript-intermediario-frontend
```

### 2. Instale as dependências do projeto prático

Entre na pasta do frontend:

```bash
cd professor-mensuring-front
npm install
```

### 3. Inicie o projeto

```bash
npm run dev
```

A aplicação deve abrir no navegador em uma porta local do Vite, normalmente:

```text
http://localhost:5173
```

### 4. Estude pelos módulos

Acesse a pasta `modules/` e siga na ordem dos módulos. Cada um deles representa uma etapa do curso e está conectado com a evolução do projeto em `professor-mensuring-front/`.

---

## Fluxo recomendado de aprendizado

1. Leia o módulo correspondente em `modules/`
2. Entenda os conceitos explicados no material
3. Aplique os exercícios no projeto em `professor-mensuring-front/`
4. Teste a aplicação localmente
5. Refaça o passo em seu próprio ritmo

O curso foi pensado para ser progressivo, com foco em prática e entendimento real do código.

---

## Objetivo do projeto prático

O projeto `professor-mensuring-front` simula uma aplicação de avaliação de professores, com navegação, consumo de APIs, listagem e formulários. Ao longo dos módulos, o aluno vai evoluir essa aplicação de forma incremental.

---

## Sobre o Pré-Hackton da Fatec Itaquera

Este curso faz parte do contexto do Pré-Hackton da Fatec Itaquera, uma iniciativa de formação prática e colaborativa, com foco em:

- desenvolvimento de projetos reais
- trabalho em equipe
- resolução de problemas
- aplicação de tecnologias em contexto de inovação
- preparação para desafios e hackathons

A ideia é que o aluno saia do curso com um projeto concreto, já compreendendo a lógica por trás da construção de aplicações web modernas.

---

## Dica para alunos

A melhor forma de aprender aqui é:

- entender o módulo antes de abrir código
- mexer no projeto sem medo
- testar pequenas mudanças
- ler os erros e observar o comportamento da aplicação

A prática é o centro do aprendizado.

---

## Contribuição

Este repositório foi pensado para apoio didático e desenvolvimento prático. O uso compartilhado e a evolução do material fazem parte do processo de aprendizagem.

---

## Licença

Este projeto foi desenvolvido para fins educacionais dentro do contexto do curso e do Pré-Hackton da Fatec Itaquera.

---

## Observação final

Se você está começando agora, vá módulo por módulo. Não tente entender tudo de uma vez. O mais importante é construir, testar, refletir e repetir.

A jornada começa com o primeiro módulo e fica mais forte quando o aprendizado é colocado em prática.
