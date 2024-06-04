import React from 'react'

function ContainerComponent(props) {
  return (
      <div className="app-container">
        {props.component}
      </div>
  )
}

export default ContainerComponent
