import * as mars3d from "mars3d";
import { Cesium } from "mars3d";

import "mars3d/dist/mars3d.css";
import "mars3d-cesium/Build/Cesium/Widgets/widgets.css";

// 定义全局地图变量
export let map: mars3d.Map | null = null;
//必须有这两行css,否则地球出来了&#xff0c;样式还是乱的
export function initMap() {
  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", {
    scene: {
      center: {
        lat: 31.695242,
        lng: 116.950322,
        alt: 1135.4,
        heading: 359.2,
        pitch: -39.5,
      }, // 初始视角中心点和方向
      showSun: true, // 显示太阳
      showMoon: true, // 显示月亮
      showSkyBox: true, // 显示天空盒
      showSkyAtmosphere: false, // 关闭球周边的白色轮廓
      fog: true, // 开启雾效
      fxaa: true, // 开启FXAA抗锯齿
      globe: {
        showGroundAtmosphere: false, // 关闭球表面的大气效果
        depthTestAgainstTerrain: false,
        baseColor: "#546a53", // 球体基础颜色
      },
      cameraController: {
        zoomFactor: 3.0, // 缩放因子
        minimumZoomDistance: 1, // 最小缩放距离
        maximumZoomDistance: 50000000, // 最大缩放距离
        enableRotate: true, // 允许旋转
        enableZoom: true, // 允许缩放
      },
      mapProjection: mars3d.CRS.EPSG3857, // 地图投影方式&#xff0c;这里是墨卡托投影
      mapMode2D: Cesium.MapMode2D.INFINITE_SCROLL, // 2D模式下&#xff0c;地图可以无限滚动
    },
    control: {
      baseLayerPicker: true, // basemaps底图切换按钮
      homeButton: false, // 视角复位按钮
      sceneModePicker: false, // 二三维切换按钮
      navigationHelpButton: false, // 帮助按钮
      fullscreenButton: true, // 全屏按钮
      contextmenu: { hasDefault: false }, // 右键菜单
    },
    terrain: {
      url: "//data.mars3d.cn/terrain", // 地形数据的URL
      show: true, // 显示地形
    },
    basemaps: [
      {
        name: "暗色底图",
        type: "gaode",
        icon: "img/basemaps/blackMarble.png",
        layer: "vec",
        invertColor: true,
        filterColor: "#4e70a6",
        brightness: 0.6,
        contrast: 1.8,
        gamma: 0.3,
        hue: 1,
        saturation: 0,
        show: true,
      },
    ] as any,
  });
  return map;
}
