<template>
  <v-form>ff
    <v-col v-for="(f,name) in form" :key="f"  v-once>
      <component :is="renderitem(name)" :label="name" :items="isHaveOption(name)" 
      v-model="form[name]"></component>
    </v-col>

    <v-btn  color="success" class="mr-4" @click="savedata">Validate</v-btn>

    <v-btn color="error" class="mr-4">Reset Form</v-btn>
  </v-form>
</template>

<script>
export default {
  name: "formbuild",
  props: {
    apiname: String
  },
  data() {
    return {
      form: {
        id: 1,
        name: "vilasone",
        lastname: "sterss",
        age: 12,
        sex: 0,
        img : "https://raw.githubusercontent.com/salomonelli/best-resume-ever/master/src/assets/profile-images/guy.png"
      },
      formconfig: [
        {
          model: "sex",
          option: {
            data: ["Male", "Female"],
            autovalue: true
          }
        },
        {
          model : "img",
          type : "img"
        }
      ]
    };
  },
  methods: {

    savedata(){
      alert(JSON.stringify(this.form))
    },

    getInputType(name) {},

    isHaveConfig(model) {
      return this.formconfig.findIndex(f => f.model === model); // find option
    },

    renderitem(name) {
      var r = "v-text-field";
      var indexOf = this.isHaveConfig(name);
      if (indexOf !== -1) {
        //alert(name);
        //this.formconfig[indexOf].
        r = "v-select";
      }
      return r;
    },
    isHaveOption(name) {
      var r = [];
      var indexOf = this.formconfig.findIndex(f => f.model === name); // find option
      if (indexOf !== -1) {
        r = this.formconfig[indexOf].option.data;
      }
      return r;
    }
  }
};
</script>


