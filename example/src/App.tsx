import React, { useEffect } from 'react'
import { Alert, View } from 'react-native'
import { DropDownStep } from 'react-native-dropdown-step'
import { Item, Items } from './MOCK_DATA'

const App = () => {
  

  return <View style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  }}><DropDownStep<Item> data={Items} getValue={i => String(i.id)} label={i => i.first_name + " " + i.last_name} title="Select Name" onChange={i => {
    Alert.alert(i.first_name + " " + i.last_name, i.email)
  }} /></View>
}

export default App
