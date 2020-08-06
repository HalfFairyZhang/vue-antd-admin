<template>
  <div>
    <div class="operator">
      <a-button
        v-for="btn in operationBtns.filter(item=>{return item.pos=='top'&&(item.perm?hasPerm(item.perm):true)})"
        :key="btn.key"
        :type="btn.type?btn.type:'default'"
        :style="{marginLeft:'8px'}"
        @click="operationHandel(null,btn.key)"
      >{{btn.label}}</a-button>
    </div>
    <a-table
      :columns="columns"
      rowKey="id"
      bordered
      :data-source="data"
      :loading="loading"
      :pagination="false"
    >
      <template slot="action" slot-scope="record">
        <span
          v-for="(btn,index) in operationBtns.filter(item=>{return item.pos!='top'&&(item.perm?hasPerm(item.perm):true)})"
          :key="btn.key"
        >
          <a-divider v-if="index!=0" type="vertical" />
          <a @click="operationHandel(record,btn.key)">{{btn.label}}</a>
        </span>
      </template>
    </a-table>
  </div>
</template>
<script>
import moment from "moment"; // 这个moment方法。框架里本来就有引入就好

export default {
  props: {
    operationBtns: {
      type: Array,
      default: () => [],
    },
    tableCols: {
      required: true,
      type: Array,
    },
    tableDatas: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    tableDatas: function (val) {
      this.data = val;
    },
  },
  data() {
    return {
      columns: [],
      data: this.tableDatas,
      loading: false,
    };
  },
  created() {
    this.tableCols.forEach((item) => {
      var column = { ...{}, ...item };
      if (item.type == "select") {
        column["customRender"] = (val) => {
          return this.formatter(val, item.selectData);
        };
      } else if (item.type == "dateTime") {
        column["customRender"] = (val) => {
          return this.formatterTime(val * 1000);
        };
      }
      this.columns.push(column);
    });
    this.columns.push({
      title: "操作",
      key: "action",
      scopedSlots: { customRender: "action" },
    });
  },
  methods: {
    formatterTime(val) {
      return val ? moment(val).format("YYYY-MM-DD HH:mm:ss") : "";
    },
    formatter(val, dict) {
      var data = dict.find((item) => {
        return item.value == val;
      });
      return data ? data.label : "";
    },
    operationHandel(record, key) {
      this.$emit("operationHandel", record, key);
    },
  },
};
</script>
<style scoped>
.operator {
  margin-bottom: 18px;
}
</style>