const loadFile = async (filename: string): Promise<string> => {
    try {
        const response = await fetch(`data/${year}/${month}/${filename}`);
        return response.text();
    } catch (err) {
        console.log('Error:', err);
        throw(err);
    }
};

export default loadFile;