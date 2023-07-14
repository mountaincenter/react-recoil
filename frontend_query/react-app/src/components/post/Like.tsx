import { useState, useEffect } from 'react';
import { usePost } from 'hooks/post/usePost';
import { IconButton, Typography, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { useCreateLike, useDeleteLike } from 'hooks/post/useLike';

interface LikeProps {
  publicId: string;
  showCount?: boolean;
}

const Like = ({ publicId, showCount = true }: LikeProps): JSX.Element => {
  const { post } = usePost(publicId);
  const likesCount = post?.likes.length || 0;
  const [isLiked, setIsLiked] = useState<boolean>(
    post?.liked ? post.liked : false
  );

  const createLikeMutation = useCreateLike(publicId);
  const deleteLikeMutations = useDeleteLike(publicId);

  const handleLike = () => {
    if (isLiked) {
      deleteLikeMutations.mutate();
    } else {
      createLikeMutation.mutate();
    }
  };

  useEffect(() => {
    if (post) {
      setIsLiked(post.liked);
    }
  }, [post]);

  return (
    <>
      <Tooltip title="いいね">
        <div>
          <IconButton
            onClick={handleLike}
            sx={{
              color: isLiked ? 'error.main' : 'grey.500',
              '&:hover': {
                color: isLiked ? 'error.dark' : 'error.main',
              },
            }}
          >
            {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          {showCount && (
            <Typography
              variant="body2"
              component="span"
              sx={{
                color: isLiked ? 'error.main' : 'text.secondary',
                '&:hover': {
                  color: isLiked ? 'error.dark' : 'error.main',
                },
              }}
            >
              {likesCount}
            </Typography>
          )}
        </div>
      </Tooltip>
    </>
  );
};

export default Like;
