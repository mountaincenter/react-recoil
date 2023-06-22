import { Tab, Tabs } from '@mui/material';
import { type User } from 'interfaces';

interface TabBarProps {
  pathname: string;
  navigate: (path: string) => void;
  username: string;
  currentUser: User;
}

const TabBar = ({ pathname, navigate, username, currentUser }: TabBarProps) => {
  return (
    <Tabs
      value={pathname}
      onChange={(event, newValue) => {
        navigate(newValue);
      }}
      variant="fullWidth"
    >
      {currentUser?.username !== username && (
        <Tab
          label="知り合いのフォロワー"
          value={`/${username}/followers_your_follow`}
        />
      )}
      <Tab label="フォロワー" value={`/${username}/followers`} />
      <Tab label="フォロー中" value={`/${username}/following`} />
    </Tabs>
  );
};

export default TabBar;
