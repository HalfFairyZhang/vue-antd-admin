import { constantRoutes } from '@/router'
import Layout from '@/layout'

const notFound = { path: '*', redirect: '/404', hidden: true }

/**
 * 根据菜单生成路由
 * @param {} menus 
 * @param {*} depth 
 */
export function filterAsyncRoutes(menus, depth = 0) {
  var res = []
  menus.forEach(menu => {
    var modulePath = depth == 0 ? `/${menu.url}` : menu.url;
    var tmp = {
      path: modulePath || "default",
      name: menu.url,
      meta: { title: menu.name, icon: menu.icon, index: '1-1' },
      component: () => import(`@/views/${menu.page}`),
      hidden: menu.type === 1
    }
    if (!menu.page) {
      tmp['component'] = Layout
    }
    if (menu.children && depth < 1) {
      tmp['children'] = filterAsyncRoutes(menu.children, depth + 1)
    }
    res.push(tmp)
    if (menu.children && depth == 1) {
      res = res.concat(filterAsyncRoutes(menu.children.filter(item => item.url != null), depth + 1))
    }
  });
  return res;
}

/**
 * 过滤出所有权限
 * @param {} menus 
 */
export function filterPermissions(menus) {
  var res = []
  menus.forEach(menu => {
    if (menu.children && menu.type != 1) {
      res = res.concat(filterPermissions(menu.children))
    } else {
      if (menu.perms) {
        var perms = menu.perms.split(',')
        res = res.concat(perms)
      }
    }
  });
  return res;
}

const state = {
  routes: [],
  perms: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_PERMS: (state, perms) => {
    state.perms = perms
  }
}

const actions = {
  generateRoutes({ commit }, menus) {
    return new Promise(resolve => {
      var accessedRoutes = filterAsyncRoutes(menus)
      accessedRoutes.push(notFound)
      var perms = filterPermissions(menus);
      perms = perms.filter((item, index) => perms.indexOf(item) === index);
      commit('SET_ROUTES', accessedRoutes)
      commit('SET_PERMS', perms)
      resolve(accessedRoutes)
    })
  },
  resetPermissions({ commit }) {
    commit('SET_ROUTES', [])
    commit('SET_PERMS', [])
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
