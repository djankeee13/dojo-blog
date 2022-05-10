import { useEffect, useState } from "react";

const useFetch = (url) => {

  const [data, setData] = useState(null);
  const [isPanding, setIsPanding] = useState(true);
  const [error, setError] = useState(null);


    useEffect(() =>{
      const abortCont = new AbortController();

      fetch(url, {signal: abortCont.signal})
      .then(res => {
        if(!res.ok){
          throw Error('could not fetch the data for that resource')
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
        setIsPanding(false);
      })
      .catch(err => {
        if(err.name === 'AbortError') {
          console.log('fetch aborted')
        } else{
          setIsPanding(false);
          setError(err.message);
        }
      })

    return () => abortCont.abort();
    }, [url])

    return {data, isPanding, error}
}
 
export default useFetch;