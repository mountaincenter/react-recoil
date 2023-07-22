import { usePost } from 'hooks/post/usePost';
import DialogComponent from './PostDialogComponent';
import { useEffect } from 'react';

import { useSetRecoilState } from 'recoil';
import { imageState } from 'atoms/imageState';

interface ReplyDialogProps {
  publicId: string;
}

const ReplyDialog = ({ publicId }: ReplyDialogProps): JSX.Element => {
  const setImages = useSetRecoilState(imageState);
  const { post } = usePost(publicId);

  useEffect(() => {
    return () => {
      setImages([]);
    };
  });

  return (
    <DialogComponent parentId={post?.id} parentUsername={post?.user.username} />
  );
};

export default ReplyDialog;
