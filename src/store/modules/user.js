import { login, getInfo, logout } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
    token: getToken(),
    name: '',
    avatar: '',
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
    }
}

const actions = {
    login({ commit }, params) {
        console.log("login")
        const { username, password } = params;
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password.trim() }).then(response => {
                console.log(response)
                const { data } = response
                console.log(data)
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
    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                commit('SET_TOKEN', '')
                // commit('SET_ROLES', [])
                removeToken()
                resetRouter()
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            // commit('SET_ROLES', [])
            removeToken()
            resolve()
        })
    },
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}
