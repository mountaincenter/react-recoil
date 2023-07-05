import { useRoutes } from 'react-router-dom';
import CommonLayout from '../Layout/CommonLayout';
import Home from '../components/home';
import Login from '../components/auth/Login';
import SignUp from '../components/auth/SignUp';
import UserDetail from '../components/user/profile/UserDetail';
import UserEdit from '../components/user/UserEdit';
import Followers from '../components/user/follow/Followers';
import Following from '../components/user/follow/Following';
import FollowersYourFollow from '../components/user/follow/FollowersYourFollow';
import Messages from '../components/user/message/Messages';
import Notifications from '../components/user/notification/Notifications';
import NotFound from '../components/NotFound';

export const CommonRoutes = () => {
  const element = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <SignUp /> },
    { path: '/:username', element: <UserDetail /> },
    { path: '/:username/edit', element: <UserEdit /> },
    { path: '/:username/followers', element: <Followers /> },
    { path: '/:username/following', element: <Following /> },
    {
      path: '/:username/followers_your_follow',
      element: <FollowersYourFollow />,
    },
    { path: '/messages', element: <Messages /> },
    {
      path: '/messages/:publicId',
      element: <Messages />,
    },
    { path: '/:username/notifications', element: <Notifications /> },
    { path: '*', element: <NotFound /> },
  ]) ?? <NotFound />;
  return <CommonLayout>{element}</CommonLayout>;
};
