<template>
    <div>
        <Card class="logo" style="width:280px;height:280px;margin:20px auto;right:100px;top:110px;position:fixed">
            <div style="text-align:center">
                <img src="/src/img/logo.png" width="100px" height="100px" style="margin:40px; margin-bottom: 15px;">
                <h3>西二在线</h3>
                <p>引领潮流，当仁不让</p>
            </div>
        </Card>

        <div class="main">
            <h2>修改资料</h2>
            <Button type="ghost" icon="android-arrow-back" class="return" @click="$router.push({name:'userProjectList'})">取消</Button>
            <Form ref="formRep" :model="formRep" label-position="top" :rules="formRule">
                <Form-item label="项目名称" prop="name">
                    <Input v-model="formRep.name"></Input>
                </Form-item>
                <Form-item label="项目地址" prop="site_address">
                    <Input v-model="formRep.site_address"></Input>
                </Form-item>
                <Form-item label="项目描述" prop="description">
                    <Input v-model="formRep.description"></Input>
                </Form-item>
                <Form-item>
                    <Button type="success" @click="handleSubmit('formRep')">确认修改</Button>
                </Form-item>
            </Form>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      formRep: {
        name: "",
        description: "",
        site_address: "",
        date: ""
      },
      formRule: {
        name: [
          { required: true, message: "项目名称不能为空", trigger: "blur" }
        ],
        address: [
          { required: true, message: "项目地址不能为空", trigger: "blur" }
        ]
      }
    };
  },
  mounted: function() {
    this.formRep.name = this.$store.getters.getName;
    this.formRep.description = this.$store.getters.getDecription;
    this.formRep.site_address = this.$store.getters.getAddress;
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          var that = this;
          var instance = this.axios.create({
            headers: { "X-USER-TOKEN": this.$store.getters.getToken }
          });
          instance
            .put("/project/"+that.$store.getters.getId, {
              id: that.$store.getters.getId,  
              name: that.formRep.name,
              description: that.formRep.description,
              site_address: that.formRep.site_address,
            })
            .then(function(response) {
              console.log(response);
              that.$Message.success(response.data.info);
              that.$router.push({ name: "userProjectList" });
            })
            .catch(function(error) {
              console.log(error.response.data.info);
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
.main {
  position: relative;
  width: 58%;
  margin: 9px 0;
  line-height: 1.5;
}

h2 {
  padding-bottom: 6px;
  font-weight: normal;
  border-bottom: 1px solid rgb(225, 228, 232);
}

form {
  padding-top: 20px;
}

button {
  width: 140px;
  height: 32px;
  font-size: 14px;
}

.logo {
  display: block;
}
@media (max-width: 1200px) {
  .logo {
    display: none;
  }
}

.return {
  position: absolute;
  top: 0;
  right: 0;
  width: 70px;
  height: 30px;
  padding: 4px 10px;
  line-height: 0px;
}
</style>


