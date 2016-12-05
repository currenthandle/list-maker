import { h } from 'virtual-dom';

module.exports = class Item {
    constructor(content, index, update){
        this.content = content; 
        this.index = index;
        this.classes = ['item'];
        this.complete = false;
        this.update = update;
    }
    toggleComplete(){
        this.complete = !this.complete;
        this.complete ? this.classes.push('complete') : this.classes.pop();
        this.update();
    }
    generateNode(){
        return h(
            'li',
            { 
                className: this.classes.reduce((acc, crt) => acc + ' ' + crt),
                onclick: (e) => this.toggleComplete()
            },
            this.content 
        );
    }
}
