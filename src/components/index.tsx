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
            console.log(location.pathname);
            history.push(location.pathname);
        }, 0);
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
