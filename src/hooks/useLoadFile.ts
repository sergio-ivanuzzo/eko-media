import { useCallback } from "react";

const useLoadFile = (year: string, month: string) => {
    const load = useCallback(async (filename: string): Promise<string> => {
        try {
            const response = await fetch(`data/${year}/${month}/${filename}`);
            return response.text();
        } catch (err) {
            console.log('Error:', err);
            throw(err);
        }
    }, [year, month]);
};

export default useLoadFile;
