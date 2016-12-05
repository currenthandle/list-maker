import { h } from 'virtual-dom';

//import App from './App';

import ListMaker from './ListMaker';

import Dev from './Dev';
import Info from './Info';
import Resources from './Resources';

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

