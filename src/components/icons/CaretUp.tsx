import React from "react";

const CaretUp = ({ width, height }: IIconProps): JSX.Element => {
    const iconWidth = width || "100%";
    const iconHeight = height || "100%";

    return (
        <svg width={iconWidth} height={iconHeight} viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 2L6.29289 1.29289L7 0.585787L7.70711 1.29289L7 2ZM0.292893 7.29289L6.29289 1.29289L7.70711
            2.70711L1.70711 8.70711L0.292893 7.29289ZM7.70711 1.29289L13.7071 7.29289L12.2929 8.70711L6.29289
            2.70711L7.70711 1.29289Z"
                  fill="#FF8557"
            />
        </svg>


    );
};

export default CaretUp;
