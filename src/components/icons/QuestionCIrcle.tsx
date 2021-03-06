import React from "react";

const QuestionCircle = ({ width = "100%", height = "100%", color="#FF8557" }: IIconProps): JSX.Element => {
    return (
        <svg width={width} height={height} viewBox="0 0 13 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="6.5" cy="11" rx="6.5" ry="7" fill={color} />
            <path d="M7.35436 13.53V15H5.59436V13.53H7.35436ZM6.58436 7.73C7.35769 7.73 7.96436 7.89667
            8.40436 8.23C8.84436 8.56333 9.06436 9.02667 9.06436 9.62C9.06436 9.96 8.99436 10.25 8.85436 10.49C8.72102
            10.73 8.46102 11.01 8.07436 11.33C7.71436 11.6367 7.47436 11.9 7.35436 12.12C7.24102 12.3333 7.18436
            12.6333 7.18436 13.02H5.78436C5.77102 12.92 5.76436 12.7733 5.76436 12.58C5.76436 12.1533 5.82102 11.82
            5.93436 11.58C6.05436 11.3333 6.30102 11.0433 6.67436 10.71C6.94769 10.4633 7.12436 10.2733 7.20436
            10.14C7.28436 10 7.32436 9.83667 7.32436 9.65C7.32436 9.45667 7.25769 9.30667 7.12436 9.2C6.99769 9.08667
            6.81769 9.03 6.58436 9.03C6.01102 9.03 5.72102 9.35667 5.71436 10.01H3.99436C4.00102 9.27 4.22769 8.70667
            4.67436 8.32C5.12769 7.92667 5.76436 7.73 6.58436 7.73Z"
                  fill="white"/>
        </svg>


    );
};

export default QuestionCircle;
