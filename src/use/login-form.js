import { computed, watch } from "vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import {useStore} from "vuex";
import {useRouter} from 'vue-router';

export function useLoginForm() {
  const { handleSubmit, isSubmitting, submitCount } = useForm();
  const store = useStore()
  const router = useRouter();


  const { value: email, errorMessage: eError, handleBlur: eBlur } = useField(
    "email",
    yup
      .string()
      .trim()
      .required("Please write your email")
      .email("Wrong email"),
  );

  const { value: password, errorMessage: pError, handleBlur: pBlur } = useField(
    "password",
    yup
      .string()
      .trim()
      .required()
      .min(8),
  );

  const onSubmit = handleSubmit(async (values) => {
    try {
      console.log(values);
      await store.dispatch("auth/login", values);
      router.push("/");
    } catch (e) {
      console.log(e)
    }
  })
  const tooManyAttempts = computed(() => submitCount.value >= 3);

  watch(tooManyAttempts, (val) => {
    if (val) {
      setTimeout(() => (submitCount.value = 0), 5000);
    }
  });

  return {
    email,
    password,
    eError,
    pError,
    eBlur,
    pBlur,
    onSubmit,
    isSubmitting,
    tooManyAttempts,
  };
}
