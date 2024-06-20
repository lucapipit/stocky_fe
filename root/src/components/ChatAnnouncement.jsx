import { React, useEffect, useState } from 'react';
import Placeholder from 'react-bootstrap/Placeholder';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { createChatFunc, updateChatFunc, getSingleChatFunc } from '../states/chatState';

const socket = io.connect("http://localhost:5051");



const ChatAnnouncement = ({ singleData, isLoading, idOwn }) => {

    const [conversation, setConversation] = useState("");
    const [message, setMessage] = useState("");
    const [updateData, setUpdateData] = useState(false);
    const [room, setRoom] = useState(//capisce se l'utente loggato è proprietario dell'annuncio e crea una room per ogni utente che ha messo like
        idOwn === singleData.idOwner ?
            singleData.likesArry.split(",").map((el) => {
                return `${singleData.idOwner}$${singleData.id}$${el}`
            })
            :
            `${singleData.idOwner}$${singleData.id}$${idOwn}`
    );
    const [isMyAnnouncement, setIsMyOwnAnnouncement] = useState(typeof (room) === "object" ? true : false);
    const singleChat = useSelector((state) => state.chat.singleChat)

    const dispatch = useDispatch();


    const joinRoom = () => {
        if (room !== "") {
            socket.emit("join_room", room)
        }
    }
    const sendMessage = () => {
        const currentTime = new Date();

        socket.emit("send_message", {
            idAnn: singleData.id,
            idOwner: singleData.idOwner,
            idUser: +room.split("$")[2],
            roomCode: room,
            messages: `${isMyAnnouncement ? singleData.idOwner : +room.split("$")[2]}£${message}£${currentTime.toString().split("GMT")[0]}`,
            ownerCheck: 0,
            userCheck: 0
        })
    }

    useEffect(() => {
        joinRoom();
        socket.on("receive_message", async (data) => {
            console.log(data);
            setConversation(data.messages)
            setUpdateData(data)
        })
    }, [socket]);

    useEffect(() => {
        if (typeof (room) !== "object") {

            console.log(room);
            dispatch(getSingleChatFunc(room));
            if (updateData) {
                dispatch(createChatFunc(updateData))
                    .then((res) => {
                        if (res.payload.statusCode === 201) {
                            dispatch(updateChatFunc({ ...singleChat, messages: [singleChat.messages, updateData.messages] }))
                                .then((res) => {
                                    if (res.payload.statusCode === 200) { setUpdateData(false) }
                                })
                        } else {
                            setUpdateData(false)
                        }
                    })
            }
        }
    }, [updateData, room])

    return (
        <div>
            <div className='w-100 myMaxW1000 d-flex align-items-center my-1 gap-3 p-1 myCursor' >
                <div className='d-flex align-items-center ms-5'>
                    {
                        !singleData || isLoading ?
                            <Placeholder animation="glow"><Placeholder xs={12} style={{ height: "60px" }} /></Placeholder>
                            :
                            <div className="myBgImgCover2 imgChatMain myCursor rounded-5"
                                style={{ backgroundImage: `url(http://localhost:5050/uploads/${singleData.pics.split(",")[0]})` }}
                            ></div>

                    }
                </div>
                <div className='mainInfo'>
                    <div className="line-clamp1 py-2 pe-5" >
                        <h4 className='fw-light'>{singleData.modelName}</h4>
                    </div>
                    {
                        !singleData || isLoading ?
                            <Placeholder animation="glow"><Placeholder xs={4} /></Placeholder> :
                            <div className='d-flex align-items-center gap-3'>
                                <div className='d-flex'>
                                    <h6 className='fw-light bg-dark text-light px-2 rounded-5'>{singleData.quantity} items</h6>
                                </div>
                                <div className='d-flex align-items-center brandName'>
                                    <p className='m-0 fw-bold myPrimaryColor'>{singleData.brandName}</p>
                                </div>
                            </div>
                    }
                    {
                        !singleData || isLoading ?
                            <Placeholder animation="glow"><Placeholder xs={4} /></Placeholder> :
                            <div className='d-flex flex-wrap align-items-center gap-2 py-1'>
                                <div className='d-flex align-items-top '>
                                    <h3 className='fw-normal'>{singleData.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</h3>
                                    <p className='fw-light m-0'>00$</p>
                                </div>
                                <div className='d-flex align-items-top rounded-5 myBgWhite'>
                                    <h3 className='fw-normal'>{(Math.floor((singleData.price) / (singleData.quantity))).toString().split(".")[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</h3>
                                    <p className='fw-light m-0 me-1'>{(Math.round((singleData.price) / (singleData.quantity) * 100) / 100).toString().split(".")[1]}</p>
                                    <p className='fw-light m-0'>$/item</p>
                                </div>
                            </div>
                    }
                </div>
            </div>
            {
                isMyAnnouncement && typeof (room) !== "object" ?
                    <div className='bg-light pb-3 d-flex align-items-center flex-column'>
                        <hr className='w-100' />
                        <span className='text-light px-3 p-1 rounded-5 bg-dark'>User n° {room.split("$")[2]}</span>
                    </div>
                    : null
            }
            <div className='w-100 myBgWhite p-3'>
                {
                    typeof (room) === "object" ?
                        room.map((el) => {
                            return <div className='border px-3 py-1 rounded-5 mt-1 bg-dark text-light myCursor' onClick={() => setRoom(el)}>{el.split("$")[2]}</div>
                        })
                        : conversation
                }
            </div>

            {
                typeof (room) === "object" ?
                    null
                    : <div className='mx-2 mt-3 d-flex gap-2 align-items-center'>
                        <input className='w-100 rounded-5 border p-1 px-3' type="text" value={message} onChange={(e) => { setMessage(e.target.value) }} />
                        <i className="bi bi-arrow-right-circle-fill display-6 myChatColor myCursor" onClick={() => { sendMessage(); setMessage("") }}></i>
                    </div>
            }
        </div>
    )
}

export default ChatAnnouncement