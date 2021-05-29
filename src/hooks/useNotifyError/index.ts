import { toast } from "react-toastify";
import { useIntl } from "react-intl";
import { useState } from "react";

import formatString from "~/helpers/formatString";

export class AppError extends Error {
    params?: string[];

    label?: string;

    constructor({ message, params = [], label = "" }: IAppErrorProps) {
        super(message);
        this.params = params;
        this.label = label;
    }
}

const useNotifyError = ({ throwManually = false }: IUseNotifyErrorProps = {}): IUseNotifyErrorResponse => {
    const [ errors, setError ] = useState<AppError[]>([]);
    const { formatMessage } = useIntl();

    const getErrorText = ({ message, params, label }: AppError): string => {
        const errorText = formatString({
            initial: formatMessage({ id: message }),
            params
        });

        return `${label}${errorText}`;
    }

    // for both sync and async functions (since JS allow this)
    const catchErrors = async (targetFunction: CallableFunction, label = "") => {
        try {
            return await targetFunction();
        } catch (e) {
            e.label = label;

            if (throwManually) {
                setError(e);
            } else {
                toast.error(getErrorText(e));
                throw e;
            }
        }
    }

    const throwErrors = () => {
        errors.forEach((e: AppError) => {
            toast.error(getErrorText(e));
            throw e;
        })
    }

    return {
        catchErrors,
        throwErrors,
    }
};

export default useNotifyError;
