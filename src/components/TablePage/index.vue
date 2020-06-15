<template>
  <a-table :columns="columns" bordered :data-source="data" :loading="loading" :pagination="false">
    <template slot="action" slot-scope="record, index">
      <a href="javascript:;" @click="operationHandel(record,index)">详情</a>
      <a-divider type="vertical" />
      <a href="javascript:;" @click="operationHandel(record,index)">编辑</a>
      <a-divider type="vertical" />
      <a href="javascript:;" @click="operationHandel(record,index)">删除</a>
    </template>
  </a-table>
</template>
<script>
import moment from "moment"; // 这个moment方法。框架里本来就有引入就好

export default {
  props: {
    tableCols: {
      required: true,
      type: Array
    },
    tableDatas: {
      required: true,
      type: Array
    },
    pagination: {
      type: [Object, Boolean],
      default: () => ({
        pageSize: 10,
        current: 1
      })
    }
  },
  computed: {
    columnsCustom() {
      return this.columns
        .filter(item => {
          return item.scopedSlots;
        })
        .map(item => item.scopedSlots);
    }
  },
  data() {
    return {
      columns: [],
      data: this.tableDatas,
      loading: false
    };
  },
  mounted() {
    this.requestData();
  },
  created() {
    this.tableCols.forEach(item => {
      var column = { ...{}, ...item };
      if (item.type == "select") {
        column["customRender"] = val => {
          return this.formatter(val, item.selectData);
        };
      } else if (item.type == "dateTime") {
        column["customRender"] = val => {
          return this.formatterTime(val);
        };
      } else if (item.type == "action") {
        column = {
          ...column,
          ...{ key: "action", scopedSlots: { customRender: "action" } }
        };
      }
      console.log(column);
      this.columns.push(column);
    });
  },
  methods: {
    formatterTime(val) {
      return val ? moment(val).format("YYYY-MM-DD HH:mm:ss") : "";
    },
    formatter(val, dict) {
      var data = dict.find(item => {
        return item.value == val;
      });
      return data ? data.label : "";
    },
    requestData() {},
    operationHandel(events, record, index) {
      console.log(events);
      console.log(record);
      console.log(index);
    }
  }
};
</script>
<style scoped>
</style>