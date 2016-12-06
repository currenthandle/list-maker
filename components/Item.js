import { h } from 'virtual-dom';

module.exports = class Item {
    constructor(content, index, update){
        this.content = content; 
        this.index = index;
        this.classes = ['item', index];
        this.complete = false;
        this.update = update;

        this.remove = this.remove.bind(this);
    }
    toggleComplete(){
        this.complete = !this.complete;
        this.complete ? this.classes.push('complete') : this.classes.pop();
        this.update();
    }
    remove(e) {
        this.classes.push('removed');
        this.update();
        return;
    }
    generateNode(){
        return h( 'li',
            { 
                className: this.classes.reduce((acc, crt) => acc + ' ' + crt),
            },
            [
                h( 'div', 
                    { 
                        className: 'li-content',
                        onclick: (e) => this.toggleComplete()
                    }, 
                    this.content),
                h( 'i', 
                    { 
                        className: 'fa fa-times-circle',
                        //onclick: this.remove
                    }
                )
            ]
        );
    }
}
