import Main from '../../common/Main';
import HTTP from '../../common/HttpRequest';
import Share from '../../Fuction/Share';
import OpenView from '../../common/openView';
export default class Me extends Laya.Script {

    constructor() {
        super();
        /** @prop {name:intType, tips:"整数类型示例", type:Int, default:1000}*/
        let intType = 1000;
        /** @prop {name:numType, tips:"数字类型示例", type:Number, default:1000}*/
        let numType = 1000;
        /** @prop {name:strType, tips:"字符串类型示例", type:String, default:"hello laya"}*/
        let strType = "hello laya";
        /** @prop {name:boolType, tips:"布尔类型示例", type:Bool, default:true}*/
        let boolType = true;
        // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
    }

    onEnable() {
        Main.$LOG('Me脚本：', this);
        Me.instance = this;
    }

    openThisPage() {
        if (this.owner.visible) {
            this.UI = this.owner.scene;
            this.registerEvent();
            this.requestPageData();
            this.initOpenView();
        }
    }

    /**
     * 初始化打开场景的参数
     */
    initOpenView() {
        //设置个人信息处的组件对象
        let openData1 = {
            page: Main.pages.page5,
            userId: Main.userInfo.userId
        }
        let OpenViewJS1 = this.UI.headView.getComponent(OpenView);
        OpenViewJS1.initOpen(1, 'playerNewsSet.scene', false, openData1, 0);

        //充值商城
        let openData2 = {
            page: Main.pages.page5,
            isTabPage: true
        }
        let OpenViewJS2 = this.UI.recharge_btn.getComponent(OpenView);
        OpenViewJS2.initOpen(1, 'shoppingMall.scene', false, openData2, 0);

        //设置
        let OpenViewJS3 = this.UI.set_btn.getComponent(OpenView);
        OpenViewJS3.initOpen(0, 'gameSet.scene', false, null, 0);

        //关于我们
        let OpenViewJS4 = this.UI.our_btn.getComponent(OpenView);
        OpenViewJS4.initOpen(0, 'aboutOur.scene', false, null, 0);

        //联系客服
        let OpenViewJS5 = this.UI.customer_btn.getComponent(OpenView);
        OpenViewJS5.initOpen(0, 'service.scene', false, null, 0);
    }

    registerEvent() {
        this.UI.signOut_btn.on(Laya.Event.CLICK, this, this.openLoginView);
        this.UI.share_btn.on(Laya.Event.CLICK, this, this.openShareView);
    }
    openLoginView() {
        Main.showDiaLog('是否退出重新登录?', 2, () => {
            Main.allowGameHallSetInterval = false;
            Laya.Scene.open('login.scene', true, Main.sign.signOut);
        });
    }

    /**
     * 打开联系客服界面
     */
    openServiceView() {
        // window.conch.setExternalLink("http://www.baidu.com");//打开webview
    }

    /**
     * 打开分享界面
     */
    openShareView() {
        Share.open(this);
    }

    /**
     * 获取页面数据
     */
    requestPageData() {
        let data = {
            uid: Main.userInfo.userId,
            // tuid: Main.userInfo.userId
        }
        HTTP.$request({
            that: this,
            url: '/M.User/GetInfo',
            data: data,
            success(res) {
                if (res.data.ret.type == 0) {
                    this.setPageData(res.data);
                } else {
                    Main.showDiaLog(res.data.ret.msg);
                }
            },
            fail() {
            }
        })
    }

    setPageData(data) {
        let headUrl = 'res/img/head/' + data.head + '.png';
        Main.$LoadImage(this.UI.headUrl, headUrl, Main.defaultImg.one);
        this.UI.userNameValue.text = data.nick;
        this.UI.userIDValue.text = data.userId;
        this.UI.userScoreValue.text = data.score;
        this.UI.me_sex0.visible = data.sex == 0 ? true : false;
        this.UI.me_sex1.visible = data.sex == 1 ? true : false;
        Main.serviceUrl = data.service;
    }
}