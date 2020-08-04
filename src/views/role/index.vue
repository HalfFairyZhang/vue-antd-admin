<template>
  <a-card :loading="loading">
    <search-bar :searchDatas="searchDatas" :searchhandle="searchhandle" />
    <table-page
      :table-cols="tableCols"
      :table-datas="tableDatas"
      :operationBtns="operationBtns"
      @operationHandel="operationHandel"
    />
    <pagination :total="total" :limit="10" :page="0" @pagination="paginationHandel" />
    <modal-form
      :visibleModal="visibleModal"
      :formItems="formItems"
      @submit="submitHandel"
      @close="visibleModal=false"
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
      searchDatas: [
        {
          key: "name",
          label: "角色名",
        },
      ],
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
        {
          key: "add",
          label: "添加",
          pos: "top",
          type: "primary",
        },
        {
          key: "edit",
          label: "编辑",
          pos: "row",
        },
        {
          key: "perm",
          label: "设置权限",
          pos: "row",
        },
        {
          key: "delete",
          label: "删除",
          pos: "row",
          confirm: true,
        },
      ],
      tableDatas: [],
      formData: {},
      total: 0,
      limit: 10,
      page: 0,
      visibleModal: false,
      formItems: [
        {
          key: "name",
          label: "角色名",
          rule: [
            {
              required: true,
              message: "请输入角色名！",
              trigger: "blur",
            },
          ],
        },
        {
          key: "comment",
          label: "说明",
        },
        {
          key: "state",
          label: "状态",
          type:"switch"
        }
      ],
    };
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
          this.total = res.totalCount;
          this.limit = res.pageSize;
          this.page = res.currPage - 1;
        });
    },
    searchhandle(params) {

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
        this.visibleModal = true;
        this.formData = {};
      } else if (event === "edit") {
        this.visibleModal = true;
        this.formData = row;
      }
    },
    paginationHandel(page, limit) {
      this.page = page;
      this.limit = limit;
      this.initData();
    },
    submitHandel(data) {
      this.$store.dispatch("role/saveRole", data).then((res) => {
        this.$message.success("保存成功！");
        this.visibleModal = false;
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