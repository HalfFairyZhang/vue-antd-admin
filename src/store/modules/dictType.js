import { queryList,querySelect, queryInfo, saveDictType, updateDictType, deleteDictType } from '@/api/dictType'

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
    saveDictType({ commit }, data) {
        return saveDictType(data);
    },
    updateDictType({ commit }, data) {
        return updateDictType(data);
    },
    deleteDictType({ commit }, id) {
        return deleteDictType(id);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
