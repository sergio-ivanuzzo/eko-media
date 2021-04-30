import React, { createContext, useContext, useState } from "react";

import { IData } from "~/hooks/useData/types";
import { IDataProviderContext, IDataProviderProps } from "~/providers/DataProvider/types";

export const DataContext = createContext<IDataProviderContext>({});

const DataProvider = ({ children }: IDataProviderProps): JSX.Element => {
    const [data, setData] = useState<IData>({});

    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;
