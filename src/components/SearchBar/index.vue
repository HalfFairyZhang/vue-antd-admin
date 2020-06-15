<template>
  <div :class="{'hidden':hidden}" class="search-bar-container">
    <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
      <a-row :gutter="24">
        <a-col
          v-for="i in 10"
          :key="i"
          :span="6"
          :style="{ display: i < count ? 'block' : 'none' }"
        >
          <a-form-item :label="`Field ${i}`">
            <a-input
              v-decorator="[
                `field-${i}`,
                {
                  rules: [
                    {
                      required: true,
                      message: 'Input something!',
                    },
                  ],
                },
              ]"
              placeholder="placeholder"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24" :style="{ textAlign: 'right' }">
          <a-button type="primary" html-type="submit">查询</a-button>
          <a-button :style="{ marginLeft: '8px' }" @click="handleReset">重置</a-button>
          <a :style="{ marginLeft: '8px', fontSize: '12px' }" @click="toggle">
            展开
            <a-icon :type="expand ? 'up' : 'down'" />
          </a>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script>
export default {
  name: "SearchBar",
  props: {
    hidden: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {}
    };
  },
  methods: {
    handleSearch() {},
    toggle() {}
  }
};
</script>
<style scoped>
.search-bar-container {
  background: #fff;
  padding: 16px;
}
.search-bar-container.hidden {
  display: none;
}
</style>