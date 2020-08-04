import { queryList, querySelect, queryInfo, saveRole, updateRole, deleteRole } from '@/api/role'

const state = {}

const mutations = {}

const actions = {
    queryList({ commit }, params) {
        return new Promise(resolve => {
            queryList(params).then(response => {
                resolve(response.data)
            });
        })
    },
    querySelect({ commit }, params) {
        return querySelect(params);
    },
    queryInfo({ commit }, id) {
        return queryInfo(id);
    },
    saveRole({ commit }, data) {
        return saveRole(data);
    },
    updateRole({ commit }, data) {
        return updateRole(data);
    },
    deleteRole({ commit }, id) {
        return deleteRole(id);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
