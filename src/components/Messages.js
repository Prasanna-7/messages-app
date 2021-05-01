import React, { Component } from 'react'
import Message from './Message'
import axios from 'axios'

class Messages extends Component {

    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            loading: false
        }
    }

    handleIntersection = ([entry]) => {
        if (entry.isIntersecting) {
            this.fetchMessages();
        }
    }

    componentDidMount() {
        this.intersectionObserver = new IntersectionObserver(this.handleIntersection, {
            rootMargin: '150px'
        })
        this.intersectionObserver.observe(this.loadingRef)
    }

    componentWillUnmount() {
        this.intersectionObserver.disconnect();
    }

    fetchMessages() {
        const messageUrl = `http://message-list.appspot.com/messages${this.continuationToken ? `?pageToken=${this.continuationToken}` : ''}`
        this.setLoading(true)

        axios.get(messageUrl)
            .then((response) => {
                const data = response.data
                this.setState({messages: [...this.state.messages, ...data.messages]})
                this.continuationToken = data.pageToken
            }).finally(() => this.setLoading(false))
    }

    setLoading(isLoading) {
        this.setState({loading: isLoading})
    }

    onDeleteClicked = (id) => {
        let messages = [...this.state.messages]
        const messageIndexToDelete = messages.findIndex((message) => message.id === id)
        messages.splice(messageIndexToDelete, 1)
        this.setState({messages: messages})
    }

    render() {
        return (
            <div className="messages">
                {
                    this.state.messages.map((message) => (
                            <Message key={message.id}
                                id={message.id}
                                message={message}
                                onDeleteClicked={this.onDeleteClicked}></Message>
                        )    
                    )
                }
                <div ref={loadingRef => this.loadingRef = loadingRef}>
                    {
                        this.state.loading ? <div className="text-align-center">Loading...</div> : null
                    }
                </div>
            </div>
        )
    }
}

export default Messages
