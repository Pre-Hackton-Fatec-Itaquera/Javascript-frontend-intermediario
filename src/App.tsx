import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './paginas/HomePage/HomePage';

export function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<HomePage />} path='/' />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}