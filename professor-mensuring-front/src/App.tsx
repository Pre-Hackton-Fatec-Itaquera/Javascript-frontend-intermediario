import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './paginas/HomePage/HomePage';
import { StartPage } from './paginas/startPage';
import { NotFoundScreen } from './paginas/notFoundPage';

export function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<StartPage />} path='/' />
          <Route path="/Home/:professorId?" element={<HomePage />} />
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}