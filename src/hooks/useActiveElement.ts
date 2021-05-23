import { RefObject, useEffect, useRef, useState } from "react";

const useActiveElement = <T extends HTMLElement | null>(): [RefObject<T>, boolean] => {
    const [ isActiveElement, setIsActiveElement ] = useState(false);
    const ref = useRef<T>(null);

    useEffect(() => {
        const element: HTMLElement | null = ref.current;
        if (element) {
            const handleEvent = (e: Event) => {
                setIsActiveElement(
                    element.contains(e.target as Node) || document.activeElement === element || e.target === element,
                );
            };
            document.addEventListener("mousedown", handleEvent);
            document.addEventListener("keydown", handleEvent);

            return () => {
                document.removeEventListener("mousedown", handleEvent);
                document.removeEventListener("keydown", handleEvent);
            };
        }
    }, [ ref.current ]);

    return [ ref, isActiveElement ];
};

export default useActiveElement;
