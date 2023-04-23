export default class Section {
    constructor({ items, renderer }, sectionElement) {
        this._items = items;
        this._renderer = renderer;
        this._container = sectionElement;
    };

    prependItem(item) {
        this._container.prepend(item);
    };

    renderAll(items) {
        items.forEach((item) => {
            this._container.append(this._renderer(item));
        });
    };
}