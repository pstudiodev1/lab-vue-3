<template>
  <div class="container-fluid px-4">
    <h1>New</h1>
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
            {{ name }}
          </div>
          <button type="submit" class="btn btn-primary">Save</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { BASE_API_URL } from "../../constants";

export default {
  name: "CategoryAdd",
  setup() {
    const name = ref("");
    const router = useRouter();

    const onSubmit = async () => {
      try {
        const response = await axios.post(`${BASE_API_URL}/api/category`, {
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
