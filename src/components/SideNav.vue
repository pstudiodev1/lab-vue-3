<template>
  <div id="layoutSidenav_nav">
    <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div class="sb-sidenav-menu">
        <div class="nav">
          <div class="sb-sidenav-menu-heading">Main</div>
          <router-link class="nav-link" to="/">
            <div class="sb-nav-link-icon">
              <i class="fas fa-tachometer-alt"></i>
            </div>
            Dashboard
          </router-link>
          <router-link class="nav-link" to="/about">
            <div class="sb-nav-link-icon">
              <i class="fas fa-tachometer-alt"></i>
            </div>
            About
          </router-link>
          <div class="sb-sidenav-menu-heading">Secondary</div>
          <router-link class="nav-link" to="/product">
            <div class="sb-nav-link-icon">
              <i class="fas fa-tachometer-alt"></i>
            </div>
            Product
          </router-link>
          <router-link class="nav-link" to="/category">
            <div class="sb-nav-link-icon">
              <i class="fas fa-tachometer-alt"></i>
            </div>
            Category
          </router-link>
        </div>
      </div>
      <div class="sb-sidenav-footer" v-if="profile">
        <div class="small">Logged in as: {{ profile?.name }}</div>
        Email: {{ profile?.email }}
      </div>
    </nav>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "SideNav",
  setup() {
    const store = useStore();
    const profile = computed(() => store.state.profile);
    return {
      profile,
    };
  },
};
</script>

<style></style>
