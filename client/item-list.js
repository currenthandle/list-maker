import { h } from 'virtual-dom';
import Item from './item';

let items;

module.exports = class ItemList {
    constructor(items) {
        this.items = items;
    }
    generateNode () {
        return h(
            'ul',
            { className: 'item-list' },
            items.map(item => item.generateNode())
        );
    }
    add(e) {
        // don't reload the page
        e.preventDefault();
        let content = e.target.querySelector('.input-field').value;
        if(!content) return;
        items.push(new Item(content, items.length));
        update();
    }
}
