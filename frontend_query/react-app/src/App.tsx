import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import AllRoutes from './routes/CommonRoutes';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
              <AllRoutes />
            </Suspense>
          </BrowserRouter>
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
}

export default App;
