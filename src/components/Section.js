export default class Section {
    constructor({ renderer }, sectionElement) {
        this._renderer = renderer;
        this._container = document.querySelector(sectionElement);
    };

    addItem(item) {
        this._container.prepend(item);
    };

    renderItems(items) {
        items.forEach(item => {
            this._renderer(item);
        });
    };    

}