import { type Post } from 'interfaces';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

interface TooltipTimeProps {
  post: Post;
}

const TooltipTime = ({ post }: TooltipTimeProps) => {
  const time = format(new Date(post.createdAt), 'a H:mm・yyyy年MM月dd日', {
    locale: ja,
  });
  return <>{time}</>;
};

export default TooltipTime;
