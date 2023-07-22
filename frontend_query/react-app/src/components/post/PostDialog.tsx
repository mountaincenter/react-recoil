import { useEffect } from 'react';
import DialogComponent from './PostDialogComponent';

import { useSetRecoilState } from 'recoil';
import { imageState } from 'atoms/imageState';

const PostDialog = (): JSX.Element => {
  const setImages = useSetRecoilState(imageState);

  useEffect(() => {
    return () => {
      setImages([]);
    };
  });

  return <DialogComponent />;
};

export default PostDialog;
