import { queryList, queryInfo, saveDict, updateDict, deleteDict } from '@/api/dict'

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
    queryInfo({ commit }, id) {
        return queryInfo(id);
    },
    saveDict({ commit }, data) {
        return saveDict(data);
    },
    updateDict({ commit }, data) {
        return updateDict(data);
    },
    deleteDict({ commit }, id) {
        return deleteDict(id);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
