let h = require('virtual-dom/h');
let diff = require('virtual-dom/diff');
let patch = require('virtual-dom/patch');
let createElement = require('virtual-dom/create-element');

let items = [];
let tree = h('div', 
    { className: 'list' }, 
    input()
); 

let rootNode = createElement(tree);

document.querySelector('.content')
.appendChild(rootNode)
.addEventListener('submit', add);

function input () {
    return h('form', [ 
        h('input', { 
            type: 'text',
            className: 'list-item',
            value: ''
        }),
        h('button', 
            { className: 'add-btn' },
            'Add'
        )
    ]);
}


function add(e) {
    e.preventDefault();
    let itemContents = document.querySelector('.list-item').value;
    if (!itemContents) return
    let item = h('li', itemContents);
    items.push(item);
    let newTree = h('div', 
        { className: 'list' }, 
        [
            input(),
            h('ul', items)
        ]
    );
    let patches = diff(tree, newTree);
    rootNode = patch(rootNode, patches);
    tree = newTree;

    document.querySelector('.add-btn')
    .addEventListener('submit', (e) => {
        e.preventDefault();
        add();
    });
}

