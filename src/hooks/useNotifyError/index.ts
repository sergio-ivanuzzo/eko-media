import { toast } from "react-toastify";
import { useIntl } from "react-intl";
import { useEffect, useState } from "react";

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
    const [ error, setError ] = useState<AppError>();
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

        setError(e);
    }

    const catchErrors = async (targetFunction: CallableFunction, label = "") => {
        try {
            return await targetFunction();
        } catch (e) {
            processError(e, label);
            throw e;
        }
    }

    const catchErrorsSync = (targetFunction: CallableFunction, label = "") => {
        try {
            return targetFunction();
        } catch (e) {
            processError(e, label);
            throw e;
        }
    }

    useEffect(() => {
        if (error) {
            const errorText = getErrorText(error);
            toast.error(errorText);
            setError(undefined);
        }
    }, [ error ]);

    return {
        catchErrors,
        catchErrorsSync,
    }
};

export default useNotifyError;
