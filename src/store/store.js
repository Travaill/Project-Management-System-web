import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    userName: '',
    user: '',
    token: '',
    level: '',
    userId: '',
    projectDetail: {
        id: '',
        date:'',
        name: '',
        uploader: '',
        grade: '',
        description: '',
        detail: '',
        address: '',
        partner: {},
        contract: '',
        service: '',
        start_time: '',
        end_time: ''
    },
};

const mutations = {
    setUserName(state, userName) {
        state.userName = userName;
    },
    setUser(state, user) {
        state.user = user;
        window.localStorage.setItem('currentUser', user);
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
    setAddress(state, address) {
        state.projectDetail.address = address;
    },
    setId(state, id) {
        state.projectDetail.id = id;
    },
    setUserId(state, userId) {
        state.userId = userId;
    },
    setDate(state, date) {
        state.projectDetail.date = date;
    },
    logout(state) {
        state.token = null;
        state.level = null;
        state.userName = null;
        state.user = null;
        state.token = null;
        state.level = null;
        state.userId = null;
        window.localStorage.clear();
    }
};

const getters = {
    getUserName: state => {
        return state.userName;
    },
    getUser: state => {
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
    getDate: state => {
        return state.projectDetail.date;
    },
    getPartner: state => {
        return state.projectDetail.partner;
    },
    getAddress: state => {
        return state.projectDetail.address;
    },
    getId: state => {
        return state.projectDetail.id;
    },
    getUserId: state => {
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