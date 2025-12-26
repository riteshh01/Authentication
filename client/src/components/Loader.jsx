import React from 'react'
import styled from 'styled-components'

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loading-wave">
        <div
          className="loading-bar"
          style={{ backgroundColor: '#4285f4' }}
        ></div>

        <div
          className="loading-bar"
          style={{ backgroundColor: '#EA4335' }}
        ></div>

        <div
          className="loading-bar"
          style={{ backgroundColor: '#EBBC05' }}
        ></div>

        <div
          className="loading-bar"
          style={{ backgroundColor: '#34A853' }}
        ></div>
      </div>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  .loading-wave {
    width: 350px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }

  .loading-bar {
    width: 40px;
    height: 20px;
    margin: 0 5px;
    border-radius: 5px;
    animation: loading-wave-animation 1s ease-in-out infinite;
  }

  .loading-bar:nth-child(2) {
    animation-delay: 0.1s;
  }
  .loading-bar:nth-child(3) {
    animation-delay: 0.2s;
  }
  .loading-bar:nth-child(4) {
    animation-delay: 0.3s;
  }

  @keyframes loading-wave-animation {
    0% { height: 40px; }
    50% { height: 120px; }
    100% { height: 40px; }
  }
`

export default Loader