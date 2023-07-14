import { useState, useEffect } from 'react';
import { IconButton, Typography, Tooltip } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { usePost } from 'hooks/post/usePost';

import { useBookmark } from 'hooks/bookmark/useBookmark';

interface BookmarkProps {
  publicId: string;
  showCount?: boolean;
}

const Bookmark = ({ publicId, showCount = true }: BookmarkProps) => {
  const { post } = usePost(publicId);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(
    post?.bookmarked ? post.bookmarked : false
  );
  const { createBookmarkMutation, deleteBookmarkMutation } = useBookmark(
    post?.id ? post.id : 0,
    post?.publicId ? post.publicId : ''
  );

  const handleBookmark = () => {
    if (isBookmarked) {
      deleteBookmarkMutation.mutate();
    } else {
      createBookmarkMutation.mutate();
    }
  };

  useEffect(() => {
    if (post) {
      setIsBookmarked(post.bookmarked);
    }
  }, [post]);

  useEffect(() => {
    if (createBookmarkMutation.isSuccess) {
      setIsBookmarked(true);
    } else if (deleteBookmarkMutation.isSuccess) {
      setIsBookmarked(false);
    }
  }, [createBookmarkMutation.isSuccess, deleteBookmarkMutation.isSuccess]);

  return (
    <>
      <Tooltip title="ブックマーク">
        <div>
          <IconButton onClick={handleBookmark}>
            {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
          {showCount && (
            <Typography variant="body2" component="span">
              {post?.bookmarksCount}
            </Typography>
          )}
        </div>
      </Tooltip>
    </>
  );
};

export default Bookmark;
