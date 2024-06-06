import React from 'react'

const LoaderComponent = (props) => {
  return (
      props.show &&
      <div className="app-modal-backdrop">
        <div className="app-content-center">
          <div className="app-loader"/>
          <p className="app-loader-text">Loading...</p>
        </div>
      </div>
  )
}
export default LoaderComponent
