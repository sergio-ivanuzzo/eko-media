import { IConditionalRenderProps } from "./types";

const ConditionalRender = ({ condition, children }: IConditionalRenderProps): JSX.Element => {
    const [ whenTrue, whenFalse ] = (<JSX.Element[]>[]).concat(children);
    return condition ? whenTrue : whenFalse || null;
};

export default ConditionalRender;