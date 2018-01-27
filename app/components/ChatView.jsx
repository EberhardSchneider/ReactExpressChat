import React, {Component} from 'react';

class ChatView extends Component {
;
    render() {
        const red = { backgroundColor: 'red'};
        const blue = { backgroundColor: 'blue'}
        return (
        <div className='row bottom'>
            <div className="one-third column" style={red}>Hallo</div>
            <div className="two-thirds column blue" style={blue}>Spencer</div>
        </div>
        );
    }
}

module.exports = ChatView;