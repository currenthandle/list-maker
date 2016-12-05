// let diff = require('virtual-dom').diff;
// let patch = require('virtual-dom').patch;

import { create, diff, patch } from 'virtual-dom';
import App from './components/App';

/*
** import { h } from 'virtual-dom';
** 
** h( 'div',
**     { className: 'class' },
**     'This is a virtual DIV'
** )

*/
let app;

let tree,
    rootNode;

(function intialize() {
    app = new App(update);

    tree = app.generateNode();
    rootNode = create(tree);
        
    document.querySelector('.content').appendChild(rootNode);
})()

function update () {
    let newTree = app.generateNode(),
        patches = diff(tree, newTree);

    rootNode = patch(rootNode, patches);
    tree = newTree;
}
