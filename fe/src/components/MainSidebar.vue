<template>
  <nav
    class="sidebar"
  >
    <ElMenu
      :default-active="activeTab"
      :collapse="true"
    >
      <ElMenuItem
        index="Events"
        @click="$router.push({ name: 'Events' })"
      >
        <ElIcon><Calendar /></ElIcon>
        <template #title>
          Events
        </template>
      </ElMenuItem>
      <ElMenuItem
        index="Users"
        @click="$router.push({ name: 'Users' })"
      >
        <ElIcon><User /></ElIcon>
        <template #title>
          Users
        </template>
      </ElMenuItem>
    </ElMenu>
  </nav>
</template>

<script>
  export default {
    name: 'MainSidebar',
    computed: {
      /**
       * Show the active tab based on the current route
       *
       * @returns {string}
       */
      activeTab() {
        if (this.$route.name?.match(/event/i)) {
          return 'Events';
        }

        if (this.$route.name?.match(/user/i)) {
          return 'Users';
        }

        return null;
      },
    },
  };
</script>

<style lang="scss">
.sidebar {
  position: fixed;
  left: 0;
  bottom: 0;
  top: 60px;
  display: flex;

  .el-menu {
    flex: 1 0 auto;
  }
}
</style>
