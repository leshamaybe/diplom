export let rooms = [];

export const addRoom = (roomName, user) => {
    user.username = user.username.trim().toLowerCase();
    roomName = roomName.trim().toLowerCase();

    const roomIndex = getRoom(roomName);

    if (roomIndex === -1) {
        rooms.push({ name: roomName, users: [user] });
        return { user };
    }
};

function addUserToRoom({ id, userId, username, roomName }) {
    const roomIndex = getRoom(roomName);

    const user = { id, userId, username, roomName };
    // console.log(user);
    if (roomIndex !== -1) {
        rooms[roomIndex].users.push(user);
    } else {
        addRoom(roomName, user);
    }
}
function removeUserFromRoom(id, roomName) {
    const roomIndex = getRoom(roomName);

    if (roomIndex !== -1) {
        rooms[roomIndex].users = rooms[roomIndex]?.users?.filter(
            (user) => user.id !== id
        );
    }

    if (rooms[roomIndex].users.length === 0) {
        removeRoom(roomName);
    }
}

function removeRoom(roomName) {
    const roomIndex = getRoom(roomName);

    if (roomIndex !== -1) {
        rooms = rooms.filter((room) => room.name !== roomName);
    }
}

function findRoomsByUserSocketId(id) {
    const filteredRooms = rooms.filter((room) => {
        const found = room.users.find((user) => user.id === id);

        if (found) return found;
    });

    return filteredRooms;
}

function getRoom(roomName) {
    return rooms.findIndex((room) => room.name === roomName);
}

export const removeUser = (id) => {
    const index = rooms.findIndex((user) => {
        return user.id === id;
    });

    if (index !== -1) {
        return rooms.splice(index, 1)[0];
    }
};

export const getUser = (id) => {
    return rooms.find((user) => user.id === id);
};

export const getUsersInRoom = (room) => {
    return rooms.filter((user) => user.room === room);
};

const removeUserFromAllRooms = (id) => {
    const rooms = findRoomsByUserSocketId(id);

    for (const room of rooms) {
        removeUserFromRoom(id, room.name);
    }
};

export default {
    rooms,
    addRoom,
    removeUser,
    getUser,
    getUsersInRoom,
    addUserToRoom,
    removeUserFromRoom,
    removeUserFromAllRooms,
};
