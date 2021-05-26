import { RefObject, useEffect, useRef, useState } from "react";

import useResizeObserver from "~/hooks/useResizeObserver";

const useElementSize = <T extends Element>(): [RefObject<T>, number, number] => {
    const ref = useRef<T>(null);

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
            // const sizeExists = [ height, width ].every((item) => item !== undefined);
            // const sizeChanged = height !== size.height || width !== size.width;
            //
            // // prevent extra render
            // if (sizeExists && sizeChanged) {
            //     setSize({
            //         height,
            //         width,
            //     });
            // }
        }
    }, [ ref ]);

    useResizeObserver(ref.current, setSize);

    return [ ref, size.width, size.height ];
};

export default useElementSize;
