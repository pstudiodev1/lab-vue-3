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
import { useAdd } from "./use/crud-category.js";

export default {
  name: "CategoryAdd",
  setup() {
    const { name, onSubmit } = useAdd();
    return { name, onSubmit };
  },
};
</script>

<style></style>
