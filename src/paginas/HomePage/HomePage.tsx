import { useParams } from "react-router-dom";
import { GraduationCap, Star, Search, ArrowRight } from "lucide-react";
import { ProfessorOverview } from "./ProfessorOverview";

export const HomePage = () => {
  const { professorId } = useParams<{ professorId?: string }>();

  return (
    <div className="min-h-screen w-full bg-[#F3F1FB] flex justify-center px-4 py-6 md:py-10">
      <div className="w-full max-w-md md:max-w-4xl flex flex-col gap-4 md:gap-6">

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

        <div
          className="w-full rounded-2xl p-5 md:p-6 flex items-center justify-between gap-3"
          style={{ background: "linear-gradient(100deg,#7B5CF7 0%,#4B2FD9 100%)" }}
        >
          <span className="text-white font-bold text-lg md:text-2xl leading-snug">
            Avalie seus professores em poucos toques
          </span>
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#FBBF24] flex items-center justify-center shrink-0">
            <Star size={20} color="#FFF" fill="#FFF" />
          </div>
        </div>

        <div className="w-full rounded-full border border-[#ECE9F8] bg-white flex items-center px-4 py-3 gap-2">
          <Search size={16} color="#B3ADC2" className="shrink-0" />
          <span className="text-[#241B3D] text-sm flex-1 truncate">Busque por um professor</span>
          <div className="w-7 h-7 rounded-full flex items-center justify-center bg-[#6D4CF0] shrink-0">
            <ArrowRight size={14} color="#FFF" />
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-start">
        </div>
      </div>
    </div>
  );
};