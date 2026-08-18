# Módulo 03 - Estilização com Tailwind CSS

## Objetivo do módulo

Neste módulo você irá aprender:

- O que é o Tailwind CSS e como ele muda a forma de escrever estilos.
- Como o Tailwind é ligado ao projeto (sem arquivo de configuração
  separado).
- Como o padrão de classes utilitárias aparece no código real do projeto.

---

## O que é o Tailwind CSS?

Tailwind é um framework de CSS baseado em **classes utilitárias**. Em vez de
escrever um arquivo `.css` separado com nomes de classe como
`.card-professor`, você compõe o visual direto no componente usando classes
prontas:

```tsx
<div className="w-full bg-white rounded-2xl border border-[#ECE9F8] p-4">
```

Cada classe faz uma única coisa:

| Classe | Efeito |
|---|---|
| `w-full` | largura 100% |
| `bg-white` | fundo branco |
| `rounded-2xl` | cantos bem arredondados |
| `border` | borda de 1px |
| `border-[#ECE9F8]` | cor da borda (valor arbitrário, em hexadecimal) |
| `p-4` | padding em todos os lados |

---

## Como o Tailwind é ligado ao projeto

Diferente de configurações mais antigas do Tailwind (que exigiam um
`tailwind.config.js` e um `postcss.config.js`), este projeto usa a
integração mais recente, feita por plugin do Vite — já vista no Module-00:

```ts
// vite.config.ts
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

E o CSS global fica reduzido a uma única linha:

```css
/* index.css */
@import "tailwindcss";
```

Esse `@import` é o suficiente para habilitar todas as classes utilitárias
do Tailwind no projeto inteiro — é esse `index.css` que é importado uma
única vez, no `main.tsx` (Module-00).

---

## Classes responsivas

O projeto usa prefixos como `md:` para mudar o estilo a partir de um
determinado tamanho de tela (breakpoint "medium"):

```tsx
<div className="w-full max-w-md md:max-w-4xl flex flex-col gap-4 md:gap-6">
```

Lendo essa linha:

- Por padrão (telas pequenas/celular): largura máxima `max-w-md`, espaçamento
  `gap-4`.
- A partir do breakpoint `md` (telas médias/desktop): largura máxima
  `max-w-4xl`, espaçamento `gap-6`.

Esse é o padrão *mobile-first* do Tailwind: as classes sem prefixo valem
para qualquer tamanho de tela; os prefixos (`md:`, `lg:`...) sobrescrevem a
partir daquele tamanho para cima.

---

## Cores fora da paleta padrão

Em vários pontos o projeto usa cores específicas da identidade visual do
"Professor Mensuring" (roxo `#6D4CF0`, `#4B2FD9`, fundo `#F3F1FB`...) que não
fazem parte da paleta padrão do Tailwind. Para isso, usa-se a sintaxe de
**valor arbitrário**, entre colchetes:

```tsx
className="bg-[#6D4CF0]"
className="text-[#8A8497]"
className="from-[#7B5CF7] to-[#4B2FD9]"
```

Também aparecem gradientes escritos direto como `style` inline quando o
Tailwind sozinho não descreve o gradiente desejado com clareza:

```tsx
style={{ background: "linear-gradient(100deg,#7B5CF7 0%,#4B2FD9 100%)" }}
```

---

## Estados de interface com classes condicionais

O Tailwind também é usado para expressar estados, sem CSS separado — por
exemplo, uma estrela preenchida ou vazia dependendo da nota:

```tsx
<Star
  color={n <= r.value ? "#FBBF24" : "#ECE9F8"}
  fill={n <= r.value ? "#FBBF24" : "#ECE9F8"}
/>
```

E animações prontas do próprio Tailwind, como `animate-pulse` (usada no
`skeletonHomePage.tsx`, visto no Module-06) ou `animate-spin` (usada nos
ícones de carregamento com `lucide-react`).

---

## Materiais complementares

### Documentações

Tailwind CSS

https://tailwindcss.com/docs

Tailwind — Vite Plugin

https://tailwindcss.com/docs/installation/using-vite

lucide-react (ícones usados no projeto)

https://lucide.dev/guide/packages/lucide-react

---

### Vídeos recomendados

Tailwind CSS em 100 segundos (Fireship)

https://www.youtube.com/results?search_query=tailwind+css+fireship

---

## Resumo

Neste módulo aprendemos:

- O que são classes utilitárias e como elas substituem arquivos `.css`
  separados.
- Como o Tailwind é ligado ao projeto via plugin do Vite, sem arquivo de
  configuração extra.
- Como usar classes responsivas (`md:`) e valores arbitrários (`bg-[#hex]`).
- Como classes condicionais no `className` expressam estados da interface.

No próximo módulo iremos estudar a camada `http/`: como o frontend busca
dados da API do backend usando o TanStack Query.
