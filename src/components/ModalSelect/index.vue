
<template>
  <a-modal
    v-model="visible"
    @cancel="handelCancel"
    :title="title"
    destroyOnClose
    :maskClosable="false"
  >
    <template slot="footer">
      <a-button key="back" @click="handelCancel">取消</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="submitForm('modalForm')">保存</a-button>
    </template>
    <div class="tree">
      <a-tree
        v-model="checkedKeys"
        checkable
        :expanded-keys="expandedKeys"
        :auto-expand-parent="autoExpandParent"
        :selected-keys="selectedKeys"
        :tree-data="treeData"
        @expand="onExpand"
        @select="onSelect"
      />
    </div>
  </a-modal>
</template>
<script>
//复杂交互表单建议使用PageView
import Vue from "vue";

export default {};
</script>
<style lang="less" scoped>
</style>