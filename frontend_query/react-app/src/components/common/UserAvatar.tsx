import { Avatar } from '@mui/material';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

interface UserAvatarProps {
  name: string;
  avatar: {
    url: string;
  };
  sx?: SxProps<Theme>;
  pathname: string;
}

export const UserAvatar = ({ pathname, name, avatar, sx }: UserAvatarProps) => {
  return (
    <Link
      to={`/${pathname}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      {avatar?.url ? (
        <Avatar alt={name} src={avatar.url} sx={sx} />
      ) : (
        <Avatar sx={sx}>{name[0]}</Avatar>
      )}
    </Link>
  );
};
