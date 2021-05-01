import React, { Component } from 'react'
import { format } from 'timeago.js';

export class Message extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isSwipped: false
        }
    }

    // Touch Events work for mobile device
    // Used mouse events to simulate swiping behaviour for desktop browsers
    onMousePressed = () => {
        this.mousePressed = true
    }

    onMouseReleased = () => {
        this.mousePressed = false
    }

    onMouseMove = () => {
        if (this.mousePressed) this.setState({isSwipped: true})
    }

    onSwipping = () => {
        this.setState({isSwipped: true})
    }

    onDeleteClicked = () => {
        this.props.onDeleteClicked(this.props.id);
    }

    render() {
        const message = this.props.message

        return (
            <div className="message flex align-items-center" onTouchMove={this.onSwipping} onMouseDown={this.onMousePressed} onMouseUp={this.onMouseReleased} onMouseMove={this.onMouseMove}>
                <div className={`message__delete m-r-m ${this.state.isSwipped ? 'message__delete--d-flex' : ''}`} onClick={this.onDeleteClicked}>
                    <div className="white delete-text">Delete</div>
                    <img className="trash-icon p-t-xxs" alt="trash-icon" src="/trash.svg" />
                </div>
                <div>
                    <div className="flex align-items-center">
                        <img className="author-image" alt="authorPhoto" src={`http://message-list.appspot.com${message.author.photoUrl}`} />
                        <div className="p-l-xs">
                            <div className="author-name">{ message.author.name }</div>
                            <div className="date p-t-xxs">{ format(message.updated) }</div>
                        </div>
                    </div>
                    <div className="p-t-sm">{ message.content }</div>
                </div>
            </div>
        )
    }
}

export default Message
