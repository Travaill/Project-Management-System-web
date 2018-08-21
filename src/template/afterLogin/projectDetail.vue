<template>
    <div class="main">
        <div class="project">
            <div class="head">
                <h2>{{name}}</h2>
                <Button type="ghost" icon="android-arrow-back" class="return" @click="$router.push({name:'userProjectList'})">返回</Button>
            </div>
            <div class="date">
                <p>项目时间：</p>
                <p>{{date}}</p>
            </div>
            <div class="IP">
                <p>项目地址：</p>
                <p>
                    <a>{{address}}</a>
                </p>
            </div>
            <div class="description"> 
                <p>项目描述：</p>
                <p style="min-width: 180px; min-height: 140px; border: 1px solid #d7dde4; border-radius: 3px; padding: 8px 10px;">{{description}}</p>
            </div>
            <div class="bttn">
                <Button class="outside" @click="$router.push({name:'projectInfoChg'})">修改</Button>
                <Button type="error" @click="modal2 = true" class="outside">删除</Button>
            </div>

            <Modal v-model="modal2" width="20" @on-ok='handleDelete()' class="bton">
                <p slot="header" style="color:#f17d01; text-align:center;">
                    <Icon type="information-circled"></Icon>
                    <span>删除确认</span>
                </p>
                <div style="text-align:center;">
                    <p>是否确认删除该项目？</p>
                </div>
            </Modal>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      description: "",
      address: "",
      modal2: false,
      date:"",
    };
  },
  mounted: function() {
    this.name = this.$store.getters.getName;
    this.description = this.$store.getters.getDecription;
    this.address = this.$store.getters.getAddress;
    this.members = this.$store.getters.getPartner;
     this.date = this.$store.getters.getDate;
  },
  methods: {
    handleClose(event, name) {
      const index = this.formRep.members.indexOf(name);
      this.formRep.members.splice(index, 1);
    },
    handleDelete() {
      var instance = this.axios.create({
        headers: { "X-USER-TOKEN": this.$store.getters.getToken }
      });
      var that = this;
      instance
        .delete("/project/" + that.$store.getters.getId)
        .then(function(response) {
          console.log(response);
          that.$Message.success(response.data.info);
          that.$router.push({ name: "userProjectList" });
        })
        .catch(function(error) {
          console.log(error);
          that.$Message.error(error.response.data.info);
          that.$router.push({ name: "projectList" });
        });
    }
  }
};
</script>

<style scoped>
.project {
  width: 50%;
  margin: 9px 0;
  line-height: 1.5;
  min-height: 500px;
}

.head {
  position: relative;
  padding-bottom: 6px;
  border-bottom: 1px solid rgb(225, 228, 232);
  height: 32px;
}

.head h2 {
  font-weight: bold;
}

p {
  margin: 15px 4px 10px 0;
  font-size: 14px;
}

.IP {
  margin-top: 10px;
}


.contribute {
  clear: both;
}

.contribute p {
  line-height: 3px;
}



.bttn {
  font-size: 14px;

}

button:hover {
  color: white;
  background-color: #fe8e08;
  border-color: #fe8e08;
}

.outside {
  margin: 20px 5px 20px 0;
  width: 70px;
  height: 30px;
  line-height: 0px;
  color: #fff;
  background-color: #18be6a;
  border-color: #18be6a;
}

.lew-head {
  text-align: center;
  font-size: 18px;
  margin: 7.5px 1px;
}

#submit {
  width: 100%;
  border: 1px solid #24292e;
  background-color: #24292e;
}

.return {
  position: absolute;
  top: 0;
  right: 0;
  height: 30px;
  padding: 4px 10px;
  line-height: 0px;
}
</style>
