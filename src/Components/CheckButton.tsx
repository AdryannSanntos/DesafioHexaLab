/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

interface CheckButtonProps {
  options: [{ text: string; id: number }]
  onChange: ([]) => void
  mult?: boolean
  unCheckAll: boolean
}

export function CheckButton(props: CheckButtonProps) {
  const [selected, setSelected] = useState<number[]>([])

  function toggle(id: number) {
    const index = selected.findIndex(i => i === id)
    let arrSelecteds = [...selected]

    if (index !== -1) {
      arrSelecteds.splice(index, 1)
    } else {
      props.mult ? arrSelecteds.push(id) : (arrSelecteds = [id])
    }
    setSelected(arrSelecteds)
  }

  useEffect(() => {
    props.onChange(selected)
  }, [selected])

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
      }}
    >
      {props.options.map((op, index) => (
        <TouchableOpacity
          key={op.id}
          style={{
            width: '48.8%',
            height: 42,
            marginBottom: 8,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:
              selected.findIndex(i => i === op.id) !== -1
                ? '#0E7182'
                : '#FFFFFF',
            borderWidth: selected.findIndex(i => i === op.id) !== -1 ? 0 : 1,
            borderColor: '#01a7c2',
            borderRadius: 8
          }}
          onPress={() => toggle(op?.id)}
        >
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Mulish-bold',
              fontSize: 16,
              color:
                selected.findIndex(i => i === op.id) !== -1
                  ? '#ffffff'
                  : '#01A7C2'
            }}
          >
            {op.text}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}
