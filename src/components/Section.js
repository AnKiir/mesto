export default class Section {
    constructor({ items, renderer }, sectionElement) {
        this._items = items;
        this._renderer = renderer;
        this._container = sectionElement;
    };

    addItem(item) {
        this._container.prepend(item);
    };

    renderItems() {
        this._items.forEach(item => {
            this._renderer(item);
        });
    };    

}