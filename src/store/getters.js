const getters = {
    sidebar: state => state.app.sidebar,
    roles: state => state.user.roles,
    permission_routes: state => state.permission.routes,
}
export default getters
