import { useEffect } from "react";

interface IListeners {
    [keyCode: string]: (e: KeyboardEvent) => void;
}

const useKeyboard = (listeners: IListeners): void => {
    useEffect(() => {
        const rootListener = (e: KeyboardEvent) => {
            e.stopPropagation();

            if (e.key in listeners) {
                e.preventDefault();
                listeners[e.key](e);
            }
        };

        document.addEventListener("keydown", rootListener);
        return () => document.removeEventListener("keydown", rootListener);
    }, [ listeners ]);
};

export default useKeyboard;
