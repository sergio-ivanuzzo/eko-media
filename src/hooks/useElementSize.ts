import { RefObject, useEffect, useRef, useState } from "react";

import useResizeObserver from "~/hooks/useResizeObserver";

const useElementSize = <T extends Element>(): [RefObject<T>, number, number] => {
    const ref = useRef<T>(null);

    const [ size, setSize ] = useState({
        height: 0,
        width: 0,
    });

    useEffect(() => {
        const element: T | null = ref.current;
        if (element) {
            const { height, width } = (element as T).getBoundingClientRect();
            const sizeExists = [ height, width ].every((item) => item !== undefined);
            const sizeChanged = height !== size.height || width !== size.width;

            // prevent extra render
            if (sizeExists && sizeChanged) {
                setSize({
                    height,
                    width,
                });
            }
        }
    }, [ ref ]);

    useResizeObserver(ref.current, setSize);

    return [ ref, size.height, size.width ];
};

export default useElementSize;
