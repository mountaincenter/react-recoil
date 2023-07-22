import { useRoutes } from 'react-router-dom';
import CommonLayout from '../layout/CommonLayout';
import SimpleLayout from '../layout/SimpleLayout';
import AuthLayout from '../layout/AuthLayout';
import Home from '../pages/Home';
import Login from '../components/auth/Login';
import Logout from '../components/auth/Logout';
import SignUp from '../components/auth/SignUp';
import UserDetail from '../components/user/profile/UserDetail';
import UserEdit from '../components/user/UserEdit';
import Followers from '../components/user/follow/Followers';
import Following from '../components/user/follow/Following';
import FollowersYourFollow from '../components/user/follow/FollowersYourFollow';
import Notifications from '../components/user/notification/Notifications';
import Bookmark from 'components/user/bookmark/BookmarkList';
import PostBox from '../components/common/PostBox';
import PostDetail from '../components/post/PostDetail';
import Messages from 'components/user/message/Messages';
import Explore from '../components/search/Explore';
import Search from '../components/search/Search';
import NotFound from '../components/NotFound';

import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import theme from 'theme';
import { useCurrentUser } from 'hooks/currentUser/useCurrentUser';

interface SwitchLayoutProps {
  children: React.ReactElement;
  layout: 'auth' | 'simple' | 'common';
}

export const AuthRoutes = [
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/logout', element: <Logout /> },
];

export const SimpleRoutes = [
  { path: 'messages', element: <Messages /> },
  { path: '/messages/:publicId', element: <Messages /> },
];

export const CommonRoutes = [
  { path: '/', element: <Home /> },

  { path: '/explore', element: <Explore /> },
  { path: '/post', element: <PostBox /> },
  { path: '/searches/:query', element: <Search /> },
  { path: '/bookmarks', element: <Bookmark /> },
  { path: '/:username', element: <UserDetail /> },
  { path: '/:username/edit', element: <UserEdit /> },
  { path: '/:username/followers', element: <Followers /> },
  { path: '/:username/following', element: <Following /> },
  {
    path: '/:username/followers_your_follow',
    element: <FollowersYourFollow />,
  },

  { path: '/:username/notifications', element: <Notifications /> },

  { path: '/:username/status/:publicId', element: <PostDetail /> },
  { path: '*', element: <NotFound /> },
];

const SwitchLayout = ({ children, layout }: SwitchLayoutProps) => {
  switch (layout) {
    case 'auth':
      return <AuthLayout>{children}</AuthLayout>;
    case 'simple':
      return <SimpleLayout>{children}</SimpleLayout>;
    case 'common':
      return <CommonLayout>{children}</CommonLayout>;
  }
};

const Private = ({ children }: { children: React.ReactElement }) => {
  const { currentUser } = useCurrentUser();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const navigate = useNavigate();

  if (isMobile && !currentUser) {
    navigate('/login');
    return null;
  }
  return children;
};

const authRoutesWithLayout = AuthRoutes.map((route) => ({
  ...route,
  element: <SwitchLayout layout="auth">{route.element}</SwitchLayout>,
}));

const simpleRoutesWithLayout = SimpleRoutes.map((route) => ({
  ...route,
  element: (
    <Private>
      <SwitchLayout layout="simple">{route.element}</SwitchLayout>
    </Private>
  ),
}));

const commonRoutesLayout = CommonRoutes.map((route) => ({
  ...route,
  element: (
    <Private>
      <SwitchLayout layout="common">{route.element}</SwitchLayout>
    </Private>
  ),
}));

const allRoutes = [
  ...authRoutesWithLayout,
  ...simpleRoutesWithLayout,
  ...commonRoutesLayout,
];

const AppRoutes = () => {
  const element = useRoutes(allRoutes);
  return element;
};

export default AppRoutes;
