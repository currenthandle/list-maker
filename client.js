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
                h('button', { onclick: (e) => update(new Dev()) }, 'Dev'),
                h('button', { onclick: (e) => update(new Info()) }, 'Info'),
                h('button', { onclick: (e) => update(new ListMaker(items)) }, 'App'),
                h('button', { onclick: (e) => update(new Resources()) },'Resources'),
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
import Resources from './Resources';
import Dev from './Dev';
import Info from './Info';

class ListMaker {
    constructor() {
        this.items = [];
    }
    add(e) {
        // don't reload the page
        e.preventDefault();
        let content = e.target.querySelector('.input-field').value;
        if(!content) return;
        items.push(new Item(content, items.length));
        update(new ListMaker(items));
    }
    generateForm () {
        return h(
            'form', 
            { onsubmit: this.add },
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
    generateList() {
        return h(
            'ul',
            { className: 'item-list' },
            items.map(item => item.generateNode())
        );
    }
    generateNode() {
        return h(
            'div', 
            { className: 'list-maker' },
            [
                h('h1', { className: 'title' }, 'List Maker'),
                h('h2', { className: 'subtitle' }, 'A Simple List Making SPA Made With Virtual-Dom'),
                h('h3', { className: 'vDom-link' }, h('a', { href: 'https://github.com/Matt-Esch/virtual-dom' }, 'Matt-Esch/virtual-dom')),
                this.generateForm(),
                this.generateList()
            ]
        );
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
        update(listMaker);
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

let listMaker

(function intialize() {
    items = [];

    listMaker = new ListMaker();
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

