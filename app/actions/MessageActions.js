import Dispatcher from '../dispatcher.jsx';

dispatcher = new Dispatcher();

const actions = {
    add: function(user) {
        dispatcher.dispatch({
            type: 'user:add',
            payload: user
        });
    },
    remove: function(user) {
        dispatcher.dispatch({
            type: 'user:remove',
            payload: user
        });
    }
};