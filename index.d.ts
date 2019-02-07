declare module "react-native-parallax-header" {
  import * as React from "react";
  import * as ReactNative from "react-native";

  interface RNParallaxHeaderProps {
    renderNavBar?: () => React.ReactElement<any>;
    renderContent: () => React.ReactElement<any>;
    backgroundColor?: string;
    backgroundImage?: ReactNative.ImageSourcePropType;
    navbarColor?: string;
    title?: string | React.ReactElement<any>;
    titleStyle?: ReactNative.StyleProp<ReactNative.TextStyle>;
    headerMaxHeight?: number;
    headerMinHeight?: number;
    scrollEventThrottle?: number;
    extraScrollHeight?: number;
    backgroundImageScale?: number;
    contentContainerStyle?: ReactNative.StyleProp<ReactNative.ViewStyle>;
    containerStyle?: ReactNative.StyleProp<ReactNative.ViewStyle>;
    alwaysShowTitle?: boolean;
    alwaysShowNavBar?: boolean;
    statusBarColor?: string;
  }
  class ReactNativeParallaxHeader extends React.Component<RNParallaxHeaderProps> {}
  export = ReactNativeParallaxHeader;
}
