import { React, useEffect, useRef, useState } from 'react';
import Placeholder from 'react-bootstrap/Placeholder';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { createChatFunc, updateChatFunc, getSingleChatFunc, allUsersByIdSetFunc } from '../states/chatState';
import CardChatUser from './CardChatUser';
const socket = io.connect("http://localhost:5051");



const ChatAnnouncement = ({ singleData, isLoading, idOwn, width }) => {

    const [conversation, setConversation] = useState([]);
    const [message, setMessage] = useState("");
    const [receivedMessage, setReceivedMessage] = useState("");
    const [sendededMessage, setSendedMessage] = useState("");
    const [chatAlreadyExists, setChatAlreadyExists] = useState(false);
    const [sended, setSended] = useState(false);
    const [room, setRoom] = useState(//capisce se l'utente loggato è proprietario dell'annuncio e crea una room per ogni utente che ha messo like
        idOwn === singleData.idOwner ?
            singleData.likesArry ?
                singleData.likesArry.split(",").map((el) => {
                    return `${singleData.idOwner}$${singleData.id}$${el}`
                })
                : "nolikes"
            :
            `${singleData.idOwner}$${singleData.id}$${idOwn}`
    );
    const [isMyAnnouncement, setIsMyOwnAnnouncement] = useState(typeof (room) === "object" ? true : false);
    const usersById = useSelector((state) => state.chat.usersById);
    const scrollRef = useRef();

    const dispatch = useDispatch();


    const joinRoom = () => {
        if (room !== "") {
            socket.emit("join_room", room)
        }
    }
    const sendMessage = async () => {
        const currentTime = new Date();
        const mssg = {
            idAnn: singleData.id,
            idOwner: singleData.idOwner,
            idUser: +room.split("$")[2],
            roomCode: room,
            messages: `${isMyAnnouncement ? singleData.idOwner : +room.split("$")[2]}£${message}£${currentTime.toString().split("GMT")[0]}`,
            ownerCheck: 0,
            userCheck: 0
        }
        socket.emit("send_message", mssg);
        if (typeof (room) !== "object") {
            dispatch(getSingleChatFunc(room))
                .then((res) => {
                    if (res.payload.statusCode === 200) {
                        dispatch(updateChatFunc({ ...res.payload.data[0], messages: [res.payload.data[0].messages, mssg.messages] }))
                            .then((res) => {
                                if (res.payload.statusCode === 200) { setSendedMessage(mssg.messages); }
                            })
                    } else {
                        dispatch(createChatFunc(mssg))
                            .then((res) => {
                                if (res.payload.statusCode === 200) {
                                    setSendedMessage(mssg.messages);
                                    setChatAlreadyExists(true);
                                }
                            })
                    }
                })
        }
    }

    useEffect(() => {
        joinRoom();
        socket.on("receive_message", async (data) => {
            setReceivedMessage(data.messages)
        })
    }, [socket]);

    useEffect(() => {
        receivedMessage && setConversation([...conversation, receivedMessage])
    }, [receivedMessage]);

    useEffect(() => {
        sendededMessage && setConversation([...conversation, sendededMessage])
    }, [sendededMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, [conversation])



    useEffect(() => {
        if (typeof (room) !== "object") {
            dispatch(getSingleChatFunc(room))
                .then((res) => {
                    if (res.payload.statusCode === 200) {
                        setChatAlreadyExists(true);
                        setConversation(res.payload.data[0].messages.split(","))
                    }
                })
        }
    }, [room])

    useEffect(() => {
        if (typeof (room) === "object") {
            dispatch(allUsersByIdSetFunc({ idSet: singleData.likesArry, token: localStorage.getItem("token") }))
        }
    }, [])

    return (
        <div className='myVhChat' style={{ width: `${width < 1100 ? "99vw" : "100%"}` }}>
            <div className=' myMaxW1000 d-flex align-items-center my-1 gap-3 p-1 myCursor' >
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
                    <div className='position-relative d-flex justify-content-center pt-1'>
                        <div className='pb-3 d-flex align-items-center flex-column position-absolute'>
                            {
                                usersById && usersById.map((el) => {
                                    if (el.id == room.split("$")[2])
                                        return (
                                            <div className='bg-light pe-3' onClick={() => setRoom(`${singleData.idOwner}$${singleData.id}$${el.id}`)}>
                                                <CardChatUser user={el} />
                                            </div>
                                        )
                                })
                            }
                        </div>
                    </div>
                    : null
            }
            <div className={`w-100 myBgWhite p-3 myOverflowY myVh70`}>
                {
                    typeof (room) === "object" ?
                        usersById && usersById.map((el) => {
                            return (
                                <div className='border mt-1 myCursor' onClick={() => setRoom(`${singleData.idOwner}$${singleData.id}$${el.id}`)}>
                                    <CardChatUser user={el} />
                                </div>
                            )
                        })
                        :
                        room === "nolikes" ?
                            <div className='d-flex align-items-center justify-content-center flex-column display-3 h-100'>
                                <i class="bi bi-heartbreak-fill myFucsiaRed"></i>
                                <h3 className='fw-light'>This announcement has no Likes yet!</h3>
                            </div>
                            :
                            <div className='pt-5 mt-3'>
                                <ul style={{ listStyle: "none" }}>
                                    {
                                        conversation && conversation.map((el) => {

                                            return (
                                                <li ref={scrollRef}>
                                                    <div className={`${el.split("£")[0] == idOwn ? "bg-primary" : "bg-secondary"} rounded-4 p-2 px-4 m-2 text-light`}>
                                                        <h5 className='fw-light'>{el.split("£")[1]}</h5>
                                                        <div className='d-flex justify-content-between'>
                                                            <p className='m-0 text-dark'> {el.split("£")[0]}</p>
                                                            <p className='m-0'>{el.split("£")[2].split(" ")[4]}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            )

                                        })
                                    }
                                </ul>
                            </div>

                }
            </div >

            {
                typeof (room) === "object" || room === "nolikes" ?
                    null
                    : <div className='mx-2 mt-3 d-flex gap-2 align-items-center'>
                        <input className='w-100 rounded-5 border p-1 px-3' type="text" value={message} onChange={(e) => { setMessage(e.target.value) }} />
                        <i className="bi bi-arrow-right-circle-fill display-6 myChatColor myCursor" onClick={() => { sendMessage(); setMessage("") }}></i>
                    </div>
            }
        </div >
    )
}

export default ChatAnnouncement