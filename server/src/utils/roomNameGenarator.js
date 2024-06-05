export default function generateRoomName(username1, username2) {
    let unique = [username1, username2].sort((a, b) => (a < b ? -1 : 1));
    const roomName = `${unique[0]}_${unique[1]}`;

    return roomName;
}
