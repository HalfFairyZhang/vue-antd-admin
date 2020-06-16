<template>
  <div class="ant-vue-global-header">
    <span class="ant-vue-global-header-trigger" @click="toggleSideBar">
      <a-icon class="trigger" :type="sidebar.opened?'menu-fold':'menu-unfold'" />
    </span>
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div style="flex: 1 1 0%;"></div>
    <div class="antd-vue-components-global-header-index-right">
      <a-dropdown>
        <span
          class="antd-vue-components-global-header-index-action antd-vue-components-global-header-index-account"
        >
          <a-avatar
            class="antd-vue-components-global-header-index-avatar"
            :src="avatar"
            icon="user"
          />
          <span class="antd-vue-components-global-header-index-name">{{name}}</span>
        </span>
        <a-menu slot="overlay">
          <a-menu-item key="0">
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">个人中心</a>
          </a-menu-item>
          <a-menu-item key="1">
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">设置</a>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="3" @click.native="logout">退出登录</a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";

export default {
  components: {
    Breadcrumb
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "name"])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      console.log(this.$route.fullPath);
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    }
  }
};
</script>
<style scoped>
.ant-vue-global-header {
  position: relative;
  display: flex;
  align-items: center;
  height: 64px;
  padding: 0;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
.ant-vue-global-header-trigger {
  height: 64px;
  padding: 0 24px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s, padding 0s;
}
.antd-vue-components-global-header-index-right {
  display: flex;
  float: right;
  height: 64px;
  margin-left: auto;
  overflow: hidden;
}

.antd-vue-components-global-header-index-right
  .antd-vue-components-global-header-index-action {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.antd-vue-components-global-header-index-right
  .antd-vue-components-global-header-index-action:hover {
  background: rgba(0, 0, 0, 0.025);
}

.antd-vue-components-global-header-index-right
  .antd-vue-components-global-header-index-account
  .antd-vue-components-global-header-index-avatar {
  margin: 20px 8px 20px 0;
  color: #1890ff;
  vertical-align: top;
  background: hsla(0, 0%, 100%, 0.85);
}

.antd-vue-components-global-header-index-right
  .antd-vue-components-global-header-index-action
  span {
  color: rgba(0, 0, 0, 0.65);
  vertical-align: middle;
}

.breadcrumb-container {
  float: left;
}
</style>