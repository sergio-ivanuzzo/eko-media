declare interface IUseNotifyErrorProps {
    throwManually?: boolean;
}

declare interface IUseNotifyErrorResponse {
    catchErrors: CallableFunction;
    catchErrorsSync: CallableFunction;
}

declare interface IAppErrorProps {
    message: string;
    params?: string[];
    label?: string;
}
