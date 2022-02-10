import { useActiveWeb3React } from '../../hooks'
import { useMultipleContractSingleData, useSingleContractMultipleData } from '../multicall/hooks'
import { NFT_MINT_INTERFACE } from 'constants/abis/staking-rewards'
import { useMemo } from 'react'
import { useNftMintContract } from 'hooks/useContract'
import { NFT_MINT_ADDRESS } from 'constants/abis/staking-rewards'


export function useNftMintInfo(): {
  mintPrice?: any
  whiteListed?: any
  nftBalance?: any
  mintPaused?: any
  maxIds?: any
} {
  const { account } = useActiveWeb3React()
  const accountArg = useMemo(() => [account ?? undefined], [account])

  const nftMintContract = [NFT_MINT_ADDRESS]

  const mintPrice = useMultipleContractSingleData(nftMintContract, NFT_MINT_INTERFACE, 'cost')
  const whiteListed = useMultipleContractSingleData(nftMintContract, NFT_MINT_INTERFACE, 'whiteListed', accountArg)
  const nftBalance = useMultipleContractSingleData(nftMintContract, NFT_MINT_INTERFACE, 'tokenIdsBalance', accountArg)
  const mintPaused = useMultipleContractSingleData(nftMintContract, NFT_MINT_INTERFACE, 'mintActive')
  const maxIds = useMultipleContractSingleData(nftMintContract, NFT_MINT_INTERFACE, 'MAX_ID')
  return {
    mintPrice,
    whiteListed,
    nftBalance,
    mintPaused,
    maxIds,
  }
}

export const useTokenIds = (balance: any) => {
  
  const { account } = useActiveWeb3React()
  const nftMintContract = useNftMintContract()

  let k = 0
  const indexes = []
  for(k=0; k < balance; k++) {
    indexes[k] = k;
  }
  const results = useSingleContractMultipleData(
    nftMintContract,
    'tokenIds',
    indexes.map((index: any) => [account, index])
  )
  
  return results
}

// export const useTokenIds = (balance: any) => {
  
//   const { account } = useActiveWeb3React()
//   const nftMintContract = useNftMintContract()

//   let k = 0
//   const indexes = []
//   for(k=0; k < balance; k++) {
//     indexes[k] = k;
//   }
//   const results = useSingleContractMultipleData(
//     nftMintContract,
//     'tokenOfOwnerByIndex',
//     indexes.map((index: any) => [account, index])
//   )
  
//   return results
// }
