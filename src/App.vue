<template>
  <div id="app">
    <share-mask v-show="$store.state.app.isShowShare"/>
    <router-view/>
  </div>
</template>

<script>
  import {wxShare, wxConfig} from "./utils/wxShare";
  import {CookieUtil} from "./utils";
  import shareMask from "@/components/share-mask"

  export default {
    name: 'App',
    components: {
      shareMask
    },
    mounted() {
      let wxId = CookieUtil.get('wxId')
      wxShare(wxConfig(wxId), () => {
        console.log('wxShare callback!')
      })
    }
  }
</script>
