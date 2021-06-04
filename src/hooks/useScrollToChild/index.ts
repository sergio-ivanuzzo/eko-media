import { RefObject, useEffect, useRef } from "react";

export const SCROLL_CLASS = "navigated";

const useScrollToChild = <T extends HTMLElement | null>({ childIndex }: IUseScrollToProps): [RefObject<T>] => {
    const parentRef = useRef(null);

    useEffect(() => {
        const parent: HTMLElement | null = parentRef.current;
        if (parent && Number.isInteger(childIndex)) {
            const children = Array.from((parent as HTMLElement).children) as HTMLElement[];
            if (children.length) {
                const currentChild = children[childIndex as number] as HTMLElement;
                if (currentChild) {
                    currentChild.scrollIntoView({
                        block: "nearest",
                        inline: "start"
                    });
                    children.forEach((child) => child.classList.remove(SCROLL_CLASS));
                    currentChild.classList.add(SCROLL_CLASS);
                }
            }
        }
    }, [ parentRef, childIndex ]);

    return [ parentRef ];
};

export default useScrollToChild;
