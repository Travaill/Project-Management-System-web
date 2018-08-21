<template>
    <div class="sign-up">
        <h2>Register</h2>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
             <Form-item label="学号" prop="sn">
                <Input type="text" v-model="formValidate.sn" placeholder="student number">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </Form-item>
            <Form-item label="姓名" prop="name">
                <Input type="text" v-model="formValidate.name" placeholder="name">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
                </Input>
            </Form-item>
            <Form-item label="邮箱" prop="email">
                <Input type="text" v-model="formValidate.email" placeholder="Email">
                <Icon type="ios-email-outline" slot="prepend"></Icon>
                </Input>
            </Form-item>
            <Form-item label="密码" prop="password">
                <Input type="password" v-model="formValidate.password" placeholder="Password">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
                </Input>
            </Form-item>
            <Form-item label="确认密码" prop="passwdCheck">
                <Input type="password" v-model="formValidate.passwdCheck" placeholder="confirm_password">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
                </Input>
            </Form-item>
            <Form-item>
                <Button  type="success" long @click="handleSubmit('formValidate')">注册</Button>
            </Form-item>
        </Form>
    </div>
</template>

<script>
export default {
  data() {
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空！"));
      } else if (value !== this.formValidate.password) {
        callback(new Error("两次密码输入不同！"));
      } else {
        callback();
      }
    };
    return {
      formValidate: {
        email: "",
        name:"",
        password: "",
        passwdCheck: "",
        sn: ""
      },
      ruleValidate: {
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" }
        ],
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        password: [
          { required: true, message: "请填写密码", trigger: "blur" },
          {
            type: "string",
            min: 6,
            message: "密码长度不能小于6位",
            trigger: "blur"
          }
        ],
        passwdCheck: [{ validator: validatePassCheck, trigger: "blur" }],
        sn: [{ required: true, message: "学号不能为空", trigger: "blur" }]
      }
    };
  },

  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          var that = this;
          this.axios
            .post("/user", {
              sn: this.formValidate.sn,
              password: this.formValidate.password,
              email: this.formValidate.email,
              name:this.formValidate.name,
            })
            .then(function(response) {
              console.log(response); 
              that.$Message.success(response.data.info );
              that.$router.push({ name: "signIn" });
            })
            .catch(function(error) {
              console.log(error);
              that.$Message.error(error.response.data.info);
              that.$router.push({ name: "signIn" });
            });
        } else {
          that.$Message.error("error");
        }
      });
    }
  }
};
</script>

<style scoped>
.sign-up {
  padding-top: 60px;
  margin: 0px auto;
  height: 686px;
}

Form {
  width: 460px;
  margin: 20px auto;
  padding-right: 100px;
}

h2 {
  font-size: 26px;
  text-align: center;
}

button {
  font-size: 14px;
}
</style>
