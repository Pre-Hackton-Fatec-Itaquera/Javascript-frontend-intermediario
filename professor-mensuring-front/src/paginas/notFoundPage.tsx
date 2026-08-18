import { GraduationCap, UserSearch, AlertCircle, CheckCircle2, Search, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const NotFoundScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#171224] p-4">
      <div className="flex w-full max-w-sm flex-col gap-3.5 rounded-[26px] bg-[#F3F1FB] p-4">
        {/* ---------- CABEÇALHO ---------- */}
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="flex h-[22px] w-[22px] items-center justify-center rounded-[7px] bg-[#6D4CF0]">
              <GraduationCap className="h-3 w-3 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#241B3D]">Professor</p>
              <p className="text-[8.5px] font-medium text-[#6D4CF0]">Mensuring</p>
            </div>
          </div>
          <span className="text-[8.5px] font-medium text-[#8A8497]">
            Sobre o projeto
          </span>
        </div>

        {/* ---------- CONTEÚDO CENTRAL ---------- */}
        <div className="flex flex-col items-center gap-2.5 px-1 py-6 text-center">
          {/* Ilustração circular com ícone de "busca de usuário" */}
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#EDE9FE]">
            <UserSearch className="h-11 w-11 text-[#6D4CF0]" />
          </div>

          {/* Selo vermelho indicando o erro */}
          <div className="flex items-center gap-1 rounded-full bg-[#FEE2E2] px-2.5 py-1">
            <AlertCircle className="h-2.5 w-2.5 text-[#EF4444]" />
            <span className="text-[7.5px] font-semibold text-[#EF4444]">
              Professor não encontrado
            </span>
          </div>

          {/* Título e texto explicativo */}
          <h1 className="text-sm font-extrabold text-[#241B3D]">
            Ops! Não achamos por aqui.
          </h1>
          <p className="max-w-[250px] text-xs leading-relaxed text-[#8A8497]">
            Não localizamos nenhum professor com esse nome. Talvez a grafia
            esteja diferente ou ele ainda não esteja integrado.
          </p>

          {/* Campo de busca (visual — implemente a lógica depois) */}
          <div className="flex w-full items-center gap-1.5 rounded-full border border-[#ECE9F8] bg-white px-3 py-2.5">
            <Search className="h-3 w-3 text-[#B3ADC2]" />
            <input
              type="text"
              placeholder="Buscar outro professor"
              className="w-full bg-transparent text-xs text-[#241B3D] placeholder:text-[#B3ADC2] focus:outline-none"
            />
          </div>

          {/* Cartão de dicas */}
          <div className="flex w-full flex-col gap-2 rounded-2xl border border-[#ECE9F8] bg-white p-3.5 text-left">
            <p className="text-xs font-bold text-[#241B3D]">Tente:</p>
            {[
              "conferir a grafia do nome",
              "buscar por outro nome",
              "voltar à página inicial",
            ].map((dica) => (
              <div key={dica} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-2.5 w-2.5 shrink-0 text-[#6D4CF0]" />
                <span className="text-[10px] text-[#8A8497]">{dica}</span>
              </div>
            ))}
          </div>

          {/* Botão para voltar ao início */}
          <button
            onClick={() => navigate("/")}
            className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#8266F4] to-[#4B2FD9] py-2.5 text-xs font-bold text-white transition hover:opacity-90"
          >
            <Home className="h-2.5 w-2.5" />
            Voltar ao início
          </button>
        </div>
      </div>
    </div>
  );
}