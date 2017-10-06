<template>
    <div class="main">
        <my-head></my-head>
        <div class="layout">
            <div class="layout-content">
                <Row>
                    <Col span="5">
                    <Menu width="70%" :open-names="['1','2','3','4']">
                        <Submenu name="1" v-if="$store.getters.getLevel >= 1">
                            <template slot="title">
                                <Icon type="ios-paper" class="icons"></Icon>
                                内容管理
                            </template>
                            <Menu-item name="1-1" style="padding:12px 0;">
                                <a @click="$router.push({name:'projectList'})" style="padding:12px 88px 12px 44px; color: #495060;">新增项目</a>
                            </Menu-item>
                            <Menu-item name="1-2" style="padding:12px 0;">
                                <a @click="$router.push({name:'projectList'})" style="padding:12px 88px 12px 44px; color: #495060;">所有项目</a>
                            </Menu-item>
                        </Submenu>
                        <Submenu name="2" v-if="$store.getters.getLevel >= 3">
                            <template slot="title">
                                <Icon type="ios-people" class="icons"></Icon>
                                成员管理
                            </template>
                            <Menu-item name="2-1">新增用户</Menu-item>
                            <Menu-item name="2-2" style="padding:12px 0;">
                                <a @click="$router.push({name:'membersInfo'})" style="padding:12px 60px 12px 44px; color: #495060;">所有用户</a>
                            </Menu-item>
                        </Submenu>
                         <Submenu name="3">
                            <template slot="title">
                                <Icon type="person-add" class="icons"></Icon>
                                考核管理
                            </template>
                            <a style="color:#495060">
                                <Menu-item name="3-1">
                                    新成员列表
                                </Menu-item>
                            </a>
                            <Menu-item name="3-2">考核任务发布</Menu-item>
                        </Submenu>
                        <Submenu name="4">
                            <template slot="title">
                                <Icon type="social-wordpress-outline" class="icons"></Icon>
                                关于我们
                            </template>
                            <a href="http://www.west2gold.com/" style="color:#495060">
                                <Menu-item name="4-1">
                                    西二在线
                                </Menu-item>
                            </a>
                            <Menu-item name="4-2">意见反馈</Menu-item>
                        </Submenu>
                    </Menu>
                    </Col>
                    <Col span="19">
                    <div class="layout-content-main">
                        <router-view></router-view>
                    </div>
                    </Col>
                </Row>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            test: false,
        }
    },
    methods: {

    },
    components: {
        'myHead': require('../template/afterLogin/header'),

    }
}
</script>

<style scoped>
.layout {
    border: 1px solid #d7dde4;
    background: #f2f2f3;
    height: 686px;
}

.layout-content {
    min-height: 200px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
}

.layout-content-main {
    padding: 25px 0;
}

.layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}

a:hover {
    color: #2d8cf0;
}

.icons {
    font-size: 16px;
}
</style>