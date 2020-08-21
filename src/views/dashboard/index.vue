<template>
  <a-card :loading="loading">
    <div>首页</div>
    <gee-image style="width: 100px; height: 100px" :src="url" :preview-src-list="srcList" />
    <sub-table :columnItem="columnItem" :data-source="dataSource" />
  </a-card>
</template>
<script>
import GeeImage from "@/components/GeeImage";
import SubTable from "@/components/SubTable";

export default {
  components: {
    GeeImage,
    SubTable,
  },
  data() {
    return {
      loading: false,
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      srcList: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
        "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
      ],
      columnItem: [
        {
          title: "Demo1",
          dataIndex: "Demo1",
          scopedSlots: { customRender: "Demo1" },
        },
        {
          title: "Demo2",
          dataIndex: "Demo2",
          scopedSlots: { customRender: "Demo2" },
        },
        {
          title: "Demo3",
          dataIndex: "Demo3",
          scopedSlots: { customRender: "Demo3" },
        },
        {
          title: "operation",
          dataIndex: "operation",
          width:150,
          scopedSlots: { customRender: "operation" },
        },
      ],
      dataSource: [],
    };
  },
  created() {
    setTimeout(() => {
      this.dataSource = [
        {
          Demo1: `Edrward`,
          Demo2: 32,
          Demo3: `London Park no.`,
        },
        {
          Demo1: `Edrward`,
          Demo2: 32,
          Demo3: `London Park no.`,
        },
      ];
    }, 1000);
  },
};
</script>
<style scoped>
</style>