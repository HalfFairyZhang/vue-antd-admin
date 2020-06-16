<template>
  <div>
    <logo :collapse="!isCollapse" />
    <i-menu :collapsed="isCollapse" :menuData="permission_routes" />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import IMenu from "./menu";

export default {
  components: { Logo, IMenu },
  computed: {
    ...mapGetters(["permission_routes", "sidebar"]),
    isCollapse() {
      return !this.sidebar.opened;
    }
  }
};
</script>
<style scoped>
.ant-vue-sider-menu {
  position: relative;
}
</style>