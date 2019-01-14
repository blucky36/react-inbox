import React from "react"

const Message = (props) => {
  let check = ""
  let star = ""
  if(props.message.selected === true){
    check = "checked"
  }
  props.message.starred ? star = "star fa fa-star" : star = "star fa fa-star-o"
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
        <div onClick = {()=> console.log("Hi Teddi")}>
          <div className="col-xs-11" onClick = {()=>{!props.message.read?props.toggleRead(props.message):console.log("oi")}}>
            {props.message.labels.map((e,i)=><span key = {i} className = "label label-warning">{e}</span>)}
            <a href={`/${props.message.id}`} className = {props.message.read ? ``: "boldy" }>
              {props.message.subject}
            </a>
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
  //the last stupid line is a ternery to see if the email a tag is clicked and if it is clicked it will render the body of the selected message. else it will append an empty span// edit now its 2 terneries inside a ternery to deal with double digit numbers of emails...
}

export default Message
