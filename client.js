import { h } from 'virtual-dom';

class ListMaker {
    constructor(items) {
        this.itemList = new ItemList(items);
    }
    generateForm () {
        return h(
            'form', 
            { onsubmit: this.itemList.add },
            [
                h('input', { 
                    type: 'text',
                    className: 'input-field',
                    value: ''
                }),
                h('button', 
                    { className: 'add-btn' },
                    h('i', { className: 'fa fa-plus' })
                )
            ]
        ); 
    }
    generateNode() {
        return h(
            'div', 
            { className: 'list-maker' },
            [
                this.generateForm(),
                this.itemList.generateNode()
            ]
        );
    }
}

class ItemList {
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

class Item {
    constructor(content, index){
        this.content = content; 
        this.index = index;
        this.classes = ['item'];
        this.complete = false;
    }
    toggleComplete(){
        this.complete = !this.complete;
        this.complete ? this.classes.push('complete') : this.classes.pop();
        update();
    }
    generateNode(){
        return h(
            'li',
            { 
                className: this.classes.reduce((acc, crt) => acc + ' ' + crt),
                onclick: (e) => this.toggleComplete()
            },
            this.content 
        );
    }
}

import { diff, patch, create as createElement } from 'virtual-dom';
// let diff = require('virtual-dom').diff;
// let patch = require('virtual-dom').patch;

let items,
    tree,
    rootNode;

(function intialize() {
    items = [];

    let listMaker = new ListMaker(items);

    tree = listMaker.generateNode();
    rootNode = createElement(tree);
        
    document.querySelector('.content').appendChild(rootNode);
})()

function update () {
    let listMaker = new ListMaker(items);

    let newTree = listMaker.generateNode(),
        patches = diff(tree, newTree);

    rootNode = patch(rootNode, patches);
    tree = newTree;
}
