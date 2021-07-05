<template>
  <div class="about">
    <h1>{{ imgUrl.url }}</h1>
    <a :href="googleUrl">Go to Google</a><br />
    <img :src="imgUrl.url" :alt="imgUrl.alt" v-if="isShow" />
    <button @click="greet">Click me</button>
    <div>
      <h1>Upload file</h1>
      <form @submit.prevent="onSubmit" enctype="multipart/form-data">
        <input type="file" name="picture" ref="file" />
        <button type="submit">Upload</button>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted, onUnmounted } from "vue";
import axios from "axios";
import { BASE_API_URL } from "../constants";

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
    const file = ref(null);

    const greet = () => {
      // alert("Hello worl");
      email.value = "patt@gmail.com";
      // isShow.value = !isShow.value;
      imgUrl.url = "xxxxx";
    };

    const onSubmit = async () => {
      console.log(file.value.files[0]);
      const fileUpload = file.value.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(fileUpload);
      reader.onload = async (e) => {
        const base64Image = e.target.result;
        console.log(base64Image);
        const response = await axios.post(`${BASE_API_URL}/api/upload`, {
          picture: base64Image,
        });
        console.log(response.data);
      };
    };

    onMounted(() => {
      // console.log("Mounted");
    });

    onUnmounted(() => {
      // console.log("Un Mounted");
    });

    return { email, googleUrl, imgUrl, isShow, greet, onSubmit, file };
  },
};
</script>
