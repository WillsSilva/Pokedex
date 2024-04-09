import { useEffect, useState, useCallback } from 'react';
import axios from "axios";

export function useFindPokes() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            await new Promise(resolve => setTimeout(resolve, 0));

            const result = await axios.get('http://localhost:3001/api/Poke');
            setLoading(false);

            if (result.data) {
                setData(result.data);
            } else {
                setData([]);
            }
        } catch (err) {
            setError("Lamento, ocorreu um erro!");
            setData([]);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const refetch = useCallback(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch };
}
