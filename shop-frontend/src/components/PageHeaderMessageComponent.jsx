import React from 'react'

const PageHeaderMessageComponent = (props) => {
  if (props.type === 'ERROR') {
    return (<p className="mx-lg-4 my-0 py-1 bg-danger-subtle">
              <span className="text-black mx-lg-4 fs-5">
                  <i className="fa-solid fa-circle-exclamation app-err-icon app-msg-icon"></i>
                {props.message}</span>
      <span>
                <i className="fa-solid fa-circle-xmark app-msg-close-icon"
                   onClick={props.hidePageHeaderMessage}></i></span>
    </p>)
  } else if (props.type === 'SUCCESS') {
    return (<p className="mx-lg-4 my-0 py-1 bg-success-subtle">
              <span className="text-black mx-lg-4 fs-5">
                  <i className="fa-solid fa-circle-check app-success-icon app-msg-icon"></i>
                {props.message}</span>
      <span>
                <i className="fa-solid fa-circle-xmark app-msg-close-icon"
                   onClick={props.hidePageHeaderMessage}></i></span>
    </p>)
  } else if (props.type === 'WARNING') {
    return (<p className="mx-lg-4 my-0 py-1 bg-warning-subtle">
              <span className="text-black mx-lg-4 fs-5">
                  <i className="fa-solid fa-triangle-exclamation app-warning-icon app-msg-icon"></i>
                {props.message}</span>
      <span>
                <i className="fa-solid fa-circle-xmark app-msg-close-icon"
                   onClick={props.hidePageHeaderMessage}></i></span>
    </p>)
  }
}
export default PageHeaderMessageComponent
