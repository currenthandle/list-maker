import App from './App';
import { diff, patch, create as createElement } from 'virtual-dom';
// let diff = require('virtual-dom').diff;
// let patch = require('virtual-dom').patch;

let tree,
    rootNode;

let app,
    listMaker;

(function intialize() {

    //listMaker = new ListMaker(update);
    app = new App(update);

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

