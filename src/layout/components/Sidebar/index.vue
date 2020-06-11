<template>
  <div>
    <logo :collapse="!isCollapse" />
    <a-menu mode="inline" theme="dark" :inline-collapsed="isCollapse">
      <sidebar-item
        v-for="route in permission_routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
      <!-- <a-menu-item key="1">
        <a-icon type="pie-chart" />
        <span>Option 1</span>
      </a-menu-item>
      <a-menu-item key="2">
        <a-icon type="desktop" />
        <span>Option 2</span>
      </a-menu-item>
      <a-menu-item key="3">
        <a-icon type="inbox" />
        <span>Option 3</span>
      </a-menu-item>
      <a-sub-menu key="sub1">
        <span slot="title">
          <a-icon type="mail" />
          <span>Navigation One</span>
        </span>
        <a-menu-item key="5">Option 5</a-menu-item>
        <a-menu-item key="6">Option 6</a-menu-item>
        <a-menu-item key="7">Option 7</a-menu-item>
        <a-menu-item key="8">Option 8</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <span slot="title">
          <a-icon type="appstore" />
          <span>Navigation Two</span>
        </span>
        <a-menu-item key="9">Option 9</a-menu-item>
        <a-menu-item key="10">Option 10</a-menu-item>
        <a-sub-menu key="sub3" title="Submenu">
          <a-menu-item key="11">Option 11</a-menu-item>
          <a-menu-item key="12">Option 12</a-menu-item>
        </a-sub-menu>
      </a-sub-menu>-->
    </a-menu>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";

export default {
  components: { Logo, SidebarItem },
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