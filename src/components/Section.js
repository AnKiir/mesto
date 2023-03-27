export default class Section {
    constructor({items, renderer}, selector) {
        this._items = items;
        this.renderer = renderer;
        this._container = document.querySelector(selector);
    };

    addItem(item) {
        this._container.prerend(item);
    };

    renderItems() {
        this._items.forEach((item) => {
            this._container.append(this._renderer(item));
        });
    };
}