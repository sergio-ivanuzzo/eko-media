import { withRouter } from "react-router-dom";
import React, { useEffect } from "react";

const ScrollToTop = ({ history, children }: IScrollToTopProps) => {
    useEffect(() => {
        const unlisten = history.listen(() => {
            window.scrollTo(0, 0);
        });
        return () => {
            unlisten();
        }
    }, []);

    return <>{children}</>;
}

export default withRouter(ScrollToTop);
