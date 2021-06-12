import React, { Component } from "react";
import { Dimensions, PanResponder, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

// const getRandomRgb = () => Math.floor(Math.random() * 256);

const getRandomRgba = () => {
  const randomInt0To255 = () => Math.floor(Math.random() * 256);
  return `rgba(${randomInt0To255()},${randomInt0To255()},${randomInt0To255()},${Math.random()})`;
};

class MovableCircle extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      color: "rgba(255,255,255,0.7)",
    };
  }

  _previousLeft = Dimensions.get("window").width / 2 - 40;
  _previousTop = Dimensions.get("window").height / 2 - 40;
  _maxTop = Dimensions.get("window").height - 110;
  _maxLeft = Dimensions.get("window").width - 98;
  _circleStyles: any = {};
  circle: any = null;
  _panResponder: any;

  _updatePosition() {
    this.circle && this.circle.setNativeProps(this._circleStyles);
  }

  _endMove(evt: any, gestureState: any) {
    this._previousLeft += gestureState.dx;
    this._previousTop += gestureState.dy;
    this.setState({
      color: getRandomRgba(),
    });
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.setState({
          color: "white",
        });
      },
      onPanResponderMove: (evt, gestureState) => {
        this._circleStyles.style.left = this._previousLeft + gestureState.dx;
        this._circleStyles.style.top = this._previousTop + gestureState.dy;
        if (this._circleStyles.style.left < 0) {
          this._circleStyles.style.left = 0;
        }
        if (this._circleStyles.style.top < 5) {
          this._circleStyles.style.top = 5;
        }
        if (this._circleStyles.style.left > this._maxLeft) {
          this._circleStyles.style.left = this._maxLeft;
        }
        if (this._circleStyles.style.top > this._maxTop) {
          this._circleStyles.style.top = this._maxTop;
        }
        this._updatePosition();
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) =>
        this._endMove(evt, gestureState),
      onPanResponderTerminate: (evt, gestureState) =>
        this._endMove(evt, gestureState),
    });

    this._circleStyles = {
      style: {
        left: this._previousLeft,
        top: this._previousTop,
      },
    };
  }

  componentDidMount() {
    this._updatePosition();
  }

  render() {
    return (
      <View
        ref={(circle) => {
          this.circle = circle;
        }}
        style={styles.movableCircle}
        {...this._panResponder.panHandlers}
      >
        <Icon
          ref="baseball"
          name="ios-baseball"
          color={this.state.color}
          size={120}
        ></Icon>
      </View>
    );
  }
}

export default MovableCircle;

const styles = StyleSheet.create({
  movableCircle: {
    backgroundColor: "transparent",
    position: "absolute",
    left: 0,
    right: 0,
  },
});
