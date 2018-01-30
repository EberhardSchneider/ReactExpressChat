import helper from './../helpers/RestHelper.js';
import Dispatcher from '../dispatcher.jsx';

class UsersStore {

    constructor() {
        this.users = [];

        helper.get('/users')
            .then((data) => {
                this.users = data;
            });

        this.listeners = [];
        this.userDispatcher = new Dispatcher();
        this.userDispatcher.register((event) => {
            if (event.name === 'user-add') {
                this.users.push(event.payload);

            };
            if (event.name === 'user-delete') {

            }
        })
    }
}