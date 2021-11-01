<template>
  <form class="card" @submit.prevent="onSubmit">
    <h1>Loggin system</h1>

    <div :class="['form-control', {invalid: eError}]">
      <label for="email">email</label>
      <input type="email" id="email" v-model="email" @blur="eBlur">
      <small v-if="eError">{{eError}}</small>
    </div>

    <div :class="['form-control', {invalid: pError}]">
      <label for="password">password</label>
      <input type="password" id="password" v-model="password" @blur="pBlur">
      <small v-if="pError">{{pError}}</small>
    </div>

    <button class="btn primary" type="submit" :disabled="isSubmitting || tooManyAttempts">Submit</button>
    <span v-if="tooManyAttempts" class="text-danger">Too many attempts</span>
  </form>
</template>

<script>
import {useLoginForm} from "../use/login-form"
export default {
  setup() {
    return{...useLoginForm()}    
  }
};
</script>

