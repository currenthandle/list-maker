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
class Dev {
    generateNode() {
        return h(
            'div',
            { className: 'contact' }, 
            [
                h('h4', { className: 'label' }, 'Get In Touch'),
                h('div', { className: 'name' }, 'Casey Siebel'),
                h('div', { className: 'email'}, h('a', { href: 'mailto:casey.siebel@gmail.com' }, 'Casey.Siebel@gmail.com')),
                h('div', { className: 'twitter' }, h('a', { href: 'https://twitter.com/CurrentHandle' }, '@CurrentHandle')),
                h('div', { className: 'irc' }, 'leptone (Freenode)'),
                h('div', { className: 'github' }, h('a', { href: 'https://github.com/leptone/list-maker' }, 'Github'))
            ]
        )

    }
}
class Info {
    generateNode() {
        return h(
            'div',
            { className: 'info' },
            [
                h(
                    'div',
                    { className: 'tools' },
                    [
                        h('h4', { className: 'label' }, 'This App Was Made With'),
                        h('div', h('a', { href: 'https://github.com/Matt-Esch/virtual-dom' }, 'Virtual Dom')),
                        h('div', h('a', { href: 'https://github.com/substack/node-browserify' }, 'Browserify')),
                        h('div', h('a', { href: 'https://github.com/babel/babelify' }, 'Babel (ES2015)')),
                        h('div', h('a', { href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes' }, 'Object Oriented JS')),
                        h('div', h('a', { href: 'https://www.npmjs.com/package/node-sass' }, 'Node-Sass')),
                        h('div', h('a', { href: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/' }, 'Flexbox')),
                    ]
                ),
            ]
        );
    }
}
class Resources {
    generateNode() {
        return h(
            'div',
            { className: 'resources' },
            [
                h('div', h('a', { href: 'https://github.com/Matt-Esch/virtual-dom' }, 'Matt-Esch/virtual-dom')),
                h('div', h('a', { href: 'https://medium.com/cardlife-app/what-is-virtual-dom-c0ec6d6a925c#.zgnhxujrw' }, 'What is a Virtual Dom - Tony Freed')),
                h('div', h('a', { href: 'https://www.youtube.com/watch?v=BYbgopx44vo' }, 'React and the Virtual DOM')),
                h('div', h('a', { href: 'https://www.youtube.com/watch?v=I_t_byKAL6U' }, 'Cyber Wizard Institute - Substack')),
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
                h('h2', { className: 'subtitle' }, 'A Simple List Making SPA Made With Virtual-Dom'),
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
