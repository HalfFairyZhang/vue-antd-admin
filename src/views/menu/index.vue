<template>
  <a-card :loading="loading">
    <search-bar :searchItems="searchItems" :searchhandle="searchhandle" />
    <table-page
      :table-cols="tableCols"
      :table-datas="tableDatas"
      :operationBtns="operationBtns"
      @operationHandel="operationHandel"
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
import ModalForm from "@/components/ModalForm";

export default {
  components: {
    SearchBar,
    TablePage,
    ModalForm,
  },
  data() {
    return {
      loading: false,
      searchItems: [{ key: "name", label: "菜单名称" }],
      tableCols: [
        { title: "菜单名称", dataIndex: "name" },
        {
          title: "菜单类型",
          dataIndex: "type",
          type: "select",
          selectData: [
            { label: "菜单", value: 0 },
            { label: "按钮", value: 1 },
          ],
        },
        { title: "路由", dataIndex: "url" },
        { title: "排序", dataIndex: "sort" },
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
        { key: "delete", label: "删除" },
      ],
      formItems: [
        {
          key: "fid",
          label: "上级菜单",
          type: "treeSelect",
          selectUrl: "menu/querySelect",
          labelName: "name",
          valueName: "id",
        },
        { key: "name", label: "菜单名称" },
        {
          key: "type",
          label: "菜单类型",
          type: "select",
          selectData: [
            { label: "菜单", value: 0 },
            { label: "按钮", value: 1 },
          ],
        },
        { key: "icon", label: "图标" },
        { key: "url", label: "路由" },
        { key: "page", label: "页面" },
        { key: "perms", label: "权限" },
        { key: "sort", label: "排序", type: "number" },
        { key: "state", label: "状态", type: "switch" },
      ],
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
      this.$store
        .dispatch("menu/queryList", { page: this.page, limit: this.limit })
        .then((res) => {
          this.tableDatas = res.data;
        });
    },
    searchhandle(params) {},
    operationHandel(row, event) {
      var vm = this;
      if (event === "delete") {
        vm.$confirm({
          title: "确定要删除此记录吗？",
          onOk() {
            vm.$store.dispatch("menu/deleteMenu", row.id).then(() => {
              vm.$message.success("删除成功！");
              this.initData();
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
    submitHandel(data) {
      this.$store
        .dispatch(`menu/${data.id ? "update" : "save"}Menu`, data)
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