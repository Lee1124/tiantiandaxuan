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
        rowContent.skin = 'res/img/activity/activity_' + cell.dataSource.activityId + '.png';
    }

    clickRow(Event) {
        if (Event.type == 'click') {
            let dataSource = Event.target.dataSource;
            let myDiaLogJS = Laya.stage.getChildByName('dialogView').getComponent(myDiaLog);
            let dislog1=myDiaLogJS.dialog;
            //领取按钮
            let btn1=dislog1.getChildByName('dialogBg').getChildByName('btn1');
            //已经领取按钮
            let btn0=dislog1.getChildByName('dialogBg').getChildByName('btn0');
            btn1.visible=dataSource.giveNum>0?false:true;
            btn0.visible=dataSource.giveNum>0?true:false;
            if(btn1.visible){
                btn1.on(Laya.Event.CLICK,this,this.getCoin,[dataSource])
            }
            myDiaLogJS.open(this, true, 0.3, true, () => {
                btn1.off(Laya.Event.CLICK);
            });
        }
    }

    /**
     * 领取金币
     */
    getCoin(data){
        HTTP.$request({
            that: this,
            url: '/M.Lobby/Activity/SignInActivity',
            data: {
                uid: Main.userInfo.userId,
                activityId:data.activityId
            },
            success(res) {
                Main.$LOG('领取活动:', res);
            }
        })
    }
}