import { Dimensions, PixelRatio } from "react-native";

class Responsive {
  constructor() {
    this.resetDimensions();
  }

  resetDimensions = () => {
    this.WIDTH = 414; //iPhone 11 Pro Max.
    this.HEIGHT = 896; //iPhone 11 Pro Max.
  };

  calcHeight = size => {
    var { height, width } = Dimensions.get("window");
    if (height < width) {
      this.WIDTH = 896;
      this.HEIGHT = 414;
    } else {
      this.resetDimensions();
    }

    var percentage = (size / this.HEIGHT) * 100;
    var calculations = (percentage * height) / 100;
    return PixelRatio.roundToNearestPixel(calculations);
  };

  calcWidth = size => {
    var { width, height } = Dimensions.get("window");
    if (height < width) {
      this.WIDTH = 896;
      this.HEIGHT = 414;
    } else {
      this.resetDimensions();
    }

    var percentage = (size / this.WIDTH) * 100;
    var calculations = (percentage * width) / 100;
    return PixelRatio.roundToNearestPixel(calculations);
  };

  calcFont = size => {
    return this.calcWidth(size);
  };
}

export default new Responsive();
