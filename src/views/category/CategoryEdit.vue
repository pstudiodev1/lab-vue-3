<template>
  <div class="container-fluid px-4">
    <h1>Edit {{ name }}</h1>
    <div class="row">
      <div class="col-xl-6">
        <form @submit.prevent="onSubmit">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input
              v-model="name"
              type="text"
              class="form-control"
              id="name"
              placeholder="Category name"
            />
          </div>
          <button type="submit" class="btn btn-primary">Edit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import Swal from "sweetalert2";
import { BASE_API_URL } from "../../constants";

export default {
  name: "CategoryEdit",
  setup() {
    const id = ref(0);
    const name = ref("");
    const router = useRouter();
    const route = useRoute();

    const getCategoryById = async (id) => {
      try {
        const response = await axios.get(`${BASE_API_URL}/api/category/${id}`);
        name.value = response.data.name;
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(() => {
      id.value = route.params.id;
      getCategoryById(id.value);
    });

    const onSubmit = async () => {
      try {
        const response = await axios.put(`${BASE_API_URL}/api/category`, {
          id: id.value,
          name: name.value,
        });
        await Swal.fire("Good job!", response.data.message, "success");
        router.replace("/category");
      } catch (error) {
        console.log(error);
      }
    };

    return { name, onSubmit };
  },
};
</script>

<style></style>
