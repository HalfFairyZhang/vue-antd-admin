<template>
  <a-modal
    v-model="visible"
    @cancel="handelCancel"
    :title="title"
    destroyOnClose
    :maskClosable="false"
  >
    <template slot="footer">
      <a-button key="back" @click="handelCancel">取消</a-button>
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
          >
            <a-select-option
              v-for="option in selectOptions[item.key]"
              :key="item.valueName?option[item.valueName]:option.value"
              :value="item.valueName?option[item.valueName]:option.value"
            >{{item.labelName?option[item.labelName]:option.label}}</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item v-else-if="item.type=='treeSelect'" :label="item.label" :prop="item.key">
          <a-tree-select
            v-model="modalForm[item.key]"
            :tree-data="selectOptions[item.key]"
            :replaceFields="{label:item.labelName?item.labelName:'label',value:item.valueName?item.valueName:'value',children:'children'}"
            treeDefaultExpandAll
            :placeholder="`请选择${item.label}`"
          ></a-tree-select>
        </a-form-model-item>
        <a-form-model-item v-else-if="item.type=='switch'" :label="item.label" :prop="item.key">
          <a-switch defaultChecked @change="switchChange($event,item.key)" />
        </a-form-model-item>
        <a-form-model-item v-else-if="item.type=='upload'" :label="item.label" :prop="item.key">
          <a-upload
            :name="item.name"
            :action="item.action"
            :headers="item.headers"
            @change="handleChange($event,item.key)"
          >
            <a-button>
              <a-icon type="upload" />点击上传文件
            </a-button>
          </a-upload>
        </a-form-model-item>
        <a-form-model-item
          v-else-if="item.type=='uploadImage'"
          :label="item.label"
          :prop="item.key"
        >
          <a-upload
            :name="item.name"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :before-upload="beforeUpload"
            :action="item.action"
            :headers="item.headers"
            @change="handleChange($event,item.key)"
          >
            <img v-if="modalForm[item.key]" :src="modalForm[item.key]" alt="avatar" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">上传图片</div>
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
      headers: {},
      modalForm: {},
      modalRules: {},
      loading: false,
      visible: false,
      cascaderModels: {},
      selectOptions: {},
    };
  },
  watch: {
    visibleModal: function (val) {
      this.visible = val;
      this.initView();
    },
    formData: function (val) {
      this.modalForm = val;
    },
  },
  created() {
    this.formItems.forEach((item) => {
      if (item.rule) Vue.set(this.modalRules, item.key, item.rule);
    });
    this.initView();
  },
  methods: {
    initView() {
      this.formItems
        .filter((item) => item.type == "select" || item.type == "treeSelect")
        .forEach((obj) => {
          if (obj.selectData) {
            Vue.set(this.selectOptions, obj.key, obj.selectData);
          } else {
            this.querySelectOptions(obj.selectUrl, obj.key, obj.defaultParams);
          }
        });
    },
    querySelectOptions(url, key, params) {
      this.$store.dispatch(url, params).then((res) => {
        this.selectOptions[key] = res.data;
      });
    },
    switchChange(event, key) {
      this.modalForm[key] = event ? 0 : 1;
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
    handleChange({ file }, key) {
      if (file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (file.status === "done") {
        this.modalForm[key] = file.response.data;
        this.loading = false;
      }
    },
    handelCancel() {
      this.visible = false;
      this.$emit("close");
    },
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
  /deep/ img {
    width: 100px;
    height: 100px;
  }
}
</style>