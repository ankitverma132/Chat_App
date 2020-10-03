//This file will contain helper functions that will help us manage users, there joining in,
//signing out, removing/adding users & keeping track of which user is in which room.

const users = [];

//Id of user or socket instance
const addUser = ({id, name, room }) => {
//First convert room name to lowercase and in one word ex- Javascript Mastery -> javascriptmastery
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    //Now check if same user is trying to enter into same room by looking into users array.
    //The find() method returns the value of the first element in the provided 
    //array that satisfies the provided testing function.
    const existingUser = users.find((user) => user.room === room && user.name === name);

    if(existingUser){
        //New user will not be created
        return {error : 'Username is taken'};
    }
    //If there is no existing user create a new user
    const user = {id,name,room};
    users.push(user);
    return {user};
}

const removeUser = (id) => {
    //The findIndex() method returns the index of the first element in the
    //array that satisfies the provided testing function.
    //Otherwise, it returns -1, indicating that no element passed the test.
    const index = users.findIndex((user) => user.id === id);

    if( index != -1 ){
        return users.splice(index,1)[0];
    }
}

const getUser = (id) => {
    users.find((user) => user.id === id);
}

//Get all user of specific room
//The filter() method creates a new array with all elements
// that pass the test implemented by the provided function
const getUsersInRoom = (room) => {
    users.filter((user) => user.room === room);
}

module.exports = {addUser, removeUser, getUser, getUsersInRoom};
//Now we can use these function inside index.js file