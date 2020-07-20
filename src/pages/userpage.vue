<template>
  <div>
    <datatable
      :igoreColumns="igore"
      v-model="sources"
      @input="startfilter"
      :columns="cols"
      apiname="users"
    />
  </div>
</template>

<script>
import datatable from "../components/datatable";

export default {
  name: "userpage",
  components: {
    datatable
  },
  data() {
    return {
      sources: [],
      cols: [
        { text: "ID", value: "id" },
        { text: "Name", value: "name" },
        { text: "Username", value: "username" },
        { text: "Email", value: "email" },
        { text: "Actions", value: "actions", sortable: false }
      ],
      igore: ["address", "company", "website", "phone"]
    };
  },
  mounted() {
    //setTimeout(rs => {
    //  alert(JSON.stringify(this.sources));
    //}, 3000);
  },

  methods: {
    startfilter(source) {
      //mutation data here
    }
  }
};
</script>

<style>
</style>
