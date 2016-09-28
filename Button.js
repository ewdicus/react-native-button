'use strict';

var React = require('react-native');
var {
  PropTypes,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} = React;

var coalesceNonElementChildren = require('./coalesceNonElementChildren');

var systemButtonOpacity = 0.2;

var Button = React.createClass({
  propTypes: {
    ...TouchableWithoutFeedback.propTypes,
    containerStyle: View.propTypes.style,
    containerStylePressed: View.propTypes.style,
    containerStyleDisabled: View.propTypes.style,
    disabled: PropTypes.bool,
    style: Text.propTypes.style,
    stylePressed: Text.propTypes.style,
    styleDisabled: Text.propTypes.style,
  },

  getInitialState: function() {
    return {pressed: false};
  },

  render() {
    var touchableProps = {
    };
    if (!this.props.disabled) {
      touchableProps.onPress = this._onPress;
      touchableProps.onPressIn = this._onPressIn;
      touchableProps.onPressOut = this._onPressOut;
      touchableProps.onLongPress = this.props.onLongPress;
    }

    let {disabled} = this.props;
    let style = [
      this.props.containerStyle,
      this.state.pressed ? this.props.containerStylePressed : null,
      disabled ? this.props.containerStyleDisabled : null,
    ];

    return (
      <TouchableWithoutFeedback {...touchableProps} testID={this.props.testID} style={style}>
        {this._renderGroupedChildren()}
      </TouchableWithoutFeedback>
    );
  },

  _renderGroupedChildren() {
    var {disabled} = this.props;
    var style = [
      styles.text,
      disabled ? styles.disabledText : null,
      this.props.style,
      this.state.pressed ? this.props.stylePressed : null,
      disabled ? this.props.styleDisabled : null,
    ];

    var children = coalesceNonElementChildren(this.props.children, (children, index) => {
      return (
        <Text allowFontScaling={this.props.allowFontScaling} key={index} style={style}>
          {children}
        </Text>
      );
    });

    switch (children.length) {
      case 0:
        return null;
      case 1:
        return children[0];
      default:
        return <View style={styles.group}>{children}</View>;
    }
  },

  _onPress(){
    if(this.props.onPress){
      this.props.onPress.bind(this)();
    }
  },

  _onPressIn(){
    this.setState({
      pressed: true
    });
  },

  _onPressOut(){
    this.setState({
      pressed: false
    });
  },
});

var styles = StyleSheet.create({
  text: {
    color: '#007aff',
    fontFamily: '.HelveticaNeueInterface-MediumP4',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  disabledText: {
    color: '#dcdcdc',
  },
  group: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

module.exports = Button;
