import { useState, useCallback } from "react";

const useFilter = () => {
    const [month, setMonth] = useState<string>();
    const [year, setYear] = useState<string>();
};

export default useFilter;
