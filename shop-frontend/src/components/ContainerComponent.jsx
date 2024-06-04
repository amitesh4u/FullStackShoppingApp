import React from 'react'

function ContainerComponent(props) {
  return (
      <div style={{minHeight:'617px'}}>
        {props.component}
      </div>
  )
}

export default ContainerComponent
