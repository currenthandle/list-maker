import { h, diff, patch, create as createElement } from 'virtual-dom';

class ListMaker {
    constructor(itemList) {
        this.itemList = itemList;
    }
    generateForm () {
        return h('form', 
        {  onsubmit: add },
        [
            h('input', { 
                type: 'text',
                className: 'input-field',
                value: '',
            }),
            h('button', 
                { className: 'add-btn' },
                'Add'
            )
        ]); 
    }
    generateNode() {
        return h(
            'div', 
            { className: 'list-maker' },
            [
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
    }
    generateNode(){
        return h(
            'li',
            { 
                className: this.classes
                    //.map(cls => '.'+ cls)
                    .reduce((acc, crt) => acc + ' ' + crt),
                onclick: (e) => toggleComplete(this.index)
            },
            this.content 
        );
    }
}

let items = [];

let itemList = new ItemList(items);
let listMaker = new ListMaker(itemList);

let tree = listMaker.generateNode();
let rootNode = createElement(tree);

document.querySelector('.content')
    .appendChild(rootNode);

function add(e) {
    // don't reload the page
    e.preventDefault();
    let content = e.target.querySelector('.input-field').value;
    if(!content) return;
    items.push(new Item(content, items.length));
    update();
}

function toggleComplete(index) {
    items[index].toggleComplete();
    update();
}

function update () {
    let itemlist = new ItemList(items);
    let listMaker = new ListMaker(itemList);

    let newTree = listMaker.generateNode();
    let patches = diff(tree, newTree);
    rootNode = patch(rootNode, patches);
    tree = newTree;
}

