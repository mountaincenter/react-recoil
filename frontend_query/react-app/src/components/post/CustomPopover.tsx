import { Popover, Typography } from '@mui/material';

interface PopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  children: React.ReactNode;
}

const CustomPopover: React.FC<PopoverProps> = ({
  open,
  anchorEl,
  onClose,
  children,
}) => {
  return (
    <Popover
      id="mouse-over-popover"
      sx={{
        pointerEvents: 'none',
        boxShadow: 'none',
      }}
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      onClose={onClose}
      disableRestoreFocus
    >
      <Typography>{children}</Typography>
    </Popover>
  );
};

export default CustomPopover;
