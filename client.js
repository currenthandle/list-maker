import { h } from 'virtual-dom';

class App {
    constructor(location, update){
       this.location = location; 
       //this.generateNode = this.generateNode.bind(this);
       this.changeView = this.changeView.bind(this);
       this.update = update;
    }
    changeView(location) {
        this.location = location;
        console.log('update in location', location)
        this.update(); 
    }
    generateNav() {
        return h(
            'div',
            { className: 'nav' },
            [
                h('button', { onclick: (e) => this.changeView(new Dev()) }, 'Dev'),
                h('button', { onclick: (e) => this.changeView(new Info()) }, 'Info'),
                h('button', { onclick: (e) => this.changeView(listMaker) }, 'App'),
                h('button', { onclick: (e) => this.changeView(new Resources()) },'Resources'),
            ]
        );
    }
    generateNode() {
        console.log('this.location', this.location);
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
    constructor(update) {
        this.items = [];
        this.add = this.add.bind(this);
        this.generateNode = this.generateNode.bind(this);
        this.update = update;
    }
    add(e) {
        // don't reload the page
        e.preventDefault();
        let content = e.target.querySelector('.input-field').value;
        if(!content) return;
        this.items.push(new Item(content, this.items.length, this.update));
        update();
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
            this.items.map(item => item.generateNode())
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
    constructor(content, index, update){
        this.content = content; 
        this.index = index;
        this.classes = ['item'];
        this.complete = false;
        this.update = update;
    }
    toggleComplete(){
        this.complete = !this.complete;
        this.complete ? this.classes.push('complete') : this.classes.pop();
        this.update(listMaker);
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

let tree,
    rootNode;

let app,
    listMaker;

(function intialize() {

    listMaker = new ListMaker(update);
    app = new App(listMaker, update);

    tree = app.generateNode();
    //tree = listMaker.generateNode();
    rootNode = createElement(tree);
        
    document.querySelector('.content').appendChild(rootNode);
})()

function update () {

    let newTree = app.generateNode()
    console.log('newTree', newTree)
    let  patches = diff(tree, newTree);

    rootNode = patch(rootNode, patches);
    tree = newTree;
}

