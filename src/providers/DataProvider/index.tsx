import React, { createContext, useState } from "react";

import { IData, IDataProviderContext, IDataProviderProps } from "~/providers/DataProvider/types";

export const DataContext = createContext<IDataProviderContext>({ data: {}, setData: () => undefined });

const DataProvider = ({ children }: IDataProviderProps): JSX.Element => {
    const [ data, setData ] = useState<IData>({});

    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;
