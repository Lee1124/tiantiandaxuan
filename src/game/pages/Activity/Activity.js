/**
 * 活动脚本
 */
import Main from '../../common/Main';
import HTTP from '../../common/HttpRequest';
import myDiaLog from '../../Fuction/OpenDiaLog';
export default class Activity extends Laya.Script {
    onEnable() {
        Main.$LOG('活动脚本：', this);
        Activity.instance = this;
    }
    openThisPage() {
        if (this.owner.visible) {
            this.UI = this.owner.scene;
            this.requestActivityData();
        }
    }
    /**
     * 注册事件
     */
    registerEvent() {
        // this.UI.systemNotice_box.on(Laya.Event.CLICK, this, this.openSelectView, [this._page.page1]);
        // this.UI.myNews_box.on(Laya.Event.CLICK, this, this.openSelectView, [this._page.page2]);
    }

    /**
     * 获取公告数据
     */
    requestActivityData() {
        Main.showLoading(true);
        HTTP.$request({
            that: this,
            url: '/M.Lobby/Activity/GetActivityInfo',
            data: {
                uid: Main.userInfo.userId
            },
            success(res) {
                Main.$LOG('获取活动数据:', res);
                Main.showLoading(false);
                this.setPage(res);
            },
            fail(err) {
                Main.showLoading(false);
            }
        })
    }

    /**
     * 设置公告列表
     * @param {*} data 请求的数据
     */
    setPage(data) {
        this.activityList = this.UI.activityList;
        this.activityList.vScrollBarSkin = "";//运用滚动
        this.activityList.visible = true;
        this.activityList.array = data.data.activitys;
        this.activityList.renderHandler = new Laya.Handler(this, this.activityListOnRender);
        this.activityList.mouseHandler = new Laya.Handler(this, this.clickRow)
    }

    activityListOnRender(cell) {
        let rowContent = cell.getChildByName("rowContent");
        //注意aType==2 是签到活动
        switch (cell.dataSource.aType) {
            case 0:
                rowContent.skin = 'res/img/activity/activityContent.png';
                break;
            case 2:
                rowContent.skin = 'res/img/activity/activityContent.png';
                break;
        }
    }

    /**
     * 点击行
     * @param {*} Event 
     */
    clickRow(Event) {
        if (Event.type == 'click') {
            let dataSource = Event.target.dataSource;
            this.qda(dataSource, true);
        }
    }

    /**
     * 签到活动
     * @param {*} data 数据
     */
    qda(data, isUpdate, closeCallBack) {
        let myDiaLogJS = Laya.stage.getChildByName('dialogView').getComponent(myDiaLog);
        let dislog1 = myDiaLogJS.dialog;
        let bg=dislog1.getChildByName('dialogBg1');
        //标题
        let title = bg.getChildByName('title');
        //内容
        let content = bg.getChildByName('content');
        //领取按钮
        let btn1 = bg.getChildByName('btn1');
        //已经领取按钮
        let btn0 = bg.getChildByName('btn0');
        title.text = data.name;
        content.text = data.detail;
        btn1.visible = data.giveNum > 0 ? false : true;
        btn0.visible = data.giveNum > 0 ? true : false;
        if (btn1.visible) {
            btn1.on(Laya.Event.CLICK, this, this.getCoin, [data, btn0, btn1, isUpdate])
        }
        myDiaLogJS.open(this, true, 0.3, true, () => {
            btn1.off(Laya.Event.CLICK);
            if (closeCallBack)
                closeCallBack();
        },1);
    }

    /**
     * 领取金币
     */
    getCoin(data, btn0, btn1, isUpdate) {
        HTTP.$request({
            that: this,
            url: '/M.Lobby/Activity/SignInActivity',
            data: {
                uid: Main.userInfo.userId,
                activityId: data.activityId
            },
            success(res) {
                Main.$LOG('领取活动:', res);
                this.getEnd(res, btn0, btn1, isUpdate);
            }
        })
    }

    /**
     * 领取后得处理
     */
    getEnd(data, btn0, btn1, isUpdate) {
        if (data.data.ret.type == 0) {
            Main.showTip('活动领取成功');
            btn1.visible = !btn1.visible;
            btn0.visible = !btn0.visible;
            if (isUpdate)
                this.requestActivityData();
        } else {
            Main.showTip(data.data.ret.msg);
        }
    }
}