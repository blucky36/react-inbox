import React, { Component } from "react";
import "./App.css";
import Toolbar from "./components/toolbar.js"
import MessageList from "./components/messageList.js"
import {BrowserRouter as Router} from "react-router-dom"

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      messages:[],
      composeVisibility:false
    }
  }

  async componentDidMount() {
    const messages = await fetch("http://localhost:8082/api/messages").then((data)=>data.json())
    this.setState({...this.state,messages})
  }

  toggleProperty(message, prop) {
    const ii = this.state.messages.indexOf(message)
    this.setState({
      ...this.state,
      messages: [
        ...this.state.messages.slice(0, ii),
        { ...message, [prop]: !message[prop] },
        ...this.state.messages.slice(ii + 1),
      ]
    })
  }

  async fetchRequest(path, method, data) {
    if (data) data = JSON.stringify(data)
    return await fetch(`http://localhost:8082${path}`, {
      method: method,
      headers: {"Content-Type": "application/json","Accept": "application/json"},
      body: data
    }).then(data=>data.json())
  }

  async createMessage(data) {
    return await this.fetchRequest("/api/messages", "POST", data)
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

  async addLabel(message, toAdd){
    if(message.labels.includes(toAdd) || toAdd === "Apply label"){return}else{
      const ii = this.state.messages.indexOf(message)
      let newLabels = message.labels.concat(toAdd)
      await this.updateMessage({"messageIds": [message.id],"command": "addLabel","label": toAdd})
      this.setState({
        ...this.state,
        messages: [
          ...this.state.messages.slice(0, ii),
          { ...message, labels: newLabels },
          ...this.state.messages.slice(ii + 1)
        ]
      })
    }
  }

  async byeLabel(toRemove){
    this.updateMessage({"messageIds": this.state.messages.filter(message=>message.selected).map(message=>message.id),"command": "removeLabel","label": toRemove})
    this.setState({
      ...this.state,
      messages: this.state.messages.map(message => {
        const ii = message.labels.indexOf(toRemove)
        if (message.selected && ii >= 0) {
          return {...message,labels: [...message.labels.slice(0, ii),...message.labels.slice(ii + 1)]}
        }
        return message
      })
    })
  }

  toggleAllSelected() {
    const selectedMessages = this.state.messages.map((message) => !!message.selected ? message : {...message,selected:!message.selected})
    this.setState({...this.state,messages: selectedMessages})
  }

  toggleAllDeselect() {
    const selectedMessages = this.state.messages.map((message)=> !!message.selected ? {...message,selected:!message.selected} : message)
    this.setState({...this.state,messages: selectedMessages})
  }

  toggleComposeVisibility(visibility) {
    const newState = {...this.state,composeVisibility: !visibility}
    this.setState(newState)
  }

  async onCompose(subject,body){
    if(subject === "" || body === "") return
    const newMessage = await this.createMessage({subject,body})
    const messages = await this.state.messages.concat(newMessage)
    this.setState({...this.state,messages})
  }

  async onDelete(){
    let notDeletedMessages = this.state.messages.filter((message)=>!message.selected)
    let messagesToDelete = this.state.messages.filter((message)=>message.selected)
    await this.updateMessage({"messageIds": messagesToDelete.map(message => message.id),"command": "delete"})
    this.setState({...this.state,messages:notDeletedMessages})
  }

  //^(_-_)^ <(^.^)> ^(o.O^) <(0w0>) -(oi)//

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Toolbar
              composeVisibility = {this.state.composeVisibility}
              toggleComposeVisibility = {this.toggleComposeVisibility.bind(this)}
              toggleAllDeselect = {this.toggleAllDeselect.bind(this)}
              toggleAllSelected = {this.toggleAllSelected.bind(this)}
              byeLabel={this.byeLabel.bind(this)}
              addLabel = {this.addLabel.bind(this)}
              toggleRead = {this.toggleRead.bind(this)}
              messages = {this.state.messages}
              onCompose = {this.onCompose.bind(this)}
              onDelete = {this.onDelete.bind(this)}
            />
            <MessageList
              toggleRead = {this.toggleRead.bind(this)}
              toggleStar={this.toggleStar.bind(this)}
              toggleSelect={this.toggleSelect.bind(this)}
              messages = {this.state.messages}
            />
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
