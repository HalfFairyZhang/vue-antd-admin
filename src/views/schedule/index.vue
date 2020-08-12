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
      @submit="submitHandel"
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
        { title: "运行时间", dataIndex: "cronExpression" },
        {
          title: "状态",
          dataIndex: "state",
          type: "select",
          selectData: [
            { label: "启用", value: 0 },
            { label: "停用", value: 1 },
          ],
        },
      ],
      operationBtns: [
        { key: "add", label: "添加", pos: "top", type: "primary" },
        { key: "edit", label: "编辑" },
        { key: "delete", label: "删除" },
      ],
      formItems: [
        {
          key: "beanName",
          label: "任务名称",
          rule: [
            { required: true, message: "请输入任务名称！", trigger: "blur" },
          ],
        },
        {
          key: "params",
          label: "参数",
          rule: [
            { required: true, message: "请输入任务参数！", trigger: "blur" },
          ],
        },
        {
          key: "cronExpression",
          label: "运行时间",
          rule: [
            { required: true, message: "请输入运行时间！", trigger: "blur" },
          ],
        },
        { key: "remark", label: "备注" },
        { key: "state", label: "状态", type: "switch" },
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
      this.$store.dispatch("schedule/queryList", this.params).then((res) => {
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
            this.$store.dispatch("schedule/deleteSchedule", row.id).then(() => {
              this.$message.success("删除成功！");
            });
          },
        });
      } else if (event === "add") {
        this.fromVisible = true;
        this.formData = {};
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
    submitHandel(data) {
      this.$store
        .dispatch(`schedule/${data.id ? "update" : "save"}Schedule`, data)
        .then((res) => {
          this.$message.success("保存成功！");
          this.fromVisible = false;
          this.initData();
        });
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