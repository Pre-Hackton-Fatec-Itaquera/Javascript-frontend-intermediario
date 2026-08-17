/**
 * useHomePage.tsx
 *
 * Concentra a lógica/estado da HomePage, deixando o HomePage.tsx focado
 * só em desenhar a tela (mesmo princípio "rota não pensa, service não
 * desenha" usado no backend).
 */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfessorSearch } from "../../http/professor/useProfessor";

export function useHomePage() {
    // Termo efetivamente buscado (só muda quando o formulário é enviado —
    // não a cada tecla digitada, para não disparar uma requisição por letra).
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const professorQuery = useProfessorSearch(searchTerm);

    function handleSearch(name: string) {
        setSearchTerm(name);
    }

    // Ao escolher um professor da lista de resultados, navega pra
    // `/Home/:professorId` — é essa rota que faz a ProfessorOverview
    // carregar os dados reais dele.
    function selectProfessor(id: string) {
        navigate(`/Home/${id}`);
    }

    function resetSearch() {
        setSearchTerm("");
    }

    return {
        handleSearch,
        selectProfessor,
        resetSearch,
        professores: professorQuery.data ?? [],
        isSearching: professorQuery.isLoading,
        searchError: professorQuery.error,
        hasSearched: searchTerm.length > 0,
    };
}