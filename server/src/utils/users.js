class UserManager {
    constructor() {
        this.users = [];
    }

    addUser({ id, userId, username, room }) {
        username = username.toLowerCase();

        const existingUser = this.users.find(
            (user) => user.room === room && user.username === username
        );

        if (!username) return { error: "Username and room are required." };
        if (existingUser) return { error: "Username already exists." };

        const user = { id, userId, username, room };

        this.users.push(user);

        return user;
    }

    removeUser(id) {
        const index = this.users.findIndex((user) => user.id === id);

        if (index !== -1) return this.users.splice(index, 1)[0];
    }

    getUser(id) {
        return this.users.find((user) => user.id === id);
    }

    getUsers() {
        return this.users;
    }

    getUsersInRoom(room) {
        return this.users.filter((user) => user.room === room);
    }
}

export default new UserManager();
