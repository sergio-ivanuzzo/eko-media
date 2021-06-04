import { useEffect, useRef } from "react";

const usePreviousState = <T>(value: T): [T | undefined] => {
    const ref = useRef<T | undefined>();

    useEffect(() => {
        ref.current = value;
    }, [ value ]);

    return [ ref.current ];
};

export default usePreviousState;
