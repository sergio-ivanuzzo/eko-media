import React from "react";

const ArrowRight = ({ width = "100%", height = "100%" }: IIconProps): JSX.Element => {
    return (
        <svg width={width}
             height={height}
             viewBox="0 0 18 14"
             fill="none"
             xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M15.7944 7L16.5132 7.69524L17.1857 7L16.5132 6.30476L15.7944 7ZM1.28551 6C0.733224 6 0.285509
            6.44771 0.285509 7C0.285509 7.55228 0.733223 8 1.28551 8L1.28551 6ZM10.7096 13.6952L16.5132 7.69524L15.0757
            6.30476L9.27209 12.3048L10.7096 13.6952ZM16.5132 6.30476L10.7096 0.304755L9.27209 1.69524L15.0757
            7.69524L16.5132 6.30476ZM15.7944 6L1.28551 6L1.28551 8L15.7944 8L15.7944 6Z"
                  fill="#FF8557"
            />
        </svg>

    );
};

export default ArrowRight;
