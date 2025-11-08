import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function useAsyncStorageState<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(initialValue);
    const [hydrated, setHydrated] = useState(false);


    useEffect(() => {
        AsyncStorage.getItem(key)
        .then(stored => {
            if (stored != null) setValue(JSON.parse(stored));
            })
        .finally(() => setHydrated(true));   //Says to use hydrated when you load the saved value from the async storage
    }, [key]);


    useEffect(() => {
        if (!hydrated) return;
            AsyncStorage.setItem(key, JSON.stringify(value)).catch(() => {});
        }, [key, hydrated, value]);


    return [value, setValue] as const;
}