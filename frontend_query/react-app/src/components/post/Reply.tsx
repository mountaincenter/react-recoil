import { usePost } from 'hooks/post/usePost';
import { Dialog, IconButton, Tooltip, Typography } from '@mui/material';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import DialogManager from 'atoms/dialogManager';
import { dialogState } from 'atoms/dialogState';

import { useRecoilState } from 'recoil';

interface ReplyProps {
  publicId: string;
  showCount?: boolean;
}

const Reply = ({ publicId, showCount = true }: ReplyProps): JSX.Element => {
  const { post } = usePost(publicId);
  const repliesCount = post?.replies.length || 0;
  const [dialogOpen, setDialogOpen] = useRecoilState(dialogState);
  return (
    <>
      <Tooltip title="返信">
        <div>
          <IconButton
            sx={{
              color: 'grey.500',
              '&:hover': {
                color: 'blue',
              },
            }}
            onClick={() =>
              setDialogOpen({
                isOpen: true,
                type: 'reply',
                props: { publicId },
              })
            }
          >
            <ModeCommentOutlinedIcon />
          </IconButton>
          {showCount && (
            <Typography
              variant="body2"
              component="span"
              color="textSecondary"
              sx={{
                '&:hover': {
                  color: 'blue',
                },
              }}
            >
              {repliesCount}
            </Typography>
          )}
        </div>
      </Tooltip>
      <Dialog
        open={dialogOpen.isOpen}
        onClose={() => setDialogOpen({ isOpen: false, type: null, props: {} })}
      >
        <DialogManager />
      </Dialog>
    </>
  );
};

export default Reply;
