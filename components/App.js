import { h } from 'virtual-dom';

import ListMaker from './ListMaker';

import Dev from './Dev';
import Info from './Info';
import Resources from './Resources';

module.exports = class App {
    constructor(update){
        this.update = update;

        // Components
        this.location = this.listMaker = new ListMaker(update); 
        this.dev = new Dev();
        this.info = new Info();
        this.resources = new Resources();
    }
    changeView(location) {
        this.location = location;
        this.update(); 
    }
    generateNav() {
        return h( 'div',
            { className: 'nav' },
            [
                h('button', { onclick: (e) => this.changeView(this.dev) }, 'Dev'),
                h('button', { onclick: (e) => this.changeView(this.info) }, 'Info'),
                h('button', { onclick: (e) => this.changeView(this.listMaker) }, 'App'),
                h('button', { onclick: (e) => this.changeView(this.resources) },'Resources'),
            ]
        );
    }
    generateNode() {
        return h ( 'div',
            { className: 'app' },
            [
                this.generateNav(),
                this.location.generateNode()
            ]
        );
    }
}
