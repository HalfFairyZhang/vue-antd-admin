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
        { key: "nickname", label: "昵称" },
        { key: "username", label: "用户名" },
        { key: "phone", label: "手机号" },
      ],
      tableCols: [
        { title: "昵称", dataIndex: "nickname" },
        { title: "用户名", dataIndex: "username" },
        { title: "头像", dataIndex: "avatar" },
        { title: "手机号", dataIndex: "phone" },
        {
          title: "状态",
          dataIndex: "state",
          type: "select",
          selectData: [
            { label: "正常", value: 0 },
            { label: "冻结", value: 1 },
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
          key: "username",
          label: "用户名",
          rule: [
            { required: true, message: "请输入用户名！", trigger: "blur" },
          ],
        },
        {
          key: "password",
          label: "密码",
          rule: [{ required: true, message: "请输入密码！", trigger: "blur" }],
        },
        {
          key: "avatar",
          label: "头像",
          type: "uploadImage",
          action: "/api/resource/upload",
          name: "file",
        },
        {
          key: "nickname",
          label: "昵称",
          rule: [{ required: true, message: "请输入昵称！", trigger: "blur" }],
        },
        { key: "phone", label: "手机号" },
        { key: "email", label: "邮箱" },
        {
          key: "roleIdList",
          label: "角色",
          type: "select",
          multiple: true,
          selectUrl: "role/querySelect",
          labelName: "name",
          valueName: "id",
        },
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
      this.$store.dispatch("user/queryUserList", this.params).then((res) => {
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
            this.$store.dispatch("user/deleteUser", row.id).then(() => {
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
    paginationHandel({ page, limit }) {
      this.params.page = page;
      this.params.limit = limit;
      this.initData();
    },
    submitHandel(data) {
      this.$store
        .dispatch(`user/${data.id ? "update" : "save"}User`, data)
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