import Button from '@mui/material/Button';

interface FollowButtonProps {
  isHover: boolean;
  onFollow: () => void;
  onUnFollow: () => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  isFollowing: boolean;
}

const FollowButton: React.FC<FollowButtonProps> = ({
  isHover,
  onFollow,
  onUnFollow,
  handleMouseEnter,
  handleMouseLeave,
  isFollowing,
}) => {
  return isFollowing ? (
    <Button
      variant="outlined"
      color={isHover ? 'error' : 'primary'}
      sx={{
        borderRadius: '9999px',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onUnFollow}
    >
      {isHover ? 'フォロー解除' : 'フォロー中'}
    </Button>
  ) : (
    <Button
      variant="contained"
      color="primary"
      sx={{
        borderRadius: '9999px',
        whiteSpace: 'nowrap',
      }}
      onClick={onFollow}
    >
      フォロー
    </Button>
  );
};

export default FollowButton;
