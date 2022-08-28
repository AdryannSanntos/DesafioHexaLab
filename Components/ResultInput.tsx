/* eslint-disable @typescript-eslint/explicit-function-return-type */

import React from 'react'
import { FakeCurrencyInput } from 'react-native-currency-input'
import * as Style from '../../src/Styles/global'

interface ResultInputProps {
  icon: string
  label: string
  isFocus: boolean
  value: number
}

export function ResultInput(props: ResultInputProps) {
  return (
    <>
      <Style.Label marginBottom="8px" marginTop="24px">
        {props.label}
      </Style.Label>
      <Style.InputRow
        bgColor="#01A7C2"
        style={{
          borderWidth: props.isFocus ?? false ? '1px' : 0,
          borderColor: '#B1B9CC'
        }}
      >
        <Style.Label color="#FFFFFF" fontFamily="Mulish-bold">
          {props.icon}
        </Style.Label>
        <FakeCurrencyInput
          value={props.value}
          style={{
            fontSize: 14,
            fontFamily: 'Mulish',
            textAlign: 'right',
            width: '100%',
            color: '#fff'
          }}
          prefix=""
          delimiter="."
          separator=","
          precision={2}
        />
      </Style.InputRow>
    </>
  )
}
