import { useEffect } from "react";

const useResizeObserver = <T extends Element>(target: T | null, onResize: Function): void => {
    useEffect(() => {
        if (target) {
            const observer = new MutationObserver(() => {
                const { height, width } = target.getBoundingClientRect();
                onResize({ height, width });
            });

            observer.observe(target, {
                attributes: true,
                childList: true,
                subtree: true,
            });
            return () => observer.disconnect();
        }
    }, [ target ]);
};

export default useResizeObserver;
