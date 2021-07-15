const scrollWithOffset = (el: HTMLElement, offset: number, behavior: ScrollBehavior = "smooth") => {
    const elementPosition = el.offsetTop - offset;
    window.scroll({
        top: elementPosition,
        left: 0,
        behavior
    });
};

export default scrollWithOffset;
