import { useQuery } from 'react-query';
import { getTrends } from 'api/trend';
import { type ApiResponse, type Trend } from 'interfaces';

export const useTrends = (): {
  trends: Trend[] | undefined;
  isLoading: boolean;
  error: Error | null;
} => {
  const { data, isLoading, error } = useQuery<ApiResponse<Trend[]>, Error>({
    queryKey: ['trends'],
    queryFn: () => getTrends(),
  });
  // console.log(data);
  const trends = data?.data;
  return { trends, isLoading, error };
};
