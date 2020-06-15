<template>
  <a-card :loading="loading">
    <search-bar />
    <table-page :table-cols="tableCols" :table-datas="tableDatas" />
    <pagination :total="100" />
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
        { title: "Name", dataIndex: "name" },
        { title: "Address", dataIndex: "address" },
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
          type: "action",
          events: [
            { name: "详情", key: "detail" },
            { name: "编辑", key: "edit" }
          ]
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
          status: 3,
          address: "London, Park Lane no.",
          createTime: 1592209572736
        }
      ]
    };
  }
};
</script>
<style scoped>
.ant-card {
  min-height: calc(100vh - 64px);
}
</style>