/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  background-color: #f2f6ff;
`

export const ContainerMain = styled.View`
  display: flex;
  background-color: #ffffff;
  width: 85%;
  padding: 16px;
  border-radius: 24px;
  margin-top: 32px;
`

export const ContainerResultados = styled.View`
  display: flex;
  width: 85%;
`

export const Title = styled.Text`
  font-weight: 700;
  font-size: 24px;
  font-family: 'Mulish-bold';
`

export const Label = styled.Text`
  font-weight: 400;
  color: ${(props: { color: string }) => props.color || '#000'};
  text-align: ${(props: { textAlign: string }) => props.textAlign || 'left'};
  font-size: ${(props: { fontSize: number }) => props.fontSize || 14};
  font-family: ${(props: { fontFamily: string }) =>
    props.fontFamily || 'Mulish'};
  margin-top: ${(props: { marginTop: number }) => props.marginTop || 0};
  margin-bottom: ${(props: { marginBottom: number }) =>
    props.marginBottom || 0};
`

export const InputRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: ${(props: { bgColor: string }) =>
    props.bgColor || '#F2F6FF'};
  border-radius: 8px;
`

export const CheckBoxButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48.8%;
  height: 42px;
  margin-bottom: 8px;
  background-color: #fafafa;
  border-radius: 8px;
  border: 1px solid #01a7c2;
`

export const CheckBoxContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`

export const ContainerFinish = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 37px;
  margin-bottom: 16px;
`

export const FinishButton = styled.TouchableHighlight`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48.8%;
  height: 42px;
  background-color: #01a7c2;
  border-radius: 8px;
`
