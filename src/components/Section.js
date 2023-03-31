export default class Section {
    constructor({items, renderer}, sectionSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = sectionSelector;
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