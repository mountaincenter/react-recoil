import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import AllRoutes from './routes/CommonRoutes';
import ThemeProvider from './providers/ThemeProvider';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <BrowserRouter>
              <Suspense fallback={<div>Loading...</div>}>
                <AllRoutes />
              </Suspense>
            </BrowserRouter>
          </RecoilRoot>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
