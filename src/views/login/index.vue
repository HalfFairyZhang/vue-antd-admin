<template>
  <div class="antd-pro-layouts-user-layout-container">
    <div class="antd-pro-layouts-user-layout-content">
      <div class="antd-pro-layouts-user-layout-top">
        <div class="antd-pro-layouts-user-layout-header">
          <a href="/">
            <img
              alt="logo"
              class="antd-pro-layouts-user-layout-logo"
              src="https://preview.pro.ant.design/static/logo.f0355d39.svg"
            />
            <span class="antd-pro-layouts-user-layout-title">Ant Vue</span>
          </a>
        </div>
        <div class="antd-pro-layouts-user-layout-desc">Ant Vue 最具影响力的 Web 设计规范</div>
      </div>
      <div class="antd-pro-pages-user-login-style-main">
        <div class="antd-pro-pages-user-login-components-login-index-login">
          <a-form-model ref="ruleForm" :form="form" :rules="rules" @submit="handleSubmit">
            <a-form-model-item prop="userName">
              <a-input v-model="userName" placeholder="请输入用户名" size="large">
                <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
              </a-input>
            </a-form-model-item>
            <a-form-model-item prop="password">
              <a-input v-model="password" type="password" size="large" placeholder="请输入密码">
                <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
              </a-input>
            </a-form-model-item>
            <a-form-model-item>
              <a-button
                type="primary"
                html-type="submit"
                size="large"
                class="antd-pro-pages-user-login-components-login-index-submit"
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
          userName:"",
          password:""
      },
      rules: {
        userName: [{ required: true, message: "请输入您的用户名!" }],
        password: [{ required: true, message: "请输入密码!" }]
      }
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    }
  }
};
</script>
<style scoped>
.antd-pro-layouts-user-layout-container {
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
.antd-pro-layouts-user-layout-content {
  flex: 1 1;
  padding: 32px 0;
}
@media (min-width: 768px) {
  .antd-pro-layouts-user-layout-content {
    padding: 32px 0 24px;
  }
}
.antd-pro-layouts-user-layout-top {
  text-align: center;
  margin-top: 40px;
}
.antd-pro-layouts-user-layout-header {
  height: 44px;
  line-height: 44px;
}
.antd-pro-layouts-user-layout-logo {
  height: 44px;
  margin-right: 16px;
  vertical-align: top;
}
.antd-pro-layouts-user-layout-title {
  position: relative;
  top: 2px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 600;
  font-size: 33px;
  font-family: Avenir, helvetica neue, Arial, Helvetica, sans-serif;
}
.antd-pro-layouts-user-layout-desc {
  margin-top: 12px;
  margin-bottom: 40px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
}
.antd-pro-pages-user-login-style-main {
  width: 368px;
  margin: 0 auto;
}
.antd-pro-pages-user-login-components-login-index-login
  .antd-pro-pages-user-login-components-login-index-submit {
  width: 100%;
}
</style>