import { MenuEntry, menuStatus } from '@pancakeswap/uikit'
// import { ContextApi } from 'contexts/Localization/types'

import { ReactText } from 'react'
import { Language } from '@pancakeswap/uikit'

export type ContextData = {
  [key: string]: ReactText
}

export interface ProviderState {
  isFetching: boolean
  currentLanguage: Language
}

export interface ContextApi extends ProviderState {
  setLanguage: (language: Language) => void
  t: (key: string, data?: ContextData) => string
}


const config: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: t('Home'),
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: t('Bulltrade'),
    icon: 'TradeIcon',
    items: [
      {
        label: t('Exchange'),
        href: '/swap',
      },
      {
        label: t('Liquidity'),
        href: '/liquidity',
      },
    ],
  },
  {
    label: t('Bullfarms'),
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: t('Bullpools'),
    icon: 'PoolIcon',
    href: '/pools',
  },
  {
    label: t('BullChain'),
    icon: 'GroupsIcon',
    href: '/referral',
  },
  {
    label: t('Bullpit'),
    icon: 'InfoIcon',
    items: [
      {
        label: t('IBullSwap'),
        href: '/info',
      },
      {
        label: t('Poocoin'),
        href: 'https://poocoin.app/tokens/0x3E76Bd1EDb5f6d981DD14d9D2ab711F0C2a0A6A0',
        target: '_blank'
      },
    ],
  },
  {
    label: t('BullPot'),
    icon: 'TicketIcon',
    href: '/lottery',
    status: menuStatus.SOON,
  },
  {
    label: t('Bullpredict'),
    icon: 'PredictionsIcon',
    href: '/prediction',
    status: menuStatus.SOON,
  },
  {
    label: t('IBO'),
    icon: 'IfoIcon',
    href: '/ico',
    status: menuStatus.SOON,
  },
  {
    label: t('NFT'),
    icon: 'NftIcon',
    href: '/nft',
    status: menuStatus.SOON,
  },
  {
    label: t('Community'),
    icon: 'MoreIcon',
    items: [
      {
        label: t('Instagram'),
        href: 'https://www.instagram.com/p/CWZ6CIXhcqs/?utm_medium=copy_link',
        target: '_blank'
      },
      {
        label: t('Facebook'),
        href: 'https://www.facebook.com/104066302106149/posts/104073122105467',
        target: '_blank'
      },
      {
        label: t('Twitter'),
        href: 'https://twitter.com/ibullswap/status/1461194096970637314?s=20',
        target: '_blank'
      },
      {
        label: t('Reddit'),
        href: 'https://www.reddit.com/r/ibullswap/comments/qwibid/the_next_big_thing_in_crypto_currency/?utm_medium=android_app&utm_source=share',
        target: '_blank'
      },
      {
        label: t('Discord'),
        href: 'https://discord.gg/3kBKG9DA',
        target: '_blank'
      },
      {
        label: t('Linkedin'),
        href: 'https://www.linkedin.com/posts/ibull-swap-8aa023226_ibullswap-cryptocurrency-bscgems-activity-6866966020414865408-vYxL',
        target: '_blank'
      },
      {
        label: t('Telegram'),
        href: 'https://t.me/ibullchat',
        target: '_blank'
      },
    ],
  },
  {
    label: t('More'),
    icon: 'MoreIcon',
    items: [
      {
        label: t('GitHub'),
        href: 'https://github.com/Digiblocks',
        target: '_blank'
      },
      {
        label: t('Doc'),
        href: 'https://docs.ibullswap.com/',
        target: '_blank'
      },
     
    ],
  },
]

export default config
