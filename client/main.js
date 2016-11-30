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
        h('button', 
            { class: 'add-btn' },
            'Add'
        )
    ]);
}

let count = 0; 

let tree = h('div', 
    { class: 'list' }, 
    input()
); 

//console.log(tree);
let rootNode = createElement(tree);

document.querySelector('.content').appendChild(rootNode);
document.querySelector('.add-btn').addEventListener('click', (e) => {
    e.preventDefault();
    add();
});

let items = [];

function add() {
    let item = h('li', document.querySelector('list-item').value);
    items.push(item);
    let newTree = h('div', 
        { class: 'list' }, 
        [
            input(),
            h('ul', items)
        ]
    );
    let patches = diff(tree, newTree);
    rootNode = patch(rootNode, patches);
    tree = newTree;
    console.log('items', items)
    document.querySelector('.add-btn').addEventListener('click', (e) => {
        e.preventDefault();
        add();
    });
}


/*
setInterval(function () {
      count++;

      let newTree = render(count);
      let patches = diff(tree, newTree);
      rootNode = patch(rootNode, patches);
      tree = newTree;
}, 1000);
*/
