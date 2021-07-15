const scrollWithOffset = (el: HTMLElement, offset: number) => {
    const elementPosition = el.offsetTop - offset;
    window.scroll({
        top: elementPosition,
        left: 0,
        behavior: "smooth"
    });
};

export default scrollWithOffset;
