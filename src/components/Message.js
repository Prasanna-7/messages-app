import React, { Component } from 'react'
import { format } from 'timeago.js';

export class Message extends Component {
    render() {
        const message = this.props.message

        return (
            <div className="message">
                <div className="flex align-items-center">
                    <img className="author-image" alt="authorPhoto" src={`http://message-list.appspot.com${message.author.photoUrl}`} />
                    <div className="p-l-xs">
                        <div className="author-name">{ message.author.name }</div>
                        <div className="date p-t-xxs">{ format(message.updated) }</div>
                    </div>
                </div>
                <div className="p-t-sm">{ message.content }</div>
            </div>
        )
    }
}

export default Message
