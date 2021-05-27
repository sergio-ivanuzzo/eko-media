declare interface IUseNotifyErrorProps {
    throwManually?: boolean;
}

declare interface IUseNotifyErrorResponse {
    catchErrors: CallableFunction;
    throwErrors: CallableFunction;
}
