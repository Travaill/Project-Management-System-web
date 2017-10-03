<template>
    <div class="main">
        <h2>个人资料</h2>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
            <Row class="row">
                <Col span="13">
                <div style="position: relative;" @mouseover="hint()" @mouseout="dispear()">
                    <Upload action="//jsonplaceholder.typicode.com/posts/">
                        <img :src="formValidate.src" style="width:160px; height:170px; cursor:pointer;">
                        <div id="filter">更改头像</div>
                    </Upload>
                </div>
                </Col>
                <Col span="11">
                <Form-item prop="nickname">
                    <Input type="text" v-model="formValidate.nickname" placeholder="Username"></Input>
                </Form-item>
                </Col>
            </Row>
            <Row class="row" style="padding-top: 20px; border-top: 1px solid #eee;">
                <Col span="3" style="text-align: center;" prop="QQ">
                <p>QQ</p>
                </Col>
                <Col span="9">
                <Form-item prop="QQ">
                    <Input type="text" v-model="formValidate.QQ" placeholder="QQ"></Input>
                </Form-item>
                </Col>
                <Col span="3" style="text-align: center;" label="微信">
                <p>微信</p>
                </Col>
                <Col span="9">
                <Form-item prop="wechat">
                    <Input type="text" v-model="formValidate.wechat" placeholder="weichat"></Input>
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
                nickname: '',
                QQ: '',
                wechat: '',
                email: '',
                src: '',
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
        instance.get('/index.php/User/name')
            .then(function(response) {
                console.log(response);
                that.formValidate.nickname = response.data.data.nickname;
                that.formValidate.QQ = response.data.data.qq;
                that.formValidate.wechat = response.data.data.wechat;
                that.formValidate.email = response.data.data.email;
                that.formValidate.src = response.data.data.pic
            })
            .catch(function(error) {
                console.log(error);
            });
    },
    computed: {
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    var that = this;
                    var instance = this.axios.create({
                        headers: { 'X-USER-TOKEN': this.$store.getters.getToken }
                    });
                    instance.put('/index.php/User/name/1', {
                        name: that.formValidate.user,
                        qq: that.formValidate.QQ,
                        wechat: that.formValidate.wechat,
                        email: that.formValidate.email
                    })
                        .then(function(response) {
                            console.log(response);
                            that.$Message.success(response.data.info)
                            that.$router.push({ name: 'projectList' })
                        })
                        .catch(function(error) {
                            console.log(error);
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
    width: 340px;
    margin: 30px 0;
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