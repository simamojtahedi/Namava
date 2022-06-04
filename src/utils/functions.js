export function imageUrl(url) {
    return `https://www.namava.ir${url}`
}

export function getCoords(element) {
    setTimeout( () => {
        const box = element.getBoundingClientRect()
        const body = document.body;
        const docEl = document.documentElement;
    
        const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
    
        const clientTop = docEl.clientTop || body.clientTop || 0
        const clientLeft = docEl.clientLeft || body.clientLeft || 0
    
        const top = box.top + scrollTop - clientTop
        const left = box.left + scrollLeft - clientLeft
    
        return {
            top: Math.round(top), 
            left: Math.round(left)
        }
    }, 20)
}

export function getItemUrl(title) {
        const new_title = title.replace(/[^a-zA-Z0-9\u0633\u06A9\u06AF\u06C0\u06CC\u060C\u062A\u062B\u062C\u062D\u062E\u062F\u063A\u064A\u064B\u064C\u064D\u064E\u064F\u067E\u0670\u0686\u0698\u200C\u0621-\u0629\u0630-\u0639\u0641-\u0654]/g, '_');
    return new_title;
}