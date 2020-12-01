import Vue from 'vue'
import App from './App.vue'

import router from './router'
import axios from "./axios";
import VueAxios from 'vue-axios'

import store from './store/index';



// import { Loading } from 'element-ui';
// import { Message } from 'element-ui';
import { Button } from 'element-ui';
Vue.use(Button);

import { Tabbar, TabbarItem } from 'vant';
import { Icon } from 'vant';
import { List } from 'vant';
import { Tab, Tabs } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Image as VanImage } from 'vant';
import { Lazyload } from 'vant';
import { PullRefresh } from 'vant';
import { Toast } from 'vant';
import { NavBar } from 'vant';
import { Col, Row } from 'vant';
import { Popup } from 'vant';
import { Form } from 'vant';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css';
import { Uploader } from 'vant';

import { Picker } from 'vant';
import { Field } from 'vant';
import { Divider } from 'vant';
import { Grid, GridItem } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import { Loading } from 'vant';
import { ImagePreview } from 'vant';
import { PasswordInput, NumberKeyboard } from 'vant';
import { Sticky } from 'vant';
import { ActionSheet } from 'vant';
import { ShareSheet } from 'vant';
import { Popover } from 'vant';
import { Dialog } from 'vant';

// 全局注册
Vue.use(Dialog);
Vue.use(Popover);
Vue.use(ShareSheet);
Vue.use(ActionSheet);
Vue.use(Sticky);
Vue.use(PasswordInput);
Vue.use(NumberKeyboard);
Vue.use(ImagePreview);
Vue.use(Loading);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Divider);
Vue.use(Field);
Vue.use(Picker);
Vue.use(Uploader);
Vue.use(ImagePreview);
Vue.use(VueAwesomeSwiper)
Vue.use(Form);
Vue.use(Popup);
Vue.use(Col);
Vue.use(Row);
Vue.use(NavBar);
Vue.use(Toast);
Vue.prototype.$toast = Toast
Vue.use(PullRefresh);
Vue.use(Lazyload);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Icon);
Vue.use(List);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(VanImage);

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

new Vue({
  router, store,
  render: h => h(App),
}).$mount('#app')
