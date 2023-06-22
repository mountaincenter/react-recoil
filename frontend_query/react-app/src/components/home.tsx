import { currentUserState, isSignedInState } from '../atoms/authAtoms';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { useRecoilValue } from 'recoil';
import Cookies from 'js-cookie';

const Home = () => {
  const currentUser = useRecoilValue(currentUserState);
  const isSignedIn = useRecoilValue(isSignedInState);
  const { data, error, isLoading } = useCurrentUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>エラーが発生しています</div>;
  }

  console.log(data);
  return (
    <>
      <h4>
        ログインユーザー名:{' '}
        {currentUser ? currentUser.name : 'currentUser: false'}
      </h4>
      <hr />
      <h4>{isSignedIn ? 'isSinedIn: true' : 'isSignedIn: false'}</h4>
      <hr />
      <h4>currentUserState</h4>
      <li>name: {currentUser ? currentUser.name : 'currentUser: false'}</li>
      <li>access_token: {Cookies.get('_access_token')}</li>
      <li>client: {Cookies.get('_client')}</li>
      <li>uid: {Cookies.get('_uid')}</li>
      <hr />
      <h4>sessions User</h4>
      <li>name: {data ? data.name : 'undefined'}</li>
    </>
  );
};

export default Home;
