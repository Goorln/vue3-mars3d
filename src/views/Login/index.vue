<template>
  <a-form
    :model="formState"
    name="basic"
    ref="formRef"
    :rules="rules"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="Username"
      name="username"
      :rules="[{ required: true, message: '请输入用户名!' }]"
    >
      <a-input v-model:value="formState.username" />
    </a-form-item>

    <a-form-item
      label="Password"
      name="password"
      :rules="[{ required: true, message: '请输入密码!' }]"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
      <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { reactive, ref, toRaw } from "vue";
import type { Rule } from "ant-design-vue/es/form";
import { useRouter } from "vue-router";
const router = useRouter();

interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

const formRef = ref();
const formState = reactive<FormState>({
  username: "",
  password: "",
  remember: true,
});

const rules: Record<string, Rule[]> = {
  username: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "change",
    },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};

const onFinish = (values: any) => {
  formRef.value
    .validate()
    .then(() => {
      console.log("values", formState, toRaw(formState));
      router.push("/");
    })
    .catch((error) => {
      console.log("error", error);
    });
  // console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
const goLogin = () => {
  router.push("/");
};
</script>
