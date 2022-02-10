
import React, { useCallback } from 'react'
import styled from 'styled-components'
import Card from 'components/Card'
import { useFetchURI, useTokenURI } from 'hooks/useNftMintCallback'
import { useActiveWeb3React } from 'hooks'
import { useNftMintContract } from 'hooks/useContract'
import { calculateGasMargin } from 'utils'
// import { BigNumber } from "@ethersproject/bignumber";

// import { useNftMintCallback } from 'hooks/useNftMintCallback'
// import { NFT_STAKE_ADDRESS } from 'constants/abis/staking-rewards'
// import Test1Img from '../../assets/nftImages/test1.png'

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
const StyledTextName = styled.text`
  font-family: Bicubik;
  font-style: normal;
  font-weight: normal;
  line-height: 40px;
  color: #FFFFFF;
`

// const StyledButton = styled.button`
//   width: 90px;
//   height: 38px;
//   border: 2px solid #C824ED;;
//   box-sizing: border-box;
//   border-radius: 2px;
//   background: transparent;
//   color: white;
//   transform: skew(-20deg);
//   :hover {
//       cursor: pointer
//   }
// `

const StyledButtonUn = styled.button`
  width: 90px;
  height: 38px;
  border: 2px solid #6616AC;
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

interface NftCardProps {
    id?: number
  }

export default function NftMintCard( {id}: NftCardProps ) {
    var nId = id? id: 1000001
    const tokenURI = useTokenURI(nId)
    var tempURI = tokenURI? tokenURI : ""
    const [imgSrc, imgName] = useFetchURI(tempURI)
    var tempImgSrc = imgSrc? imgSrc : ""
    var tempImgName = imgName? imgName : ""
    const { account } = useActiveWeb3React()
      
    const nftMintContract = useNftMintContract(true)
    
    const handleMint = useCallback(async (): Promise<void> => {
      if( !account ) {
        console.error('account is null')
        return
      }
  
      if (!nftMintContract) {
        console.error('nftMintContract is null')
        return
      }
      
      if (!nId) {
        console.error('no mintAmount', nId)
        return
      }
      
      const mintPrice = await nftMintContract.cost()
      const estimatedGas = await nftMintContract.estimateGas.mint(nId, {value: mintPrice}).catch(() => {
        // general fallback for tokens who restrict approval amounts
        return nftMintContract.estimateGas.mint(nId)
      })
      // const estimatedGas = BigNumber.from(1000000)
      return nftMintContract
      .mint(nId, {
        value: mintPrice,
        gasLimit: calculateGasMargin(estimatedGas),
        gasPrice: 5000000000
      })
      .catch((error: Error) => {
        console.debug('Failed to set Fee', error)
        throw error
      })
  }, [nftMintContract, nId])
  
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
        <div style={{display: "flex", justifyContent: "space-evenly"}}>
                <StyledButtonUn onClick={() => { 
                  handleMint() 
                  }} > Mint 
                </StyledButtonUn>
        </div>
      </div>
    )

}

