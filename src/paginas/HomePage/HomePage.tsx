import { GraduationCap, Star, Loader2, AlertCircle, X } from "lucide-react";
import { useParams } from "react-router-dom";
import { useHomePage } from "./useHomePage";
import { useHomeModalsPage } from "./useHomeModalsPage";
import { SearchProfessorForm } from "./componentes/searchProfessorForm";
import { ProfessorOverview } from "./componentes/ProfessorOverview";
import { RatingForm } from "./componentes/ratingForm";

export const HomePage = () => {
  // `professorId` vem da URL (rota "/Home/:professorId?", definida no App.tsx).
  // É ele quem diz pra ProfessorOverview qual professor mostrar.

  const { professorId } = useParams<{ professorId?: string }>();
  const { handleSearch, selectProfessor, resetSearch, professores, isSearching, searchError, hasSearched } = useHomePage();
  const { isRatingModalOpen, toggleRatingModal } = useHomeModalsPage();

  return (
    <div className="min-h-screen w-full bg-[#F3F1FB] flex justify-center px-4 py-6 md:py-10">
      <div className="w-full max-w-md md:max-w-4xl flex flex-col gap-4 md:gap-6">

        {/* Header */}
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#6D4CF0] rounded-lg flex items-center justify-center shrink-0">
              <GraduationCap size={18} color="#FFF" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-sm text-[#241B3D]">Professor</span>
              <span className="font-medium text-xs text-[#6D4CF0]">Mensuring</span>
            </div>
          </div>
          <span className="text-[#8A8497] text-sm font-medium hidden sm:block">Sobre o projeto</span>
        </div>

        {/* Hero */}
        <div className="w-full rounded-2xl p-5 md:p-6 flex items-center justify-between gap-3"
             style={{ background: "linear-gradient(100deg,#7B5CF7 0%,#4B2FD9 100%)" }}>
          <span className="text-white font-bold text-lg md:text-2xl leading-snug">
            Avalie seus professores em poucos toques
          </span>
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#FBBF24] flex items-center justify-center shrink-0">
            <Star size={20} color="#FFF" fill="#FFF" />
          </div>
        </div>

        {/* Busca */}
        <div className="flex flex-col gap-4">
          <SearchProfessorForm onSearch={handleSearch} />

          {/* Resultado da busca — só aparece depois que o usuário envia o formulário */}
          {hasSearched && (
            <div className="w-full bg-white rounded-2xl border border-[#ECE9F8] flex flex-col gap-2 p-4">
              <div className="w-full flex items-center justify-between">
                <span className="text-xs font-medium text-[#8A8497]">Resultado da busca</span>
                <button
                  type="button"
                  onClick={resetSearch}
                  className="text-xs font-medium text-[#6D4CF0] hover:underline"
                >
                  Limpar busca
                </button>
              </div>

              {isSearching && (
                <div className="flex items-center gap-2 text-sm text-[#8A8497]">
                  <Loader2 size={16} className="animate-spin" />
                  Buscando professores...
                </div>
              )}

              {!isSearching && searchError && (
                <div className="flex items-center gap-2 text-sm text-[#EF4444]">
                  <AlertCircle size={16} />
                  Não foi possível buscar agora. Tente novamente.
                </div>
              )}

              {!isSearching && !searchError && professores.length === 0 && (
                <span className="text-sm text-[#8A8497]">Nenhum professor encontrado com esse nome.</span>
              )}

              {!isSearching && !searchError && professores.length > 0 && (
                <ul className="flex flex-col divide-y divide-[#F3F1FB]">
                  {professores.map((professor) => (
                    <li key={professor.id}>
                      {/* Clicar num resultado navega pra /Home/:id, que carrega os dados reais dele */}
                      <button
                        type="button"
                        onClick={() => selectProfessor(professor.id)}
                        className="w-full text-left py-2 text-sm text-[#241B3D] font-medium hover:text-[#6D4CF0]"
                      >
                        {professor.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Card do professor + estatísticas + reviews — tudo vindo da API, via ProfessorOverview */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-start">
          <ProfessorOverview professorId={professorId} onAvaliarClick={toggleRatingModal} />
        </div>
      </div>

      {/* Modal de avaliação — abre pelo botão "Avaliar" da ProfessorOverview */}
      {isRatingModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={toggleRatingModal}
        >
          <div className="w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={toggleRatingModal}
              aria-label="Fechar"
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white border border-[#ECE9F8] flex items-center justify-center shadow"
            >
              <X size={16} color="#241B3D" />
            </button>
            <RatingForm professorId={professorId} />
          </div>
        </div>
      )}
    </div>
  );
};