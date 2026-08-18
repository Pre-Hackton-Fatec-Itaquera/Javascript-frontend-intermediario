/**
 * useHomeModalsPage.tsx
 *
 * Centraliza o estado de modais da Home — por enquanto só o de
 * avaliação. Fica num hook à parte pra HomePage.tsx não acumular
 * `useState` de modal junto com o resto da lógica da tela.
 */
import { useState } from "react";

export function useHomeModalsPage() {
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

  function toggleRatingModal() {
    setIsRatingModalOpen(prevOpen => !prevOpen);
  }

  return {
    isRatingModalOpen,
    toggleRatingModal
  };
}