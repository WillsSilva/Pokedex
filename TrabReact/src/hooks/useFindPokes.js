import { useEffect, useState } from 'react';
import axios from "axios";

export function useFindPokes() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function listPokemonsuseFindPokes() {
        try {

            await new Promise(resolve => setTimeout(resolve, 1500));

            const result = await
                axios.get('http://localhost:3001/api/Poke');
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
    };

    useEffect(() => {
        setLoading(true);
        setError(null);

        listPokemonsuseFindPokes();
    }, []);
    return { data, loading, error };
}
