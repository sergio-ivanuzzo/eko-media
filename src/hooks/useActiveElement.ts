import { RefObject, useEffect, useRef, useState } from "react";

const useActiveElement = <T extends HTMLElement | null>(externalRef?: RefObject<T>): [RefObject<T>, boolean] => {
    const [ isActiveElement, setIsActiveElement ] = useState(false);
    const ref = externalRef || useRef<T>(null);

    useEffect(() => {
        const element: HTMLElement | null = ref.current;
        if (element) {
            const handleEvent = (e: Event) => {
                const isActive = element.contains(e.target as Node)
                    || document.activeElement === element
                    || e.target === element;

                if (isActive && document.activeElement !== element) {
                    (document.activeElement as HTMLElement).blur();
                }
                setIsActiveElement(isActive);
            };

            // !!! event SHOULD be mouseUP or keyUP, for DOWN events it works on second call
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
