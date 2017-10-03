import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
    user:'',
    token: '',
    level: '',
    userId:'',
    projectDetail: {
        id: '',
        name: '',
        uploader: '',
        grade: '',
        description: '',
        detail: '',
        site_address: '',
        git_address: '',
        partner: {},
        contract: '',
        service: '',
        start_time: '',
        end_time: ''
    },
};

const mutations = {
    setUser(state, user) {
        state.user = user;
    },
    setToken(state, token) {
        state.token = token;
        window.localStorage.setItem('currentUser_token', token);
    },
    setLevel(state, level) {
        state.level = level;
        window.localStorage.setItem('currentUser_level', level);
    },
    setName(state, name) {
        state.projectDetail.name = name;
    },
    setDecription(state, description) {
        state.projectDetail.description = description;
    },
    setPartner(state, partner) {
        state.projectDetail.partner = partner;
    },
    setAddress(state, git_address) {
        state.projectDetail.git_address = git_address;
    },
    setId(state, id) {
        state.projectDetail.id = id;
    },
    setUserId(state, userId) {
        state.userId = userId;
    },
    logout(state) {
        state.token = null;
        state.level = null;
        window.localStorage.clear();
    }
};

const getters = {
    getUser:state => {
        return state.user;
    },
    getToken: state => {
        return state.token;
    },
    getLevel: state => {
        return state.level;
    },
    getName: state => {
        return state.projectDetail.name;
    },
    getDecription: state => {
        return state.projectDetail.description;
    },
    getPartner: state => {
        return state.projectDetail.partner;
    },
    getAddress: state => {
        return state.projectDetail.git_address;
    },
    getId: state => {
        return state.projectDetail.id;
    },
    getUserId:state => {
        return state.userId;
    },
};

const actions = {
};


export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
});