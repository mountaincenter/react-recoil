import SearchBox from 'components/common/SearchBox';
import Trend from './Trend';
import { useLocation } from 'react-router-dom';

const Widget = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const matchExplore = pathname.startsWith('/explore');
  const matchSearch = pathname.startsWith('/searches');

  const showSearchBox = !matchExplore && !matchSearch;
  return (
    <>
      {showSearchBox && <SearchBox />}
      <Trend />
    </>
  );
};

export default Widget;
