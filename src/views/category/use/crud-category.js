import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import Swal from "sweetalert2";
import { BASE_API_URL } from "../../../constants";

export function useIndex() {
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
      const response = await axios.delete(`${BASE_API_URL}/api/category/${id}`);
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
}

//
//
//
export function useAdd() {
  const name = ref("");
  const router = useRouter();

  //
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

  //
  return { name, onSubmit };
}

//
//
//
export function useEdit() {
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
}
