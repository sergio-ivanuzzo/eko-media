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

    const processError = (e: AppError, label = ""): void => {
        const errorText = getErrorText(e);
        e.label = label;
        e.message = errorText;

        if (throwManually) {
            setError((prevErrors) => [ ...prevErrors, e ]);
            toast.error(errorText);
        } else {
            toast.error(errorText);
            throw e;
        }
    }

    const catchErrors = async (targetFunction: CallableFunction, label = "") => {
        try {
            return await targetFunction();
        } catch (e) {
            processError(e, label);
        }
    }

    const catchErrorsSync = (targetFunction: CallableFunction, label = "") => {
        try {
            return targetFunction();
        } catch (e) {
            processError(e, label);
        }
    }

    const throwErrors = () => {
        const errorsCopy = [ ...errors ];
        setError([]);
        errorsCopy.forEach((e: AppError) => {
            toast.error(getErrorText(e));
            throw e;
        })
    }

    return {
        catchErrors,
        catchErrorsSync,
        throwErrors,
    }
};

export default useNotifyError;
