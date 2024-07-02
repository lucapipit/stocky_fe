

const notificationAssigner = (input) => {
    const { allChatsNotify, idOwn, singleData } = input;
    const isMyAnnouncement = idOwn === singleData.idOwner ? true : false;
    let bool = false
    allChatsNotify && allChatsNotify.map((el) => {

        if (isMyAnnouncement) {
            if (el.idAnn === singleData.id && !el.ownerCheck) {
                bool = true
            }
        } else {
            if (el.idAnn === singleData.id && !el.userCheck) {
                bool = true
            }
        }
    })
    return bool
}

export default notificationAssigner