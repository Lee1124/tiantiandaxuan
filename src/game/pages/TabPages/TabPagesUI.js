import Main from '../../common/Main';
import Me from '../Me/Me';
import Notice from '../Notice/Notice';
import GameHall from '../GameHall/GameHall';
import Data from '../Data/Data';
export default class TabPagesUI extends Laya.Scene {
    constructor() {
        super();
    }
    onOpened(options) {
        Main.$LOG('tab页面所收到的值：', options);
        this.pageData = options;
        this.allowSetInterval = true;
        let page = !options.page ? Main.pages.page3 : options.page;
        this.openView(page);
        this.setUI();
        //微信小游戏背景图
        if (Main.wxGame)
            this.initPage();
    }
    /**初始化页面(加载背景) */
    initPage() {
        setTimeout(() => {
            this.tab_bg.skin = 'res/img/common/login_bg.jpg';
        })
    }
    onAwake() {
        Main.$LOG('TabPagesUI:', this);
        this.registerEvent();
    }
    /**
     * 注册事件
     */
    registerEvent() {
        this.tab_notice.on(Laya.Event.CLICK, this, this.openView, [Main.pages.page1]);
        this.tab_paiju.on(Laya.Event.CLICK, this, this.openView, [Main.pages.page2]);
        this.tab_hall.on(Laya.Event.CLICK, this, this.openView, [Main.pages.page3, 1]);
        this.tab_data.on(Laya.Event.CLICK, this, this.openView, [Main.pages.page4]);
        this.tab_me.on(Laya.Event.CLICK, this, this.openView, [Main.pages.page5]);
    }
    /**
     * 切换页面时候先关闭所有页面
     */
    closeAllpages() {
        let allPages = this.pages._children;
        allPages.forEach(item => {
            item.visible = false;
        });
    }
    /**
     * 打开对应的页面
     * @param {*} page 页面对象
     */
    openView(page, type) {
        Main.allowRequesList = false;
        this.closeAllpages();
        this[page].visible = true;
        this.reloadNavSelect();
        this.setTabSelect(page);
        if (page === Main.pages.page5) {
            Me.instance.openThisPage();
        } else if (page === Main.pages.page1) {
            Notice.instance.openThisPage();
        } else if (page === Main.pages.page3) {
            Main.allowRequesList = true;
            Main.allowHideLoad = type == 1 ? true : false;
            GameHall.instance.openThisPage();
        } else if (page === Main.pages.page4) {
            Data.instance.openThisPage();
        }
    }

    /**
     * 重置下面导航栏的文字样式
     */
    reloadNavSelect() {
        this.notice.visible = true;
        this.notice_selected.visible = false;
        this.paiju.visible = true;
        this.paiju_selected.visible = false;
        this.data.visible = true;
        this.data_selected.visible = false;
        this.me.visible = true;
        this.me_selected.visible = false;
    }
    /**
     * 设置下面导航栏的选项
     * @param {*} type 类型
     */
    setTabSelect(type) {
        switch (type) {
            case Main.pages.page1:
                this.notice.visible = false;
                this.notice_selected.visible = true;
                break;
            case Main.pages.page2:
                this.paiju.visible = false;
                this.paiju_selected.visible = true;
                break;
            case Main.pages.page4:
                this.data.visible = false;
                this.data_selected.visible = true;
                break;
            case Main.pages.page5:
                this.me.visible = false;
                this.me_selected.visible = true;
                break;
        }
    }

    setUI() {
        let nodeArr = [this.notice_content, this.hall_content, this.data_content, this.me_content]
        Main.setNodeTop(nodeArr);
    }
}