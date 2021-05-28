import React from "react";

const CircleUp = ({ width = "100%", height = "100%" }: IIconProps): JSX.Element => {
    return (
        <svg width={width} height={height} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="22" cy="22" r="20" transform="rotate(90 22 22)" fill="white" stroke="#FF8557" strokeWidth="4"/>
            <path transform="rotate(180 22 22)" d="M22 26L23.4142 27.4142L22 28.8284L20.5858 27.4142L22 26ZM29.4142
            21.4142L23.4142 27.4142L20.5858 24.5858L26.5858 18.5858L29.4142 21.4142ZM20.5858 27.4142L14.5858
            21.4142L17.4142 18.5858L23.4142 24.5858L20.5858 27.4142Z"
                  fill="#FF8557"
            />
        </svg>



    );
};

export default CircleUp;
