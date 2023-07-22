import { Grid } from '@mui/material';
import { DialogTitleComponent } from 'components/common/DialogTitle';
import PostBox from 'components/common/PostBox';
import ImageUploader from 'components/common/ImageUploader';

import { useSetRecoilState } from 'recoil';
import { imageState } from 'atoms/imageState';

interface DialogComponentProps {
  parentId?: number;
  parentUsername?: string;
}

const DialogComponent: React.FC<DialogComponentProps> = ({
  parentId,
  parentUsername,
}) => {
  const setImages = useSetRecoilState(imageState);

  return (
    <Grid item mobile={12} sx={{ width: '400px' }}>
      <DialogTitleComponent />
      <PostBox parentId={parentId} parentUsername={parentUsername} />
      <ImageUploader onUpload={setImages} />
    </Grid>
  );
};

export default DialogComponent;
