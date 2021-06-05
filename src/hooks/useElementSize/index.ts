import { RefObject, useEffect, useRef, useState } from "react";

import useResizeObserver from "~/hooks/useResizeObserver";

const useElementSize = <T extends Element>(externalRef?: RefObject<T>): IUseElementSizeResponse => {
    const ref = externalRef || useRef<T>(null);

    const [ size, setSize ] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        const element: T | null = ref.current;
        if (element) {
            const { width, height } = (element as T).getBoundingClientRect();
            setSize({
                width,
                height,
            });
        }
    }, [ ref ]);

    useResizeObserver(ref.current, setSize);

    return {
        ref,
        ...size,
    };
};

export default useElementSize;
