<template>
  <a-modal
    v-model="visible"
    @cancel="handelCancel"
    :title="title"
    destroyOnClose
    :maskClosable="false"
  >
    <template slot="footer">
      <a-button key="back" @click="visible=false">取消</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="submitForm('modalForm')">保存</a-button>
    </template>
    <a-form-model ref="modalForm" :model="modalForm" :rules="modalRules">
      <a-row class="ant-modal-form" v-for="(item,index) in formItems" :key="index">
        <a-form-model-item v-if="item.type=='dateTime'" :label="item.label" :prop="item.key">
          <a-date-picker
            v-model="modalForm[item.key]"
            :show-time="item.showTime"
            :format="item.format?item.format:'YYYY-MM-DD'"
            :placeholder="`请选择${item.label}`"
            :valueFormat="item.format?item.format:'YYYY-MM-DD'"
          />
        </a-form-model-item>
        <a-form-model-item v-else-if="item.type=='select'" :label="item.label" :prop="item.key">
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
        <a-form-model-item v-else-if="item.type=='cascader'" :label="item.label" :prop="item.key">
          <a-cascader
            :options="cascaderOptions[item.key]"
            :load-data="loadData"
            :placeholder="`请选择${item.label}`"
            change-on-select
            @change="selectChange(modalForm[item.key],item)"
          />
        </a-form-model-item>
        <a-form-model-item v-else-if="item.type=='switch'" :label="item.label" :prop="item.key">
          <a-switch v-model="modalForm[item.key]" />
        </a-form-model-item>
        <a-form-model-item
          v-else-if="item.type=='uploadImage'"
          :label="item.label"
          :prop="item.key"
        >
          <a-upload
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :before-upload="beforeUpload"
            @change="handleChange"
          >
            <img v-if="modalForm[item.key]" :src="modalForm[item.key]" alt="avatar" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
        </a-form-model-item>
        <a-form-model-item v-else :label="item.label" :prop="item.key">
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
        {
          key: "demo6",
          type: "switch",
          label: "开关",
        },
        {
          key: "demo6",
          type: "switch",
          label: "开关",
        },
      ],
    },
    visibleModal: {
      type: Boolean,
      default: false,
    },
    formData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      title: "编辑表单",
      modalForm: {},
      modalRules: {},
      loading: false,
      visible: false,
      selectOptions: {},
      cascaderOptions: {},
    };
  },
  watch: {
    visibleModal: function (val) {
      console.log(val);
      this.visible = val;
    },
  },
  created() {
    this.formItems.forEach((item) => {
      if (item.rule) Vue.set(this.modalRules, item.key, item.rule);
    });
    this.modalForm = this.formData ? this.formData : {};
    var selectItems = this.formItems.filter((item) => {
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit("submit", this.modalForm);
        } else {
          return false;
        }
      });
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("您只能上传图片文件!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("图像必须小于2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
    handleChange(info) {
      console.log(info);
    },
    handelCancel(){
      this.$emit('close')
    }
  },
};
</script>
<style lang="less" scoped>
.ant-modal-form {
  .ant-form-item {
    margin-bottom: 16px;
  }
  .ant-row {
    display: flex;
  }
  /deep/ .ant-col {
    flex: 4;
  }
  /deep/ .ant-form-item-label {
    flex: 1;
  }
  /deep/ .ant-form-item-control {
    width: 90%;
  }
}
</style>