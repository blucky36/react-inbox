import React, { Component } from "react";
import "./App.css";
import Toolbar from "./components/toolbar.js"
import Compose from "./components/compose.js"
import MessageList from "./components/messageList.js"
// import seedData from "./components/seedData.js"

class App extends Component {

  constructor(props){
    super(props)
    this.state = {messages:[]}
  }

  async componentDidMount() {
    const messages = await fetch("http://localhost:8082/api/messages").then((data)=>data.json())
    this.setState({...this.state,messages},()=>{console.log(this.state)})
  }

  toggleProperty(message, prop) {
    const ii = this.state.messages.indexOf(message)
    this.setState({
      messages: [
        ...this.state.messages.slice(0, ii),
        { ...message, [prop]: !message[prop] },
        ...this.state.messages.slice(ii + 1),
      ]
    })
  }

  async fetchRequest(path, method = "GET", data = null) {
    if (data) data = JSON.stringify(data)
    return await fetch(`http://localhost:8082${path}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: data
    })
  }

  async createMessage(data) {
    await this.fetchRequest("/api/messages", "POST", data)
  }

  async updateMessage(data) {
    await this.fetchRequest("/api/messages", "PATCH", data)
  }

  async toggleStar(message) {
    await this.updateMessage({"messageIds": [message.id],"command": "star","star": !message.starred})
    this.toggleProperty(message, "starred")
  }

  async toggleSelect(message){
    this.toggleProperty(message, "selected")
  }

  async toggleRead(message){
    await this.updateMessage({"messageIds": [message.id],"command": "read","read": !message.read})
    this.toggleProperty(message, "read")
  }

  // onCompose(newMessage){
  //   const messages = this.state.messages.push(newMessage)
  //   this.setState({...this.state,messages},()=>{console.log(this.state.messages)})
  // }

  consoleLogsHere() {
    //^(_-_)^ <(^.^)> ^(o.O^) <(0w0>) -(oi)//
  }

  render() {
    return (
      <div className="App">
        {this.consoleLogsHere()}
        <Toolbar/>
        <Compose/>
        <MessageList toggleRead = {this.toggleRead.bind(this)} toggleStar={this.toggleStar.bind(this)} toggleSelect={this.toggleSelect.bind(this)} messages = {this.state.messages}/>
      </div>
    );
  }
}

export default App;
