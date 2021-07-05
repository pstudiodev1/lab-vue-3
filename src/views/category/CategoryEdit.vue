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
import { useEdit } from "./use/crud-category.js";

export default {
  name: "CategoryEdit",
  setup() {
    const { name, onSubmit } = useEdit();
    return { name, onSubmit };
  },
};
</script>

<style></style>
