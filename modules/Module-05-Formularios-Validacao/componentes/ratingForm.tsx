/**
 * RatingForm.tsx
 *
 * Formulário de avaliação do professor selecionado. Fica sempre visível
 * no fim da Home, ocupando a largura toda.
 *
 * Fluxo: usuário escolhe uma nota (1 a 5 estrelas) + comentário opcional
 * → `react-hook-form` valida com `zod` → `useCreateRating` (React Query)
 * manda o POST pra API. Como `useCreateRating` já invalida a query de
 * ratings daquele vínculo (ver useRatings.ts), a `ProfessorOverview`
 * (estatísticas, distribuição, lista de avaliações) se atualiza sozinha
 * assim que a avaliação é criada — sem a gente escrever nenhum código
 * extra de sincronização aqui.
 */
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Star, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useProfessorSubjects } from "../../../http/professor-subject/useProfessorSubject";
import { useCreateRating } from "../../../http/ratings/useRatings";

// Schema: nota é obrigatória (1 a 5, inteiro) e comentário é opcional.
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

type RatingFormProps = {
  /** Professor selecionado na busca (vem da URL: /Home/:professorId) */
  professorId?: string;
};

export function RatingForm({ professorId }: RatingFormProps) {
  // Uma rating não pertence direto ao professor, e sim a um vínculo
  // professor+matéria (professor_subject). Simplificação assumida aqui,
  // igual à ProfessorOverview: avaliamos o primeiro vínculo do professor.
  const { data: professorSubjects } = useProfessorSubjects(professorId);
  const professorSubjectId = professorSubjects?.[0]?.id;

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RatingFormData>({
    resolver: zodResolver(ratingSchema),
    defaultValues: { value: 0, comment: "" },
  });

  const createRating = useCreateRating();

  function onSubmit(data: RatingFormData) {
    if (!professorSubjectId) return;

    createRating.mutate(
      {
        value: data.value,
        comment: data.comment ? data.comment : undefined,
        professorSubjectId,
      },
      {
        onSuccess: () => reset({ value: 0, comment: "" }),
      }
    );
  }

  // Sem professor selecionado ainda: nada pra avaliar.
  if (!professorId) {
    return (
      <div className="w-full bg-white rounded-2xl border border-[#ECE9F8] p-6 text-center text-sm text-[#8A8497]">
        Busque e selecione um professor acima para deixar sua avaliação.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="w-full bg-white rounded-2xl border border-[#ECE9F8] p-4 md:p-6 flex flex-col gap-4"
    >
      <span className="font-bold text-sm text-[#241B3D]">Avaliar professor</span>

      {/* Seletor de estrelas — react-hook-form não tem <input type="star">, então
          usamos Controller pra ligar um valor numérico (1-5) a botões clicáveis. */}
      <Controller
        control={control}
        name="value"
        render={({ field }) => (
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-[#8A8497]">Sua nota</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-label={`${n} estrela${n > 1 ? "s" : ""}`}
                  onClick={() => field.onChange(n)}
                >
                  <Star
                    size={26}
                    color={n <= field.value ? "#FBBF24" : "#ECE9F8"}
                    fill={n <= field.value ? "#FBBF24" : "#ECE9F8"}
                  />
                </button>
              ))}
            </div>
            {errors.value && <p className="text-xs text-[#EF4444]">{errors.value.message}</p>}
          </div>
        )}
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="comment" className="text-xs font-medium text-[#8A8497]">
          Comentário (opcional)
        </label>
        <textarea
          id="comment"
          {...register("comment")}
          rows={3}
          placeholder="Conte como foi sua experiência com esse professor"
          className="text-sm text-[#241B3D] rounded-xl border border-[#ECE9F8] p-3 outline-none resize-none placeholder:text-[#B3ADC2]"
        />
        {errors.comment && <p className="text-xs text-[#EF4444]">{errors.comment.message}</p>}
      </div>

      {createRating.isError && (
        <div className="flex items-center gap-2 text-sm text-[#EF4444]">
          <AlertCircle size={16} />
          Não foi possível enviar sua avaliação. Tente novamente.
        </div>
      )}

      {createRating.isSuccess && (
        <div className="flex items-center gap-2 text-sm text-[#22C58B]">
          <CheckCircle2 size={16} />
          Avaliação enviada, obrigado!
        </div>
      )}

      <button
        type="submit"
        disabled={createRating.isPending || !professorSubjectId}
        className="self-start flex items-center gap-1.5 px-5 py-2.5 rounded-full text-white font-bold text-xs disabled:opacity-60"
        style={{ background: "linear-gradient(90deg,#8266F4 0%,#4B2FD9 100%)" }}
      >
        {createRating.isPending && <Loader2 size={14} className="animate-spin" />}
        Enviar avaliação
      </button>
    </form>
  );
}