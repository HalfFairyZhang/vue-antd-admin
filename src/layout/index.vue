<template>
  <div class="app-wrapper">
    <a-layout style="min-height: 100%;">
      <a-layout-sider collapsed-width="80" v-model="isCollapse" width="256">
        <sidebar />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="padding: 0px; width: 100%; z-index: 9;">
          <navbar />
        </a-layout-header>
        <a-layout-content>
          <app-main />
        </a-layout-content>
        <a-layout-footer>
          <footerbar />
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import { AppMain, Sidebar, Navbar, Footerbar } from "./components";
import { mapState } from "vuex";

export default {
  name: "Layout",
  components: {
    AppMain,
    Sidebar,
    Navbar,
    Footerbar
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar
    }),
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  data() {
    return {
      collapsed: true
    };
  }
};
</script>
<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
}
</style>