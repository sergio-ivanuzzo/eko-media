import React from "react";

export interface IRenderTriggerProps {
    onClick: () => void;
    isOpen: boolean;
}

export interface IDropdownProps {
    renderTrigger?: <T extends IRenderTriggerProps>(props: T) => React.ReactNode;
    multiple?: boolean;
    children: React.ReactNode;
}
