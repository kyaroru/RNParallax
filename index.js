import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Platform,
  Animated,
  Text,
  View,
  Dimensions,
  StatusBar,
} from 'react-native';

const {
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const NAV_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;

const SCROLL_EVENT_THROTTLE = 16;
const DEFAULT_HEADER_MAX_HEIGHT = 170;
const DEFAULT_HEADER_MIN_HEIGHT = NAV_BAR_HEIGHT;
const DEFAULT_EXTRA_SCROLL_HEIGHT = 30;
const DEFAULT_BACKGROUND_IMAGE_SCALE = 1.5;

const DEFAULT_NAVBAR_COLOR = '#3498db';
const DEFAULT_BACKGROUND_COLOR = '#303F9F';
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: STATUS_BAR_HEIGHT,
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

  getHeaderMaxHeight() {
    const { headerMaxHeight } = this.props;
    return headerMaxHeight;
  }

  getHeaderMinHeight() {
    const { headerMinHeight } = this.props;
    return headerMinHeight;
  }

  getHeaderScrollDistance() {
    return this.getHeaderMaxHeight() - this.getHeaderMinHeight();
  }

  getExtraScrollHeight() {
    const { extraScrollHeight } = this.props;
    return extraScrollHeight;
  }

  getBackgroundImageScale() {
    const { backgroundImageScale } = this.props;
    return backgroundImageScale;
  }

  getInputRange() {
    return [-this.getExtraScrollHeight(), 0, this.getHeaderScrollDistance()];
  }

  getHeaderHeight() {
    const { scrollY } = this.state;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [this.getHeaderMaxHeight() + this.getExtraScrollHeight(), this.getHeaderMaxHeight(), this.getHeaderMinHeight()],
      extrapolate: 'clamp',
    });
  }

  getNavBarOpacity() {
    const { scrollY } = this.state;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [0, 1, 1],
      extrapolate: 'clamp',
    });
  }

  getNavBarForegroundOpacity() {
    const { scrollY } = this.state;
    const { alwaysShowNavBar } = this.props;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [alwaysShowNavBar ? 1 : 0, alwaysShowNavBar ? 1 : 0, 1],
      extrapolate: 'clamp',
    });
  }

  getImageOpacity() {
    const { scrollY } = this.state;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
  }

  getImageTranslate() {
    const { scrollY } = this.state;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [0, 0, -50],
      extrapolate: 'clamp',
    });
  }

  getImageScale() {
    const { scrollY } = this.state;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [this.getBackgroundImageScale(), 1, 1],
      extrapolate: 'clamp',
    });
  }

  getTitleTranslateY() {
    const { scrollY } = this.state;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [5, 0, 0],
      extrapolate: 'clamp',
    });
  }

  getTitleOpacity() {
    const { scrollY } = this.state;
    const { alwaysShowTitle } = this.props;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [1, 1, alwaysShowTitle ? 1 : 0],
      extrapolate: 'clamp',
    });
  }

  renderBackgroundImage() {
    const { backgroundImage } = this.props;
    const imageOpacity = this.getImageOpacity();
    const imageTranslate = this.getImageTranslate();
    const imageScale = this.getImageScale();

    return (
      <Animated.Image
        style={[
          styles.backgroundImage,
          {
            height: this.getHeaderMaxHeight(),
            opacity: imageOpacity,
            transform: [{ translateY: imageTranslate }, { scale: imageScale }],
          },
        ]}
        source={backgroundImage}
      />
    );
  }

  renderPlainBackground() {
    const { backgroundColor } = this.props;

    const imageOpacity = this.getImageOpacity();
    const imageTranslate = this.getImageTranslate();
    const imageScale = this.getImageScale();

    return (
      <Animated.View
        style={{
          height: this.getHeaderMaxHeight(),
          backgroundColor,
          opacity: imageOpacity,
          transform: [{ translateY: imageTranslate }, { scale: imageScale }],
        }}
      />
    );
  }

  renderNavbarBackground() {
    const { navbarColor } = this.props;
    const navBarOpacity = this.getNavBarOpacity();

    return (
      <Animated.View
        style={[
          styles.header,
          {
            height: this.getHeaderHeight(),
            backgroundColor: navbarColor,
            opacity: navBarOpacity,
          },
        ]}
      />
    );
  }

  renderHeaderBackground() {
    const { backgroundImage, backgroundColor } = this.props;
    const imageOpacity = this.getImageOpacity();

    return (
      <Animated.View
        style={[
          styles.header,
          {
            height: this.getHeaderHeight(),
            opacity: imageOpacity,
            backgroundColor: backgroundImage ? 'transparent' : backgroundColor,
          },
        ]}
      >
        {backgroundImage && this.renderBackgroundImage()}
        {!backgroundImage && this.renderPlainBackground()}
      </Animated.View>
    );
  }

  renderHeaderTitle() {
    const { title, titleStyle, headerTitleStyle } = this.props;
    const titleTranslateY = this.getTitleTranslateY();
    const titleOpacity = this.getTitleOpacity();

    return (
      <Animated.View
        style={[
          styles.headerTitle,
          {
            transform: [
              { translateY: titleTranslateY },
            ],
            height: this.getHeaderHeight(),
            opacity: titleOpacity,
          },
          headerTitleStyle
        ]}
      >
        {typeof title === 'string'
          && (
            <Text style={[styles.headerText, titleStyle]}>
              {title}
            </Text>
          )
        }
        {typeof title !== 'string' && title}
      </Animated.View>
    );
  }

  renderHeaderForeground() {
    const { renderNavBar } = this.props;
    const navBarOpacity = this.getNavBarForegroundOpacity();

    return (
      <Animated.View
        style={[
          styles.bar,
          {
            height: this.getHeaderMinHeight(),
            opacity: navBarOpacity,
          },
        ]}
      >
        {renderNavBar()}
      </Animated.View>
    );
  }

  renderScrollView() {
    const {
      renderContent, scrollEventThrottle, scrollViewStyle, contentContainerStyle, innerContainerStyle, scrollViewProps,
    } = this.props;
    const { scrollY } = this.state;
    return (
      <Animated.ScrollView
        style={[styles.scrollView, scrollViewStyle]}
        contentContainerStyle={contentContainerStyle}
        scrollEventThrottle={scrollEventThrottle}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        )}
        {...scrollViewProps}
      >
        <View style={[{ marginTop: this.getHeaderMaxHeight() }, innerContainerStyle]}>
          {renderContent()}
        </View>
      </Animated.ScrollView>
    );
  }

  render() {
    const { navbarColor, statusBarColor, containerStyle } = this.props;
    return (
      <View style={[styles.container, containerStyle]}>
        <StatusBar
          backgroundColor={statusBarColor || navbarColor}
        />
        {this.renderScrollView()}
        {this.renderNavbarBackground()}
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
  backgroundImage: PropTypes.any,
  navbarColor: PropTypes.string,
  title: PropTypes.any,
  titleStyle: PropTypes.any,
  headerTitleStyle: PropTypes.any,
  headerMaxHeight: PropTypes.number,
  headerMinHeight: PropTypes.number,
  scrollEventThrottle: PropTypes.number,
  extraScrollHeight: PropTypes.number,
  backgroundImageScale: PropTypes.number,
  contentContainerStyle: PropTypes.any,
  innerContainerStyle: PropTypes.any,
  scrollViewStyle: PropTypes.any,
  containerStyle: PropTypes.any,
  alwaysShowTitle: PropTypes.bool,
  alwaysShowNavBar: PropTypes.bool,
  statusBarColor: PropTypes.string,
  scrollViewProps: PropTypes.object,
};

RNParallax.defaultProps = {
  renderNavBar: () => <View />,
  navbarColor: DEFAULT_NAVBAR_COLOR,
  backgroundColor: DEFAULT_BACKGROUND_COLOR,
  backgroundImage: null,
  title: null,
  titleStyle: styles.headerText,
  headerTitleStyle: null,
  headerMaxHeight: DEFAULT_HEADER_MAX_HEIGHT,
  headerMinHeight: DEFAULT_HEADER_MIN_HEIGHT,
  scrollEventThrottle: SCROLL_EVENT_THROTTLE,
  extraScrollHeight: DEFAULT_EXTRA_SCROLL_HEIGHT,
  backgroundImageScale: DEFAULT_BACKGROUND_IMAGE_SCALE,
  contentContainerStyle: null,
  innerContainerStyle: null,
  scrollViewStyle: null,
  containerStyle: null,
  alwaysShowTitle: true,
  alwaysShowNavBar: true,
  statusBarColor: null,
  scrollViewProps: {},
};

export default RNParallax;
