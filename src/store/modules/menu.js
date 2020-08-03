import { userMenuList, queryList, queryInfo, saveMenu, updateMenu, deleteMenu } from '@/api/menu'

const state = {
    roles: []
}

const mutations = {
    SET_ROLES: (state, roles) => {
        state.roles = roles
    }
}

const actions = {
    queryUserMenuList({ commit }) {
        return new Promise((resolve, reject) => {
            userMenuList().then(response => {
                const { data } = response
                commit('SET_ROLES', data)
                resolve(data);
            }).catch(error => {
                reject(error)
            })
        })
    },
    queryList({ commit }, params) {
        return new Promise(resolve => {
            queryList(params).then(response => {
                resolve(response.data)
            });
        })
    },
    queryInfo({ commit }, id) {
        return queryInfo(id);
    },
    saveMenu({ commit }, data) {
        return saveMenu(data);
    },
    updateMenu({ commit }, data) {
        return updateMenu(data);
    },
    deleteMenu({ commit }, id) {
        return deleteMenu(id);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
