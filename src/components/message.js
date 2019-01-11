import React from "react"
const Message = (props) => {
  let check = ""
  let star = ""
  // let visibility = false
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
        <div onClick = {()=> {
          console.log("clicked")
          console.log(window.location.href)
          // console.log(visibility)
          // visibility ? visibility = false : visibility=true
        }}>
          <div className="col-xs-11" onClick = {()=>{!props.message.read?props.toggleRead(props.message):console.log("oi")}}>
            {props.message.labels.map(e=><span className = "label label-warning">{e}</span>)}
            <a href={`/${props.message.id}`}>
              {props.message.subject}
            </a>
          </div>
        </div>
      </div>
      {Number(window.location.href[window.location.href.length-1]) === props.message.id ? <div className="row message-body"><div className="col-xs-11 col-xs-offset-1">{props.message.body}</div></div>:<span></span>}
    </div>
  )
}

export default Message
