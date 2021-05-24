import React from "react";

import Content from "~/components/partials/Content";
import Footer from "~/components/partials/Footer";
import Header from "~/components/partials/Header";

const App = (): JSX.Element => {
    return (
        <>
            <Header sticky />
            <Content />
            <Footer />
        </>
    );
};

export default App;
