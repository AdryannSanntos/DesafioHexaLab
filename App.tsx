/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Text, StatusBar, ScrollView } from 'react-native'
import CurrencyInput, { FakeCurrencyInput } from 'react-native-currency-input'
import { MaskedTextInput } from 'react-native-mask-text'
import { Ionicons } from '@expo/vector-icons'
import { CheckButton } from './src/Components/CheckButton'
import React, { useCallback, useEffect, useState } from 'react'
import * as Style from './src/Styles/global'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import { ResultInput } from './src/Components/ResultInput'

const statusBarHeight =
  StatusBar.currentHeight != null ? StatusBar.currentHeight + 28 : 64

export default function App() {
  const OPTIONS_DISCOUNT_PERCENT = [
    { text: '5%', id: 5 },
    { text: '10%', id: 10 },
    { text: '15%', id: 15 },
    { text: '20%', id: 20 }
  ]

  const onCheckLimit = (value: string) => {
    const parsedQty = Number.parseInt(value)
    if (Number.isNaN(parsedQty)) {
      setPercent(0) // setter for state
    } else if (parsedQty > 100) {
      setPercent(100)
    } else {
      setPercent(parsedQty)
    }
  }

  // Estados
  const [price, setPrice] = useState<number>()
  const [percentCheck, setPercentCheck] = useState<number>()
  const [percent, setPercent] = useState<number>()
  const [peopleToPay, setPeopleToPay] = useState<number>()

  // Estados de resultado da gorjeta
  const [priceResult, setPriceResult] = useState<number>()
  const [priceResultPerPeople, setPriceResultPerPeople] = useState<number>()

  // Input focus estados
  const [priceFocus, setPriceFocus] = useState<boolean>()
  const [percentFocus, setPercentFocus] = useState<boolean>()
  const [peopleFocus, setPeopleFocus] = useState<boolean>()

  // Variáveis para calcular a gorjeta
  const finalPercent = price! * (percent! / 100)
  const finalPercentPerPeople = (price! * (percent! / 100)) / peopleToPay!

  // Estados para verificar se esta vazio o input
  const [priceInput, setPriceInput] = useState<boolean>()
  const [percentInput, setPercentInput] = useState<boolean>()
  const [peopleToPayInput, setPeopleToPayInput] = useState<boolean>()

  // Adicionar a fonte 'Mulish' ao projeto
  const [appIsReady, setAppIsReady] = useState(false)
  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          Mulish: require('./src/Assets/Mulish-Regular.ttf'),
          'Mulish-bold': require('./src/Assets/Mulish-Bold.ttf')
        })
        await new Promise(resolve => setTimeout(resolve, 2000))
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }
    void prepare()
  }, [])
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  function handleButton() {
    console.log(price, priceInput)
    if (price !== undefined && price !== 0 && price !== null) {
      setPriceInput(false)
      if (percent !== null && percent! > 0) {
        setPercentInput(false)
        if (!isNaN(peopleToPay!)) {
          setPeopleToPayInput(false)
          setPriceResult(finalPercent)
          setPriceResultPerPeople(finalPercentPerPeople)
        } else {
          setPeopleToPayInput(true)
        }
      } else {
        setPercentInput(true)
      }
    } else {
      setPriceInput(true)
    }
  }

  return (
    <ScrollView style={{ backgroundColor: '#F2F6FF' }}>
      <Style.Container
        onLayout={onLayoutRootView}
        style={{ paddingTop: statusBarHeight, paddingBottom: 24 }}
      >
        <Style.Title>Gorjetas</Style.Title>
        <Style.ContainerMain>
          {/* Valor do pedido */}
          <Style.Label marginBottom="8px">
            Digite o valor total do pedido
            <Text style={{ color: '#DF4A4A', fontFamily: 'Mulish-bold' }}>
              *
            </Text>
          </Style.Label>
          <Style.InputRow
            style={{
              borderWidth: priceInput ? 1 : priceFocus ? 1 : 0,
              borderColor: priceInput ? '#DF4A4A' : '#B1B9CC'
            }}
          >
            <Style.Label
              fontFamily="Mulish-bold"
              style={{ color: priceInput ? '#DF4A4A' : '#000000' }}
            >
              R$
            </Style.Label>
            <CurrencyInput
              onFocus={() => setPriceFocus(true)}
              onBlur={() => setPriceFocus(false)}
              value={price!}
              onChangeValue={setPrice}
              placeholder="Digite o valor aqui "
              placeholderTextColor="#B1B9CC"
              style={{
                fontSize: 14,
                fontFamily: 'Mulish',
                textAlign: 'right',
                width: '90%'
              }}
              prefix=""
              delimiter="."
              separator=","
              precision={2}
              onChangeText={
                (formattedValue: number) => console.log(formattedValue) // $2.310,46
              }
            />
          </Style.InputRow>

          {/* Porcentagem de gorjeta */}
          <Style.Label marginTop="40px" marginBottom="8px">
            Quanto quer dar de gorjeta?
            <Text style={{ color: '#DF4A4A', fontFamily: 'Mulish-bold' }}>
              *
            </Text>
          </Style.Label>
          <CheckButton
            options={OPTIONS_DISCOUNT_PERCENT}
            onChange={op => {
              setPercent(op)
              setPercentCheck(null!)
            }}
          />

          <Style.InputRow
            style={{
              borderWidth: percentInput ? 1 : percentFocus ? 1 : 0,
              borderColor: percentInput ? '#DF4A4A' : '#B1B9CC',
              marginTop: 8
            }}
          >
            <Style.Label
              fontFamily="Mulish-bold"
              style={{ color: percentInput ? '#DF4A4A' : '#000000' }}
            >
              %
            </Style.Label>
            <MaskedTextInput
              onFocus={() => setPercentFocus(true)}
              onBlur={() => setPercentFocus(false)}
              placeholder="Personalize aqui"
              placeholderTextColor="#B1B9CC"
              style={{
                fontSize: 14,
                fontFamily: 'Mulish',
                textAlign: 'right',
                width: '90%'
              }}
              mask="99"
              value={percentCheck}
              maxLength={2}
              onChangeText={(text, rawText) => {
                onCheckLimit(text)
                setPercentCheck(text)
              }}
              keyboardType="numeric"
            />
          </Style.InputRow>

          {/* Quantidade de pessoas para pagar */}
          <Style.Label marginTop="16px" marginBottom="8px">
            Quantas pessoas irão pagar?
            <Text style={{ color: '#DF4A4A', fontFamily: 'Mulish-bold' }}>
              *
            </Text>
          </Style.Label>
          <Style.InputRow
            style={{
              borderWidth: peopleToPayInput ? 1 : peopleFocus ? 1 : 0,
              borderColor: peopleToPayInput ? '#DF4A4A' : '#B1B9CC'
            }}
          >
            <Ionicons
              name="md-person-outline"
              size={16}
              color={peopleToPayInput ? '#DF4A4A' : '#01A7C2'}
            />
            <MaskedTextInput
              onFocus={() => setPeopleFocus(true)}
              onBlur={() => setPeopleFocus(false)}
              placeholder="Digit o valor aqui"
              placeholderTextColor="#B1B9CC"
              style={{
                fontSize: 14,
                fontFamily: 'Mulish',
                textAlign: 'right',
                width: '90%'
              }}
              mask="999"
              maxLength={3}
              onChangeText={(text, rawText) => {
                setPeopleToPay(parseInt(text))
              }}
              keyboardType="numeric"
            />
          </Style.InputRow>

          {/* Botão para calcular */}
          <Style.ContainerFinish>
            <Style.FinishButton underlayColor="#0E7182" onPress={handleButton}>
              <Style.Label
                fontSize={16}
                color="#ffffff"
                fontFamily="Mulish-bold"
                textAlign="center"
              >
                CALCULAR
              </Style.Label>
            </Style.FinishButton>
          </Style.ContainerFinish>
        </Style.ContainerMain>

        {/* Gorjeta resultados */}
        <Style.ContainerResultados>
          <ResultInput
            icon="R$"
            isFocus={priceFocus!}
            label="Valor total da gorjeta"
            value={priceResult!}
          />
          <ResultInput
            icon="R$"
            isFocus={priceFocus!}
            label="Valor que cada pessoa irá pagar de gorjeta"
            value={priceResultPerPeople!}
          />
        </Style.ContainerResultados>
      </Style.Container>
    </ScrollView>
  )
}
