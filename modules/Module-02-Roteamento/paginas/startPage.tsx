import { GraduationCap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

export const StartPage = () => {
    const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#7B5CF7] to-[#4B2FD9] px-5 py-8">
     
      {/* Container central: divide a tela em topo / meio / rodapé */}
      <div className="flex h-full w-full max-w-sm flex-col justify-between">
      
        {/* ---------- CONTEÚDO CENTRAL ---------- */}
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
         
          {/* Ícone dentro de um quadrado com fundo translúcido */}
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>

          {/* Título do app */}
          <div>
            <h1 className="text-xl font-extrabold text-white">Professor</h1>
            <h2 className="text-lg font-medium text-[#C9BBFA]">Mensuring</h2>
          </div>

          {/* Subtítulo explicando o propósito do app */}
          <p className="max-w-[220px] text-sm leading-relaxed text-[#C9BBFA]">
            Avaliações reais, comentários sinceros e métricas que importam
            sobre seus professores.
          </p>

          {/* Botão principal "Começar" */}
          <button
            onClick={() => navigate("/Home", {replace: true})}
            className="mt-2 flex items-center gap-2 rounded-full bg-gradient-to-r from-[#8266F4] to-[#4B2FD9] px-7 py-3 text-sm font-bold text-white transition hover:opacity-90"
          >
            Começar
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}