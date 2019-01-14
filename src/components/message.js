import React from "react"
import {Link} from "react-router-dom"

const Message = (props) => {
  let check = ""
  let star = ""
  if(props.message.selected === true){
    check = "checked"
  }
  props.message.starred ? star = "star fa fa-star starYellow" : star = "star fa fa-star-o"
  return (
    <div>
      <div className={`row message ${props.message.read ? "read" : "unread"} ${props.message.selected ? "selected" : ""}`}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" onChange = {()=>{props.toggleSelect(props.message)}} checked = {`${check}`}></input>
            </div>
            <div className="col-xs-2" id = {props.message.id} onClick={()=>props.toggleStar(props.message)}>
              <i className={`${star}`}></i>
            </div>
          </div>
        </div>
        <div>
          <div className="col-xs-11">
            {props.message.labels.map((e,i)=><span key = {i} className = "label label-warning">{e}</span>)}
            <Link to={`/messages/blakeIsAwesome/${props.message.id}`}>
              <span className = {props.message.read ? ``: "boldy" } onClick = {()=>{if(!props.message.read)props.toggleRead(props.message)}}>
                {props.message.subject}
              </span>
            </Link>
          </div>
        </div>
      </div>
      {
        isNaN(Number(window.location.href[window.location.href.length-2]))
        ? Number(window.location.href[window.location.href.length-1]) === props.message.id
        ? <div className="row message-body">
        <div className="col-xs-11 col-xs-offset-1">{props.message.body}</div>
        </div>
        : <span></span>
        : Number(window.location.href[window.location.href.length-2] + window.location.href[window.location.href.length-1]) === props.message.id
        ? <div className="row message-body">
        <div className="col-xs-11 col-xs-offset-1">{props.message.body}</div>
        </div>
        : <span></span>
      }
    </div>
  )
}

export default Message
