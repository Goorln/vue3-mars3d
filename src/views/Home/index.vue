<template>
  <config-provider :locale="locale">
    <MarsMap :url="configUrl" map-key="test" @onload="marsOnload" />
    <template v-if="mapLoaded">
      <ViewModal />
    </template>
  </config-provider>
</template>

<script lang="ts" setup>
import { onMounted, provide, ref } from "vue";
import * as mars3d from "mars3d";
import { initMap, map } from "./map";
import { ConfigProvider } from "ant-design-vue";
import locale from "ant-design-vue/es/locale/zh_CN";
import MarsMap from "@/components/mars-work/mars-map.vue";
import ViewModal from "./view.vue";
const configUrl = "config/config.json";
const mapLoaded = ref(false); // map加载完成
const Cesium = mars3d.Cesium;

const marsOnload = (map: any) => {
  mapLoaded.value = true;

  const graphicLayer = new mars3d.layer.GraphicLayer();
  map.addLayer(graphicLayer);

  // 2.在layer上绑定监听事件
  graphicLayer.on(mars3d.EventType.click, function (event: any) {
    console.log("监听layer，单击了矢量对象", event);
  });
  graphicLayer.on(mars3d.EventType.mouseOver, function (event: any) {
    console.log("监听layer，鼠标移入了矢量对象", event);
  });
  graphicLayer.on(mars3d.EventType.mouseOut, function (event: any) {
    console.log("监听layer，鼠标移出了矢量对象", event);
  });

  // 可在图层绑定右键菜单,对所有加到这个图层的矢量数据都生效
  graphicLayer.bindContextMenu([
    {
      text: "删除对象",
      iconCls: "fa fa-trash-o",
      callback: function (e: any) {
        const graphic = e.graphic;
        if (graphic) {
          graphicLayer.removeGraphic(graphic);
        }
      },
    },
  ]);

  // 加一些演示数据，来源 http://mars3d.cn/editor-vue.html?id=layer-graphic/basis/entity
  demoData.addDemoGraphic3(graphicLayer);
};
console.log(mapLoaded.value, "ppp");
const demoData = {
  addDemoGraphic3: (graphicLayer: mars3d.layer.GraphicLayer) => {
    const graphic = new mars3d.graphic.BillboardEntity({
      name: "贴地图标",
      position: [116.3, 31.0, 1000],
      style: {
        image: "img/marker/mark-blue.png",
        scale: 1,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        clampToGround: true,
      },
      attr: { remark: "示例3" },
    });
    graphicLayer.addGraphic(graphic);
  },
};
</script>

<style lang="less" scoped></style>
