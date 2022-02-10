import { useCallback, useEffect, useState } from 'react'
import { useNftMintContract, useNftStakeContract } from './useContract'
import { calculateGasMargin } from '../utils'
import { useActiveWeb3React } from 'hooks'


type NftJson = {
  name: string;
  image: string;
  description: string;
  attributes: string[];
};


export function useNftMintCallback(
  _mintAmount?: number
): [() => Promise<void>] {
  
  const { account } = useActiveWeb3React()

  const nftMintContract = useNftMintContract(true)
  
  const setMint = useCallback(async (): Promise<void> => {

    if( !account ) {
      console.error('account is null')
      return
    }

    if (!nftMintContract) {
      console.error('nftMintContract is null')
      return
    }
    
    if (!_mintAmount) {
      console.error('no mintAmount', _mintAmount)
      return
    }

    const estimatedGas = await nftMintContract.estimateGas.mint(account, _mintAmount).catch(() => {
      // general fallback for tokens who restrict approval amounts
      return nftMintContract.estimateGas.mint(account, _mintAmount)
    })

    return nftMintContract
      .mint(account, _mintAmount, {
        gasLimit: calculateGasMargin(estimatedGas),
        gasPrice: 5000000000
      })
      .catch((error: Error) => {
        console.debug('Failed to set Fee', error)
        throw error
      })
  }, [nftMintContract])

  return [setMint]
}

export function useNftStakeCallback(
  tokenId?: number
): [() => Promise<void>] {
  
  const { account } = useActiveWeb3React()

  const nftStakeContract = useNftStakeContract(true)
  
  const setStake = useCallback(async (): Promise<void> => {

    if( !account ) {
      console.error('account is null')
      return
    }

    if (!nftStakeContract) {
      console.error('nftMintContract is null')
      return
    }
    
    if (!tokenId) {
      console.error('no tokenId', tokenId)
      return
    }
    console.log('debug staking nft', nftStakeContract, tokenId)
    const estimatedGas = await nftStakeContract.estimateGas.stake(tokenId).catch(() => {
      // general fallback for tokens who restrict approval amounts
      return nftStakeContract.estimateGas.stake(tokenId)
    })

    return nftStakeContract
      .stake(tokenId, {
        gasLimit: calculateGasMargin(estimatedGas),
        gasPrice: 5000000000
      })
      .catch((error: Error) => {
        console.debug('Failed to set Fee', error)
        throw error
      })
  }, [nftStakeContract])

  return [setStake]
}

export function useNftWithdrawCallback(
  tokenId?: number
): [() => Promise<void>] {
  
  const { account } = useActiveWeb3React()

  const nftStakeContract = useNftStakeContract(true)
  
  const setWithdraw = useCallback(async (): Promise<void> => {

    if( !account ) {
      console.error('account is null')
      return
    }

    if (!nftStakeContract) {
      console.error('nftMintContract is null')
      return
    }
    
    if (!tokenId) {
      console.error('no tokenId', tokenId)
      return
    }

    const estimatedGas = await nftStakeContract.estimateGas.withdraw(tokenId).catch(() => {
      // general fallback for tokens who restrict approval amounts
      return nftStakeContract.estimateGas.withdraw(tokenId)
    })

    return nftStakeContract
      .withdraw(tokenId, {
        gasLimit: calculateGasMargin(estimatedGas),
        gasPrice: 5000000000
      })
      .catch((error: Error) => {
        console.debug('Failed to set Fee', error)
        throw error
      })
  }, [nftStakeContract])

  return [setWithdraw]
}

export function useNftGetRewardCallback(
): [() => Promise<void>] {
  
  const { account } = useActiveWeb3React()

  const nftStakeContract = useNftStakeContract(true)
  
  const setGetreward = useCallback(async (): Promise<void> => {

    if( !account ) {
      console.error('account is null')
      return
    }

    if (!nftStakeContract) {
      console.error('nftMintContract is null')
      return
    }
    
    const estimatedGas = await nftStakeContract.estimateGas.getReward().catch(() => {
      // general fallback for tokens who restrict approval amounts
      return nftStakeContract.estimateGas.getReward()
    })
    console.log('debug getReward', nftStakeContract)
    return nftStakeContract
      .getReward({
        gasLimit: calculateGasMargin(estimatedGas),
        gasPrice: 5000000000
      })
      .catch((error: Error) => {
        console.debug('Failed to set Fee', error)
        throw error
      })
  }, [nftStakeContract])

  return [setGetreward]
}

export function useNftExitCallback(
  tokenId?: number
): [() => Promise<void>] {
  
  const { account } = useActiveWeb3React()

  const nftStakeContract = useNftStakeContract(true)
  
  const setExit = useCallback(async (): Promise<void> => {

    if( !account ) {
      console.error('account is null')
      return
    }

    if (!nftStakeContract) {
      console.error('nftMintContract is null')
      return
    }
    
    if (!tokenId) {
      console.error('no tokenId', tokenId)
      return
    }

    const estimatedGas = await nftStakeContract.estimateGas.exit(tokenId).catch(() => {
      // general fallback for tokens who restrict approval amounts
      return nftStakeContract.estimateGas.exit(tokenId)
    })

    return nftStakeContract
      .exit(tokenId, {
        gasLimit: calculateGasMargin(estimatedGas),
        gasPrice: 5000000000
      })
      .catch((error: Error) => {
        console.debug('Failed to set Fee', error)
        throw error
      })
  }, [nftStakeContract])

  return [setExit]
}

export function useNftExitAllCallback(
  ): [() => Promise<void>] {
    
    const { account } = useActiveWeb3React()
  
    const nftStakeContract = useNftStakeContract(true)
    
    const setExitAll = useCallback(async (): Promise<void> => {
  
      if( !account ) {
        console.error('account is null')
        return
      }
  
      if (!nftStakeContract) {
        console.error('nftMintContract is null')
        return
      }
      
      const estimatedGas = await nftStakeContract.estimateGas.exitAll().catch(() => {
        // general fallback for tokens who restrict approval amounts
        return nftStakeContract.estimateGas.exitAll()
      })
  
      return nftStakeContract
        .exitAll({
          gasLimit: calculateGasMargin(estimatedGas),
          gasPrice: 5000000000
        })
        .catch((error: Error) => {
          console.debug('Failed to set Fee', error)
          throw error
        })
    }, [nftStakeContract])
  
    return [setExitAll]
}

export function useNftApproveCallback(
  spender: string,
  tokenId: number
  ): [() => Promise<void>] {
    
    const { account } = useActiveWeb3React()
  
    const nftMintContract = useNftMintContract(true)
    
    const setApprove = useCallback(async (): Promise<void> => {
  
      if( !account ) {
        console.error('account is null')
        return
      }
  
      if (!nftMintContract) {
        console.error('nftMintContract is null')
        return
      }
      
      const estimatedGas = await nftMintContract.estimateGas.approve(spender, tokenId).catch(() => {
        // general fallback for tokens who restrict approval amounts
        return nftMintContract.estimateGas.approve(spender, tokenId)
      })
  
      return nftMintContract
        .approve(spender, tokenId, {
          gasLimit: calculateGasMargin(estimatedGas),
          gasPrice: 5000000000
        })
        .catch((error: Error) => {
          console.debug('Failed to set Fee', error)
          throw error
        })
    }, [nftMintContract])
  
    return [setApprove]
}


export const useTokenURI= (tokenId: number) => {
  const [tokenURI, setTokenURI] = useState<string>()
  const nftMintContract = useNftMintContract()
  useEffect(() => {
    async function fetchTokenURI() {
      const uriVal = await nftMintContract?.uri(tokenId)
      // console.log('debug fetch price', contractAIN)
      setTokenURI(uriVal)
    }

    fetchTokenURI()
  }, [tokenId])

  return tokenURI
}

export const useFetchURI = (tokenURI: string) => {
  // const [errorURI, setErrorURI] = useState(null);
  // const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<NftJson>();

  useEffect(() => {
    fetch(tokenURI)
    .then(res => res.json())
    .then(
      (result) => {
        // setIsLoaded(true);
        setItems(result);
      },
      (error) => {
        // setIsLoaded(true);
        // setErrorURI(error);
        console.log('debig fetch uri error', error)
      }
    )
}, [tokenURI, ])
  return [items?.image, items?.name]
}

export const useGetApprove = (account: string, spender: string) => {
  const [addr, setAddr] = useState<string>()
  const nftMintContract = useNftMintContract()
  useEffect(() => {
    async function fetchData() {
      const scData = await nftMintContract?.isApprovedForAll(account, spender)
      // console.log('debug fetch price', contractAIN)
      setAddr(scData)
    }

    fetchData()
  }, [account, spender])

  return addr
}

export const useStakedBalance = () => {

  const { account } = useActiveWeb3React()
  const [stakedBal, setStakedBal] = useState();
  const nftStakeContract = useNftStakeContract()

  useEffect(() => {
    async function fetchData() {
      const scData = await nftStakeContract?.tokensOfAccount(account)
      // console.log('debug fetch price', contractAIN)
      setStakedBal(scData)
    }

    fetchData()
  }, [account])

  return stakedBal
}

export const useStakedTokenIds = () => {

  const { account } = useActiveWeb3React()
  const [stakedIds, setStakedIds] = useState([]);
  const nftStakeContract = useNftStakeContract()

  useEffect(() => {
    async function fetchData() {
      const scData = await nftStakeContract?.tokensOfAccount(account)
      if(scData)
        setStakedIds(scData)
    }

    fetchData()
  }, [account])

  return stakedIds
}

export const useReward = () => {
  const { account } = useActiveWeb3React()
  const [stakedReward, setStakedReward] = useState("0");
  const nftStakeContract = useNftStakeContract()

  useEffect(() => {
    async function fetchData() {
      const scData = await nftStakeContract?.earned(account)
      if(scData)
        setStakedReward(scData)
    }

    fetchData()
  }, [account])
  return parseInt(stakedReward)
}

export const useRewardRate = () => {
  const { account } = useActiveWeb3React()
  const [stakedReward, setStakedReward] = useState("0");
  const nftStakeContract = useNftStakeContract()

  useEffect(() => {
    async function fetchData() {
      const scData = await nftStakeContract?.rewardRate()
      if(scData)
        setStakedReward(scData)
    }

    fetchData()
  }, [account])
  return parseInt(stakedReward)
}

export const useStakeTotalSupply = () => {
  const { account } = useActiveWeb3React()
  const [stakedReward, setStakedReward] = useState("0");
  const nftStakeContract = useNftStakeContract()

  useEffect(() => {
    async function fetchData() {
      const scData = await nftStakeContract?.totalSupply()
      if(scData)
        setStakedReward(scData)
    }

    fetchData()
  }, [account])
  return parseInt(stakedReward)
}

export const useTotalEarn = () => {
  const { account } = useActiveWeb3React()
  const [stakedReward, setStakedReward] = useState("0");
  const nftStakeContract = useNftStakeContract()

  useEffect(() => {
    async function fetchData() {
      const scData = await nftStakeContract?.rewardsTotal(account)
      if(scData)
        setStakedReward(scData)
    }

    fetchData()
  }, [account])
  return parseInt(stakedReward)
}