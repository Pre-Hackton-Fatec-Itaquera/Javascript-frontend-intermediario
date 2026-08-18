export function SkeletonHomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-4 rounded-2xl bg-gray-100 p-4 animate-pulse">

        {/* Cabeçalho */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-300" />
          <div className="h-4 w-32 rounded bg-gray-300" />
        </div>

        {/* Destaque */}
        <div className="h-20 w-full rounded-xl bg-gray-300" />

        {/* Conteúdo */}
        <div className="space-y-3 rounded-xl bg-white p-4">
          <div className="h-4 w-32 rounded bg-gray-300" />
          <div className="h-3 w-full rounded bg-gray-300" />
          <div className="h-3 w-3/4 rounded bg-gray-300" />
        </div>

        {/* Estatísticas */}
        <div className="flex gap-2">
          <div className="h-16 flex-1 rounded-xl bg-white" />
          <div className="h-16 flex-1 rounded-xl bg-white" />
          <div className="h-16 flex-1 rounded-xl bg-white" />
        </div>

        {/* Avaliações */}
        <div className="space-y-3 rounded-xl bg-white p-4">
          <div className="h-4 w-24 rounded bg-gray-300" />

          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gray-300" />
            <div className="h-3 w-32 rounded bg-gray-300" />
          </div>

          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gray-300" />
            <div className="h-3 w-40 rounded bg-gray-300" />
          </div>
        </div>

      </div>
    </div>
  );
}