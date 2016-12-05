import ListMaker from './ListMaker';
import Item from './Item';

import Resources from './Resources';
import Dev from './Dev';
import Info from './Info';

import { h } from 'virtual-dom';

module.exports = class App {
    constructor(location, update){
       this.location = location; 
       //this.generateNode = this.generateNode.bind(this);
       this.changeView = this.changeView.bind(this);
       this.update = update;
    }
    changeView(location) {
        this.location = location;
        console.log('update in location', location)
        this.update(); 
    }
    generateNav() {
        return h(
            'div',
            { className: 'nav' },
            [
                h('button', { onclick: (e) => this.changeView(new Dev()) }, 'Dev'),
                h('button', { onclick: (e) => this.changeView(new Info()) }, 'Info'),
                h('button', { onclick: (e) => this.changeView(listMaker) }, 'App'),
                h('button', { onclick: (e) => this.changeView(new Resources()) },'Resources'),
            ]
        );
    }
    generateNode() {
        console.log('this.location', this.location);
        return h (
            'div',
            { className: 'app' },
            [
                this.generateNav(),
                this.location.generateNode()
            ]
        );
    }
}
