declare interface IUseNotifyErrorProps {
    throwManually?: boolean;
}

declare interface IUseNotifyErrorResponse {
    catchErrors: CallableFunction;
    catchErrorsSync: CallableFunction;
    throwErrors: CallableFunction;
}

declare interface IAppErrorProps {
    message: string;
    params?: string[];
    label?: string;
}
