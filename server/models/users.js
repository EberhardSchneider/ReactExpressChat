 const users = {
    users: [],
     addUser:function( id, name, socket) {
        console.log(this.getUsers(id));
        if (this.getUser(id) !== undefined) {
            console.error("Cannot insert two users with id " + id);
        } else {
            this.users.push({id: id, name: name, socket: socket});
        }


     },
     deleteUser:function(user) {

        // map users array to id, then find index of user.id
        const index = this.users.map((u) => { return u.id; }).indexOf(user.id);

        if (index !== -1) {
            this.users.splice(index, 1);
        } else {
            console.log("User: couldn't delete user with id " + user.id);
        }
     },
     getUsers:function() {
        return this.users;
     },
     getUser:function(id) {
        return this.users.filter( (value) => {
            return value.id === id;
        })[0];
     }
 }

 module.exports = users;