
import { h } from 'virtual-dom';

module.exports = class Resources {
    generateNode() {
        return h(
            'div',
            { className: 'resources' },
            [
                h( 'div', 
                    h( 'a', 
                        { href: 'https://github.com/Matt-Esch/virtual-dom' }, 
                        'Matt-Esch/virtual-dom'
                    )
                ),
                h( 'div', 
                    h( 'a', 
                        { href: 'https://medium.com/cardlife-app/what-is-virtual-dom-c0ec6d6a925c#.zgnhxujrw' }, 
                        'What is a Virtual Dom - Tony Freed'
                    )
                ),
                h( 'div',
                    h( 'a', 
                        { href: 'https://www.youtube.com/watch?v=BYbgopx44vo' }, 
                        'React and the Virtual DOM'
                    )
                ),
                h( 'div', 
                    h( 'a', 
                        { href: 'https://www.youtube.com/watch?v=I_t_byKAL6U' }, 
                        'Cyber Wizard Institute - Substack'
                    )
                ),
            ]
        );
    }
}
