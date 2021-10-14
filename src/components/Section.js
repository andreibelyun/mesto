export default class Section {
    constructor(containerSelector) {   
        this._container = document.querySelector(containerSelector);
    } 

    renderItems(items, renderer) {
        this._renderer = renderer;
        items.reverse().forEach(item => {
            this.addItem(this._renderer(item));
        }); 
    } 

    addItem(element) { 
        this._container.prepend(element); 
    }
}