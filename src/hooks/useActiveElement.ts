import { RefObject, useEffect, useRef, useState } from "react";

const useActiveElement = <T extends HTMLElement | null>(): [RefObject<T>, boolean] => {
    const [ isActiveElement, setIsActiveElement ] = useState(false);
    const ref = useRef<T>(null);

    useEffect(() => {
        const element: HTMLElement | null = ref.current;
        if (element) {
            const handleClick = (e: MouseEvent) => {
                setIsActiveElement(
                    element.contains(e.target as Node) || document.activeElement === element || e.target === element,
                );
            };
            document.addEventListener("mousedown", handleClick);

            return () => document.removeEventListener("mousedown", handleClick);
        }
    }, [ ref.current ]);

    return [ ref, isActiveElement ];
};

export default useActiveElement;
