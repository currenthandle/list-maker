import App from './components/App';
import { diff, patch, create as createElement } from 'virtual-dom';
// let diff = require('virtual-dom').diff;
// let patch = require('virtual-dom').patch;

let app;

let tree,
    rootNode;

(function intialize() {
    app = new App(update);

    tree = app.generateNode();
    rootNode = createElement(tree);
        
    document.querySelector('.content').appendChild(rootNode);
})()

function update () {
    let newTree = app.generateNode(),
        patches = diff(tree, newTree);

    rootNode = patch(rootNode, patches);
    tree = newTree;
}

