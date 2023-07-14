import LoadingButton from '@mui/lab/LoadingButton';

interface Props {
  isLoading: boolean;
  error: Error | null;
  children: React.ReactNode;
}

const LoadingAndErrorComponent = ({ isLoading, error, children }: Props) => {
  if (isLoading) {
    return <LoadingButton loading={isLoading}>Loading...</LoadingButton>;
  }

  if (error) {
    return (
      <LoadingButton loading={isLoading}>Error: {error.message}</LoadingButton>
    );
  }

  return <>{children}</>;
};

export default LoadingAndErrorComponent;
