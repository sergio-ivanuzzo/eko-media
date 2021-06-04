import { useEffect, useState } from "react";

import isEqual from "~/helpers/isEqual";
import usePreviousState from "~/hooks/usePreviousState";

const useDetectArrayResize = <T>(targetArray: T[]) => {
    const [ prevArray = [] ] = usePreviousState(targetArray);
    // index of array from which we need to change items on right
    // if offset >= 0 should add 1, if offset < 0 should sub 1
    const [ offset, setOffset ] = useState<number | undefined>();

    useEffect(() => {
        if (prevArray.length && targetArray.length && prevArray.length !== targetArray.length) {
            const diff = targetArray.length - prevArray.length;
            const diffIndex = prevArray.findIndex((item, index) => !isEqual(item, targetArray[index]));
            setOffset(diff < 0 ? -diffIndex : diffIndex);
        }
    }, [ prevArray, targetArray ]);

    return [ offset ];
};

export default useDetectArrayResize;
