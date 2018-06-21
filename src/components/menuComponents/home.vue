<template>
<h1>主页</h1>
</template>
<script>
  import bus from '../../eventBus.js'
  export default {
    data() {
      return {
        editableTabsValue: '2',
        editableTabs: [{
          title: '主页',
          name: '1',
        }],
        tabIndex: 2
      }
    },
    methods: {
      handleTabsEdit(targetName, action) {
        if (action === 'remove') {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }
          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        }
      },
      mounted(){
        bus.$on('',function () {

        })
      }
    }
  }
</script>
