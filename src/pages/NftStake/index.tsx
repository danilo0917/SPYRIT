import React, { useState } from 'react'
// import { Text } from 'rebass'
// import { ButtonConfirmed, ButtonLight } from '../../components/Button'
import { RowBetween } from '../../components/Row'
// import { BottomGrouping, Wrapper } from '../../components/swap/styleds'
import styled from 'styled-components'
import Card from 'components/Card'
import { UNI } from '../../constants'
import { useActiveWeb3React } from '../../hooks'
import useUSDCPrice from '../../utils/useUSDCPrice'
// import { useActiveWeb3React } from '../../hooks'
// import { useWalletModalToggle } from '../../state/application/hooks'
import { TYPE } from '../../theme'
// import AppBody from '../AppBody'
import { useNftMintInfo, useTokenIds } from 'state/nft/hooks'
import { useNftGetRewardCallback, useReward, useRewardRate, useStakedTokenIds, useStakeTotalSupply, useTotalEarn } from 'hooks/useNftMintCallback'
import NftCard from './nftCard'
import NftCardUn from './nftCardUn'


const StyledUl = styled.ul`
  list-style: none;
  display: flex;
  margin: 0px;
  padding: 0px;
`

const StyledLi = styled.li`
  margin-right: 1rem;
  font-size: 1.2rem;
  color: rgb(136, 141, 155);
  cursor: pointer;
  user-select: none;
  :active {
    padding-bottom: 4px;
    border-bottom: 1px solid red;
  }
`

const StyledCardInfo = styled(Card)`
  width: 330px;
  height: 242px;
  background: linear-gradient(83.13deg, rgba(88, 27, 122, 0.5) 26.7%, rgba(31, 3, 34, 0) 74.76%);
  border-radius: 20px;
  padding: 23px 0px 26px 29px;
`
const StyledCardClaim = styled(Card)`
  width: 330px;
  height: 126px;
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

const StyledButton = styled.button`
  width: 79px;
  height: 38px;
  border: 2px solid #C824ED;;
  box-sizing: border-box;
  border-radius: 2px;
  background: transparent;
  color: white;
  transform: skew(-20deg);
  :hover {
      cursor: pointer
      background-image: linear-gradient(88.56deg,#6616AC -44.34%,#D426FB 77.48%);
  }
`

export default function NftStake() {

  const [nftView, setNftView] = useState(true);

  const {
    nftBalance,
  } = useNftMintInfo()

  
  const { chainId } = useActiveWeb3React()
  const uni = chainId ? UNI[chainId] : undefined
  const uniPrice = useUSDCPrice(uni)
  console.log('debug spyrit price', uniPrice?.toFixed(7))
  const nftBalance_result=parseInt(((nftBalance?.[0])?.result)?.[0]._hex,16)

  const tokenIds = useTokenIds(nftBalance_result)
  let stakedIds = useStakedTokenIds()
  
  const reward = useReward()
  const rewardRate = useRewardRate()
  const APY = !rewardRate? 0 : (!uniPrice? 0 :  parseFloat(uniPrice?.toFixed(7)) * rewardRate)

  const stakedNFTTotal = useStakeTotalSupply()
  const totalRewards = useTotalEarn()
  const totalEarn = !totalRewards? 0 : (!uniPrice? 0 :  parseFloat(uniPrice?.toFixed(7)) * totalRewards)

  const stakedIds_result = stakedIds ?  stakedIds : []
  const len = tokenIds?.length
  const stakedLen = stakedIds_result?.length
  const indexes = []
  let stakedIndexes = []

  let k = 0;

  for(k = 0; k < len; k++) {
    const temp = tokenIds[k]?.result?.toString()
      indexes.push(parseInt(temp? temp : '100001'))
  }
  let tempIndexes = indexes
  for(k = 0; k < stakedLen; k++) {
    const temp = stakedIds_result?.toString()
      stakedIndexes.push(parseInt(temp? temp : '100001'))
      
      const delIndex = tempIndexes.indexOf(stakedIndexes[k]);
      if(delIndex > -1) {
        tempIndexes.splice(delIndex, 1);
      }
  }
  
  // useEffect(() => {
    
  //   for(k = 0; k < stakedLen; k++) {
  //     const delIndex = tempIndexes.indexOf(stakedIndexes[k]);
  //     if(delIndex > -1) {
  //       tempIndexes.splice(delIndex, 1);
  //     }
  //   }
  // }, [stakedLen])

  
  // toggle wallet when disconnected
  const [handleClaim] = useNftGetRewardCallback()
  
  return (
    <div style={{width: "1065px", display: "flex", marginLeft: "250px"}}>
        <div style={{width: "720px"}}>
          <div style={{marginBottom: "20px"}}>
            <StyledUl>
              <StyledLi onClick={()=>{setNftView(true)}}> Stake ({tempIndexes?.length}) </StyledLi>
              <StyledLi onClick={()=>{setNftView(false)}}> Unstake ({stakedLen}) </StyledLi>
            </StyledUl>
          </div>
          <div style={{display: "flex", flexWrap: "wrap"}}>
            { nftView &&
              indexes.map((index) => {
                return(
                  <NftCard
                  id={index}
                  />
                )
              })
            }
            { !nftView &&
              stakedIndexes.map((index) => {
                return(
                  <NftCardUn
                  id={index}
                  />
                )
              })
            }
          </div>
        </div>
        <div style={{maxWidth: "330px", width: "100%"}}>
          <StyledCardInfo>
            <StyledTextCard> STAKING INFO </StyledTextCard>
            <RowBetween style={{lineHeight: "20px", marginBottom: "20px"}}>
              <TYPE.black fontSize={14} color="rgba(255, 255, 255, 0.7)">Staked</TYPE.black> {stakedLen ? stakedLen : '0'} {'TSN'}
            </RowBetween >
            <RowBetween style={{lineHeight: "20px", marginBottom: "20px"}}>
              <TYPE.black fontSize={14} color="rgba(255, 255, 255, 0.7)"> Average APY</TYPE.black> {APY ? APY : '0'} {'$'}
            </RowBetween>
            <RowBetween style={{lineHeight: "20px", marginBottom: "20px"}}>
              <TYPE.black fontSize={14} color="rgba(255, 255, 255, 0.7)">Total Staked NFTs</TYPE.black> {stakedNFTTotal ? stakedNFTTotal : '0'} {'TSN'}
            </RowBetween>
            <RowBetween style={{lineHeight: "20px", marginBottom: "20px"}}>
              <TYPE.black fontSize={14} color="rgba(255, 255, 255, 0.7)">Total Earnings</TYPE.black> {totalEarn ? totalEarn : '0'} {'$'}
            </RowBetween>
          </StyledCardInfo>
          <div style={{marginBottom: "25px"}} />
          <StyledCardClaim>
            <StyledTextCard> AVAILABE FOR CLAIM </StyledTextCard>
            <div style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
              <text> {reward / 10**5} </text>
              <StyledButton onClick={() => {handleClaim()}}> Claim </StyledButton>
            </div>
          </StyledCardClaim>
        </div>

    </div>
  )
}
