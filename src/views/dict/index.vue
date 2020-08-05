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
        {
          key: "dictTypeId",
          label: "字典类型",
          type: "select",
          selectUrl: "dictType/querySelect",
          labelName: "name",
          valueName: "id",
        },
        { key: "name", label: "名称" },
      ],
      tableCols: [
        { title: "字典类型", dataIndex: "dictTypeName" },
        { title: "字典名", dataIndex: "name" },
        { title: "字典值", dataIndex: "value" },
        { title: "创建时间", dataIndex: "createTime", type: "dateTime" },
      ],
      operationBtns: [
        { key: "add", label: "添加", pos: "top", type: "primary" },
        { key: "edit", label: "编辑" },
        { key: "delete", label: "删除" },
      ],
      formItems: [
        {
          key: "dictTypeId",
          label: "字典类型",
          type: "select",
          selectUrl: "dictType/querySelect",
          labelName: "name",
          valueName: "id",
          rule: [
            { required: true, message: "请选择字典类型！", trigger: "blur" },
          ],
        },
        {
          key: "name",
          label: "字典名",
          rule: [
            { required: true, message: "请输入字典名！", trigger: "blur" },
          ],
        },
        { key: "value", label: "字典值" },
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
      this.$store.dispatch("dict/queryList", this.params).then((res) => {
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
            this.$store.dispatch("dict/deleteDict", row.id).then(() => {
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
    paginationHandel(page, limit) {
      this.params.page = page;
      this.params.limit = limit;
      this.initData();
    },
    submitHandel(data) {
      this.$store
        .dispatch(`dict/${data.id ? "update" : "save"}Dict`, data)
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