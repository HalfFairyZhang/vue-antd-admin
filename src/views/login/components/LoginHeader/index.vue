<template>
  <div class="antd-vue-layouts-user-layout-top">
    <div class="antd-vue-layouts-user-layout-header">
      <a href="/">
        <img alt="logo" class="antd-vue-layouts-user-layout-logo" :src="logo" />
        <span class="antd-vue-layouts-user-layout-title">{{title}}</span>
      </a>
    </div>
    <div class="antd-vue-layouts-user-layout-desc">{{desc}}</div>
  </div>
</template>
<script>
export default {
  name: "LoginHeader",
  data() {
    return {
      logo: "https://preview.pro.ant.design/static/logo.f0355d39.svg",
      title: "Ant Vue",
      desc: "Ant Vue 最具影响力的 Web 设计规范"
    };
  }
};
</script>
<style scoped>
.antd-vue-layouts-user-layout-top {
  text-align: center;
  margin-top: 40px;
}
.antd-vue-layouts-user-layout-header {
  height: 44px;
  line-height: 44px;
}
.antd-vue-layouts-user-layout-logo {
  height: 44px;
  margin-right: 16px;
  vertical-align: top;
}
.antd-vue-layouts-user-layout-title {
  position: relative;
  top: 2px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 600;
  font-size: 33px;
  font-family: Avenir, helvetica neue, Arial, Helvetica, sans-serif;
}
.antd-vue-layouts-user-layout-desc {
  margin-top: 12px;
  margin-bottom: 40px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
}
</style>