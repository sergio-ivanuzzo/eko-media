import { RefObject, useEffect, useRef, useState } from "react";

const ROOT_MARGIN = "0px 0px -15% 0px";
const THRESHOLD = 0.9;

const useIntersectionObserver = <T extends HTMLElement | null>(
    { root = null, rootMargin = ROOT_MARGIN, threshold = THRESHOLD }: IUseIntersectionObserverProps
): [RefObject<T>, IntersectionObserverEntry] => {
    const targetRef = useRef<T>(null);

    const options = { root, rootMargin, threshold };

    const [ entry, setEntry ] = useState<IntersectionObserverEntry>({} as IntersectionObserverEntry);
    const observer = useRef(new IntersectionObserver((entries) => setEntry(entries[0]), options));

    useEffect(() => {
        const element: T | null = targetRef.current;
        if (element) {
            const { current: currentObserver } = observer;
            if (currentObserver) {
                currentObserver.disconnect();

                observer.current = new IntersectionObserver((entries) => setEntry(entries[0]), options);
                currentObserver.observe(element as Element);
                return () => currentObserver.disconnect();
            }
        }
    }, [ targetRef ]);

    return [ targetRef, entry ];
};

export default useIntersectionObserver;
