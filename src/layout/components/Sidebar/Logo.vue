<template>
  <div id="logo" class="ant-vue-sider-menu-logo">
    <a href="/">
      <img :src="logo" alt="logo" />
      <h1 v-if="collapse">{{title}}</h1>
    </a>
  </div>
</template>
<script>
export default {
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: "Ant Design Vue",
      logo: "https://preview.pro.ant.design/static/logo.f0355d39.svg"
    };
  }
};
</script>
<style scoped>
.ant-vue-sider-menu-logo {
  position: relative;
  padding: 0 24px;
  overflow: hidden;
  background: #001529;
  cursor: pointer;
  transition: all 0.3s;
}
.ant-vue-sider-menu-logo a {
  display: flex;
  align-items: center;
  height: 64px;
}
.ant-vue-sider-menu-logo img {
  display: inline-block;
  height: 32px;
  vertical-align: middle;
}

.ant-vue-sider-menu-logo h1 {
  display: inline-block;
  margin: 0 0 0 12px;
  color: #fff;
  font-weight: 600;
  font-size: 20px;
  vertical-align: middle;
  animation: fade-in;
  animation-duration: 0.3s;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }

  40% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>