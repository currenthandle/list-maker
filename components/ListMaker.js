import { h } from 'virtual-dom';

import Item from './Item';

module.exports = class ListMaker {
    constructor(update) {
        this.items = [];
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
        this.generateNode = this.generateNode.bind(this);
        this.update = update;
        //this.index = 0;
    }
    add(e) {
        // don't reload the page
        e.preventDefault();
        let content = e.target.querySelector('.input-field').value;
        if(!content) return;
        this.items.push(new Item(content, this.items.length, this.update));
        this.index++;
        this.update();
    }
    remove(e) {
        console.log('e.cT', e.target);
        if(e.target.classList.contains('fa')) {
            let liItem = e.target.parentNode;
            let index = liItem.classList[1];
            this.items.splice(index, 1);
            console.log('items', this.items)
            //this.index--;
            this.update();
            

        }
    }
    generateForm () {
        return h( 'form', 
            { onsubmit: this.add },
            [
                h( 'input', 
                    { 
                        type: 'text',
                        className: 'input-field',
                        value: ''
                    }
                ),
                h( 'button', 
                    { className: 'add-btn' },
                    h( 'i', { className: 'fa fa-plus' })
                )
            ]
        ); 
    }
    generateList() {
        return h( 'ul',
            { 
                className: 'item-list',
                onclick: this.remove
            },
            this.items.map(item => item.generateNode())
        );
    }
    generateNode() {
        return h( 'div', 
            { className: 'list-maker' },
            [
                h( 'h1', { className: 'title' }, 'List Maker'),
                h( 'h2', { className: 'subtitle' }, 'A Simple List Making SPA Made With Virtual-Dom'),
                h( 'h3', 
                    { className: 'vDom-link' }, 
                    h( 'a', 
                        { href: 'https://github.com/Matt-Esch/virtual-dom' }, 
                        'Matt-Esch/virtual-dom'
                    )
                ),
                this.generateForm(),
                this.generateList()
            ]
        );
    }
}
