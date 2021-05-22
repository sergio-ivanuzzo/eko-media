import React from "react";

const CaretDown = ({ width, height }: IIconProps): JSX.Element => {
    const iconWidth = width || "100%";
    const iconHeight = height || "100%";

    return (
        <svg width={iconWidth} height={iconHeight} viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 7L7.70711 7.70711L7 8.41421L6.29289 7.70711L7 7ZM13.7071 1.70711L7.70711 7.70711L6.29289
            6.29289L12.2929 0.292893L13.7071 1.70711ZM6.29289 7.70711L0.292893 1.70711L1.70711 0.292894L7.70711
            6.29289L6.29289 7.70711Z"
                  fill="#FF8557"
            />
        </svg>


    );
};

export default CaretDown;
