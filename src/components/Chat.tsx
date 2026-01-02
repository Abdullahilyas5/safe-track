"use client"

import { useEffect, useMemo, useRef } from "react";
import { useState } from "react";
import { io } from "socket.io-client"

type Props = {

}

type msgtype = {
    text: string;
    senderId?: string;
    receiverId?: string;
    timestamp?: Date;
}

const Chat = (props: Props) => {
    const [input, setInput] = useState<string>("");
    const [messages, setMessages] = useState<Array<string>>([]);
    const [recivermessages, setReciverMessages] = useState<Array<string>>([]);

    const socket = useMemo(() => io("http://localhost:9000"), []);

    const chatRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSend = (msg: msgtype) => {
        inputRef.current!.value = "";
        setMessages(prev => [...prev, msg.text]);
        socket.emit("send_message", msg);
    }

    useEffect(() => {
        const handler = (data: msgtype) => {
            setReciverMessages(prev => [...prev, data.text]); // functional update
        };

        socket.on("receive_message", handler);

        return () => {
            socket.off("receive_message", handler); // remove same handler
        };
    }, [socket]); // only depends on socket (which is stable via useMemo)

    return (
        <div className="w-full h-screen ">
            <div className="w-full flex text-4xl font-bold justify-center items-center">Welcome Username</div>
            <div className=" h-[80vh] bg-red-300 relative" ref={chatRef}>
                {messages.map((msg: string, idx: number) => (
                    <div key={idx} className="flex flex-col-reverse bottom-0 relative">{msg}</div>
                ))}

                {recivermessages.map((msg: string, idx: number) => (
                    <div key={idx} className="flex flex-col-reverse bottom-0 text-red-900 relative">{msg}</div>
                ))}
            </div>
            <div className="w-full h-max gap-4 flex absolute bottom-2 px-6 justify-center items-center flex-row">
                <input onChange={(e) => setInput(e.target.value)} type="text" ref={inputRef} className="border w-full p-3 rounded-3xl" />
                <button onClick={() => handleSend({ text: inputRef.current?.value || "", senderId: "currentUserId", receiverId: "receiverId", timestamp: new Date() })} className="bg-blue-500 text-white px-4 py-2 rounded-3xl">send</button>
            </div>
        </div>

    )
};

export default Chat;