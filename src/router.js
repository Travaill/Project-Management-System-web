import App from './app.vue'

import beforeLogin from './views/beforeLogin.vue'


import afterLogin from './views/afterLogin.vue'

import signUp from './template/beforeLogin/signUp.vue'
import signIn from './template/beforeLogin/signIn.vue'

import creatNew from './template/afterLogin/creatNew.vue'
import projectList from './template/afterLogin/projectList.vue'
import passwdChg from './template/afterLogin/passwdChg.vue'
import projectInfoChg from './template/afterLogin/projectInfoChg.vue'
import projectDetail from './template/afterLogin/projectDetail.vue'
import userInfoChg from './template/afterLogin/userInfoChg.vue'
import membersInfo from './template/afterLogin/membersInfo.vue'
import mbsInfoChg from  './template/afterLogin/mbsInfoChg.vue'

const routers = [
    {
        path: '/',
        component: beforeLogin,
        children: [
            {
                path:'',
                name:'signIn',
                component:signIn
            },
            {
                path: 'signUp',
                name: 'signUp',
                component: signUp,
            }
        ]
    },
    {
        path: '/:userId',
        component: afterLogin,
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        children: [
            {
                path: 'projectList',
                name: 'projectList',
                component: projectList,
                meta: {
                    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                },
            },
            {
                path: 'creatNew',
                name: 'creatNew',
                component: creatNew,
                meta: {
                    requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                },
            },
            {
                path:'passwdChg',
                name:'passwdChg',
                component:passwdChg,
                meta: {
                    requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                },
            },
            {
                path:'projectInfoChg',
                name:'projectInfoChg',
                component:projectInfoChg,
                meta: {
                    requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                },
            },
            {
                path:'userInfoChg',
                name:'userInfoChg',
                component:userInfoChg,
                meta: {
                    requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                },
            },
            {
                path:'projectInfo/:projectId',
                name:'projectDetail',
                component:projectDetail,
                meta: {
                    requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                },
            },
            {
                path:'membersInfo',
                name:'membersInfo',
                component:membersInfo,
                meta: {
                    requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                },
            },
            {
                path:'mbsInfoChg/:name',
                name:'mbsInfoChg',
                component:mbsInfoChg,
                meta: {
                    requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                },
            }
        ]
    },
    
]   


export default routers;