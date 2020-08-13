
<template>
  <a-modal
    v-model="visible"
    @cancel="handelCancel"
    :title="treeParams.title"
    destroyOnClose
    :maskClosable="false"
  >
    <template slot="footer">
      <a-button key="back" @click="handelCancel">取消</a-button>
      <a-button key="submit" type="primary" @click="handelOk">确定</a-button>
    </template>
    <a-tree
      v-if="treeListData.length"
      v-model="checkedKeys"
      :tree-data="treeListData"
      :replaceFields="{title:treeParams.label,key:treeParams.key,children:'children'}"
      defaultExpandAll
      checkable
    />
  </a-modal>
</template>
<script>
export default {
  props: {
    visibleModal: {
      type: Boolean,
      default: false,
    },
    treeParams: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      visible: false,
      treeListData: [],
      treeData: {},
      checkedKeys: [],
    };
  },
  watch: {
    visibleModal: function (val) {
      this.visible = val;
      this.treeListData = [];
      this.checkedKeys = [];
      if (val) this.initData();
    },
  },
  methods: {
    initData() {
      this.$store.dispatch(this.treeParams.queryUrl, {}).then((res) => {
        this.treeListData = res.data;
        this.treeData = this.treeParams.treeData;
        this.ergodicTree(
          this.checkedKeys,
          this.treeData[this.treeParams.field + "List"],
          this.treeParams.key
        );
      });
    },
    //只取子节点ID
    ergodicTree(checkedKeys, treeData, key) {
      var vm = this;
      if (treeData) {
        treeData.forEach((item) => {
          if (item.children) {
            vm.ergodicTree(checkedKeys, item.children, key);
          } else {
            checkedKeys.push(item[key]);
          }
        });
      }
    },
    handelCancel() {
      this.visible = false;
      this.$emit("close");
    },
    handelOk() {
      this.treeData[this.treeParams.field + "IdList"] = this.checkedKeys;
      this.$emit("saveHandle", this.treeData);
    },
  },
};
</script>