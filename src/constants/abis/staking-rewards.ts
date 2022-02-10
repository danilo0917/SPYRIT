import { Interface } from '@ethersproject/abi'
import { abi as STAKING_REWARDS_ABI } from '@uniswap/liquidity-staker/build/StakingRewards.json'
import VAULT_ABI from '../abis/vault.json'
import PRESALE_ABI from '../abis/presale.json'
import NFT_MINT_ABI from '../abis/nftMint.json'
import NFT_STAKE_ABI from '../abis/nftStake.json'
import { abi as STAKING_REWARDS_FACTORY_ABI } from '@uniswap/liquidity-staker/build/StakingRewardsFactory.json'

const STAKING_REWARDS_INTERFACE = new Interface(STAKING_REWARDS_ABI)

const VAULT_INTERFACE = new Interface(VAULT_ABI)
const STAKING_REWARDS_FACTORY_INTERFACE = new Interface(STAKING_REWARDS_FACTORY_ABI)

const PRESALE_INTERFACE = new Interface(PRESALE_ABI)

const NFT_MINT_ADDRESS = '0xD037BeFDa33d1832BF3232182a97C0f459C589F6'
const NFT_MINT_INTERFACE =  new Interface(NFT_MINT_ABI)

const NFT_STAKE_ADDRESS = '0x5A32C141Db1b77687b353b52d4961253eC92A297'
const NFT_STAKE_INTERFACE =  new Interface(NFT_STAKE_ABI)

export { STAKING_REWARDS_FACTORY_INTERFACE, STAKING_REWARDS_INTERFACE, VAULT_INTERFACE,PRESALE_INTERFACE, NFT_MINT_ADDRESS, NFT_MINT_INTERFACE, NFT_STAKE_ADDRESS, NFT_STAKE_INTERFACE }
