import { h } from 'virtual-dom';

module.exports = class Dev {
    generateNode() {
        return h(
            'div',
            { className: 'dev' }, 
            [
                h(
                    'div', 
                    { className: 'contact' }, 
                    [
                        h('h3', { className: 'label' }, 'Say Hi!'),
                        //h('h4', { className: 'name' }, 'Casey Siebel'),
                        h( 'div', 
                            { className: 'email'}, 
                            h( 'a', 
                                { href: 'mailto:casey.siebel@gmail.com' }, 
                                'Casey.Siebel@gmail.com'
                            )
                        ),
                        h( 'div', 
                            { className: 'twitter' }, 
                            h( 'a', { href: 'https://twitter.com/CurrentHandle' }, 
                                'Twitter: @CurrentHandle'
                            )
                        ),
                        h( 'div', 
                            { className: 'irc' }, 
                            h( 'a', 
                                { href: 'https://webchat.freenode.net/' }, 
                                'IRC: @leptone'
                            )
                        ),
                        h( 'div', 
                            { className: 'github' }, 
                            h('a', 
                                { href: 'https://github.com/leptone/list-maker' }, 
                                'Github'
                            )
                        )
                    ]
                ),
                h(
                    'img',
                    { 
                        className: 'minion',
                        src: 'minion.jpg'
                    }
                )
            ]
        )

    }
}
