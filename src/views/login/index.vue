<template>
  <div class="antd-vue-layouts-user-layout-container">
    <div class="antd-vue-layouts-user-layout-content">
      <div class="antd-vue-layouts-user-layout-top">
        <div class="antd-vue-layouts-user-layout-header">
          <a href="/">
            <img
              alt="logo"
              class="antd-vue-layouts-user-layout-logo"
              src="https://preview.pro.ant.design/static/logo.f0355d39.svg"
            />
            <span class="antd-vue-layouts-user-layout-title">Ant Vue</span>
          </a>
        </div>
        <div class="antd-vue-layouts-user-layout-desc">Ant Vue 最具影响力的 Web 设计规范</div>
      </div>
      <div class="antd-vue-pages-user-login-style-main">
        <div class="antd-vue-pages-user-login-components-login-index-login">
          <a-form-model ref="ruleForm" :model="form" :rules="rules">
            <a-form-model-item prop="userName">
              <a-input v-model="form.userName" placeholder="请输入用户名" size="large">
                <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
              </a-input>
            </a-form-model-item>
            <a-form-model-item prop="password">
              <a-input v-model="form.password" type="password" size="large" placeholder="请输入密码">
                <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
              </a-input>
            </a-form-model-item>
            <a-form-model-item>
              <a-button
                type="primary"
                size="large"
                class="antd-vue-pages-user-login-components-login-index-submit"
                @click="handleSubmit"
              >登陆</a-button>
            </a-form-model-item>
          </a-form-model>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        userName: "",
        password: ""
      },
      rules: {
        userName: [{ required: true, message: "请输入您的用户名!" }],
        password: [{ required: true, message: "请输入密码!" }]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
.antd-vue-pages-user-login-style-main {
  width: 368px;
  margin: 0 auto;
}
.antd-vue-pages-user-login-components-login-index-login
  .antd-vue-pages-user-login-components-login-index-submit {
  width: 100%;
}
</style>