<template>
  <div>
    <a-badge
      :dot="true"
      style="line-height: 25px;margin-top: -5px;"
      @click="dialogTableVisible=true"
    >
      <a-button style="padding: 8px 10px;" size="small" type="danger">
        <a-icon type="bug" />
      </a-button>
    </a-badge>

    <a-modal :visible.sync="dialogTableVisible" width="80%" append-to-body>
      <div slot="title">
        <span style="padding-right: 10px;">Error Log</span>
        <a-button size="mini" type="primary" icon="el-icon-delete" @click="clearAll">Clear All</a-button>
      </div>
      <a-table :data="errorLogs" border>
        <a-table-column label="Message">
          <template slot-scope="{row}">
            <div>
              <span class="message-title">Msg:</span>
              <a-tag type="danger">{{ row.err.message }}</a-tag>
            </div>
            <br />
            <div>
              <span class="message-title" style="padding-right: 10px;">Info:</span>
              <a-tag type="warning">{{ row.vm.$vnode.tag }} error in {{ row.info }}</a-tag>
            </div>
            <br />
            <div>
              <span class="message-title" style="padding-right: 16px;">Url:</span>
              <a-tag type="success">{{ row.url }}</a-tag>
            </div>
          </template>
        </a-table-column>
        <a-table-column label="Stack">
          <template slot-scope="scope">{{ scope.row.err.stack }}</template>
        </a-table-column>
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
