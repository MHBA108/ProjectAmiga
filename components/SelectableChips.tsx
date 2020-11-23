/**
 * @author Alexis Valenciano <gabr.933@gmail.com>
 */
import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Chips from "./chips";

class SelectableChips extends React.Component<
  {
    initialChips: string[];
    initialSelectedChips?: string[];
    onChangeChips: any;
    chipStyle: EStyleSheet.AnyObject;
    valueStyle: EStyleSheet.AnyObject;
    valueStyleSelected: EStyleSheet.AnyObject;
    chipStyleSelected: EStyleSheet.AnyObject;
  },
  {
    selectedChips: string[];
    isFocused: boolean;
    chips: string[];
  }
> {
  constructor(props: {
    initialChips: string[];
    initialSelectedChips: string[];
    onChangeChips: any;
    chipStyle: EStyleSheet.AnyObject;
    valueStyle: EStyleSheet.AnyObject;
    valueStyleSelected: EStyleSheet.AnyObject;
    chipStyleSelected: EStyleSheet.AnyObject;
  }) {
    super(props);
    this.state = {
      selectedChips: this.props.initialSelectedChips || [],
      isFocused: false,
      chips: props.initialChips ? props.initialChips : [],
    };
  }

  componentWillReceiveProps(nextProps: { initialChips: any }) {
    this.setState({
      chips: nextProps.initialChips ? nextProps.initialChips : [],
    });
  }
  selectChip = (value: any) => {
    if (this.isSelected(value)) {
      let array = [...this.state.selectedChips];
      let result = array.filter((text) => {
        return text != value;
      });
      this.setState(
        {
          selectedChips: result,
        },
        () =>
          this.props.onChangeChips &&
          this.props.onChangeChips(this.state.selectedChips)
      );
    } else {
      let array = [...this.state.selectedChips];
      array.unshift(value);
      this.setState(
        {
          selectedChips: array,
        },
        () =>
          this.props.onChangeChips &&
          this.props.onChangeChips(this.state.selectedChips)
      );
    }
  };
  isSelected = (value: any) => {
    let array = [...this.state.selectedChips];
    return array.includes(value);
  };
  render() {
    const {
      chipStyle,
      valueStyle,
      valueStyleSelected,
      chipStyleSelected,
    } = this.props;

    const chips = this.state.chips.map(
      (item: any, index: string | number | null | undefined) => (
        <Chips
          key={index}
          value={item}
          chipStyle={chipStyle}
          valueStyle={valueStyle}
          valueStyleSelected={valueStyleSelected}
          chipStyleSelected={chipStyleSelected}
          onPress={() => this.selectChip(item)}
          // type="selectable"
          selected={this.isSelected(item)}

          //         key: string;
          // value: any;
          // value: any;
          // onPress: any;
          // chipStyle: any;
          // type: any;
          // selected: any;
          // chipCloseStyle: any;
          // valueStyleSelected: any;
          // chipStyleSelected: any;
          // valueStyle: any;
        />
      )
    );
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {chips}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({});

export default SelectableChips;
