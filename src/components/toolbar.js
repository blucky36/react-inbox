import React from "react"

const numberRead = (messages) => {
  return messages.reduce((a,e)=>{
    !e.read?a+=1:a+=0
    return a
  },0)
}

const selectedIconDeterminer = (messages) => {
  let numOfSelected = messages.reduce((a,e)=>{
    e.selected?a+=1:a+=0
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
  console.log("messages in toolbar",props.messages)
  let nread = numberRead(props.messages)
  let allSelectedMessages = grabAllSelected(props.messages)
  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right white">
          <span className="badge badge">{nread}</span>
          unread {nread === 1 ? "message" : "messages"}
        </p>

        <button className="btn btn-default" onClick = {()=>console.log("yeet")}>
          <i className={selectedIconDeterminer(props.messages)}></i>
        </button>

        <button className="btn btn-default" onClick = {()=>allSelectedMessages.forEach((e) => e.read === false ? props.toggleRead(e) : console.log("'tis already read"))}>
          Mark As Read
        </button>

        <button className="btn btn-default" onClick = {()=>allSelectedMessages.forEach((e) => e.read === true ? props.toggleRead(e) : console.log("'tis already unread"))}>
          Mark As Unread
        </button>

        <select className="form-control label-select" onChange = {(event)=>allSelectedMessages.forEach((message)=>props.addLabel(message,event.target.value))}>
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select" onChange = {(event)=>allSelectedMessages.forEach((message)=>props.byeLabel(message,event.target.value))}>
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default">
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
  )
}

export default Toolbar
