
# react-native-parallax-header
- A react native scroll view component with Parallax header :p
- Inspired by [GitHub - jaysoo/react-native-parallax-scroll-view](https://github.com/jaysoo/react-native-parallax-scroll-view)
- Code is based on [React Native ScrollView animated header – App & Flow – Medium](https://medium.com/appandflow/react-native-scrollview-animated-header-10a18cb9469e) and added little customisation :p

## Installation
```bash
$ npm i react-native-parallax-header --save
```
## Demo
![iPhone 6s (Image)](https://media.giphy.com/media/iMPRpu4Ljxf2/giphy.gif)
![iPhone X (Color)](http://g.recordit.co/oTwlJaCPN0.gif)

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
    <View flex style={styles.container}>
      <ReactNativeParallaxHeader
        headerHeight={170}
        navbarColor={Colors.primary}
        title={'Parallax Header :p'}
        titleStyle={styles.titleStyle}
        backgroundImage={viewImages.background}
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
| `backgroundColor` | `string` | No | This is the color of the parallax background (before scrolling up), **will not be used if `backgroundImage` is specified** | Default color is `#777777` |
| `backgroundImage` | `image source` | No | This renders the background image of the header | Default is `null` |
| `navbarColor` | `string` | No | This is the background color of the navbar (after scroll up) | Default color is `3498db` |
| `title` | `string` | No | This is the title to be display in the header | Default is empty string `‘’` | 
| `titleStyle` | `style` | No | This is the title style to override default font size/color | Default to `color: ‘white’ `text and `fontSize: 16` |
| `headerHeight` | `number` | No | This is the header maximum height | Default to `200` |
| `scrollEventThrottle` | `number` | No | This is the scroll event throttle | Default is `16` |

