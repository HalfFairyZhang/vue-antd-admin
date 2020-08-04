import Vue from 'vue'
import {
    Layout, Menu,
    Icon, Dropdown,
    Avatar, Button,
    Result, Form,
    Input, FormModel,
    Checkbox, Breadcrumb,
    Pagination, ConfigProvider,
    Table, Card, Divider,
    Col, Row, DatePicker,
    Select, TreeSelect,
    Popconfirm, Modal, Message,
    Switch,Upload,Cascader
} from 'ant-design-vue';

Vue.use(Layout);
Vue.use(Menu);
Vue.use(Icon);
Vue.use(Avatar);
Vue.use(Dropdown);
Vue.use(Button);
Vue.use(Result);
Vue.use(Input);
Vue.use(FormModel);
Vue.use(Form);
Vue.use(Checkbox);
Vue.use(Breadcrumb);
Vue.use(Pagination);
Vue.use(ConfigProvider);
Vue.use(Table);
Vue.use(Card);
Vue.use(Divider);
Vue.use(Col);
Vue.use(Row);
Vue.use(DatePicker);
Vue.use(Select);
Vue.use(TreeSelect);
Vue.use(Modal);
Vue.use(Popconfirm);
Vue.use(Switch);
Vue.use(Upload);
Vue.use(Cascader);

Vue.prototype.$message = Message;
Vue.prototype.$confirm = Modal.confirm;