import { Tooltip, IconButton, Button, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface TweetButtonProps {
  text: string;
  onClick: () => void;
  isTablet: boolean;
}

const TweetButton = ({ text, onClick, isTablet }: TweetButtonProps) => {
  if (isTablet) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Tooltip title={text}>
          <IconButton size="large">
            <AddCircleIcon color="primary" onClick={onClick} />
          </IconButton>
        </Tooltip>
      </div>
    );
  }

  return (
    <Button
      variant="contained"
      size="large"
      fullWidth
      sx={{ borderRadius: '9999px', mt: 2 }}
      onClick={onClick}
    >
      <Typography>{text}</Typography>
    </Button>
  );
};

export default TweetButton;
