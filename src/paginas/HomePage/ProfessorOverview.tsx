import { useMemo } from "react";
import {
  Star,
  BarChart2,
  ThumbsUp,
  MessageCircle,
  MessageSquare,
  ChevronDown,
  BadgeCheck,
  UserRound,
  Search,
} from "lucide-react";
import { useProfessor } from "../../http/professor/useProfessor";
import {
  useProfessorSubjects,
  useProfessorSubjectAverage,
} from "../../http/professor-subject/useProfessorSubject";
import { useRatings } from "../../http/ratings/useRatings";

type ProfessorOverviewProps = {
  professorId?: string;
};

export const ProfessorOverview = ({ professorId }: ProfessorOverviewProps) => {
  if (!professorId) {
    return <EmptyState />;
  }
  return <ProfessorOverviewContent professorId={professorId} />;
};

const EmptyState = () => (
  <div className="col-span-1 md:col-span-2 w-full bg-white rounded-2xl border border-[#ECE9F8] flex flex-col items-center justify-center gap-2 p-10 text-center">
    <div className="w-12 h-12 rounded-full bg-[#EDE9FE] flex items-center justify-center">
      <Search size={22} color="#6D4CF0" />
    </div>
    <span className="font-bold text-sm text-[#241B3D]">Pesquise por um professor</span>
    <span className="text-xs text-[#8A8497] max-w-xs">
      Use a busca acima para encontrar um professor e ver suas avaliações.
    </span>
  </div>
);

const ProfessorOverviewContent = ({ professorId }: { professorId: string }) => {
  const { data: professor, isLoading: isLoadingProfessor } = useProfessor(professorId);
  const { data: professorSubjects } = useProfessorSubjects(professorId);
  const professorSubjectId = professorSubjects?.[0]?.id;
  const { data: average } = useProfessorSubjectAverage(professorSubjectId);
  const { data: ratings } = useRatings(professorSubjectId);

  const stats = useMemo(() => {
    const total = ratings?.length ?? 0;
    const commentsCount = ratings?.filter((r) => r.comment).length ?? 0;
    const recommendedCount = ratings?.filter((r) => r.value >= 4).length ?? 0;
    const recommendPct = total > 0 ? Math.round((recommendedCount / total) * 100) : 0;

    return [
      { icon: Star, iconColor: "#6D4CF0", bg: "#EDE9FE", value: average?.average?.toFixed(1) ?? "-", label: "Média geral" },
      { icon: BarChart2, iconColor: "#4C8DFF", bg: "#E3EEFF", value: total, label: "Avaliações" },
      { icon: ThumbsUp, iconColor: "#22C58B", bg: "#DEF7EC", value: `${recommendPct}%`, label: "Recomendam" },
      { icon: MessageCircle, iconColor: "#FBBF24", bg: "#FEF6DE", value: commentsCount, label: "Comentários" },
    ];
  }, [ratings, average]);

  const distribution = useMemo(() => {
    const total = ratings?.length ?? 0;
    return [5, 4, 3, 2, 1].map((nota) => {
      const count = ratings?.filter((r) => r.value === nota).length ?? 0;
      const pct = total > 0 ? Math.round((count / total) * 100) : 0;
      return { nota, pct };
    });
  }, [ratings]);

  if (isLoadingProfessor) {
    return (
      <div className="col-span-1 md:col-span-2 text-center text-sm text-[#8A8497] py-10">
        Carregando...
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="w-full flex items-center justify-between bg-white rounded-2xl border border-[#ECE9F8] p-4 gap-3">
          <div className="flex gap-3 items-center min-w-0">
            <div className="w-12 h-12 rounded-full bg-[#DCD3F9] flex justify-center items-center shrink-0">
              <UserRound size={26} color="#4B2FD9" />
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
              <div className="flex gap-1 items-center">
                <span className="font-bold text-sm text-[#241B3D] truncate">{professor?.name}</span>
                <BadgeCheck size={14} color="#6D4CF0" className="shrink-0" />
              </div>
              <div className="flex gap-1 items-center">
                <Star size={12} color="#FBBF24" fill="#FBBF24" />
                <span className="font-bold text-xs text-[#241B3D]">{average?.average?.toFixed(1) ?? "-"}</span>
                <span className="text-xs text-[#8A8497]">({average?.count ?? 0})</span>
              </div>
            </div>
          </div>
          <button
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-white font-bold text-xs shrink-0"
            style={{ background: "linear-gradient(90deg,#8266F4 0%,#4B2FD9 100%)" }}
          >
            <Star size={12} color="#FFF" fill="#FFF" />Avaliar
          </button>
        </div>

        <div className="w-full grid grid-cols-4 gap-2">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-[#ECE9F8] flex flex-col items-center gap-1 p-3 min-w-0">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: s.bg }}>
                <s.icon size={16} color={s.iconColor} fill={s.icon === Star ? s.iconColor : "none"} />
              </div>
              <span className="font-bold text-base text-[#241B3D]">{s.value}</span>
              <span className="text-[10px] text-[#8A8497] text-center leading-tight">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="w-full bg-white rounded-2xl border border-[#ECE9F8] flex flex-col gap-2 p-4">
          <span className="font-bold text-sm text-[#241B3D]">Distribuição das notas</span>
          {distribution.map(({ nota, pct }) => (
            <div key={nota} className="flex items-center gap-2 w-full">
              <span className="text-xs font-medium text-[#8A8497] w-4">{nota}★</span>
              <div className="flex-1 h-1.5 rounded-full bg-[#EAE6F7] overflow-hidden">
                <div style={{ width: `${pct}%` }} className="h-1.5 rounded-full bg-[#6D4CF0]" />
              </div>
              <span className="text-xs font-medium text-[#8A8497] w-8 text-right">{pct}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full bg-white rounded-2xl border border-[#ECE9F8] flex flex-col gap-3 p-4 md:h-full">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <MessageSquare size={16} color="#241B3D" />
            <span className="text-base font-bold text-[#241B3D]">Avaliações recentes</span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-sm text-[#6D4CF0]">Ver todas</span>
            <ChevronDown size={14} color="#6D4CF0" />
          </div>
        </div>

        <div className="flex flex-col divide-y divide-[#F3F1FB]">
          {ratings
            ?.filter((r) => r.comment)
            .map((r) => (
              <div key={r.id} className="flex gap-3 py-3 first:pt-0">
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 bg-[#DCD3F9]">
                  <UserRound size={18} color="#4B2FD9" />
                </div>
                <div className="flex-1 flex flex-col gap-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star
                          key={n}
                          size={14}
                          color={n <= r.value ? "#FBBF24" : "#ECE9F8"}
                          fill={n <= r.value ? "#FBBF24" : "#ECE9F8"}
                        />
                      ))}
                    </div>
                    {r.createdAt && <span className="text-xs text-[#B3ADC2] shrink-0">{r.createdAt}</span>}
                  </div>
                  <span className="text-sm text-[#8A8497] leading-snug">{r.comment}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};