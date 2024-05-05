<template>
  <div class="container">
    <div class="header">
      <div class="time">2024/04/22 10:26:58</div>
      <div class="title">可视化大屏</div>
      <div class="weather">
        <div>
          <span>合肥市</span>
          <span>21℃</span>
          <span>晴</span>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="panel leftPanel">
        <div class="panel-item" style="height: 33.3%">
          <div class="title">今日态势统计</div>
          <div class="panel-content">
            <div class="inner">
              <div class="chartbox">
                <div class="chart">
                  <div class="circle">5</div>
                  <div class="text">异常事件</div>
                </div>
                <div class="chart">
                  <div class="circle">5</div>
                  <div class="text">设备报警</div>
                </div>
                <div class="chart">
                  <div class="circle">5</div>
                  <div class="text">应急预案</div>
                </div>
                <div class="chart">
                  <div class="circle">5</div>
                  <div class="text">设备故障</div>
                </div>
              </div>
            </div>
          </div>
          <div class="panel-header-icon"></div>
        </div>
        <div class="panel-item" style="height: 33.3%">
          <div class="title">重要点位设备覆盖率</div>
          <div class="panel-content">
            <div class="inner">
              <div class="chart">
                <div ref="importPointRef" id="importPoint"></div>
              </div>
            </div>
          </div>
          <div class="panel-header-icon"></div>
        </div>
        <div class="panel-item" style="height: 33.3%">
          <div class="title">设备信息</div>
          <div class="panel-content">
            <div class="inner"></div>
          </div>
        </div>
      </div>
      <div class="panel rightPanel">
        <div class="panel-item" style="height: 33.3%">
          <div class="title">人员实时监测</div>
          <div class="panel-content">
            <div class="inner">
              <div class="chart">
                <div ref="personelRef" id="personel"></div>
                <div class="charts_img"></div>
              </div>
            </div>
          </div>
          <div class="panel-header-icon"></div>
        </div>
        <div class="panel-item" style="height: 33.3%">
          <div class="title">车辆实时监测</div>
          <div class="panel-content">
            <div class="inner">
              <div class="chart">
                <div ref="carRef" id="car"></div>
                <div class="charts_img"></div>
              </div>
            </div>
          </div>
          <div class="panel-header-icon"></div>
        </div>
        <div class="panel-item" style="height: 33.3%">
          <div class="title">运营安防分析</div>
          <div class="panel-content">
            <div class="inner">
              <div class="chart">
                <div ref="securityRef" id="security"></div>
              </div>
            </div>
          </div>
          <div class="panel-header-icon"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, markRaw } from "vue";
import type { UnwrapRef } from "vue";
import * as mapWork from "./map";

console.log(mapWork, "mapWork");
</script>

<style lang="less" scoped>
.container {
  width: 100%;
}
.header {
  width: 100%;
  height: 95px;
  top: -2px;
  position: absolute;
  display: flex;
  background-image: url(/img/home/header.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  justify-content: space-between;
  .time {
    font-family: Alibaba PuHuiTi;
    color: #d9e3e7;
    font-size: 16px;
    font-weight: 500;
    padding: 10px 0 0 20px;
  }
  .title {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    margin: 10px 0 0;
    font-family: YouShe;
    font-weight: 400;
    font-size: 38px;
    letter-spacing: 0.1rem;
    color: #eff6ff;
    background: linear-gradient(1deg, #d4e7ef 0%, #f9feff 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .weather {
    font-family: Alibaba PuHuiTi;
    color: #d9e3e7;
    font-size: 16px;
    font-weight: 500;
    padding: 10px 20px 0 0;
    span {
      margin: 0 3px;
    }
  }
}

.main {
  .panel {
    position: fixed;
    top: 96px;
    height: calc(100vh - 120px);
    width: 350px;
    z-index: 1;
    display: flex;
    flex-direction: column;
    .panel-item {
      width: 100%;
      position: relative;
      .title {
        height: 34px;
        width: 100%;
        box-sizing: border-box;
        border: 1px solid;
        border-image: url(/img/home/panel-title-bg.svg) 15 15 20 20;
        border-width: 15px 15px 20px 20px;
        display: inline-block;
        font-family: sc;
        font-style: normal;
        font-weight: bolder;
        font-size: 14px;
        color: #fff;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
      .title::before {
        content: "";
        background-image: url(/img/home/panel-title-bg.svg);
        background-size: cover;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
      }
      .panel-content {
        width: 100%;
        height: calc(100% - 40px);
        color: #fff;
        box-sizing: border-box;
        border: 1px solid;
        border-image: url(/img/home/panel-bg.svg) 20 20 20 20;
        // border-width: 20px 20px 20px 20px;
        display: inline-block;
        .inner {
          background-color: #111f4380;
          width: 100%;
          height: 100%;
          .chartbox {
            width: 100%;
            height: 100%;
            display: flex;
            justify-items: center;
            align-items: center;
            .chart {
              position: relative;
              width: 77px;
              height: 100px;
              padding: 0px;
              margin: 0px auto;
              border-width: 0px;
              cursor: default;
              .circle {
                width: 60px;
                height: 60px;
                line-height: 60px;
                text-align: center;
                background-color: red;
                border-radius: 100px;
              }
              .text {
                margin-top: 10px;
              }
            }
          }
          .peo {
            width: 100%;
            height: 270px;
            cursor: pointer;
            .peo-item {
              width: 100%;
              height: 32px;
              display: flex;
              justify-content: space-around;
              align-items: center;
              font-size: 14px;
              font-family: Source Han Sans CN;
              font-weight: bolder;
              color: #fff;
              background: rgba(102, 146, 255, 0.5);
            }
            .peo {
              width: 100%;
              height: 32px;
              display: flex;
              margin-bottom: 2px;
              justify-content: space-around;
              border-radius: 2px;
              align-items: center;
              font-size: 10px;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: #fff;
            }
            .item {
              background: rgba(102, 146, 255, 0.2);
            }
          }
          .chart {
            width: 100%;
            height: 100%;
            #importPoint {
              width: 100%;
              height: 100%;
            }
            #personel {
              width: 100%;
              height: 100%;
            }
            #car {
              width: 100%;
              height: 100%;
            }
            #security {
              width: 100%;
              height: 100%;
            }
            .charts_img {
              width: 80px;
              height: 80px;
              border-radius: 50%;
              background: url(data:image/png;base64,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)
                no-repeat;
              background-position: center center;
              background-size: 90% 90%;
              position: absolute;
              top: 36.5%;
              left: 23%;
              animation: turn 10s linear infinite;
            }
          }
        }
      }
      .panel-header-icon {
        background-image: url(/img/home/panel-title-icon.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: -12px;
        left: 0;
        width: 24px;
        height: 24px;
      }
    }
  }
  .leftPanel {
    left: 32px;
  }
  .rightPanel {
    right: 32px;
  }
}

@keyframes turn {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
