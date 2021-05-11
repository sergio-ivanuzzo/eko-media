import React from "react";

export interface IDropdownTriggerProps {
    onClick: () => void;
    isOpen: boolean;
}

export interface IDropdownProps {
    renderTrigger?: <T extends IDropdownTriggerProps>(props: T) => React.ReactNode;
    multiple?: boolean;
    children: React.ReactNode;
}
