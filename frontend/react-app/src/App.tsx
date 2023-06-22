import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { isSignedInState } from 'components/recoil/States/AuthState';

import { Navigate } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from 'react-query';

import './App.css';
import Page from 'components/todos/axiosPage';
import Show from 'components/todos/Show';
import Profile from 'components/users/Profile';
import Followers from 'components/users/Followers';
import Following from 'components/users/Following';
import FollowersYourFollow from 'components/users/FollowersYourFollow';

const Private: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const isSignedIn = useRecoilValue(isSignedInState);
  if (isSignedIn) {
    return <>{children}</>;
  } else {
    return <Navigate to="/" />;
  }
};

const queryClient = new QueryClient();

const App = (): JSX.Element => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Page />} />
                <Route
                  path="/:username"
                  element={<Private>{<Profile />}</Private>}
                ></Route>
                <Route
                  path="/:username/status/:id"
                  element={<Private>{<Show />}</Private>}
                ></Route>
                <Route
                  path="/:username/following"
                  element={<Private>{<Following />}</Private>}
                ></Route>
                <Route
                  path="/:username/followers"
                  element={<Private>{<Followers />}</Private>}
                ></Route>
                <Route
                  path="/:username/followers_your_follow"
                  element={<Private>{<FollowersYourFollow />}</Private>}
                ></Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
};

export default App;
