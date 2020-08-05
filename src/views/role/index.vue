<template>
  <a-card :loading="loading">
    <search-bar :searchItems="searchItems" :searchHandle="searchHandle" />
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
    <modal-tree
      :treeParams="treeParams"
      :visibleModal="treeVisible"
      @close="treeVisible=false"
      @saveHandle="saveHandle"
    />
  </a-card>
</template>
<script>
import SearchBar from "@/components/SearchBar";
import TablePage from "@/components/TablePage";
import Pagination from "@/components/Pagination";
import ModalForm from "@/components/ModalForm";
import ModalTree from "@/components/ModalTree";

export default {
  components: {
    SearchBar,
    TablePage,
    Pagination,
    ModalForm,
    ModalTree,
  },
  data() {
    return {
      loading: false,
      searchItems: [{ key: "name", label: "角色名" }],
      tableCols: [
        { title: "角色名", dataIndex: "name" },
        { title: "说明", dataIndex: "comment" },
        {
          title: "状态",
          dataIndex: "state",
          type: "select",
          selectData: [
            { label: "启用", value: 0 },
            { label: "停用", value: 1 },
          ],
        },
        { title: "创建时间", dataIndex: "createTime", type: "dateTime" },
      ],
      operationBtns: [
        { key: "add", label: "添加", pos: "top", type: "primary" },
        { key: "edit", label: "编辑" },
        { key: "perm", label: "权限" },
        { key: "delete", label: "删除" },
      ],
      formItems: [
        {
          key: "name",
          label: "角色名",
          rule: [
            { required: true, message: "请输入角色名！", trigger: "blur" },
          ],
        },
        { key: "comment", label: "说明" },
        { key: "state", label: "状态", type: "switch" },
      ],
      params: { total: 0, limit: 10, page: 0 },
      treeParams: {},
      treeVisible: false,
      tableDatas: [],
      formData: {},
      fromVisible: false,
    };
  },
  watch: {
    fromVisible: function (val) {
      if (val) this.treeVisible = false;
    },
    treeVisible: function (val) {
      if (val) this.fromVisible = false;
    },
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.$store
        .dispatch("role/queryList", { page: this.page, limit: this.limit })
        .then((res) => {
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
            this.$store.dispatch("role/deleteRole", row.id).then(() => {
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
      } else if (event === "perm") {
        this.$store.dispatch("role/queryInfo", row.id).then((res) => {
          this.treeParams = {
            queryUrl: "menu/queryList",
            treeData: res.data,
            title: "编辑权限",
            label: "name",
            key: "id",
            field: "menu",
          };
          this.treeVisible = true;
        });
      }
    },
    paginationHandel(page, limit) {
      this.params.page = page;
      this.params.limit = limit;
      this.initData();
    },
    submitHandel(data) {
      this.$store
        .dispatch(`role/${data.id ? "update" : "save"}Role`, data)
        .then((res) => {
          this.$message.success("保存成功！");
          this.fromVisible = false;
          this.initData();
        });
    },
    saveHandle(data) {
      this.$store.dispatch("role/updateRole", data).then((res) => {
        this.$message.success("保存成功！");
        this.treeVisible = false;
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