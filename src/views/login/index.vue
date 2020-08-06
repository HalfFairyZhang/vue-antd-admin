<template>
  <div class="antd-vue-layouts-user-layout-container">
    <div class="antd-vue-layouts-user-layout-content">
      <login-header />
      <div class="antd-vue-pages-user-login-style-main">
        <a-form-model ref="loginForm" :model="loginForm" :rules="loginRules">
          <a-form-model-item prop="username">
            <a-input ref="username" v-model="loginForm.username" placeholder="请输入用户名" size="large">
              <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item prop="password">
            <a-input-password
              ref="password"
              v-model="loginForm.password"
              size="large"
              placeholder="请输入密码"
              @keyup.enter.native="handleLogin"
            >
              <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
            </a-input-password>
          </a-form-model-item>
          <a-form-model-item>
            <a-button
              type="primary"
              size="large"
              :loading="loading"
              class="antd-vue-pages-user-login-components-login-index-submit"
              @click="handleLogin"
            >登陆</a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
    </div>
  </div>
</template>

<script>
import LoginHeader from "./components/LoginHeader";

export default {
  components: {
    LoginHeader
  },
  data() {
    return {
      loading: false,
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [{ required: true, message: "请输入您的用户名!" }],
        password: [{ required: true, message: "请输入密码!" }]
      },
      redirect: undefined,
      otherQuery: {}
    };
  },
  $route: {
    handler: function(route) {
      const query = route.query;
      if (query) {
        this.redirect = query.redirect;
        this.otherQuery = this.getOtherQuery(query);
      }
    },
    immediate: true
  },
  mounted() {
    if (this.loginForm.username === "") {
      this.$refs.username.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
  },
  methods: {
    handleLogin() {
      var vm = this;
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          vm.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || "/",
                query: this.otherQuery
              });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    }
  }
};
</script>
<style scoped>
.antd-vue-layouts-user-layout-container {
  background: #f0f2f5;
  background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
}
.antd-vue-layouts-user-layout-content {
  flex: 1 1;
  padding: 32px 0;
}
@media (min-width: 768px) {
  .antd-vue-layouts-user-layout-content {
    padding: 32px 0 24px;
  }
}

.antd-vue-pages-user-login-style-main {
  width: 368px;
  margin: 0 auto;
}
.antd-vue-pages-user-login-style-main
  .antd-vue-pages-user-login-components-login-index-submit {
  width: 100%;
}
</style>