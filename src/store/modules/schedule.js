import { queryList, queryLogList, queryInfo, queryLogInfo, saveSchedule, updateSchedule, deleteSchedule, deleteScheduleLog } from '@/api/schedule'

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
    queryLogList({ commit }, params) {
        return new Promise(resolve => {
            queryLogList(params).then(response => {
                resolve(response.data)
            });
        })
    },
    queryInfo({ commit }, id) {
        return queryInfo(id);
    },
    queryLogInfo({ commit }, id) {
        return queryLogInfo(id);
    },
    saveSchedule({ commit }, data) {
        return saveSchedule(data);
    },
    updateSchedule({ commit }, data) {
        return updateSchedule(data);
    },
    deleteSchedule({ commit }, id) {
        return deleteSchedule(id);
    },
    deleteScheduleLog({ commit }, id) {
        return deleteScheduleLog(id);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
