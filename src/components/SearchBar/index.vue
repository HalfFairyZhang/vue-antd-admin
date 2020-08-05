<template>
  <div :class="{'hidden':hidden}" class="search-bar-container">
    <a-form-model class="ant-advanced-search-form" rel="form" :model="form">
      <a-row :gutter="24">
        <a-col
          v-for="(item,index) in searchItems"
          :key="item.key"
          :span="item.span?item.span:8"
          :style="{ display: index < count ? 'block' : 'none' }"
        >
          <a-form-model-item v-if="item.type=='dateTime'" :label="item.label">
            <a-date-picker
              v-model="form[item.key]"
              :show-time="item.showTime"
              :format="item.format?item.format:'YYYY-MM-DD'"
              :placeholder="`请选择${item.label}`"
              :valueFormat="item.format?item.format:'YYYY-MM-DD'"
            />
          </a-form-model-item>
          <a-form-model-item v-else-if="item.type=='select'" :label="item.label">
            <a-select
              :mode="item.multiple?'multiple':'default'"
              v-model="form[item.key]"
              :placeholder="`请选择${item.label}`"
              style="width: 195px"
            >
              <a-select-option
                v-for="option in selectOptions[item.key]"
                :key="option.valueName?option[option.valueName]:option.value"
                :value="option.valueName?option[option.valueName]:option.value"
              >{{option.labelName?option[option.labelName]:option.label}}</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item
            v-else-if="item.type=='treeSelect'"
            :label="item.label"
            :prop="item.key"
          >
            <a-tree-select
              v-model="modalForm[item.key]"
              style="width: 100%"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              :tree-data="selectOptions[item.key]"
              :replaceFields="{label:item.labelName,value:item.valueName,children:'children'}"
              :placeholder="`请选择${item.label}`"
            ></a-tree-select>
          </a-form-model-item>
          <a-form-model-item v-else :label="item.label">
            <a-input
              :type="item.type?item.type:'text'"
              v-model="form[item.key]"
              :placeholder="`请输入${item.label}`"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :style="{ textAlign: 'right' }">
        <a-button type="primary" @click="handleSearch">查询</a-button>
        <a-button :style="{ marginLeft: '8px' }" @click="handleReset">重置</a-button>
        <a
          v-if="this.searchItems.length>3"
          :style="{ marginLeft: '8px', fontSize: '12px' }"
          @click="toggle"
        >
          {{expand?'收起':'展开'}}
          <a-icon :type="expand ? 'up' : 'down'" />
        </a>
      </a-row>
    </a-form-model>
  </div>
</template>
<script>
import Vue from "vue";

export default {
  name: "SearchBar",
  props: {
    searchItems: {
      type: Array,
      default: () => [],
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    count() {
      return this.expand ? this.searchItems.length : 3;
    },
  },
  data() {
    return {
      expand: false,
      form: {},
      selectOptions: {},
    };
  },
  created() {
    this.searchItems
      .filter((item) => item.type == "select" || item.type == "treeSelect")
      .forEach((obj) => {
        if (obj.selectData) {
          Vue.set(this.selectOptions, obj.key, obj.selectData);
        } else {
          this.querySelectOptions(obj.selectUrl, obj.key, obj.defaultParams);
        }
      });
  },
  methods: {
    querySelectOptions(url, key, params) {
      this.$store.dispatch(url, params).then((res) => {
        this.selectOptions[key] = res.data;
      });
    },
    handleSearch() {
      this.$emit("searchHandle", this.form);
    },
    handleReset() {
      this.form = {};
    },
    toggle() {
      this.expand = !this.expand;
    },
  },
};
</script>
<style lang="less" scoped>
.search-bar-container {
  background: #fff;
  padding-bottom: 16px;
}
.search-bar-container.hidden {
  display: none;
}

.ant-advanced-search-form {
  padding: 24px;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}
.ant-advanced-search-form .ant-form-item {
  display: flex;
}

.ant-advanced-search-form .ant-form-item-control-wrapper {
  flex: 1;
}

/deep/.ant-form-item {
  margin-bottom: 16px !important;
}
</style>