# React Native DropDownStep
Get started by 
```bash
npm i react-native-dropdown-step
```
or
```bash
yarn add react-native-dropdown-step
```

### Usage
```javascript
import { DropDownStep } from 'react-native-dropdown-step';

interface item {
    // describe your item component data
    // if not using typescript you can just skip the typescript annotations
}

  <DropDownStep<item>
    data={Items} // Required: Array of data, if the types are given, types must match
    getValue={(item) => item.value} // Required: retrieve value from single item
    label={(item) => item.name} // Required: retrieve label from single item
    title="Select Items" // Label above the dropdown or pass nothing to don't show
    onChange={(item) => {
        // when new item is selected
    }}
    renderItem={({onPress, label, selected}) => { // There is a default type
        return <RenderItemThisWay onPress={onPress} label={label} selected={selected} />
    }}
    style={styles.dropdownstep} // style of the container of dropdown modal
    status={CurrentStatusOfData} // four available status: loading, loaded, initial, error 
    defaultValue={SomeDefaultValue} 
  />
```

### Example Screenshots
![Initial Status](https://github.com/krishnapaul242/react-native-drop-down-modal/blob/main/screenshots/image1.png?raw=true)
![When DropDown is Selected](https://github.com/krishnapaul242/react-native-drop-down-modal/blob/main/screenshots/image2.png?raw=true)
![After Selection](https://github.com/krishnapaul242/react-native-drop-down-modal/blob/main/screenshots/image3.png?raw=true)