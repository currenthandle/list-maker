import { h } from 'virtual-dom';

module.exports = class Info {
    generateNode() {
        return h(
            'div',
            { className: 'info' },
            [
                h('h4', { className: 'label' }, 'This App Was Made With'),
                h(
                    'div',
                    { className: 'tools' },
                    [
                        h('div', h('a', { href: 'https://github.com/Matt-Esch/virtual-dom' }, 'Virtual Dom')),
                        h('div', h('a', { href: 'https://github.com/substack/node-browserify' }, 'Browserify')),
                        h('div', h('a', { href: 'https://github.com/babel/babelify' }, 'Babel (ES2015)')),
                        h('div', h('a', { href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes' }, 'Object Oriented JS')),
                        h('div', h('a', { href: 'https://www.npmjs.com/package/node-sass' }, 'Node-Sass')),
                        h('div', h('a', { href: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/' }, 'Flexbox')),
                    ]
                ),
            ]
        );
    }
}
