import { useState, useEffect } from 'react'


export const useFetch = <T,>(url: string, intialState: T): [T, boolean] => {
    const [data, setData] = useState<T>(intialState);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        setTimeout(()=>{
            fetch(url)
            .then((response) => response.json())
            .then((data) => {
              console.log(data)
              setData(data);
            })
            .finally(() => setLoading(false));
        }, 1500)
       
    }, [url]);
  
    return [data, loading];
}
 //https://www.youtube.com/watch?v=tMpn7oUsNGA