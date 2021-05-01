import React from 'react'

function MessageHeader() {
    return (
        <div className="flex align-items-center sticky blue-shaded-bg white p-xs width-100">
            <div className="p-l-xs white font-size-30">&#9776;</div>
            <div className="p-l-m bold">Messages</div>
        </div>
    )
}

export default MessageHeader