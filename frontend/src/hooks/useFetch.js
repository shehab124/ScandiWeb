import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [products, setProducts] = useState([]);
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
                setProducts(data);
                setIsLoading(false);
                setError(null);
            })
            .catch(err => {
                if (err.name === 'AbortError')
                    console.log(err);
                else {
                    setIsLoading(false);
                    setError(err.message);
                }
            })

        return () => abortCont.abort();

    }, [url]);

    return { products, setProducts, isLoading, error };
}

export default useFetch