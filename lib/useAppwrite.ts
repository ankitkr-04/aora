import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

const useAppwrite = (fn: () => Promise<any[]>): { data: any[]; loading: boolean; refetch: () => Promise<void> } => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
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

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = async () => {
        fetchData();
    };

    return { data, loading, refetch };
};

export default useAppwrite;
