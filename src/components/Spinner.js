import React from 'react'
import styled from 'styled-components'
import { useShopData } from '../hooks'

export const Spinner = () => {
  const { primary_color } = useShopData() || {}
  return (
    <Wrapper color={primary_color}>
      <svg className='sd-spinner' viewBox='0 0 50 50'>
        <circle className='path' cx='25' cy='25' r='20' fill='none' strokeWidth='2'></circle>
      </svg>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .sd-spinner {
    width: 100%;
    max-width: 30px;
    animation: rotate 2s linear infinite;
    
    & .path {
      stroke-linecap: round;
      animation: dash 1.5s ease-in-out infinite;
      stroke: ${({ color }) => color ? color : '#000'};
    }
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dashoffset: 0;
      stroke-dasharray: 1, 150;
    }
    50% {
      stroke-dashoffset: -35;
      stroke-dasharray: 90, 150;
    }
    100% {
      stroke-dashoffset: -124;
      stroke-dasharray: 90, 150;
    }
  }
`