
# RNParallax (react-native-parallax-header)
[![GitHub stars](https://img.shields.io/github/stars/kyaroru/RNParallax.svg)](https://github.com/kyaroru/RNParallax/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/kyaroru/RNParallax.svg)](https://github.com/kyaroru/RNParallax/network)
[![GitHub issues](https://img.shields.io/github/issues/kyaroru/RNParallax.svg)](https://github.com/kyaroru/RNParallax/issues)

[![NPM](https://nodei.co/npm/react-native-parallax-header.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-native-parallax-header/)

- A react native scroll view component with Parallax header :p
- Inspired by [GitHub - jaysoo/react-native-parallax-scroll-view](https://github.com/jaysoo/react-native-parallax-scroll-view)
- Code is based on [React Native ScrollView animated header – App & Flow – Medium](https://medium.com/appandflow/react-native-scrollview-animated-header-10a18cb9469e) and added little customisation :p

## Installation
```bash
$ npm i react-native-parallax-header --save
```
## Demo
### iPhone X
![iPhone X (Image)](http://g.recordit.co/o24X5s9rFv.gif)
![iPhone X (Color)](http://g.recordit.co/Owbt2X4ZCo.gif)

### iPhone 8
![iPhone 8 (Image)](http://g.recordit.co/7dbGiEDx7H.gif)
![iPhone 8 (Color)](http://g.recordit.co/YxXtQjTXMU.gif)

## Example
```jsx
import ReactNativeParallaxHeader from 'react-native-parallax-header';

const viewImages = {
  background: require('../../../img/test.jpg'),
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  titleStyle: {
    fontSize: 16,
  },
});

render() {
  return (
    <View style={styles.container}>
      <ReactNativeParallaxHeader
        headerMinHeight={120}
        headerMaxHeight={170}
        extraScrollHeight={20}
        navbarColor={Colors.primary}
        title={'Parallax Header :p'}
        titleStyle={styles.titleStyle}
        backgroundImage={viewImages.background}
        backgroundImageScale={1.2}
        renderNavBar={this.renderNavBar}
        renderContent={this.renderContent}
      />
    </View>
  );
}
```

## API Usage
| Property | Type | Required | Description | Default |
| -------- | ---- | -------- | ----------- | ------- |
| `renderNavBar` | `func` | No | This renders the nav bar component | Empty `<View />` |
| `renderContent` | `func` | **YES** | This renders the scroll view content | - |
| `headerMaxHeight` | `number` | No | This is the header maximum height | Default to `200` |
| `headerMinHeight` | `number` | No | This is the header minimum height | Default to common ios & android navbar height (have support for iPhone X too :p) |
| `backgroundImage` | `image source` | No | This renders the background image of the header (**if specified, background color will not take effect**) | Default is `null` |
| `backgroundImageScale` | `number` | No | This is the image scale - either enlarge or shrink (after scrolling to bottom & exceed the headerMaxHeight) | Default is `1.5` |
| `backgroundColor` | `string` | No | This is the color of the parallax background (before scrolling up), **will not be used if `backgroundImage` is specified** | Default color is `#303F9F` |
| `extraScrollHeight` | `number` | No | This is the extra scroll height (after scrolling to bottom & exceed the headerMaxHeight) | Default is `50` |
| `navbarColor` | `string` | No | This is the background color of the navbar (after scroll up) | Default color is `#3498db` |
| `title` | `string` | No | This is the title to be display in the header | Default is empty string `‘’` | 
| `titleStyle` | `style` | No | This is the title style to override default font size/color | Default to `color: ‘white’ `text and `fontSize: 16` |
| `scrollEventThrottle` | `number` | No | This is the scroll event throttle | Default is `16` |

