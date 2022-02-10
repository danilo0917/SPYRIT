import React from 'react'
import { Menu as UikitMenu } from '@pancakeswap/uikit'
import { useTranslation } from 'react-i18next'
// import { languageList } from 'config/localization/languages'
// import { useTranslation } from 'contexts/Localization'
// import PhishingWarningBanner from 'components/PhishingWarningBanner'
// import useTheme from 'hooks/useTheme'
// import { usePriceCakeBusd } from 'state/farms/hooks'
// import { usePhishingBannerManager } from 'state/user/hooks'
// import { useProfile } from 'state/profile/hooks'
import config from './config'
import { useIsDarkMode } from '../../state/user/hooks'


const Menu = (props: any) => {
  // const cakePriceUsd = usePriceCakeBusd()
  // const { profile } = useProfile()
  const { t } = useTranslation()
  const darkMode = useIsDarkMode()
  // const [showPhishingWarningBanner] = usePhishingBannerManager()

  return (
    <UikitMenu
      // banner={showPhishingWarningBanner && <PhishingWarningBanner />}
      isDark={darkMode}
      // toggleTheme={toggleTheme}
      // currentLang={currentLanguage?.code}
      // langs={languageList}
      // setLang={setLanguage}
      // cakePriceUsd={cakePriceUsd.toNumber()}
      links={config(t)}
      // profile={{
      //   username: profile?.username,
      //   image: profile?.nft ? `/images/nfts/${profile.nft?.images.sm}` : undefined,
      //   profileLink: '/profile',
      //   noProfileLink: '/profile',
      //   showPip: !profile?.username,
      // }}
      {...props}
    />
  )
}

export default Menu
