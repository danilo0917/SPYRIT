
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from 'components/Card'
import { useFetchURI, useTokenURI } from 'hooks/useNftMintCallback'
import { useActiveWeb3React } from 'hooks'
import { useNftMintContract, useNftStakeContract } from 'hooks/useContract'
import { calculateGasMargin } from 'utils'
import { NFT_STAKE_ADDRESS } from 'constants/abis/staking-rewards'
// import { RowBetween } from '../../components/Row'
// import { TYPE } from '../../theme'
// import Test1Img from '../../assets/nftImages/test1.png'

// const Wrapper = styled(Card)`
//   width: 210px;
//   height: 316px;
// `

const StyledCard = styled(Card)`
  background: #581B7A;
  box-shadow: 0px 24px 44px rgba(0, 0, 0, 0.35);
  border-radius: 20px;
  width: 210px;
  height: 270px;
`

const StyledImg = styled.img`
  width: 169px;
  height: 156px;
  border-radius: 15px;
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
const StyledText = styled.text`
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 22px;
`

const StyledTextName = styled.text`
  font-family: Bicubik;
  font-style: normal;
  font-weight: normal;
  color: #FFFFFF;
`
// const StyledButtonUn = styled.button`
//   width: 90px;
//   height: 38px;
//   border: 2px solid #6616AC;
//   box-sizing: border-box;
//   border-radius: 2px;
//   background: transparent;
//   color: white;
//   transform: skew(-20deg);
// `

interface NftCardProps {
    id?: number
  }

export default function NftCard( {id}: NftCardProps ) {
  const [approved, setApproved] = useState<boolean>()
    var nId = id? id: 1000001
    const tokenURI = useTokenURI(nId)
    var tempURI = tokenURI? tokenURI : ""
    const [imgSrc, imgName] = useFetchURI(tempURI)
    var tempImgSrc = imgSrc? imgSrc : ""
    var tempImgName = imgName? imgName: ""
    const { account } = useActiveWeb3React()
      
    const nftStakeContract = useNftStakeContract(true)

    const nftMintContract = useNftMintContract()

    useEffect(() => {
      async function fetchData() {
        const scData = await nftMintContract?.isApprovedForAll(account, NFT_STAKE_ADDRESS)
        setApproved(scData)
      }

      fetchData()

    }, [account, NFT_STAKE_ADDRESS])


    const handleStake = useCallback(async (): Promise<void> => {
      if( !account ) {
        console.error('account is null')
        return
      }
  
      if (!nftStakeContract) {
        console.error('nftStakeContract is null')
        return
      }
      
      if (!nId) {
        console.error('no tokenId', nId)
        return
      }

      const estimatedGas = await nftStakeContract.estimateGas.stake(nId).catch(() => {
        // general fallback for tokens who restrict approval amounts
        return nftStakeContract.estimateGas.stake(nId)
      })
  
      return nftStakeContract
        .stake(nId, {
          gasLimit: calculateGasMargin(estimatedGas),
          gasPrice: 5000000000
        })
        .catch((error: Error) => {
          console.debug('Failed to set Fee', error)
          throw error
        })
    }, [nftStakeContract, nId])

    const handleApprove = useCallback(async (): Promise<void> => {
      if( !account ) {
        console.error('account is null')
        return
      }
      if (!nftMintContract) {
        console.error('nftMintContract is null')
        return
      }
      const estimatedGas = await nftMintContract.estimateGas.setApprovalForAll(NFT_STAKE_ADDRESS, true).catch(() => {
        // general fallback for tokens who restrict approval amounts
        return nftMintContract.estimateGas.setApprovalForAll(NFT_STAKE_ADDRESS, true)
      })
      return nftMintContract
        .setApprovalForAll(NFT_STAKE_ADDRESS, true, {
          gasLimit: calculateGasMargin(estimatedGas),
          gasPrice: 5000000000
        })
        .catch((error: Error) => {
          console.debug('Failed to set Fee', error)
          throw error
        })
    }, [account, NFT_STAKE_ADDRESS])
    return(
      <div style={{marginRight: "26px", marginBottom: "26px"}}>
          <StyledCard>
            <div style={{display: "flex", justifyContent: "center", marginBottom: "12px"}}>
                <StyledImg alt='img' src={tempImgSrc} />
            </div>
            <div style={{display: "grid"}}>
              <StyledTextName style={{marginBottom: "4px"}}> {nId} </StyledTextName>
              <StyledTextName style={{lineHeight: "20px"}}> {tempImgName} </StyledTextName>
            </div>
          </StyledCard>
          <div style={{marginBottom: "8px"}} />
          <div style={{display:"flex", justifyContent: "space-evenly"}}>
                {
                  approved ? (
                  <>
                    <StyledButton > <StyledText> Approved </StyledText> </StyledButton>
                  </>
                  ) : (
                    <>
                      <StyledButton onClick={() => { 
                        handleApprove() 
                        }} > <StyledText> Approve </StyledText>  </StyledButton>
                    </>
                  )
                }
                <StyledButton onClick={() => { 
                  handleStake() 
                  }} > <StyledText> Stake </StyledText>
                </StyledButton>
          </div>
      </div>

    )

}

