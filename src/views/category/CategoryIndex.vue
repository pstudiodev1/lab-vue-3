<template>
  <div class="container-fluid px-4">
    <div class="row">
      <div class="col-xl-12 col-md-12">
        <table>
          <tbody>
            <tr>
              <td><h1>สินค้า</h1></td>
              <td>
                <div
                  v-if="isLoading"
                  class="spinner-border text-secondary"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <router-link to="/category/add" class="btn btn-primary"
          >Add
        </router-link>
        <div v-if="errorMessage.length" class="alert alert-danger" role="alert">
          {{ errorMessage }}
        </div>
        <table class="table" v-if="categories.length">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in categories" :key="item.id">
              <th scope="row">{{ item.id }}</th>
              <td>{{ item.name }}</td>
              <td>
                <router-link
                  :to="{ name: 'CategoryEdit', params: { id: item.id } }"
                  >Edit</router-link
                >
                |
                <a href="#" @click.prevent="deleteCategoryById(item.id)"
                  >Delete
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <div v-if="categories.length">
          <v-pagination
            v-model="page"
            :pages="totalPage"
            :range-size="1"
            active-color="#DCEDFF"
            @update:modelValue="getData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useIndex } from "./use/crud-category.js";
import VPagination from "@hennge/vue3-pagination";

export default {
  name: "CategoryIndex",
  components: { VPagination },
  setup() {
    const {
      categories,
      errorMessage,
      isLoading,
      deleteCategoryById,
      page,
      totalPage,
      getData,
    } = useIndex();

    return {
      categories,
      errorMessage,
      isLoading,
      deleteCategoryById,
      page,
      totalPage,
      getData,
    };
  },
};
</script>

<style></style>
