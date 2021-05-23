import React from "react";

const Close = ({ width = "100%", height = "100%" }: IIconProps): JSX.Element => {
    return (
        <svg width={width} height={height} viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 1.5L1 10.5" stroke="#636262" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M1 1.5L10 10.5" stroke="#636262" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

    );
};

export default Close;
