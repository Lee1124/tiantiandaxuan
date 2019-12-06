import Main from '../../common/Main';
import HTTP from '../../common/HttpRequest';
import Share from '../../Fuction/Share';
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
        Main.$LOG('Me脚本：',this);
        Me.instance=this;
    }

    openThisPage(){
        if(this.owner.visible){
            this.UI=this.owner.scene;
            this.registerEvent();
            this.requestPageData();
        }
    }

    registerEvent(){
        this.UI.signOut_btn.on(Laya.Event.CLICK,this,this.openLoginView);
        this.UI.recharge_btn.on(Laya.Event.CLICK,this,this.openShopView);
        this.UI.share_btn.on(Laya.Event.CLICK,this,this.openShareView);
        this.UI.headView.on(Laya.Event.CLICK,this,this.openNewsView);
    }
    openLoginView(){
        Main.showDiaLog('是否退出重新登录?',2,()=>{
            Main.allowGameHallSetInterval=false;
            Laya.Scene.open('login.scene',true,Main.sign.signOut);
        });
    }

    /**
     * 打开商城界面
     */
    openShopView(){
        Main.$openScene('shoppingMall.scene',false,{isTabPage:true,page:Main.pages.page5},(res)=>{
            res.x = Laya.stage.width;
            Laya.Tween.to(res, { x: 0 }, Main._speed.page, null, Laya.Handler.create(this, () => {
                this.owner.removeSelf();
            }));
        })
    }

    /**
     * 打开分享界面
     */
    openShareView(){
        Share.open(this);
    }

    /**
     * 修改个人信息
     */
    openNewsView(){
        let openData={
            page:Main.pages.page5,
            userId:Main.userInfo.userId
        }
        Main.$openScene('playerNewsSet.scene',false,openData,(res)=>{
            res.x = Laya.stage.width;
            res.zOrder=10;
            Laya.Tween.to(res, { x: 0 }, Main._speed.page, null, Laya.Handler.create(this, () => {
                this.owner.removeSelf();
            }));
        })
    }

    /**
     * 获取页面数据
     */
    requestPageData(){
        let data={
            uid:Main.userInfo.userId
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
            fail(){
            }
        })
    }

    setPageData(data){
        let headUrl='res/img/head/'+data.head+'.png';
        Main.$LoadImage(this.UI.headUrl,headUrl,Main.defaultImg.one);
        this.UI.userNameValue.text=data.nick;
        this.UI.userIDValue.text=data.userId;
        this.UI.userScoreValue.text=data.score;
        this.UI.me_sex0.visible=data.sex==0?true:false;
        this.UI.me_sex1.visible=data.sex==1?true:false;
    }
}