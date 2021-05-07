import React from "react";

import Network from "~/components/charts/Network";
import StackedBar from "~/components/charts/StackedBar";

const MainPage = (): JSX.Element => {
    return (
        <div>
            <div>
                <StackedBar />
            </div>
            <div>
                <Network />
            </div>
        </div>
    );
};

export default MainPage;
