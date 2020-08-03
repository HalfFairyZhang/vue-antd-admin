<template>
  <a-card :loading="loading">
    <search-bar />
    <table-page
      :table-cols="tableCols"
      :table-datas="tableDatas"
      :operationBtns="operationBtns"
      @operationHandel="operationHandel"
    />
    <pagination :total="total" :limit="10" :page="0" @pagination="paginationHandel" />
  </a-card>
</template>
<script>
import SearchBar from "@/components/SearchBar";
import TablePage from "@/components/TablePage";
import Pagination from "@/components/Pagination";
export default {
  components: {
    SearchBar,
    TablePage,
    Pagination
  },
  data() {
    return {
      loading: false,
      tableCols: [
        { title: "姓名", dataIndex: "name" },
        { title: "地址", dataIndex: "address" },
        {
          title: "状态",
          dataIndex: "status",
          type: "select",
          selectData: [
            { label: "在线", value: 0 },
            { label: "离线", value: 1 }
          ]
        },
        { title: "创建时间", dataIndex: "createTime", type: "dateTime" },
        {
          title: "操作",
          type: "action"
        }
      ],
      operationBtns: [
        {
          key: "add",
          label: "添加",
          pos: "top",
          type: "primary"
        },
        {
          key: "export",
          label: "导出",
          pos: "top",
          type: "default"
        },
        {
          key: "Import",
          label: "导入",
          pos: "top",
          type: "default"
        },
        {
          key: "edit",
          label: "编辑",
          pos: "row"
        },
        {
          key: "delete",
          label: "删除",
          pos: "row",
          confirm: true
        }
      ],
      tableDatas: [
        {
          key: 1,
          name: "111",
          status: 0,
          address: "London, Park Lane no.",
          createTime: 1592209572736
        },
        {
          key: 2,
          name: "222",
          status: 1,
          address: "London, Park Lane no.",
          createTime: 1592209572736
        }
      ],
      total: 2,
      limit: 10,
      page: 0
    };
  },
  methods: {
    operationHandel(record, event) {
      console.log(record);
      console.log(event);
    },
    paginationHandel(page, limit) {
      console.log(page);
      console.log(limit);
    }
  }
};
</script>
<style scoped>
.ant-card {
  min-height: calc(100vh - 64px);
  margin: 24px 24px 0;
}
</style>