import { useEffect } from "react";

const useResizeObserver = <T extends Element>(target: T | null, onResize: Function): void => {
    useEffect(() => {
        if (target) {
            const observer = new ResizeObserver(() => {
                const { height, width } = target.getBoundingClientRect();
                onResize({ height, width });
            });

            observer.observe(target);
            return () => observer.disconnect();
        }
    }, [ target ]);
};

export default useResizeObserver;
