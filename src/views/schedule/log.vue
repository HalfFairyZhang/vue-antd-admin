<template>
  <a-card :loading="loading">
    <search-bar :searchItems="searchItems" @searchHandle="searchHandle" />
    <table-page
      :table-cols="tableCols"
      :table-datas="tableDatas"
      :operationBtns="operationBtns"
      @operationHandel="operationHandel"
    />
    <pagination
      :total="params.total"
      :limit="params.limit"
      :page="params.page"
      @pagination="paginationHandel"
    />
    <modal-form
      :visibleModal="fromVisible"
      :formItems="formItems"
      @close="fromVisible=false"
      :formData="formData"
    />
  </a-card>
</template>
<script>
import SearchBar from "@/components/SearchBar";
import TablePage from "@/components/TablePage";
import Pagination from "@/components/Pagination";
import ModalForm from "@/components/ModalForm";

export default {
  components: {
    SearchBar,
    TablePage,
    Pagination,
    ModalForm,
  },
  data() {
    return {
      loading: false,
      searchItems: [
        { key: "beanName", label: "任务名称" },
        { key: "params", label: "参数" },
      ],
      tableCols: [
        { title: "任务名称", dataIndex: "beanName" },
        { title: "参数", dataIndex: "params" },
        { title: "错误信息", dataIndex: "error" },
        { title: "运行时长", dataIndex: "times" },
      ],
      operationBtns: [
        { key: "edit", label: "编辑" },
        { key: "delete", label: "删除" },
      ],
      formItems: [
        { key: "beanName", label: "任务名称" },
        { key: "params", label: "参数" },
        { key: "error", label: "错误信息" },
        { key: "times", label: "运行时长" },
      ],
      params: { total: 0, limit: 10, page: 0 },
      tableDatas: [],
      formData: {},
      fromVisible: false,
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.$store.dispatch("schedule/queryLogList", this.params).then((res) => {
        this.tableDatas = res.list;
        this.params.total = res.totalCount;
      });
    },
    searchHandle(params) {
      this.params = { ...this.params, ...params };
      this.initData();
    },
    operationHandel(row, event) {
      if (event === "delete") {
        this.$confirm({
          title: "确定要删除此记录吗？",
          onOk() {
            this.$store
              .dispatch("schedule/deleteScheduleLog", row.id)
              .then(() => {
                this.$message.success("删除成功！");
              });
          },
        });
      } else if (event === "edit") {
        this.fromVisible = true;
        this.formData = row;
      }
    },
    paginationHandel({page, limit}) {
      this.params.page = page;
      this.params.limit = limit;
      this.initData();
    },
  },
};
</script>
<style scoped>
.ant-card {
  min-height: calc(100vh - 64px);
  margin: 24px 24px 0;
}
</style>