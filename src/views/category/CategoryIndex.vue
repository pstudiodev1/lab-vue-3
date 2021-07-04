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
import { ref, onMounted } from "vue";
import axios from "axios";
import { BASE_API_URL } from "../../constants";
// import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import VPagination from "@hennge/vue3-pagination";

export default {
  name: "CategoryIndex",
  components: { VPagination },
  setup() {
    const categories = ref([]);
    const errorMessage = ref("");
    const isLoading = ref(true);
    // const router = useRouter();
    const page = ref(1);
    const totalPage = ref(0);

    const getData = async (page) => {
      try {
        isLoading.value = true;
        const response = await axios.get(
          `${BASE_API_URL}/api/category?page=${page}&page_size=10`
        );
        categories.value = response.data.data; // [{}]
        totalPage.value = response.data.last_page;
        // console.log(response.data);
      } catch (error) {
        //400, 500
        console.log(error);
        errorMessage.value = "เกิดข้อผิดพลาด กรุณาลองใหม่";
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      getData(page.value);
    });

    const deleteCategoryById = async (id) => {
      try {
        const response = await axios.delete(
          `${BASE_API_URL}/api/category/${id}`
        );
        await Swal.fire("Good job!", response.data.message, "success");
        // router.go("/category");
        // router.go(0);
        history.go(0);
      } catch (error) {
        errorMessage.value = "Error, please contact admin";
      } finally {
        isLoading.value = false;
      }
    };

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
