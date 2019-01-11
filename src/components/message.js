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
      <div className={`row message ${props.message.read ? "read" : ""} ${props.message.selected ? "selected" : ""}`}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2" onClick={()=>props.toggleSelect(props.message)}>
              <input type="checkbox" checked = {`${check}`}></input>
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
      {Number(window.location.href[window.location.href.length-1]) === props.message.id ? <div className="row message-body"><div className="col-xs-11 col-xs-offset-1">{props.message.body}</div></div> : <span></span>}
    </div>
  )
  //the last stupid line is a ternery to see if the email is selected and if it is selected will render the body of the selected message. else it will append an empty span
}

export default Message
