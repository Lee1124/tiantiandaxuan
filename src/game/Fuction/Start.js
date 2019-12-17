/**
* 该脚本为资源预加载界面
*/
import Main from '../common/Main';
export default class sliderSelect extends Laya.Script {
    constructor() {
        super();
        /** @prop {name:tip,tips:"预制体TIP",type:Prefab}*/
        /** @prop {name:intType, tips:"整数类型示例", type:Int, default:1000}*/
        let intType = 1000;
        /** @prop {name:numType, tips:"数字类型示例", type:Number, default:1000}*/
        let numType = 1000;
        /** @prop {name:strType, tips:"字符串类型示例", type:String, default:"hello laya"}*/
        let strType = "hello laya";
        /** @prop {name:boolType, tips:"布尔类型示例", type:Bool, default:true}*/
        let boolType = true;
        // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
        //预加载资源的数量
        this.loadArrLength = 0;
        //预加载返回的对象数组
        this.loadReturnArr = [];
    }

    onEnable() {
        /**===测试=== */
        this.isAuto();
        if (Main.AUTO)
            this.setUser();
        /**===测试=== */
        this.getForm();
        if (!Main.AUTO)
            this.getUserInfo();
        this.hideLoadingView();
    }

    isAuto(){
        let isAuto= Main.GetUrlString('auto');
        Main.AUTO=isAuto==1?true:false;
    }

    /**测试 获取url中所带的账户和密码 */
    setUser() {
        let user = Main.GetUrlString('user');
        let pwd = Main.GetUrlString('pwd');
        if (user && pwd) {
            let data = {
                user: user,
                pwd: pwd
            }
            Main.userInfo = data;
            // if (Main.wxGame) {
            //     wx.setStorageSync('userInfo', data);
            // } else {
            //     localStorage.setItem('userInfo', JSON.stringify(data)); //转化为JSON字符串)
            // }
        }
    }

    /**获取是不是微信小游戏平台 */
    getForm() {
        Main.wxGame = Laya.Browser.onWeiXin;
        Main.$LOG('是不是微信平台===:', Main.wxGame);
    }

    /**获取玩家信息 */
    getUserInfo() {
        Main.userInfo = Main.wxGame ? wx.getStorageSync('userInfo') : JSON.parse(localStorage.getItem("userInfo"));
    }

    hideLoadingView() {
        if (!Main.wxGame)
            setTimeout(() => {
                document.getElementById('startImg').style.opacity = 0;
                this.onLoading();
            }, 1000)
        else {
            this.onLoading();
        }
    }

    onLoading() {
        Main.beforeLoadScene(this, (res) => {
            this.dealWithBeforeLoadScene(res);
        });
        Main.createLoading(Main.loadingType.one);//预创建HTTP请求加载中的资源
        Main.createLoading(Main.loadingType.two);//预创建断线重连加载中的资源
        Main.createLoading(Main.loadingType.three);//预创建带文字加载中的资源
        Main.createTipBox();
        Main.getStatusHeight();
        Main.createDiaLog();
        this.loadArrLength = Main.loadScene.length;
    }

    dealWithBeforeLoadScene(res) {
        let progress = this.owner.progressBg.getChildByName('progress');
        this.loadReturnArr.push(res);
        let $loadRate = parseInt((this.loadReturnArr.length / this.loadArrLength) * 100);
        progress.width = this.owner.progressBg.width * ($loadRate / 100);
        this.owner.loadRate.text = $loadRate + '%';
        if ($loadRate >= 100) {
            this.owner.loadText.text = '加载完成,祝您好运!';
            setTimeout(() => {
                if (!Main.wxGame)
                    document.getElementById('startImg').style.display = 'none';
                Laya.Scene.open('login.scene', true);
            }, 500);
        }
    }
}