/**
 * SearchProfessorForm.tsx
 *
 * Formulário controlado por `react-hook-form`, validado com `zod`.
 *
 * Por que react-hook-form + zod aqui?
 * - `zod` descreve a REGRA ("nome precisa ter pelo menos 2 letras")
 *   uma única vez, como um schema — em vez de espalhar `if`s.
 * - `react-hook-form` cuida do estado do input, do `onSubmit` e de
 *   mostrar o erro de validação, sem a gente escrever `useState` para
 *   cada campo nem lógica de "impedir envio com campo inválido".
 */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Search } from "lucide-react";

// Schema: única fonte de verdade sobre o que é um valor de busca válido.
const searchSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Digite ao menos 2 letras")
});

// Tipo do formulário derivado do schema — não escrevemos a mesma coisa duas vezes.
type SearchFormData = z.infer<typeof searchSchema>;

type SearchProfessorFormProps = {
  /** Chamado com o nome já validado quando o formulário é enviado. */
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

  // react-hook-form já garante que `data.name` só chega aqui validado.
  function onSubmit(data: SearchFormData) {
    onSearch(data.name);
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full rounded-full border border-[#ECE9F8] bg-white flex items-center px-4 py-3 gap-2">
        <Search size={16} color="#B3ADC2" className="shrink-0" />
        <input
          {...register("name")}
          type="text"
          placeholder="Busque por um professor"
          className="text-[#241B3D] text-sm flex-1 min-w-0 outline-none placeholder:text-[#B3ADC2]"
        />
        <button
          type="submit"
          aria-label="Buscar"
          className="w-7 h-7 rounded-full flex items-center justify-center bg-[#6D4CF0] shrink-0"
        >
          <ArrowRight size={14} color="#FFF" />
        </button>
      </div>

      {/* Erro de validação (ex.: menos de 2 letras) */}
      {errors.name && (
        <p className="text-xs text-[#EF4444] mt-1.5 ml-2">{errors.name.message}</p>
      )}
    </form>
  );
}