import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Platform,
  ScrollView,
  Animated,
  Text,
  View,
} from 'react-native';

const SCROLL_EVENT_THROTTLE = 16;
const DEFAULT_HEADER_MAX_HEIGHT = 200;
const DEFAULT_HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 65 : 45;
const DEFAULT_HEADER_SCROLL_DISTANCE = DEFAULT_HEADER_MAX_HEIGHT - DEFAULT_HEADER_MIN_HEIGHT;
const DEFAULT_NAVBAR_COLOR = '#3498db';
const DEFAULT_BACKGROUND_COLOR = '#777777';
const DEFAULT_TITLE_COLOR = 'white';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: DEFAULT_NAVBAR_COLOR,
    overflow: 'hidden',
  },
  scrollViewContent: {
    marginTop: DEFAULT_HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: DEFAULT_HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  bar: {
    backgroundColor: 'transparent',
    height: DEFAULT_HEADER_MIN_HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  headerTitle: {
    backgroundColor: 'transparent',
    height: DEFAULT_HEADER_MIN_HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: DEFAULT_TITLE_COLOR,
    textAlign: 'center',
    fontSize: 16,
  },
});

class RNParallax extends Component {
  constructor() {
    super();
    this.state = {
      scrollY: new Animated.Value(0),
    };
  }

  getHeaderScrollDistance() {
    const { headerHeight } = this.props;
    return headerHeight - DEFAULT_HEADER_MIN_HEIGHT;
  }

  getHeaderHeight() {
    const { headerHeight } = this.props;
    return this.state.scrollY.interpolate({
      inputRange: [0, this.getHeaderScrollDistance()],
      outputRange: [headerHeight, DEFAULT_HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });
  }

  getImageOpacity() {
    return this.state.scrollY.interpolate({
      inputRange: [0, this.getHeaderScrollDistance() / 2, this.getHeaderScrollDistance()],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
  }

  getImageTranslate() {
    return this.state.scrollY.interpolate({
      inputRange: [0, this.getHeaderScrollDistance()],
      outputRange: [0, -50],
      extrapolate: 'clamp',
    });
  }

  getTitleTranslate() {
    return this.state.scrollY.interpolate({
      inputRange: [0, this.getHeaderScrollDistance() / 2, this.getHeaderScrollDistance()],
      outputRange: [0, 0, Platform.OS === 'ios' ? -3 : 0],
      extrapolate: 'clamp',
    });
  }

  renderHeaderTitle() {
    const { title, titleStyle } = this.props;
    const headerHeight = this.getHeaderHeight();
    const titleTranslate = this.getTitleTranslate();

    return (
      <Animated.View
        style={[
          styles.headerTitle,
          {
            transform: [
              { translateY: titleTranslate },
            ],
            height: headerHeight,
          },
        ]}
      >
        <Text medium style={[styles.headerText, titleStyle]}>
          {title}
        </Text>
      </Animated.View>
    );
  }

  renderHeaderForeground() {
    const { renderNavBar } = this.props;
    return (
      <Animated.View style={styles.bar}>
        {renderNavBar()}
      </Animated.View>
    );
  }

  renderBackgroundImage() {
    const { headerHeight, backgroundImage } = this.props;
    const imageOpacity = this.getImageOpacity();
    const imageTranslate = this.getImageTranslate();

    return (
      <Animated.Image
        style={[
          styles.backgroundImage,
          {
            opacity: imageOpacity,
            transform: [{ translateY: imageTranslate }],
            height: headerHeight,
          },
        ]}
        source={backgroundImage}
      />
    );
  }

  renderPlainBackground() {
    const { headerHeight, backgroundColor } = this.props;
    const imageOpacity = this.getImageOpacity();
    const imageTranslate = this.getImageTranslate();

    return (
      <Animated.View
        style={{
          height: headerHeight,
          backgroundColor,
          opacity: imageOpacity,
          transform: [{ translateY: imageTranslate }],
        }}
      />
    );
  }

  renderHeaderBackground() {
    const { backgroundImage, navbarColor } = this.props;
    const headerHeight = this.getHeaderHeight();

    return (
      <Animated.View
        style={[
          styles.header,
          {
            height: headerHeight,
            backgroundColor: navbarColor,
          },
        ]}
      >
        {backgroundImage && this.renderBackgroundImage()}
        {!backgroundImage && this.renderPlainBackground()}
      </Animated.View>
    );
  }

  render() {
    const { renderContent, headerHeight, scrollEventThrottle } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          scrollEventThrottle={scrollEventThrottle}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
          )}
        >
          <View style={[styles.scrollViewContent, { marginTop: headerHeight }]}>
            {renderContent()}
          </View>
        </ScrollView>
        {this.renderHeaderBackground()}
        {this.renderHeaderTitle()}        
        {this.renderHeaderForeground()}
      </View>
    );
  }
}

RNParallax.propTypes = {
  renderNavBar: PropTypes.func,
  renderContent: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string,
  backgroundImage: PropTypes.number,
  navbarColor: PropTypes.string,
  title: PropTypes.string,
  titleStyle: PropTypes.number,
  headerHeight: PropTypes.number,
  scrollEventThrottle: PropTypes.number,
};

RNParallax.defaultProps = {
  renderNavBar: () => <View />,
  navbarColor: DEFAULT_NAVBAR_COLOR,
  backgroundColor: DEFAULT_BACKGROUND_COLOR,
  backgroundImage: null,
  title: '',
  titleStyle: styles.headerText,
  headerHeight: DEFAULT_HEADER_MAX_HEIGHT,
  scrollEventThrottle: SCROLL_EVENT_THROTTLE,
};

export default RNParallax;
