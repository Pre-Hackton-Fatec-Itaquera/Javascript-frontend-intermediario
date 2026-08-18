# Módulo 04 - Camada HTTP (consumo da API)

Até aqui já possuímos:

- Um projeto Vite + React + TypeScript configurado.
- Roteamento entre páginas.
- Estilização com Tailwind.

Agora chegou a hora de conectar o frontend à API real do backend
(`Professor-mensuring`).

Neste módulo iremos aprender:

- O que é o TanStack Query (React Query) e por que ele substitui
  `useState` + `useEffect` para buscar dados.
- Como centralizar a URL da API num único lugar.
- Como criar hooks de leitura (`useQuery`) por domínio.
- Como criar uma mutação (`useMutation`) para enviar dados à API.

Ao final deste módulo, o frontend será capaz de buscar professores,
matérias, vínculos professor-matéria e avaliações — e também de criar uma
nova avaliação.

Arquivos deste módulo:

- react-query-e-config.md
- hooks-de-leitura.md
- mutations.md

Todos os exemplos apresentados neste módulo são retirados dos domínios
`professor`, `subject`, `professor-subject` e `ratings`, os mesmos domínios
já vistos no backend.
