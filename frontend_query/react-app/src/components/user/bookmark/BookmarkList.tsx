import { useBookmark } from 'hooks/bookmark/useBookmarks';
import LoadingAndErrorComponent from 'components/utils/LoadingAndErrorComponent';
import PostList from 'components/post/PostList';
import { Typography } from '@mui/material';

const Bookmark = () => {
  const { bookmarks, isLoading, error } = useBookmark();
  return (
    <>
      <LoadingAndErrorComponent isLoading={isLoading} error={error}>
        {bookmarks ? (
          <>
            <PostList posts={bookmarks} />
          </>
        ) : (
          <>
            <Typography>bookmarkに保存しよう</Typography>
          </>
        )}
      </LoadingAndErrorComponent>
    </>
  );
};

export default Bookmark;
