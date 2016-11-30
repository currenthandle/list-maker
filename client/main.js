let h = require('virtual-dom/h');
let diff = require('virtual-dom/diff');
let patch = require('virtual-dom/patch');
let createElement = require('virtual-dom/create-element');

function render()  {
	return h('div', 'hello');
}

function input () {
    return h('form', [ 
        h('input', { 
            type: 'text',
            class: 'list-item'

        }),
        h('button', 'Add')
    ]);
}

let count = 0; 

let tree = input(); 
//console.log(tree);
let rootNode = createElement(tree);

document.querySelector('.content').appendChild(rootNode);

let items = [];

function add() {
    let item = h('li', document.querySelector('list-item').value);
    items.push(item)
    let newTree = [input()].concat(h('ul', items));
     
}


setInterval(function () {
      count++;

      let newTree = render(count);
      let patches = diff(tree, newTree);
      rootNode = patch(rootNode, patches);
      tree = newTree;
}, 1000);
