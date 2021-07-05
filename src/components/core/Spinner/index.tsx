import React from "react";
import { SpinnerContainer } from "~/components/core/Spinner/styles";

const Spinner = ({ color }: ISpinnerProps): JSX.Element => {
    return (
        <SpinnerContainer color={color}>
            <div/><div/><div/><div/>
        </SpinnerContainer>
    );
};

export default Spinner;
