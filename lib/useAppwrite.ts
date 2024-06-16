import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

const useAppwrite = (fn: () => Promise<any[]>): { data: any[]; loading: boolean } => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fn();
                setData(res);
            } catch (err: any) {
                Alert.alert('Error', err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading };
};

export default useAppwrite;
