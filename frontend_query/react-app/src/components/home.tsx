import { useCurrentUser } from '../hooks/currentUser/useCurrentUser';
import UsersList from './user/profile/UserList';

const Home = () => {
  const { currentUser, error, isLoading } = useCurrentUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>エラーが発生しています</div>;
  }

  console.log(currentUser);
  return (
    <>
      <p>MODE: {import.meta.env.MODE}</p>
      <UsersList />
    </>
  );
};

export default Home;
