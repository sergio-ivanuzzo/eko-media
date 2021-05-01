import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Content from "~/components/core/Content";
import Footer from "~/components/core/Footer";
import Header from "~/components/core/Header";

const App = (): JSX.Element => {
    return (
        <Router>
            <Header />
            <Content />
            <Footer />
        </Router>
    );
};

export default App;
