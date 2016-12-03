import { h } from 'virtual-dom';

module.exports = class Item {
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
