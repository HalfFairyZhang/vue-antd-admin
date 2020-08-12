<template>
  <a-card :loading="loading">
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
import TablePage from "@/components/TablePage";
import Pagination from "@/components/Pagination";
import ModalForm from "@/components/ModalForm";

export default {
  components: {
    TablePage,
    Pagination,
    ModalForm,
  },
  data() {
    return {
      loading: false,
      tableCols: [
        { title: "名称", dataIndex: "name" },
        { title: "排序", dataIndex: "sort" },
        { title: "创建时间", dataIndex: "createTime", type: "dateTime" },
      ],
      operationBtns: [
        { key: "add", label: "添加", pos: "top", type: "primary" },
        { key: "edit", label: "编辑" },
        { key: "delete", label: "删除" },
      ],
      formItems: [
        {
          key: "name",
          label: "名称",
          rule: [{ required: true, message: "请输入名称！", trigger: "blur" }],
        },
        { key: "sort", label: "排序" },
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
      this.$store.dispatch("dictType/queryList", this.params).then((res) => {
        this.tableDatas = res.list;
        this.params.total = res.totalCount;
      });
    },
    operationHandel(row, event) {
      if (event === "delete") {
        this.$confirm({
          title: "确定要删除此记录吗？",
          onOk() {
            this.$store.dispatch("dictType/deleteDictType", row.id).then(() => {
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
        .dispatch(`dictType/${data.id ? "update" : "save"}DictType`, data)
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