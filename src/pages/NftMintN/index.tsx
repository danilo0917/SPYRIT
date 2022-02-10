import React from 'react'
// import { Text } from 'rebass'
// import { ButtonConfirmed, ButtonLight } from '../../components/Button'
import { RowBetween } from '../../components/Row'
// import { BottomGrouping, Wrapper } from '../../components/swap/styleds'
import styled from 'styled-components'
import Card from 'components/Card'
// import { UNI } from '../../constants'
// import { useActiveWeb3React } from '../../hooks'
// import useUSDCPrice from '../../utils/useUSDCPrice'
// import { useActiveWeb3React } from '../../hooks'
// import { useWalletModalToggle } from '../../state/application/hooks'
import { TYPE } from '../../theme'
// import AppBody from '../AppBody'
import { useNftMintInfo } from 'state/nft/hooks'
import NftMintCard from './nftMintCard'
// import { useNftGetRewardCallback, useReward, useRewardRate, useStakedTokenIds, useStakeTotalSupply, useTotalEarn } from 'hooks/useNftMintCallback'



const StyledCardInfo = styled(Card)`
  width: 330px;
  height: 242px;
  background: linear-gradient(83.13deg, rgba(88, 27, 122, 0.5) 26.7%, rgba(31, 3, 34, 0) 74.76%);
  border-radius: 20px;
  padding: 23px 0px 26px 29px;
`

const StyledTextCard = styled.text`
  font-family: Bicubik;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 40px;
  color: #FFFFFF;
`

export default function NftMintNew() {

  const {
    mintPrice,
    whiteListed,
    nftBalance,
    mintPaused,
    maxIds,
  } = useNftMintInfo()


  const mintPrice_result=parseInt(((mintPrice?.[0])?.result)?.[0]._hex,16)
  const nftBalance_result=parseInt(((nftBalance?.[0])?.result)?.[0]._hex,16)
  // const maxMintAmount_result=parseInt(((maxMintAmount?.[0])?.result)?.[0]._hex,16)
  // const totalSupply_result=parseInt(((totalSupply?.[0])?.result)?.[0]._hex,16)
  const maxSupply_result=parseInt(((maxIds?.[0])?.result)?.[0]._hex,16)

  const whiteListed_result = ((whiteListed?.[0])?.result)?.[0]
  const mintPaused_result = ((mintPaused?.[0])?.result)?.[0]

  // toggle wallet when disconnected

  // const tokenIds = useTokenIds(nftBalance_result)
  
  let indexes = []
  for(let k = 1; k <= maxSupply_result; k++) {
    indexes.push(k);
  }

  return (
    <div style={{width: "1065px", display: "flex", marginLeft: "250px"}}>
        <div style={{width: "720px"}}>
          <div style={{marginBottom: "20px"}}>

          </div>
          <div style={{display: "flex", flexWrap: "wrap"}}>
            { indexes.map((index) => {
                return(
                  <NftMintCard
                    id={index}
                  />
                )
              })
            }
          </div>
        </div>
        <div style={{maxWidth: "330px", width: "100%"}}>
          <StyledCardInfo>
            <StyledTextCard> MINTING INFO {mintPaused_result? 'Live 🔥' : 'Paused ⏸️'}</StyledTextCard>
            <RowBetween style={{lineHeight: "20px", marginBottom: "20px"}}>
              <TYPE.black fontSize={14} color="rgba(255, 255, 255, 0.7)">White Listed</TYPE.black> {whiteListed_result ? 'Yes' : 'No'}
            </RowBetween >
            <RowBetween style={{lineHeight: "20px", marginBottom: "20px"}}>
              <TYPE.black fontSize={14} color="rgba(255, 255, 255, 0.7)">Your Balance</TYPE.black> {nftBalance_result ? nftBalance_result : '0'} {'TSN'}
            </RowBetween >
            <RowBetween style={{lineHeight: "20px", marginBottom: "20px"}}>
              <TYPE.black fontSize={14} color="rgba(255, 255, 255, 0.7)"> Mint Price</TYPE.black> {mintPrice_result ? mintPrice_result / 10**18 : '0'} {'MATIC'}
            </RowBetween>
            {/* <RowBetween style={{lineHeight: "20px", marginBottom: "20px"}}>
              <TYPE.black fontSize={14} color="rgba(255, 255, 255, 0.7)">total Supply</TYPE.black> {totalSupply_result ? totalSupply_result : '0'} {'TSN'}
            </RowBetween>
            <RowBetween style={{lineHeight: "20px", marginBottom: "20px"}}>
              <TYPE.black fontSize={14} color="rgba(255, 255, 255, 0.7)">Max Supply</TYPE.black> {maxSupply_result ? maxSupply_result : '0'} {'TSN'}
            </RowBetween> */}
          </StyledCardInfo>
        </div>

    </div>
  )
}
