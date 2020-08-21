import { Menu, Icon } from "ant-design-vue"
import { isExternal } from '@/utils/validate'
import path from 'path'

const { Item, SubMenu } = Menu

export default {
    name: 'IMenu',
    props: {
        theme: {
            type: String,
            required: false,
            default: 'dark'
        },
        mode: {
            type: String,
            required: false,
            default: 'inline'
        },
        menuData: {
            type: Array,
            required: true
        },
        collapsed: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data() {
        return {
            openKeys: [],
            selectedKeys: [],
            cachedOpenKeys: []
        }
    },
    computed: {
        rootSubmenuKeys: (vm) => {
            let keys = []
            vm.menuData.forEach(item => {
                keys.push(item.path)
            })
            return keys
        }
    },
    created() {
        this.updateMenu()
    },
    watch: {
        collapsed(val) {
            if (val) {
                this.cachedOpenKeys = this.openKeys
                this.openKeys = []
            } else {
                this.openKeys = this.cachedOpenKeys
            }
        },
        '$route': function () {
            this.updateMenu()
        }
    },
    methods: {
        resolvePath(basePath, routePath) {
            if (isExternal(routePath)) {
                return routePath
            }
            if (isExternal(basePath)) {
                return basePath
            }
            return path.resolve(basePath, routePath)
        },
        renderIcon: function (h, icon) {
            return icon == undefined || icon == '' ? null : h(Icon, { props: { type: icon } })
        },
        renderMenuItem: function (h, basePath, menu, pIndex, index) {
            return h(
                Item,
                {
                    key: menu.path ? (basePath ? this.resolvePath(basePath, menu.path) : menu.path) : 'item_' + pIndex + '_' + index
                },
                [
                    h(
                        'a',
                        { attrs: isExternal(menu.path) ? { href: menu.path, target: '_blank' } : { href: '#' + (basePath ? this.resolvePath(basePath, menu.path) : menu.path) } },
                        [
                            this.renderIcon(h, menu.meta.icon),
                            h('span', [menu.meta.title])
                        ]
                    )
                ]
            )
        },
        renderSubMenu: function (h, basePath = undefined, menu, pIndex, index) {
            var vm = this
            var subItem = [h('span',
                { slot: 'title' },
                [
                    this.renderIcon(h, menu.meta.icon),
                    h('span', [menu.meta.title])
                ]
            )]
            var itemArr = []
            var pIndex_ = pIndex + '_' + index
            menu.children.forEach(function (item, i) {
                itemArr.push(vm.renderItem(h, basePath ? basePath + "/" + menu.path : menu.path, item, pIndex_, i))
            })
            //如果子菜单都是隐藏的就直接渲染
            itemArr = itemArr.filter(val => { return val != undefined })
            if (itemArr.length <= 0) {
                return this.renderMenuItem(h, basePath, menu, pIndex, index)
            }
            return h(
                SubMenu,
                { key: menu.path ? menu.path : 'submenu_' + pIndex + '_' + index },
                subItem.concat(itemArr)
            )
        },
        renderMenu(h, menuTree) {
            var vm = this
            var menuArr = []
            menuTree.forEach(function (menu, i) {
                menuArr.push(vm.renderItem(h, undefined, menu, '0', i))
            })
            return menuArr
        },
        renderItem(h, basePath = undefined, menu, pIndex, index) {
            if (!menu.hidden) {
                return menu.children ? this.renderSubMenu(h, basePath, menu, pIndex, index) : this.renderMenuItem(h, basePath, menu, pIndex, index)
            }
        },
        onOpenChange(openKeys) {
            const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
            if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                this.openKeys = openKeys
            } else {
                this.openKeys = latestOpenKey ? [latestOpenKey] : []
            }
        },
        updateMenu() {
            let routes = this.$route.matched.concat()
            this.selectedKeys = [routes.pop().path]
            let openKeys = []
            routes.forEach((item) => {
                openKeys.push(item.path)
            })
            this.collapsed ? this.cachedOpenKeys = openKeys : this.openKeys = openKeys
        }
    },
    render(h) {
        return h(
            Menu, {
            props: {
                mode: this.$props.mode,
                theme: this.$props.theme,
                inlineCollapsed: this.$props.collapsed,
                openKeys: this.openKeys,
                selectedKeys: this.selectedKeys
            },
            on: {
                openChange: this.onOpenChange,
                select: (obj) => {
                    this.selectedKeys = obj.selectedKeys
                    this.$emit('select', obj)
                }
            }
        }, this.renderMenu(h, this.menuData))
    }
}