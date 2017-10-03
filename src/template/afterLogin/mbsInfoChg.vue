<template>
    <div class="main">
        <div class="info">
            <Button type="ghost" icon="android-arrow-back" style="height: 30px; padding: 4px 10px; line-height: 0px;" @click="$router.push({name:'membersInfo'})">返回</Button>
            <Row class="row" style="margin-top: 30px;">
                <Col span="12">
                <div style="width: 198px; height: 215px; border: 1px solid #d7dde4; text-align: center; border-radius: 3px;">
                    <img :src="pic" style="width: 176px; height: 190px; margin-top: 12px;">
                </div>
                </Col>
                <Col span="12">
                <h2>{{name}}</h2>
                <p>方向：{{direct}}</p>
                <p>届数：{{grade}}</p>
                <p>QQ：{{qq}}</p>
                <p>微信：{{wechat}}</p>
                <p>邮箱：{{email}}</p>
                </Col>
            </Row>
            <Form ref="form" :model="form" :rule="formRule" :label-width="90">
                <Row class="row" style="border-top: 1px solid #d7dde4; margin-top: 50px;">
                    <Col>
                    <p>方向设置：</p>
                    <Form-item prop="direct">
                        <RadioGroup v-model="form.directChg" type="button" style="margin: 10px 0px 0px -90px;">
                            <Radio label="FE"></Radio>
                            <Radio label="PHP"></Radio>
                            <Radio label="JAVA"></Radio>
                            <Radio label="Android"></Radio>
                            <Radio label="iOS"></Radio>
                            <Radio label="Unity3D"></Radio>
                            <Radio label="null"></Radio>
                        </RadioGroup>
                    </Form-item>
                    <p>权限设置：</p>
                    <Form-item prop="level">
                        <RadioGroup v-model="form.position" type="button" style="margin: 10px 0px 0px -90px;">
                            <Radio label="游客"></Radio>
                            <Radio label="考核成员"></Radio>
                            <Radio label="正式成员"></Radio>
                            <Radio label="小组长"></Radio>
                            <Radio label="负责人"></Radio>
                        </RadioGroup>
                    </Form-item>
                    <Button type="success" @click="handleSubmit('form')" style="position: absolute; right: 10px; top: 130px;">确认</Button>
                    </Col>
                </Row>
            </Form>
        </div>

        <div class="projects">
            <h2>参与的项目（{{num}}）</h2>
            <Input icon="ios-search-strong" placeholder="search" style="width: 95%; margin: 15px 10px; margin-bottom: 0px;"></Input>
            <Row>
                <Col style="padding: 10px;">
                <Tabs value="name">
                    <TabPane label="All" name="all">
                        <ul>
                            <li v-for="(item,index) in projectList" v-bind:key="item.name">
                                <Icon type="ios-paper-outline" class="icons"></Icon>
                                <a @click="handleClick(index)">{{item.name}}</a>
                            </li>
                        </ul>
                    </TabPane>
                </Tabs>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pic: '',
            name: '',
            direct: '',
            grade: '',
            qq: '',
            wechat: '',
            email: '',
            num: '',
            form: {
                directChg: '',
                position: ''
            },
            formRule: {
                level: [
                    { required: true, message: '权限不能为空', trigger: 'blur' }
                ],
                direct: [
                    { required: true, message: '权限不能为空', trigger: 'blur' }
                ]
            },
            projectList: []
        }
    },
    mounted: function() {
        var instance = this.axios.create({
            headers: { 'X-USER-TOKEN': this.$store.getters.getToken }
        });
        var that = this;
        instance.get('/index.php//Manger/name/' + that.$store.getters.getUserId)
            .then(function(response) {
                console.log(response);
                that.pic = response.data.data.pic;
                that.name = response.data.data.name;
                that.direct = response.data.data.direct;
                that.grade = response.data.data.grade;
                that.qq = response.data.data.qq;
                that.wechat = response.data.data.wechat;
                that.email = response.data.data.email;
                that.projectList = response.data.data.project;
                that.num=that.projectList.length;
            })
            .catch(function(error) {
                console.log(error);
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
                    instance.put('/index.php/Manger/name/' + that.$store.getters.getUserId, {
                        position: that.form.position,
                        direct: that.form.directChg
                    })
                        .then(function(response) {
                            console.log(response);
                            that.$Message.success(response.data.info)
                            that.$router.push({ name: 'membersInfo' })
                        })
                        .catch(function(error) {
                            console.log(error);
                        });
                } else {
                    that.$Message.error('error');
                }
            })
        },
    },

}
</script>

<style scoped>
.main {
    position: relative;
    width: 92%;
    min-height: 520px;
    margin: 10px 10px;
    line-height: 1.5;
}

.info {
    position: absolute;
    left: 0px;
    width: 500px;
}

.projects {
    position: absolute;
    top: 62px;
    left: 530px;
    width: 400px;
    border: 1px solid #d7dde4;
    background-color: #FAFAFA;
    padding-bottom: 8px;
    border-radius: 3px;
}

.projects h2 {
    font-size: 17px;
    font-weight: normal;
    padding: 8px 10px;
    border-bottom: 1px solid #d7dde4;
}

.row {
    width: 430px;
    margin: 20px 0;
}

.row h2 {
    margin-bottom: 10px;
}

.row p {
    line-height: 28px;
    margin-top: 10px;
    font-size: 15px;
}

button {
    font-size: 14px;
}

li {
    background-color: white;
    line-height: 26px;
    border-bottom: 1px dashed #d7dde4;
}

.icons {
    font-size: 18px;
    margin: 8px 6px 0px 15px;
}

li a {
    font-size: 15px;
    margin-left: 6px;
}
</style>
