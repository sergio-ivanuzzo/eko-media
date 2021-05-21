import React from "react";

const ArrowLeft = ({ width, height }: IIconProps): JSX.Element => {
    const iconWidth = width || "100%";
    const iconHeight = height || "100%";

    return (
        <svg width={iconWidth}
             height={iconHeight}
             viewBox="0 0 18 14"
             fill="none"
             xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M2.28564 7L1.56687 6.30476L0.894388 7L1.56687 7.69524L2.28564 7ZM16.7946 8C17.3469 8 17.7946
            7.55228 17.7946 7C17.7946 6.44772 17.3469 6 16.7946 6V8ZM7.37044 0.304757L1.56687 6.30476L3.00442
            7.69524L8.80799 1.69524L7.37044 0.304757ZM1.56687 7.69524L7.37044 13.6952L8.80799 12.3048L3.00442
            6.30476L1.56687 7.69524ZM2.28564 8L16.7946 8V6L2.28564 6L2.28564 8Z"
                  fill="#FF8557"
            />
        </svg>

    );
};

export default ArrowLeft;
