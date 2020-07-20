<template>
  <div>
    <v-btn @click="newitem">New Item</v-btn>
    <v-data-table :headers="columns" :items="value" class="elevation-1">
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small>mdi-delete</v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">Open Dialog</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col v-for="(v,name) in form" :key="v" cols="12">
                <v-text-field :label="getHead(name)" v-model="form[name]"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Close</v-btn>
          <v-btn color="blue darken-1" text @click="saveitem">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "datatable",
  props: {
    sources: Array,
    value: Array,
    renderoption: Object,
    columns: Array,
    cols: Array,
    igoreColumns: Array,
    apiname: String,
    dialogform: Boolean
  },

  mounted() {
    //this.columns = Object.values(this.renderoption);
    //var fields = Object.keys(this.renderoption);

    var url = this.baseurl + this.apiname;

    axios.get(url).then(rs => {
      this.value = rs.data;
      this.cutcol();
      this.form = this.value[0];
      this.$emit("input", rs.data);
    });
  },

  data() {
    return {
      baseurl: "https://jsonplaceholder.typicode.com/",
      dialog: false,
      editIndex: 0,
      form: {},
      savestate: 0
    };
  },

   watch: {
    editIndex: function (newindex, oldindex) {
      this.form = this.value[newindex];
    }
  },

  methods: {

    newitem() {
      this.savestate = 0;
      this.dialog = true;
    },

    close(){
      this.dialog = false;
      this.clearform();
    },

    clearform() {
      for (f in this.form) {
        this.form[f] = "";
      }
    },

    saveitem() {
      alert(JSON.stringify(this.form));
      this.dialog = false;
      this.clearform();
    },
    getHead(v) {
      //alert(v);
      var indexof = this.columns.findIndex(c => c.value == v);
      if (indexof == -1) {
        indexof = 1;
      }
      return this.columns[indexof].text;
    },
    editItem(item) {
      //var url = this.baseurl + this.apiname + "/" + item.id;
      //alert(url);
      this.editIndex = this.value.findIndex(v => v.id === item.id);
      alert(this.editIndex)
      this.dialog = true;
    },
    cutcol() {
      this.value.forEach(d => {
        this.igoreColumns.forEach(col => {
          delete d[col];
        });
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
