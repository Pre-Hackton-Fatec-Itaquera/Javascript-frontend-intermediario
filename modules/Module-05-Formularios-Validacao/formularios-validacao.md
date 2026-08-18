# Módulo 05 - Formulários e validação

## Objetivo do módulo

Neste módulo você irá aprender:

- Por que usar `react-hook-form` em vez de `useState` para cada campo.
- Como o `zod` descreve as regras de validação como um schema único.
- Como `@hookform/resolvers` conecta as duas bibliotecas.
- Como um formulário mais simples (busca) e um mais complexo (avaliação com
  seletor de estrelas) são construídos com essas ferramentas.

---

## Por que react-hook-form + zod?

Sem essas bibliotecas, um formulário exigiria, para cada campo:

- Um `useState` guardando o valor digitado.
- Um `onChange` atualizando esse estado a cada tecla.
- `if`s espalhados verificando se o valor é válido antes de enviar.
- Estado manual para mostrar mensagens de erro.

A combinação usada neste projeto separa essa responsabilidade em duas
partes:

- **`zod`** descreve a **regra** ("nome precisa ter pelo menos 2 letras")
  uma única vez, como um schema — em vez de espalhar `if`s pelo componente.
- **`react-hook-form`** cuida do **estado** do formulário (valores, envio,
  exibição de erros), sem exigir um `useState` por campo.

---

## SearchProfessorForm — o formulário mais simples

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const searchSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Digite ao menos 2 letras")
});

type SearchFormData = z.infer<typeof searchSchema>;

type SearchProfessorFormProps = {
  onSearch: (name: string) => void;
};

export function SearchProfessorForm({ onSearch }: SearchProfessorFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: { name: "" },
  });

  function onSubmit(data: SearchFormData) {
    onSearch(data.name);
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full rounded-full border border-[#ECE9F8] bg-white flex items-center px-4 py-3 gap-2">
        <input
          {...register("name")}
          type="text"
          placeholder="Busque por um professor"
        />
        <button type="submit">Buscar</button>
      </div>

      {errors.name && (
        <p className="text-xs text-[#EF4444] mt-1.5 ml-2">{errors.name.message}</p>
      )}
    </form>
  );
}
```

Passo a passo do que acontece aqui:

1. **`searchSchema`** descreve a única regra do formulário: o campo `name`
   precisa ser um texto (`z.string()`), sem espaços nas pontas
   (`.trim()`), com pelo menos 2 caracteres (`.min(2, "mensagem")`).
2. **`type SearchFormData = z.infer<typeof searchSchema>`** — em vez de
   escrever a interface do formulário à mão (repetindo o que o schema já
   diz), o TypeScript **infere o tipo a partir do schema**. Se a regra do
   Zod mudar, o tipo muda junto, automaticamente.
3. **`zodResolver(searchSchema)`** é a peça de `@hookform/resolvers` que
   conecta as duas bibliotecas: ela transforma o schema do Zod em algo que
   o `react-hook-form` sabe usar para validar antes de chamar `onSubmit`.
4. **`register("name")`** liga o `<input>` ao formulário — é o que faz o
   `react-hook-form` saber que aquele campo existe e capturar seu valor,
   sem precisar de `onChange` manual.
5. **`errors.name`** só existe quando a validação falha — e a mensagem
   exibida é exatamente a string passada em `.min(2, "Digite ao menos 2
   letras")` no schema.
6. `onSubmit` só é chamado pelo `react-hook-form` **depois** que os dados
   passam pela validação — por isso `data.name` dentro dele já chega
   confiável, sem precisar checar de novo.

---

## RatingForm — um schema com regras diferentes por campo

```tsx
const ratingSchema = z.object({
  value: z
    .number()
    .int()
    .min(1, "Escolha uma nota de 1 a 5 estrelas")
    .max(5),
  comment: z
    .string()
    .trim()
    .max(500, "Comentário muito longo (máx. 500 caracteres)")
    .optional(),
});

type RatingFormData = z.infer<typeof ratingSchema>;
```

Aqui o schema mistura dois tipos de regra:

- `value` é **obrigatório**: precisa ser um número inteiro entre 1 e 5 (a
  nota em estrelas).
- `comment` é **opcional** (`.optional()`), mas quando preenchido não pode
  passar de 500 caracteres.

---

## Controller — campos que não são um `<input>` padrão

O seletor de estrelas não é um campo HTML nativo, então `register()` (que
funciona ligando eventos de `<input>`, `<select>` etc.) não serve aqui. Para
esse caso, `react-hook-form` oferece o componente `Controller`:

```tsx
<Controller
  control={control}
  name="value"
  render={({ field }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => field.onChange(n)}
        >
          <Star
            color={n <= field.value ? "#FBBF24" : "#ECE9F8"}
            fill={n <= field.value ? "#FBBF24" : "#ECE9F8"}
          />
        </button>
      ))}
    </div>
  )}
/>
```

`Controller` entrega um objeto `field` com `value` (o valor atual) e
`onChange` (a função para atualizá-lo) — cabe a quem escreve o componente
decidir **como** esses dois se conectam à interface. Aqui, clicar na
n-ésima estrela chama `field.onChange(n)`, e a cor de cada estrela é
decidida comparando seu número (`n`) com o valor atual (`field.value`).

---

## Estados de envio do formulário

```tsx
const createRating = useCreateRating(); // Module-04

<button
  type="submit"
  disabled={createRating.isPending || !professorSubjectId}
>
  {createRating.isPending && <Loader2 className="animate-spin" />}
  Enviar avaliação
</button>

{createRating.isError && <span>Não foi possível enviar sua avaliação.</span>}
{createRating.isSuccess && <span>Avaliação enviada, obrigado!</span>}
```

Repare que os estados de `useMutation` (`isPending`, `isError`,
`isSuccess`, vistos no Module-04) e os estados de validação de
`react-hook-form` (`errors`) trabalham lado a lado, mas resolvem problemas
diferentes:

- `errors` → "o que a pessoa digitou é válido?" (antes de enviar).
- `isPending` / `isError` / `isSuccess` → "o que aconteceu ao enviar?"
  (depois de validado).

---

## Materiais complementares

### Documentações

React Hook Form — Get Started

https://react-hook-form.com/get-started

React Hook Form — Controller

https://react-hook-form.com/docs/usecontroller/controller

Zod

https://zod.dev/

@hookform/resolvers

https://github.com/react-hook-form/resolvers

---

### Vídeos recomendados

React Hook Form + Zod explicado

https://www.youtube.com/results?search_query=react+hook+form+zod+explicado

---

## Resumo

Neste módulo aprendemos:

- Por que separar "regra" (Zod) de "estado do formulário"
  (react-hook-form).
- Como `z.infer` evita duplicar a definição de tipos.
- Como `register` liga campos simples, e `Controller` liga campos
  customizados (como o seletor de estrelas).
- Como os estados de validação e os estados de envio (`useMutation`)
  trabalham juntos na mesma tela.

No próximo módulo iremos ver como a página `HomePage` reúne busca, formulário
de avaliação e a visão geral do professor selecionado.
