import { userMenuList } from '@/api/menu'


const state = {
    roles: []
}

const mutations = {
    SET_ROLES: (state, roles) => {
        state.roles = roles
    }
}

const actions = {
    userMenuList({ commit }) {
        return new Promise((resolve, reject) => {
            userMenuList().then(response => {
                const { data } = response
                commit('SET_ROLES', data)
                resolve();
            }).catch(error => {
                reject(error)
            })
        })
    }
    
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
