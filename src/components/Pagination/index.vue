<template>
  <div :class="{'hidden':hidden}" class="pagination-container">
    <a-pagination
      show-size-changer
      show-quick-jumper
      :total="total"
      :page-size-options="pageSizes"
      :v-model.sync="currentPage"
      :page-size.sync="pageSize"
      @change="handleCurrentChange"
      @showSizeChange="handleSizeChange"
    />
  </div>
</template>
<script>
export default {
  name: "Pagination",
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default() {
        return ["10", "20", "30", "50"];
      }
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentPage: this.page,
      pageSize: this.limit
    };
  },
  watch: {
    page(val) {
      this.currentPage = val;
    },
    limit(val) {
      this.pageSize = val;
    }
  },
  methods: {
    handleSizeChange(current, size) {
      this.$emit("update:limit", size);
      this.$emit("paginationHandel", { page: this.currentPage, limit: size });
    },
    handleCurrentChange(page) {
      this.$emit("update:page", page);
      this.$emit("paginationHandel", { page: page, limit: this.pageSize });
    }
  }
};
</script>
<style scoped>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
  float: right;
}
.pagination-container.hidden {
  display: none;
}
</style>