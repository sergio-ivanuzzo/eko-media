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

            // event SHOULD be mouseUP or keyUP, for DOWN events it works from second call
            document.addEventListener("mouseup", handleEvent);
            document.addEventListener("keyup", handleEvent);

            return () => {
                document.removeEventListener("mouseup", handleEvent);
                document.removeEventListener("keyup", handleEvent);
            };
        }
    }, [ ref.current ]);

    return [ ref, isActiveElement ];
};

export default useActiveElement;
