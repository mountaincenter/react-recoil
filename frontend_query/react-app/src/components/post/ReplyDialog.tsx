import { Grid } from '@mui/material';
import { DialogTitleComponent } from 'components/common/DialogTitle';

interface ReplyDialogProps {
  publicId: string;
}

const ReplyDialog = ({ publicId }: ReplyDialogProps): JSX.Element => {
  return (
    <>
      <Grid item xs={12}>
        <DialogTitleComponent />
        {publicId}
      </Grid>
    </>
  );
};

export default ReplyDialog;
