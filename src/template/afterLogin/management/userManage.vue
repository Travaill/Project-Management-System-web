<template>
    <div class="main">
        <h2>个人资料</h2>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
            <Row class="row">
                <Col span="13">
                <div style="position: relative;" @mouseover="hint()" @mouseout="dispear()">
                    <Upload 
                    action="http://119.29.245.247/index.php/upload/name"  
                    :headers="{ 'X-USER-TOKEN': this.$store.getters.getToken }"
                    :format="['jpg','png']">
                        <img :src="formValidate.src" style="width:160px; height:170px; cursor:pointer;">
                        <div id="filter">更改头像</div>
                    </Upload>
                </div>
                </Col>
                <Col span="11">
                <Form-item prop="name">
                    <Input type="text" v-model="formValidate.name" placeholder="Username"></Input>
                </Form-item>
                </Col>
            </Row>
            <Row class="row" style="padding-top: 20px; border-top: 1px solid #eee;">
                <Col span="3" style="text-align: center;" prop="sn">
                <p>sn</p>
                </Col>
                <Col span="9">
                <Form-item prop="sn" style="margin-bottom: 0px;">
                    <p placeholder="sn">{{formValidate.sn}}</p>
                </Form-item>
                </Col>
            </Row>
            <Row class="row">
                <Col span="3" style="text-align: center;" label="邮箱">
                <p>邮箱</p>
                </Col>
                <Col span="21">
                <Form-item prop="email">
                    <Input type="text" v-model="formValidate.email" placeholder="Email"></Input>
                </Form-item>
                </Col>
            </Row>
            <Row class="row">
                <Col span="24">
                <Form-item>
                    <Button type="success" long @click="handleSubmit('formValidate')">确认</Button>
                </Form-item>
                </Col>
            </Row>
        </Form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formValidate: {
                name: '',
                sn: '',
                email: '',
                src: '/src/img/fzu.jpg',
            },
            ruleValidate: {
                nickname: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' },
                    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                ]
            }
        }
    },
    mounted: function() {
        var instance = this.axios.create({
            headers: { 'X-USER-TOKEN': this.$store.getters.getToken }
        });
        var that = this;
        instance.get('/user')
            .then(function(response) {
                console.log(response);
                that.formValidate.name = response.data.name;
                that.formValidate.sn = response.data.sn;
                that.formValidate.email = response.data.email;
                //that.formValidate.src = response.data.pic
            })
            .catch(function(error) {
                that.$Message.error(error.response.data.info);
            });
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    var that = this;
                    var instance = this.axios.create({
                        headers: { 'X-USER-TOKEN': this.$store.getters.getToken }
                    });
                    instance.put('/user', {
                        name: that.formValidate.name,
                        email: that.formValidate.email
                    })
                        .then(function(response) {
                            console.log(response);
                            that.$Message.success(response.data.info)
                            that.$router.push({ name: 'userProjectList' })
                        })
                        .catch(function(error) {
                            that.$Message.error(error.response.data.info);
                        });
                } else {
                    that.$Message.error('error');
                }
            })
        },
        hint() {
            var fil = document.getElementById('filter');
            fil.style.display = 'block';
        },
        dispear() {
            var fil = document.getElementById('filter');
            fil.style.display = 'none';
        }
    }
}
</script>

<style scoped>
.main {
    width: 92%;
    min-height: 507px;
    margin: 9px 0;
    line-height: 1.5;
}

h2 {
    padding-bottom: 6px;
    font-weight: normal;
    border-bottom: 1px solid rgb(225, 228, 232);
}

Form {
    width: 360px;
    margin: 20px 0;
}

.row {
    margin-bottom: 20px;
}

.row p {
    line-height: 30px;
}

button {
    font-size: 14px;
}

#filter {
    position: absolute;
    top: 138px;
    left: 0;
    width: 160px;
    height: 32px;
    background-color: #24292e;
    opacity: 0.5;
    color: white;
    text-align: center;
    line-height: 32px;
    font-size: 15px;
    font-family: Microsoft YaHei;
    display: none;
    cursor: pointer;
}
</style>