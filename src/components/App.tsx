import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "~/components/core/Header";

const App = (): JSX.Element => {
    return (
        <Router>
            <Header />
        </Router>
    );
};

export default App;
