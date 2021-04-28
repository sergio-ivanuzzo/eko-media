import { useState, useEffect, useCallback } from "react";

import csvToJson from "~/parsers/csvToJson";
import { dataFiles } from "~/common/constants";
import { dataFileExtension } from "../common/constants";

interface IItem {
    [key: string]: string | number;
}

const useData = (year: string, month: string) => {
    const [categoryAll, setCategoryAll] = useState<Array<IItem>>();
    const [connectionsAll, setConnectionsAll] = useState<IItem>();
    const [expertsPolitics, setExpertsPolitics] = useState<Array<IItem>>();
    const [expertsProfiles, setExpertsProfiles] = useState<Array<IItem>>();
    const [networkAll, setNetworkAll] = useState<IItem>();
    const [politiciansPolitics, setPoliticiansPolitics] = useState<Array<IItem>>();
    const [spherePolitics, setSpherePolitics] = useState<Array<IItem>>();
    const [wordCloudAll, setWordCloudAll] = useState<Array<IItem>>();

    const load = useCallback(async (filename: string): Promise<string> => {
        try {
            const response = await fetch(`data/${year}/${month}/${filename}`);
            return response.text();
        } catch (err) {
            console.log('Error:', err);
            throw(err);
        }
    }, [year, month]);

    useEffect(() => {
        if (year && month) {
            Promise.all(Object.values(dataFiles).map(async (filename: string) => {
                let data = await load(filename);
                if (filename.split('.').pop() === dataFileExtension.CSV) {
                    data = csvToJson(data);
                }

                setCategoryAll(csvToJson(data));
            }));
        }
    }, [year, month, load]);

    return {
        data: {
            ...categoryAll,
            ...connectionsAll,
            ...expertsPolitics,
            ...expertsProfiles,
            ...networkAll,
            ...politiciansPolitics,
            ...spherePolitics,
            ...wordCloudAll,
        },
        load,
    }
};

export default useData;
