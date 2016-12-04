import { h } from 'virtual-dom';

class App {
    constructor(location){
       this.location = location; 
    }
    generateNav() {
        return h(
            'div',
            { className: 'nav' },
            [
                h('button', 'Author'),
                h('button', { onclick: update }, 'App'),
                h('button', 'Acknowledgements'),
            ]
        );
    }
    generateNode() {
        return h (
            'div',
            { className: 'app' },
            [
                this.generateNav(),
                this.location.generateNode()
            ]
        );
    }
}

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
                h('h1', { className: 'title' }, 'List Maker'),
                h('h2', { className: 'subtitle' }, 'A Simple List Making Application Made With Virtual-Dom'),
                h('h3', { className: 'vDom-link' }, h('a', { href: 'https://github.com/Matt-Esch/virtual-dom' }, 'Matt-Esch/virtual-dom')),
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
        update(new ListMaker(items));
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
        update(new ListMaker(items));
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
    let app = new App(listMaker);

    tree = app.generateNode();
    //tree = listMaker.generateNode();
    rootNode = createElement(tree);
        
    document.querySelector('.content').appendChild(rootNode);
})()

function update (location) {
    //let listMaker = new ListMaker(items);
    let app = new App(location);

    let newTree = app.generateNode(),
        patches = diff(tree, newTree);

    rootNode = patch(rootNode, patches);
    tree = newTree;
}

function author () {

}
