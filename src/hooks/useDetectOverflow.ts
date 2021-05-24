import { RefObject, useRef, useState } from "react";

const useDetectOverflow = <T extends Element>(): [RefObject<T>] => {
    const flexContainerRef = useRef<T>(null);

    const [ overflowCount, setOverflowCount ] = useState(0);

    return [ flexContainerRef ];
};

export default useDetectOverflow;
