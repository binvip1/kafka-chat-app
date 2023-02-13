import React from "react";

export const Messages = ({ messages, currentUser }) => {
    let renderMessage = (message) => {
        const { sender, content, color } = message;
        const messageFromMe = currentUser.username === message.sender;
        const className = messageFromMe ? "Messages-message currentUser" : "Message-message";

        return (
            <li className={className}>
                <span
                    className="avatar"
                    style={{ backgroundColor: color}}
                />
                <div className="Message-content">
                    <div className="username">
                        {sender}
                    </div>
                    <div className="text">
                        {content}
                    </div>
                </div>
            </li>
        )
    }

    return (
        <ul className="messages-list">
                {messages.map(msg => renderMessage(msg))}
        </ul>
    )
}