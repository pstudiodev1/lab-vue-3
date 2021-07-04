<template>
  <div class="container-fluid px-4">
    <div class="row">
      <div class="col-xl-12 col-md-12">
        <h1>สินค้า</h1>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Detail</th>
              <th scope="col">Date</th>
              <th scope="col">View</th>
              <th scope="col">Picture</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in products" :key="item.id">
              <th scope="row">{{ item.id }}</th>
              <td>{{ item.title }}</td>
              <td>{{ item.detail }}</td>
              <td>{{ item.date }}</td>
              <td>{{ item.view }}</td>
              <td><img :src="item.picture" width="150" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  name: "Product",
  setup() {
    const products = ref([]);

    const getData = async () => {
      const response = await axios.get(
        "https://api.codingthailand.com/api/course"
      );

      products.value = response.data.data;
      // console.log(products.value);
    };

    onMounted(() => {
      getData();
    });

    return { products };
  },
};
</script>

<style></style>
