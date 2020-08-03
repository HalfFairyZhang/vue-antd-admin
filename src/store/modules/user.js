import { login, getInfo, logout, queryList, queryInfo, saveUser, updateUser, deleteUser } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
    token: getToken(),
    name: '',
    avatar: ''
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
}

const actions = {
    login({ commit }, params) {
        const { username, password } = params;
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password.trim() }).then(response => {
                const { data } = response
                commit('SET_TOKEN', data.token)
                setToken(data.token)
                resolve();
            }).catch(error => {
                reject(error)
            })
        })
    },
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const { data } = response
                if (!data) {
                    reject('验证失败，请重新登录')
                }
                const { name, avatar } = data
                commit('SET_NAME', name)
                commit('SET_AVATAR', avatar)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                commit('SET_TOKEN', '')
                commit('menu/SET_ROLES', [], { root: true })
                removeToken()
                resetRouter()
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('menu/SET_ROLES', [], { root: true })
            removeToken()
            resolve()
        })
    },
    queryUserList({ commit }, params) {
        return new Promise(resolve => {
            queryList(params).then(response => {
                resolve(response.data)
            });
        })
    },
    queryInfo({ commit }, id) {
        return queryInfo(id);
    },
    saveUser({ commit }, data) {
        return saveUser(data);
    },
    updateUser({ commit }, data) {
        return updateUser(data);
    },
    deleteUser({ commit }, id) {
        return deleteUser(id);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
