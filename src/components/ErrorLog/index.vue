<template>
  <div v-if="errorLogs.length">
    <a-badge :dot="true" @click="dialogTableVisible=true">
      <a-button style="width: 32px;height: 32px;" size="small" type="danger">
        <a-icon type="bug" />
      </a-button>
    </a-badge>
    <a-modal :visible.sync="dialogTableVisible" width="80%" append-to-body>
      <template slot="title">
        <span style="padding-right: 10px;">错误日志</span>
        <a-button type="primary" icon="delete" @click="clearAll">清空</a-button>
      </template>
      <template slot="footer">
        <a-button @click="dialogTableVisible=false">取消</a-button>
        <a-button type="primary" @click="dialogTableVisible=false">确定</a-button>
      </template>
      <a-table :columns="columns" :data-source="errorLogs" border>
        <template slot="Message" slot-scope="record">
          <div>
            <span class="message-title">Msg:</span>
            <a-tag type="danger">{{ record.err.message }}</a-tag>
          </div>
          <br />
          <div>
            <span class="message-title" style="padding-right: 10px;">Info:</span>
            <a-tag type="warning">{{ record.vm.$vnode.tag }} error in {{ record.info }}</a-tag>
          </div>
          <br />
          <div>
            <span class="message-title" style="padding-right: 16px;">Url:</span>
            <a-tag type="success">{{ record.url }}</a-tag>
          </div>
        </template>
        <template slot="Stack" slot-scope="scope">{{ scope.row.err.stack }}</template>
      </a-table>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "ErrorLog",
  data() {
    return {
      dialogTableVisible: false,
      columns: [
        {
          title: "消息",
          dataIndex: "Message",
        },
        {
          title: "堆栈",
          dataIndex: "Stack",
        },
      ],
    };
  },
  computed: {
    errorLogs() {
      return this.$store.getters.errorLogs;
    },
  },
  methods: {
    clearAll() {
      this.dialogTableVisible = false;
      this.$store.dispatch("errorLog/clearErrorLog");
    },
  },
};
</script>

<style scoped>
.message-title {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  padding-right: 8px;
}
</style>
