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
    .appendChild(rootNode);

function input () {
    return h('form', { onsubmit: add }, [ 
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
    let form = e.target;
    let itemContents = form.querySelector('.list-item').value;
    if (!itemContents) return
    let item = h('li', itemContents);
    items.push(item);
    let newTree = h('div', 
        { 
            className: 'list',
            onclick: (e) => e.target.classList.toggle('complete')
        }, 
        [
            input(),
            h('ul', items)
        ]
    );
    let patches = diff(tree, newTree);
    rootNode = patch(rootNode, patches);
    tree = newTree;
}

