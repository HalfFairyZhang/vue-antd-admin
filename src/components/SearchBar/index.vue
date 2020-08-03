<template>
  <div :class="{'hidden':hidden}" class="search-bar-container">
    <a-form-model class="ant-advanced-search-form" rel="form" :model="form">
      <a-row :gutter="24">
        <a-col
          v-for="(item,index) in searchDatas"
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
              @change="selectChange(form[item.key],item)"
            >
              <a-select-option
                v-for="option in selectOptions[item.key]"
                :key="option.valueName?option[option.valueName]:option.value"
                :value="option.valueName?option[option.valueName]:option.value"
              >{{option.labelName?option[option.labelName]:option.label}}</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item v-else-if="item.type=='cascader'" :label="item.label">
            <a-cascader
              :options="cascaderOptions[item.key]"
              :load-data="loadData"
              :placeholder="`请选择${item.label}`"
              change-on-select
              @change="selectChange(form[item.key],item)"
            />
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
          v-if="this.searchDatas.length>3"
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
    searchDatas: {
      type: Array,
      default: () => [
        {
          key: "demo1",
          label: "普通输入框",
        },
        {
          key: "demo2",
          type: "number",
          label: "数字输入框",
        },
        {
          key: "demo3",
          type: "dateTime",
          label: "日期选择器",
        },
        {
          key: "demo4",
          type: "dateTime",
          showTime: true,
          format: "YYYY/MM/DD HH:mm",
          label: "时间选择器",
        },
        {
          key: "demo5",
          type: "select",
          label: "静态选择器",
          selectData: [
            {
              label: "数据一",
              value: 1,
            },
            {
              label: "数据二",
              value: 2,
            },
          ],
        },
      ],
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    count() {
      return this.expand ? this.searchDatas.length : 3;
    },
  },
  data() {
    return {
      expand: false,
      form: {},
      selectOptions: {},
      cascaderOptions: {},
    };
  },
  created() {
    var selectItems = this.searchDatas.filter((item) => {
      return item.type == "select";
    });
    selectItems.forEach((obj) => {
      if (obj.selectData) {
        Vue.set(this.selectOptions, obj.key, obj.selectData);
      } else if (!obj.isSub) {
        this.querySelectOptions(obj.selectUrl, obj.key, obj.defaultParams);
      }
    });
  },
  methods: {
    selectChange(val, obj) {
      var childrenObj = this.searchDatas.find((item) => {
        item.key == obj.childrenKey;
      });
      if (childrenObj.defaultParams) {
        Object.getOwnPropertyNames(childrenObj.defaultParams).forEach((key) => {
          childrenObj.defaultParams[key] = val;
        });
      }
      this.querySelectOptions(
        childrenObj.selectUrl,
        childrenObj.key,
        childrenObj.defaultParams || {}
      );
    },
    querySelectOptions(url, key, params) {
      console.log(url);
      console.log(key); //TUDO 预留请求方法
      console.log(params);
    },
    loadData(selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;
    },
    handleSearch() {
      this.$emit("searchhandle", this.form);
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
<style scoped>
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
</style>