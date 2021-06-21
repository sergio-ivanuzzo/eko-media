const useCanvas = () => {

    const getContext = () => {
        const canvas = document.createElement("canvas");
        return canvas.getContext("2d");
    }

    const getTextWidth = (text: string, font: string): number => {
        const context = getContext() as CanvasRenderingContext2D;
        context.font = font;
        const metrics = context.measureText(text);
        return metrics.width;
    };

    return {
        getTextWidth,
    }
};

export default useCanvas;
