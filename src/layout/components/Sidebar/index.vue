<template>
  <div>
    <logo :collapse="!isCollapse" />
    <i-menu :collapsed="isCollapse" :menuData="permission_routes" @select="onSelect" />
    <!-- <a-menu
      mode="inline"
      theme="dark"
      class="ant-vue-sider-menu"
      :inline-collapsed="isCollapse"
      style="padding: 16px 0px;width: 100%;"
    >
      <sidebar-item
        v-for="route in permission_routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </a-menu>-->
    <!-- <a-menu
      mode="inline"
      theme="dark"
      class="ant-vue-sider-menu"
      :inline-collapsed="isCollapse"
      style="padding: 16px 0px;width: 100%;"
    >
      <template v-for="route in permission_routes">
        <a-menu-item v-if="!route.hidden" :key="route.path">
          <item :icon="'dashboard'" :title="'111'" />
        </a-menu-item>
        <a-sub-menu v-else-if="!route.hidden&&route.children" :key="route.path">
          <template v-for="item in route.children">
            <a-menu-item v-if="!item.hidden" :key="item.path">
              <item :icon="'dashboard'" :title="'111'" />
            </a-menu-item>
          </template>
        </a-sub-menu>
      </template>
    </a-menu>-->
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
  },
  created() {
    console.log(this.permission_routes);
  },
  methods: {
    onSelect() {}
  }
};
</script>
<style scoped>
.ant-vue-sider-menu {
  position: relative;
}
</style>