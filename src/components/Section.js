export default class Section {
    constructor({items, renderer}, selector) {
        this._items = items;
        this._renderer = renderer;
        this._container = selector;
    };

    addItem(item) {
        this._container.prepend(item);
    };

    renderItems() {
        this._items.forEach((item) => {
            this._container.append(this._renderer(item));
        });
    };
}