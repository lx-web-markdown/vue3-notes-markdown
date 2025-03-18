<template>
  <h6 class="headerTitle">
    {{ headerTitle }}
    <!-- <slot>{{titles}}</slot> -->
  </h6>
</template>

<script>
export default {
  name: 'titles',
  components: {},
  props: {
    headerTitle: {
      type: String,
      default: '',
    },
  },
  data() {
    return {};
  },
  created() { },
  mounted() { },
  activited() { },
  update() { },
  beforeRouteUpdate() { },
  methods: {},
  filter: {},
  computed: {},
  watch: {},
};
</script>

<style lang="scss" scoped>
.headerTitle {
  width: 100%;
  height: 50px;
  color: #fff;
  padding-left: 30px;
  line-height: 50px;
  font-size: 15px;
  background: url('../../../assets/dataList/bgTitle.png') no-repeat;
  background-size: 100% 100%;
}
</style>
