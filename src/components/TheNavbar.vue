<template>
  <nav class="navbar">
    <h3>Online Bank</h3>
    
    <ul class="navbar-menu">
      <li class="-mb-px mr-1">
        <router-link
          to="/"
        >Zaiavki</router-link>
      </li>

      <li class="mr-1">
        <router-link
          to="/"        
        >Pomoshchi</router-link>
      </li>

      <li class="mr-1">
        <a
       
          href="#"
          >Messages</a
        >
      </li>
      <li class="mr-1">
        <a
          @click.prevent = "logout"
          href="#"
          >Exit</a
        >
      </li>
    </ul>
  </nav>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
  setup() {
    const router = useRouter()
    const store = useStore()

    return {
      logout: () => {
        store.commit('auth/logout')
        router.push('/auth')
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
