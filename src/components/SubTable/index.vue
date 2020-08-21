<template>
  <div class="sub-table-box">
    <a-button class="editable-add-btn" @click="handleAdd">添加</a-button>
    <a-table :columns="columnItem" :data-source="data" bordered>
      <template
        v-for="col in columns.map(clo=> cloumns.dataIndex)"
        :slot="col"
        slot-scope="text, record"
      >
        <div :key="col">
          <template v-if="record.editable">
            <a-input
              :type="item.type?item.type:'text'"
              :value="text"
              @change="e => handleChange(e.target.value, record.key, col)"
            />
            <a-select :mode="item.multiple?'multiple':'default'" @change="handleChange">
              <a-select-option
                v-for="option in selectOptions[item.key]"
                :key="item.valueName?option[item.valueName]:option.value"
                :value="item.valueName?option[item.valueName]:option.value"
              >{{item.labelName?option[item.labelName]:option.label}}</a-select-option>
            </a-select>
            <a-tree-select
              :tree-data="selectOptions[item.key]"
              :replaceFields="{label:item.labelName,value:item.valueName,children:'children'}"
              treeDefaultExpandAll
              :placeholder="`请选择${item.label}`"
            ></a-tree-select>
          </template>
          <template v-else>{{ text }}</template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.key)">保存</a>
            <a @click="() => cancel(record.key)">取消</a>
          </span>
          <span v-else>
            <a @click="() => edit(record.key)">编辑</a>
            <a-divider v-if="index!=0" type="vertical" />
            <a-popconfirm title="确定要删除吗?" @confirm="() => handleDelete(record.key)">
              <a>删除</a>
            </a-popconfirm>
          </span>
        </div>
      </template>
    </a-table>
  </div>
</template>
<script>
import Vue from "vue";

export default {
  name: "SubTable",
  props: {
    columnItem: {
      type: Array,
      default: () => [],
    },
    dataSource: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      columns: [],
      data: [],
      selectOptions: {},
      editingKey:"",
    };
  },
  watch: {
    dataSource(val) {
      this.data = this.dataSource || [];
    },
    columnItem(val) {
      this.columns = this.columnItem.map((item) => {});
    },
  },
  created() {
    console.log(this.dataSource);

    this.initView();
  },
  methods: {
    initView() {
      this.columnItem
        .filter((item) => item.type == "select" || item.type == "treeSelect")
        .forEach((item) => {
          if (item.selectData) {
            Vue.set(this.selectOptions, item.key, item.selectData);
          } else {
            this.querySelectOptions(
              item.selectUrl,
              item.key,
              item.defaultParams
            );
          }
        });
    },
    querySelectOptions(url, key, params) {
      this.$store.dispatch(url, params).then((res) => {
        this.selectOptions[key] = res.data;
      });
    },
    handleAdd() {
      this.data.push({});
    },
    handleDelete(key) {
      this.$emit("updateHandel");
    },
    handleChange(value, key, column) {},
    edit(key) {},
    save(key) {
      this.$emit("updateHandel");
    },
    cancel(key) {

    },
  },
};
</script>
<style scoped>
.sub-table-box {
  margin: 16px;
}
.editable-add-btn {
  margin-bottom: 8px;
}
</style>