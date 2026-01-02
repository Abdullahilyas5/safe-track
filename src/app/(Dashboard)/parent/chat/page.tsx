"use client"

import { useEffect, useMemo, useRef } from "react";
import { useState } from "react";
import { io } from "socket.io-client"
import Sidebar from "@/components/ChatSidebar";

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
        <div className="flex justify-between bg-blue-500">
            <div>
                <div className=" h-[80vh] bg-red-300 relative" ref={chatRef}>
                    {messages.map((msg: string, idx: number) => (
                        <div key={idx} className="flex flex-col-reverse bottom-0 relative">{msg}</div>
                    ))}
                    {recivermessages.map((msg: string, idx: number) => (
                        <div key={idx} className="flex flex-col-reverse bottom-0 text-red-900 relative">{msg}</div>
                    ))}
                </div>
                <div className=" bg-gray-500 max-w-full h-max gap-4 flex absolute bottom-2 px-6 justify-center items-center flex-row">
                    <input onChange={(e) => setInput(e.target.value)} type="text" ref={inputRef} className="border m-3 p-3 rounded-3xl" />
                    <button onClick={() => handleSend({ text: inputRef.current?.value || "", senderId: "currentUserId", receiverId: "receiverId", timestamp: new Date() })} className="bg-blue-500 text-white px-4 py-2 rounded-3xl">send</button>
                </div>
            </div>
            <div><Sidebar/></div>
        </div>

    )
};

export default Chat;