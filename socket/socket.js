import io from "../server.js"
import events from "../events.js"

export const SocketManager =  (socket) => {

    console.log("New client connected, id: ", socket.id);
    socket.on(events.join, (_id) => {
        socket.join(_id + " userId")
    })
    serverMessage(socket)
    clientMessage(socket)  

    editName(socket)
    joinContact(socket)
    joinGroup(socket)
    newMessage(socket)
    updateOnlineStatus(socket)

    onDisconnecting(socket)
    socket.on(events.disconnect, () => {
        console.log("Client disconnected");
        socket.rooms
        
    });


}

const onDisconnecting = (socket) => {
    socket.on(events.disconnecting, () => {
        const rooms = [...socket.rooms]
        console.log("user disconnecting");
        const userId = rooms.find( room => room.split(" ")[1] === "userId")?.split(" ")[0]
        console.log("userId: "+ userId) 
        rooms.shift()
        rooms.shift()
        // console.log(rooms); 
        rooms.forEach(room => {
            if (userId){
                socket.broadcast.to(room).emit(events.updateNewStatus, {_id: room, is_active: false , userId, type: "?"})
            }
        })
      });
}

const serverMessage = (socket) => {
    socket.emit(events.receiveMessage, "Successfully connected :)")
}

const clientMessage = (socket) => {
    socket.on(events.sendMessage, (msg) => {
        console.log(msg)
    })
}


// edit specific user name
const editName = (socket) => {
    socket.on(events.editName, (data) => {
        console.log("editName")
        data.contacts.forEach( _id => {
            io.to(_id).emit(events.editName, {  _id, username: data.username, userId: data._id, type: "contact" })
        });
        data.groups.forEach( _id => {
            io.to(_id).emit(events.editName, { _id, username: data.username, userId: data._id, type: "group" })
        });
    })

}

/// contact event listeners
const joinContact = (socket) => {
    socket.on(events.joinContact, (data) => {
        // console.log(data)
        socket.join(data.contact._id)
        io.to(data.contact._id).emit(events.updateOnlineStatus, { _id: data.contact._id, is_active: data.is_active , userId: data.userId, type: "contact"})
        console.log("joined contact :)")

        
    })
    // editName(socket)
    addContact(socket)
    updateBlock(socket)
    deleteContactMessages(socket)
}

const updateOnlineStatus = (socket) => {
    socket.on(events.updateOnlineStatus, (data) =>{
        socket.broadcast.to(data._id).emit(events.updateNewStatus, data)

    })
}

const addContact = (socket) => {
    socket.on(events.addNewContact, (data) => {
        io.emit(events.addNewContact, data)
    })
}

const updateBlock = (socket) => {
    socket.on(events.updateBlock, (data) => {
        console.log("updateBlock :)")
        // console.log(data)
        socket.broadcast.to(data._id).emit(events.updateBlock, data)

    })
}

// Yet to do 
const deleteContactMessage = (socket) => {
    socket.on(events.deleteContactMessage, (data) => {
        console.log("deleteContactMessage")
        // console.log(data)
    })
}

const deleteContactMessages = (socket) => {
    socket.on(events.deleteContactMessages, (data) => {
        console.log("deleteContactMessages :)")
        // console.log(data)
        socket.broadcast.to(data._id).emit(events.deleteContactMessages, data)

    })
}


//// group event listeners
const joinGroup = (socket) => {
    socket.on(events.joinGroup, ({ group, is_active, userId }) => {
        socket.join(group._id);
        console.log("joined group  " + group.groupname + " :)")
        io.to(group._id).emit(events.updateOnlineStatus, { _id: group._id, is_active , userId, type: "group"})

    })

    // editName(socket)
    editGroupName(socket)
    editGroupDescription(socket)
    addNewMember(socket)
    deleteGroupMessages(socket)
    leaveGroup(socket)
    deleteGroup(socket)
}

const editGroupName = (socket) => {
    socket.on(events.editGroupName, (data) => {
        console.log("editGroupName")
        console.log(data)
        socket.broadcast.to(data._id).emit(events.editGroupName, data)
        
    })
}

const editGroupDescription = (socket) => {
    socket.on(events.editGroupDescription, (data) => {
        console.log("editGroupDescription")
        // console.log(data)
        socket.broadcast.to(data._id).emit(events.editGroupDescription, data)
    })
}

const addNewMember = (socket) => {
    socket.on(events.addNewMember, (data) => {
        console.log("addNewMember****")
        // console.log(data)
        socket.broadcast.to(data._id).emit(events.addNewMember, { _id: data._id, group: data.group })
        io.sockets.emit(events.connectMemberToGroup, { group: data.group, member: data.member })
    })
}

const leaveGroup = (socket) => {
    socket.on(events.leaveGroup, (data) => {
        console.log("leaveGroup")
        // console.log(data)
        socket.broadcast.to(data._id).emit(events.leaveGroup, { _id: data._id, group: data.group })
        socket.leave(data._id)
    })
}

// Yet to do
const deleteGroupMessage = (socket) => {
    socket.on(events.deleteGroupMessage, (data) => {
        console.log("deleteGroupMessage")
        // console.log(data)
    })
}

const deleteGroupMessages = (socket) => {
    socket.on(events.deleteGroupMessages, (data) => {
        console.log("deleteGroupMessages")
        // console.log(data)
        socket.broadcast.to(data._id).emit(events.deleteGroupMessages, data)

    })
}

const deleteGroup = (socket) => {
    socket.on(events.deleteGroup, (data) => {
        console.log("deleteGroup")
        // console.log(data)
        socket.broadcast.to(data._id).emit(events.deleteGroup, data)
    })
}

const newMessage = (socket) => {
    socket.on(events.newMessage, (data) => {
        socket.broadcast.to(data._id).emit(events.newMessage, data)
        console.log(`new ${data.type} message`)

    } )
} 



