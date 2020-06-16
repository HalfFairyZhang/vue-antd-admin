<template>
  <a-modal v-model="visibleModal" :title="title" destroyOnClose :maskClosable="false">
    <template slot="footer">
      <a-button key="back" @click="visibleModal=false">取消</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleOk">保存</a-button>
    </template>
    <a-form-model rel="modalForm" :model="modalForm">
      <a-row class="ant-modal-form" v-for="(item,index) in formItems" :key="index">
        <a-form-model-item v-if="item.type=='dateTime'" :label="item.label">
          <a-date-picker
            v-model="modalForm[item.key]"
            :show-time="item.showTime"
            :format="item.format?item.format:'YYYY-MM-DD'"
            :placeholder="`请选择${item.label}`"
            :valueFormat="item.format?item.format:'YYYY-MM-DD'"
          />
        </a-form-model-item>
        <a-form-model-item v-else-if="item.type=='select'" :label="item.label">
          <a-select
            :mode="item.multiple?'multiple':'default'"
            v-model="modalForm[item.key]"
            :placeholder="`请选择${item.label}`"
            style="width: 195px"
            @change="selectChange(modalForm[item.key],item)"
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
            @change="selectChange(modalForm[item.key],item)"
          />
        </a-form-model-item>
        <a-form-model-item v-else :label="item.label">
          <a-input
            :type="item.type?item.type:'text'"
            v-model="modalForm[item.key]"
            :placeholder="`请输入${item.label}`"
          />
        </a-form-model-item>
      </a-row>
    </a-form-model>
  </a-modal>
</template>
<script>
//复杂交互表单建议使用PageView
import Vue from "vue";

export default {
  name: "ModalForm",
  props: {
    formItems: {
      type: Array,
      default: () => [
        {
          key: "demo1",
          label: "普通输入框"
        },
        {
          key: "demo2",
          type: "number",
          label: "数字输入框"
        },
        {
          key: "demo3",
          type: "dateTime",
          label: "日期选择器"
        },
        {
          key: "demo4",
          type: "dateTime",
          showTime: true,
          format: "YYYY/MM/DD HH:mm",
          label: "时间选择器"
        },
        {
          key: "demo5",
          type: "select",
          label: "静态选择器",
          selectData: [
            {
              label: "数据一",
              value: 1
            },
            {
              label: "数据二",
              value: 2
            }
          ]
        }
      ]
    },
    visibleModal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      title: "1111",
      modalForm: {},
      loading: false,
      selectOptions: {},
      cascaderOptions: {}
    };
  },
  created() {
    var selectItems = this.formItems.filter(item => {
      return item.type == "select";
    });
    selectItems.forEach(obj => {
      if (obj.selectData) {
        Vue.set(this.selectOptions, obj.key, obj.selectData);
      } else if (!obj.isSub) {
        this.querySelectOptions(obj.selectUrl, obj.key, obj.defaultParams);
      }
    });
  },
  methods: {
    selectChange(val, obj) {
      var childrenObj = this.searchDatas.find(item => {
        item.key == obj.childrenKey;
      });
      if (childrenObj.defaultParams) {
        Object.getOwnPropertyNames(childrenObj.defaultParams).forEach(key => {
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
    handleOk() {
      this.$emit("handleSearch", this.modalForm);
    }
  }
};
</script>
<style scoped>
.ant-modal-form .ant-form-item {
  display: flex;
}

.ant-modal-form .ant-form-item .ant-form-item-label {
  flex: 1;
}

.ant-modal-form .ant-form-item .ant-form-item-control-wrapper {
  flex: 3;
}
</style>