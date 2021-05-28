import { toast } from "react-toastify";
import { useState } from "react";

const useNotifyError = ({ throwManually = false }: IUseNotifyErrorProps = {}): IUseNotifyErrorResponse => {
    const [ errors, setError ] = useState<Error[]>([]);

    // for both sync and async functions (since JS allow this)
    const catchErrors = async (targetFunction: CallableFunction) => {
        try {
            return await targetFunction();
        } catch (e) {
            if (throwManually) {
                setError(e);
            } else {
                toast.error(e.toString());
                throw e;
            }
        }
    }

    const throwErrors = () => {
        errors.forEach((e: Error) => {
            toast.error(e.toString());
            throw e;
        })
    }

    return {
        catchErrors,
        throwErrors,
    }
};

export default useNotifyError;
