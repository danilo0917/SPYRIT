import React from 'react'
import styled from 'styled-components'
import Settings from '../Settings'
import {  RowBetweenSwap } from '../Row'
import { TYPE } from '../../theme'

const StyledSwapHeader = styled.div`
  padding: 38px 1rem 0px 1rem;
  margin-bottom: -8px;
  width: 100%;
  color: ${({ theme }) => theme.text2};
  display: flex;
`

export default function SwapHeader() {
  return (
    <>
      <StyledSwapHeader>
        <RowBetweenSwap>
          <TYPE.black fontWeight={500} fontSize='24px'>Swap</TYPE.black>
        </RowBetweenSwap>
        <Settings />
      </StyledSwapHeader>
    </>
  )
}
