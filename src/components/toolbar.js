import React from "react"
import Compose from "./compose.js"

const numberRead = (messages) => {
  return messages.reduce((a,e)=>{
    !e.read?a++:a+=0
    return a
  },0)
}

const selectedIconDeterminer = (messages) => {
  let numOfSelected = messages.reduce((a,e)=>{
    e.selected?a++:a+=0
    return a
  },0)
  if(numOfSelected === messages.length){
    return "fa fa-check-square-o"
  }else if(numOfSelected === 0){
    return "fa fa-square-o"
  }else{
    return "fa fa-minus-square-o"
  }
}

const grabAllSelected = (messages) => {
  return messages.filter(e => e.selected === true)
}

const Toolbar = (props) => {
  let checkIcon = selectedIconDeterminer(props.messages)
  let nread = numberRead(props.messages)
  let allSelectedMessages = grabAllSelected(props.messages)
  return (
    <div>
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right white">
            <span className="badge badge">{nread}</span>
            unread {nread === 1 ? "message" : "messages"}
          </p>
          <button className="btn btn-danger" onClick={()=>{props.toggleComposeVisibility(props.composeVisibility)}}>
            <i className="fa fa-plus"></i>
          </button>
          <button className="btn btn-default" onClick = {()=>checkIcon === "fa fa-check-square-o" ? props.toggleAllDeselect() : props.toggleAllSelected()}>
            <i className={checkIcon}></i>
          </button>
          <button className="btn btn-default" onClick = {()=>allSelectedMessages.forEach((e) => e.read === false ? props.toggleRead(e) : console.log("'tis already read"))} disabled = {allSelectedMessages.length === 0?"disabled":""}>
            Mark As Read
          </button>
          <button className="btn btn-default" onClick = {()=>allSelectedMessages.forEach((e) => e.read === true ? props.toggleRead(e) : console.log("'tis already unread"))} disabled = {allSelectedMessages.length === 0?"disabled":""}>
            Mark As Unread
          </button>
          <select className="form-control label-select" onChange = {(event)=>{allSelectedMessages.forEach((message)=>props.addLabel(message,event.target.value)); event.target.selectedIndex = 0}} disabled = {allSelectedMessages.length === 0?"disabled":""}>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>
          <select className="form-control label-select" onChange = {(event)=>{props.byeLabel(event.target.value); event.target.selectedIndex = 0}} disabled = {allSelectedMessages.length === 0?"disabled":""}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>
          <button className="btn btn-default" onClick={(e)=>{props.onDelete()}} disabled = {allSelectedMessages.length === 0?"disabled":""}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
      {props.composeVisibility ? <Compose messages = {props.messages} onCompose = {props.onCompose}/> : <span></span>}
    </div>
  )
}

export default Toolbar
