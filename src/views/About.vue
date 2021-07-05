<template>
  <div class="about">
    <h1>{{ imgUrl.url }}</h1>
    <a :href="googleUrl">Go to Google</a><br />
    <img :src="imgUrl.url" :alt="imgUrl.alt" v-if="isShow" />
    <button @click="greet">Click me</button>
  </div>
</template>

<script>
import { reactive, ref, onMounted, onUnmounted } from "vue";

export default {
  name: "About",
  components: {},
  setup() {
    const email = ref("cct@gmail.com");
    const googleUrl = ref("https://www.google.com");
    const imgUrl = reactive({
      url: "https://via.placeholder.com/100",
      alt: "test",
    });
    const isShow = ref(true);
    const greet = () => {
      // alert("Hello worl");
      email.value = "patt@gmail.com";
      // isShow.value = !isShow.value;
      imgUrl.url = "xxxxx";
    };

    onMounted(() => {
      // console.log("Mounted");
    });

    onUnmounted(() => {
      // console.log("Un Mounted");
    });

    return { email, googleUrl, imgUrl, isShow, greet };
  },
};
</script>
