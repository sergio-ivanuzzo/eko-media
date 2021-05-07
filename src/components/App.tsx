import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Content from "~/components/partials/Content";
import Footer from "~/components/partials/Footer";
import Header from "~/components/partials/Header";

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
