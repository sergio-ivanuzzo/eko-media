import { ToastContainer } from "react-toastify";
import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import Content from "~/components/partials/Content";
import Footer from "~/components/partials/Footer";
import Header from "~/components/partials/Header";

const App = (): JSX.Element => {
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            history.push(location.pathname);
            const hash = location.hash.trim();
            if (hash) {
                window.location.href = `${location.pathname}${location.hash}`;

                const id = hash.replace("#", "");
                const element = document.getElementById(id);
                if (element) {
                    const elementPosition = element.offsetTop - 20;
                    window.scroll({
                        top: elementPosition,
                        left: 0,
                        behavior: "smooth"
                    });
                }
            }
        }, 100);
    }, []);

    return (
        <>
            <Header sticky />
            <Content />
            <Footer />
            <ToastContainer />
        </>
    );
};

export default App;
