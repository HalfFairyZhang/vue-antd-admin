const getters = {
    sidebar: state => state.app.sidebar,
    token: state => state.user.token,
    name: state => state.user.name,
    avatar: state => state.user.avatar,
    roles: state => state.menu.roles,
    permission_routes: state => state.permission.routes,
    perms:state=>state.permission.perms,
}
export default getters
