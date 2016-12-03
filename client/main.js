import { h, diff, patch, create as createElement } from 'virtual-dom';

class ListMaker {
    constructor(itemList) {
        this.itemList = itemList;
    }
    generateForm () {
        return h('form', 
        {  onsubmit: this.itemList.add },
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
    add(e) {
        // don't reload the page
        e.preventDefault();
        let content = e.target.querySelector('.input-field').value;
        if(!content) return;
        items.push(new Item(content, items.length));
        update();
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
        update();
    }
    generateNode(){
        return h(
            'li',
            { 
                className: this.classes
                    //.map(cls => '.'+ cls)
                    .reduce((acc, crt) => acc + ' ' + crt),
                onclick: (e) => this.toggleComplete()
            },
            this.content 
        );
    }
}

let items,
    tree,
    rootNode;

(function intialize() {
    items = [];
    let itemList = new ItemList(items);
    let listMaker = new ListMaker(itemList);

    tree = listMaker.generateNode();
    rootNode = createElement(tree);
        
    document.querySelector('.content')
        .appendChild(rootNode);
})()

function update () {
    let itemList = new ItemList(items);
    let listMaker = new ListMaker(itemList);

    let newTree = listMaker.generateNode();
    let patches = diff(tree, newTree);
    rootNode = patch(rootNode, patches);
    tree = newTree;
}
