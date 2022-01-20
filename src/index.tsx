import * as React from 'react'
import { ActivityIndicator, Image, Button, FlatList, ListRenderItemInfo, StyleSheet, Text, TouchableOpacity, View, ViewStyle, Platform, Dimensions } from 'react-native'
import Modal from 'react-native-modal'

const { width, height } = Dimensions.get('window');

export type StatusTypes = 'loading' | 'loaded' | 'initial' | 'error';

export interface DropDownItemProps<T> extends ListRenderItemInfo<T> {
  onPress: (item: T) => void
  label: string
  selected: boolean
}

export function DropDownRadioItem<T>(props: DropDownItemProps<T>) {
  return (
    <TouchableOpacity
      onPress={(e) => {
        props.onPress(props.item)
      }}
      style={styles.dropDownItem}
    >
      {props.selected === false ? (
        <Image
          style={{ marginLeft: 20, marginRight: 10 }}
          source={require('./assets/radio-button-off.png')}
          width={20}
          height={20}
        />
      ) : (
        <Image
          style={{ marginLeft: 20, marginRight: 10 }}
          source={require('./assets/radio-button-on.png')}
          width={20}
          height={20}
        />
      )}
      <Text style={{}}>{props.label}</Text>
    </TouchableOpacity>
  )
}

export function DropDownItem<T>(props: DropDownItemProps<T>) {
  return (
    <TouchableOpacity
      onPress={(e) => {
        props.onPress(props.item)
      }}
      style={[
        styles.button,
        props.selected ? styles.activeButton : styles.inactiveButton,
      ]}
    >
      <Text
        style={{
          color: props.selected ? color.background : '#777',
        }}
      >
        {props.label}
      </Text>
    </TouchableOpacity>
  )
}

export interface DropDownStepProps<T extends {} = {}> {
  data: T[]
  onChange?: (value: T) => void
  getValue: (value: T) => string
  label: (value: T) => string
  title?: string
  defaultValue?: T
  renderItem?: (item: DropDownItemProps<T>) => React.ReactElement
  style?: ViewStyle
  status?: StatusTypes
  multi?: boolean
}

export function DropDownStep<T extends {} = {}>(props: DropDownStepProps<T>) {
  const [SelectedValue, setSelectedValue] = React.useState<T | undefined>(
    props.defaultValue
  )
  const [isModalVisible, setModalVisible] = React.useState(false)
  const Label: string = SelectedValue
    ? props.label(SelectedValue)
    : props.title ?? 'Select'
  const RenderItem = props.renderItem || DropDownRadioItem
  React.useEffect(() => {
    if (props.onChange && SelectedValue) {
      props.onChange(SelectedValue)
    }
  }, [SelectedValue])
  React.useEffect(() => {
    setSelectedValue(undefined)
  }, [props.data])
  return (
    <>
      <View style={{ ...styles.inputContainer, ...props.style }}>
        {props.title ? (
          <Text style={styles.inputTitle}>{props.title}</Text>
        ) : null}

        <TouchableOpacity
          style={styles.input}
          onPress={() => {
            if (!props.status || props.status !== 'loading') {
              setModalVisible(true)
            }
          }}
        >
          <Text
            style={{
              ...styles.inputValueText,
              color: SelectedValue ? color.title_color : '#ccc',
            }}
          >
            {Label}
          </Text>
          {!props.status || props.status !== 'loading' ? (
            <Image
              source={require('./assets/arrow-drop-down.png')}
              width={30}
              style={styles.inputRightCaretDown}
            />
          ) : (
            <ActivityIndicator
              color={color.txt}
              style={styles.inputRightCaretDown}
            />
          )}
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.2}
        style={{
          margin: 0,
          padding: 0,
          ...ElevationGenrator(8),
        }}
      >
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingLeft: 10,
              marginRight: 20,
              paddingTop: 20,
              paddingBottom: 10,
              borderBottomColor: color.border_light,
              borderBottomWidth: 1,
            }}
          >
            <Text style={styles.title}>
              {props.title ? props.title : 'Select'}
            </Text>
            {/* <FA
              name="times"
              size={20}
              color="#999"
              style={{padding: 10}}
              onPress={() => setModalVisible(false)}
            /> */}
          </View>
          {/* {SelectedValue ? (
            <View
              style={[
                styles.button,
                styles.activeButton,
                {borderRadius: 0, flexDirection: 'row'},
              ]}>
              <Text
                style={{
                  color: color.background,
                  fontWeight: 'bold',
                  paddingRight: 20,
                }}>
                Selected:
              </Text>
              <Text
                style={{
                  color: color.background,
                }}>
                {props.label(SelectedValue)}
              </Text>
            </View>
          ) : null} */}
          <FlatList<T>
            data={props.data}
            renderItem={(p) => {
              return (
                <RenderItem<T>
                  {...p}
                  onPress={(item) => {
                    setSelectedValue(item)
                  }}
                  selected={
                    SelectedValue
                      ? props.getValue(SelectedValue) === props.getValue(p.item)
                      : false
                  }
                  label={props.label(p.item)}
                />
              )
            }}
            keyExtractor={(item) => props.getValue(item)}
            style={styles.flatlist}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingLeft: 10,
              marginRight: 20,
              paddingTop: 20,
              paddingBottom: 10,
              borderTopColor: color.border_light,
              borderTopWidth: 1,
            }}
          >
            <Button
              onPress={() => {
                setModalVisible(false)
              }}
              title={'Done'}
            ></Button>
          </View>
        </View>
      </Modal>
    </>
  )
}

const ElevationGenrator = (
  elevation: number,
  color: string = '#000'
) => {
  if (Platform.OS === 'android') {
    return {
      elevation: elevation,
    }
  } else {
    return {
      shadowColor: color,
      shadowOffset: {
        width: 0,
        height: elevation === 1 ? 1 : Math.floor(elevation / 2),
      },
      shadowOpacity: elevation < 49 ? 0.18 + elevation * 0.017 : 1,
      shadowRadius: elevation > 1 ? elevation * 0.65 : 1,
    }
  }
}

const color = {
  title_color: '#293033',
  background: '#F7F7F7',
  navbar: '#FFFFFF',
  border: '#DDDDDD',
  border_light: '#EEEEEE',
  main_green: '#4CB050',
  txt: '#63666B',
  transparent: 'transparent',
}

const styles = StyleSheet.create({
  container: {
    height: height - 250,
    width: width - 40,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  inputContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlist: {
    padding: 10,
  },
  title: {
    fontSize: 17,
    color: color.title_color,
    padding: 10,
  },
  button: {
    width: '90%',
    borderWidth: 1.7,
    borderColor: color.border,
    borderRadius: 50,
    paddingLeft: 17,
    marginBottom: 20,
    backgroundColor: color.navbar,
    height: 50,
    justifyContent: 'center',
  },
  dropDownItem: {
    flexDirection: 'row',
    minHeight: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '80%',
  },
  inactiveButton: {
    backgroundColor: color.background,
    color: color.main_green,
  },
  activeButton: {
    backgroundColor: color.main_green,
    color: color.background,
  },
  inputTitle: {
    fontSize: 17,
    color: '#42494b',
    textAlign: 'left',
    width: '100%',
    marginLeft: '17%',
    marginBottom: 7,
  },
  input: {
    width: '90%',
    borderWidth: 1.7,
    borderRadius: 50,
    paddingLeft: 17,
    marginBottom: 20,
    backgroundColor: color.navbar,
    height: 50,
    borderColor: '#E0E5E8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputRightCaretDown: {
    marginRight: 5,
  },
  inputValueText: {
    fontSize: 17,
    maxWidth: '90%',
    overflow: 'hidden',
  },
})