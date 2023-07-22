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
  onClick?: () => void;
  component?: 'button' | 'Link';
  to?: string;
}

export const UserAvatar = ({
  name,
  avatar,
  sx,
  onClick,
  component,
  to,
}: UserAvatarProps) => {
  const avatarElement = (
    <Avatar
      alt={name}
      src={avatar?.url}
      sx={sx}
      onClick={component === 'button' ? onClick : undefined}
    >
      {avatar ? null : name[0]}
    </Avatar>
  );

  if (component === 'Link') {
    return <Link to={to ? `/${to}` : ''}>{avatarElement}</Link>;
  }

  return avatarElement;
};
