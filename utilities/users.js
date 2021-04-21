var users=[]

function userJoin(id,username,room){
    const user={id,username,room}
    
    users.push(user)
    // console.log(`inside users ${users}`)
    return user
}

//get current user
function getCurrentUser(id)
{
    const user1= users.find(user=>{ return user.id===id })
    // console.log(`in func getcurr ${user1}`)
    return user1
}

//when user leaves 
function userLeave(id){
    const index=users.findIndex(user=>{return user.id===id})

    if(index!==-1)
    {
        return users.splice(index,1)[0]
    }
}

//get room users
function getRoomUsers(room)
{
    return users.filter(user=>{return user.room===room})
}

module.exports={
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
}