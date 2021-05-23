import { useEffect } from "react";

interface IListeners {
    [keyCode: string]: (e: KeyboardEvent) => void;
}

const useKeyboard = (listeners: IListeners, deps: any[] = []): void => {
    useEffect(() => {
        const rootListener = (e: KeyboardEvent) => {
            e.stopPropagation();

            const key = e.key.trim() || e.code.trim();

            if (key in listeners) {
                e.preventDefault();
                listeners[key](e);
            }
        };

        document.addEventListener("keydown", rootListener);
        return () => document.removeEventListener("keydown", rootListener);
    }, [ listeners, ...deps ]);
};

export default useKeyboard;
