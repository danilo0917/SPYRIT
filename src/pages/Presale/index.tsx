import { CurrencyAmount } from '@uniswap/sdk'
import React, { useCallback } from 'react'
import { Text } from 'rebass'
import BigNumber from 'bignumber.js'
import { ButtonConfirmed, ButtonError, ButtonLight } from '../../components/Button'
import { AutoColumn } from '../../components/Column'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import { RowBetween, RowBetweenSwap } from '../../components/Row'
import { BottomGrouping, Wrapper } from '../../components/swap/styleds'
import styled from 'styled-components'

import { useActiveWeb3React } from '../../hooks'
import { usePresaleCallback } from '../../hooks/usePresaleCallback'
import { useWalletModalToggle } from '../../state/application/hooks'
import { Field } from '../../state/swap/actions'
import {
  useDefaultsFromURLSearch,
  useDerivedSwapInfo,
  useSwapActionHandlers,
  useSwapState,
  useOtherInfo} from '../../state/presale/hooks'
import { TYPE } from '../../theme'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
import AppBody from '../AppBody'

const StyledSwapHeader = styled.div`
  padding: 12px 1rem 0px 1.5rem;
  margin-bottom: -4px;
  width: 100%;
  max-width: 420px;
  color: ${({ theme }) => theme.text2};
`

export default function Swap() {
  useDefaultsFromURLSearch()

  const { account } = useActiveWeb3React()

  // toggle wallet when disconnected
  const toggleWalletModal = useWalletModalToggle()

  // swap state
  const { typedValue } = useSwapState()
  const {
    currencyBalances,
    parsedAmount,
    currencies,
    inputError: swapInputError,
  } = useDerivedSwapInfo()
  const {
    presaleRate,
    presalehardcap,
    presalesoftcap,
    balance,
  } = useOtherInfo()

  const parsedAmounts = {
    [Field.INPUT]: parsedAmount
  }
  // if(presaleRate)
  // {
  // // const bRate = new BigNumber(presaleRate)
  // console.log('rate', parseInt(((presaleRate?.[0])?.result)?.[0]._hex,16))
  // }
  // console.log('hard', presalehardcap)
  // console.log('soft', presalesoftcap)
  // console.log('balance', balance)
  const presaleRate_result=parseInt(((presaleRate?.[0])?.result)?.[0]._hex,16)
  const presalehardcap_result=parseInt(((presalehardcap?.[0])?.result)?.[0]._hex,16)/(10**5)/200
  const presalesoftcap_result=parseInt(((presalesoftcap?.[0])?.result)?.[0]._hex,16)/(10**5)/200
  const presalebalance_result=parseInt(((balance?.[0])?.result)?.[0]._hex,16)/(10**5)


  const { onUserInput } = useSwapActionHandlers()
  const isValid = !swapInputError

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value)
    },
    [onUserInput]
  )

  const formattedAmounts = {
    [Field.INPUT]: typedValue,
  }

  const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(currencyBalances[Field.INPUT])
  const atMaxAmountInput = Boolean(maxAmountInput && parsedAmounts[Field.INPUT]?.equalTo(maxAmountInput))

  // the callback to execute the swap
  const { callback: swapCallback, error: swapCallbackError } = usePresaleCallback(parsedAmount?.raw.toString())
  // const sss = JSBI.BigInt(presaleRate?.result?.[3] ?? 0) 
 
  // if (presaleRate)
  //   console.log('presaleRate11', sss)
  // const rate1 = usePresaleCallback(parsedAmount?.raw.toString())  JSBI.BigInt(rewardRateState.result?.[0])

  const handleSwap = useCallback(() => {
    if (!swapCallback) {
      return
    }
    swapCallback()
  }, [
    swapCallback,
  ])

  const handleMaxInput = useCallback(() => {
    maxAmountInput && onUserInput(Field.INPUT, maxAmountInput.toExact())
  }, [maxAmountInput, onUserInput])

  return (
    <>
      <AppBody>
          <StyledSwapHeader>
            <RowBetweenSwap>
              <TYPE.black fontWeight={500}>Buy SPYRIT</TYPE.black>
            </RowBetweenSwap>
          </StyledSwapHeader>
          <Wrapper id="presale-page">
            <AutoColumn gap={'md'}>
              <CurrencyInputPanel
                label={''}
                value={formattedAmounts[Field.INPUT]}
                showMaxButton={!atMaxAmountInput}
                currency={currencies[Field.INPUT]}
                onUserInput={handleTypeInput}
                onMax={handleMaxInput}
                onCurrencySelect={() => { }}
                otherCurrency={currencies[Field.OUTPUT]}
                id="presale-currency-input"
                disableCurrencySelect={true}
              />
              <CurrencyInputPanel
                label={'You will receive'}
                value={(new BigNumber(formattedAmounts[Field.INPUT] == '' ? '0' : formattedAmounts[Field.INPUT]).times(200)).toString()}
                showMaxButton={false}
                currency={currencies[Field.OUTPUT]}
                onUserInput={() => { }}
                onMax={() => { }}
                onCurrencySelect={() => { }}
                otherCurrency={currencies[Field.OUTPUT]}
                id="presale-currency-input"
                disableCurrencySelect={true}
              />
            </AutoColumn>
            <BottomGrouping>
              {!account ? (
                <ButtonLight onClick={toggleWalletModal}>Connect Wallet</ButtonLight>
              ) : isValid ? (
                <ButtonConfirmed
                  onClick={() => { handleSwap() }}
                  id="buy-button"
                  disabled={!isValid}
                >
                  <Text fontSize={16} fontWeight={500}>
                    {'BUY'}
                  </Text>
                </ButtonConfirmed>
              ) : (
                <ButtonError
                  onClick={() => { }}
                  id="presale-button"
                  disabled={!isValid || !!swapCallbackError}
                  error={isValid && !swapCallbackError}
                >
                  <Text fontSize={20} fontWeight={500}>
                    {swapInputError}
                  </Text>
                </ButtonError>
              )}
            </BottomGrouping>
          </Wrapper>
          <RowBetween padding={'10px'}>
            <TYPE.black padding={'10px'} fontSize={14} fontWeight={200}>Your contributed balance:</TYPE.black>{presalebalance_result ? presalebalance_result : '0'}
          </RowBetween>
          <RowBetween padding={'10px'}>
            <TYPE.black padding={'10px'} fontSize={14} fontWeight={200}>Max Cap:</TYPE.black>{presalehardcap_result ? presalehardcap_result : '0'}{' MATIC'}
          </RowBetween>
          <RowBetween padding={'10px'}>
            <TYPE.black padding={'10px'} fontSize={14} fontWeight={200}>Min Cap:</TYPE.black>{presalesoftcap_result ? presalesoftcap_result : '0'}{' MATIC'}
          </RowBetween>
          <RowBetween padding={'10px'}>
            <TYPE.black padding={'10px'} fontSize={14} fontWeight={200}>Rate:</TYPE.black>{presaleRate_result ? presaleRate_result : '0'}{' SPYRIT/MATIC'}
          </RowBetween>
      </AppBody>
    </>
  )
}
