import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const abortCont = new AbortController();

        fetch(url, { signal: abortCont.signal })
            .then(response => {
                if (!response.ok)
                    throw Error("Error connecting to endpoint");
                return response.json();
            })
            .then(data => {
                console.log("From useFetch")
                setData(data);
                setIsLoading(false);
                setError(null);
            })
            .catch(err => {
                if (err.name === 'AbortError')
                    console.log('Fetch aborted');
                else {
                    setIsLoading(false);
                    setError(err.message);
                }
            })

        return () => abortCont.abort();

    }, [url]);

    return { data, setData, isLoading, error };
}

export default useFetch