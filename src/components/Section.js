export default class Section {
    constructor({ items, renderer }, sectionElement) {
        this._items = items;
        this._renderer = renderer;
        this._container = sectionElement;
    };

    renderAll(items) {
        items.forEach((item) => {
            this._renderer(item);
        });
    };    
    
    prependItem(item) {
        this._container.prepend(item);
    };

    appendItem(item) {
        this._container.append(item);
    }
}