import { useState, useEffect } from 'react';
import { fetchQuery, fetchTop } from '../../utility/fetchNapster';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import ViewContainer from '../ViewContainer/ViewContainer';

import './Home.css';


function Home() {
  const [data, setData] = useState({});
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState({canRetry: false, message: ''});
  const [searchParams] = useSearchParams();

  const handleDataFetch = () => {
    setData({});
    const updateData = async () => {
      const query = searchParams.get('query');
      setIsPending(true);
      const { newData, error } = query ? 
                      await fetchQuery(query, 1):
                      await fetchTop(3);
      if (error) setError(error);
      else setData(newData);
      setIsPending(false);
    };
    updateData();  
  };

  useEffect(() => {
    const threshold = 5;
    // const count = error.count || 0
    let errorCount = 0;
    do {
      handleDataFetch();
      if (!error) break;
    } while (errorCount++ < threshold && error.canRetry)
                                                                        
  }, [searchParams]);


  return (
    <div className='space'>
      {isPending && 'Loading...'}
      {!isPending && error && <span>{error.message}</span>}
      {!!Object.keys(data).length && <ViewContainer data={data} />}
    </div>
  );
}


export default Home;