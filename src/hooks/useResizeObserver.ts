import { ResizeObserver as Observer } from "resize-observer";
import { useEffect } from "react";

const useResizeObserver = <T extends Element>(target: T | null, onResize: Function): void => {
    useEffect(() => {
        if (target) {
            const observer = new (window.ResizeObserver ?? Observer)(() => {
                const { height, width } = target.getBoundingClientRect();
                onResize({ height, width });
            });

            observer.observe(target);
            return () => observer.disconnect();
        }
    }, [ target ]);
};

export default useResizeObserver;
