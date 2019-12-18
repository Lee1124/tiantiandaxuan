import GameControl from './GameControl'
import COMMON from '../common/common'
import Main from '../common/Main';
import PlyerNews from '../Fuction/PlyerNews';
import GameSet from '../Fuction/GameSet';
import CustomChat from '../Fuction/CustomChat';
import GameMenu from '../Fuction/GameMenu';
/**
* 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
* 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
* 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
*/
export default class GameUI extends Laya.Scene {
    constructor() {
        super();
        /** @prop {name:CM,tips:"丢-筹码预制体",type:Prefab}*/
        //设置单例的引用方式，方便其他类引用
        GameUI.instance = this;
        //加载场景文件
        this.ceshiNum = 0;
        this.ceshiNum2 = 0;
    }

    onAwake() {
    }

    onOpened(data) {
        this.zOrder = 9;
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
        this._openedData = data;
        Main.$LOG('打开游戏界面接受到的参数：', this._openedData);
        GameSet.initGameSet(this);
        this.setUISite();
    }

    /**
     * 设置UI的位置
     */
    setUISite() {
        this.TOPHandleBtnBox.top = Main.phoneNews.statusHeight;
    }

    tipMoveEnd(tipObj) {
        Laya.Tween.to(tipObj, { alpha: 0 }, 300, null, Laya.Handler.create(this, this.tipAlphaEnd, [tipObj]))
    }
    tipAlphaEnd(tipObj) {
        tipObj.removeSelf();
    }
    onAwake() {
        Main.$LOG('GameUI：', this)
    }
    onEnable() {
        this._confirmDaiRuBtn = this.makeUp_bobo.getChildByName("confirmDaiRuBtn");
        this._control = this.getComponent(GameControl);
        this.confrimSubBtn1.on(Laya.Event.CLICK, this, this.onClickConfrimSubBtn1);//确认分牌事件
        this._mask.on(Laya.Event.CLICK, this, this.onClickMask);//蒙板
        this.menuBtnUI.on(Laya.Event.CLICK, this, this.onClickMenuBtn);//左上方菜单
        this.nowPaiJuUI.on(Laya.Event.CLICK, this, this.onClickNowPaiJuBtn);//实时战绩
        this.paiJuHuiGuBtnUI.on(Laya.Event.CLICK, this, this.onClickPaijuhuiguBtn);//牌局回顾
        this.errReloadBtnUI.on(Laya.Event.CLICK, this, this.onClickErrReloadBtn);//异常刷新
        this._confirmDaiRuBtn.on(Laya.Event.CLICK, this, this.onClickConfirmDaiRuBtn);//补充钵钵确认带入
        this.gameSet_close.on(Laya.Event.CLICK, this, this.onClickMask);//牌局设置关闭按钮关闭
        this.chatBtnUI.on(Laya.Event.CLICK, this, this.onClickChatBtn);//自定义聊天语音
        this.ceshiEvent();//有关于测试事件
    }

    /**
     * 异常刷新
     */
    onClickErrReloadBtn() {
        GameControl.instance.onClose();
        GameControl.instance.onConnect();
        Main.showTip('正在刷新数据，请稍后...');
    }

    ceshiEvent() {
        let ceshi_view=this.ceshi_view;
        let ceshi_LOG=ceshi_view.getChildByName('LOG');
        let ceshi_ERRROLAD=ceshi_view.getChildByName('ERRROLAD');
        let ceshi_AUTO=ceshi_view.getChildByName('AUTO');
        this.ceshi_show_view_btn.on(Laya.Event.CLICK, this, this.click_ceshi_btn);
        ceshi_LOG.on(Laya.Event.CLICK, this, this.ceshiContent, [1]);
        ceshi_ERRROLAD.on(Laya.Event.CLICK, this, this.ceshiContent, [2]);
        ceshi_AUTO.on(Laya.Event.CLICK, this, this.ceshiContent, [3,ceshi_AUTO]);
    }

    click_ceshi_btn() {
        this.ceshiNum++;
        if(this.ceshiNum==2){
            this.onClickVoiceBtn();
        }
        if (this.ceshiNum == 5) {
            this.ceshi_view.visible = true;
            Laya.Tween.to(this.ceshi_view, { x: 20, alpha: 1 }, 200)
            this.ceshiNum = -1;
        } else {
            Laya.Tween.to(this.ceshi_view, { x: -200, alpha: 0 }, 100, null, Laya.Handler.create(this, () => {
                this.ceshi_view.visible = false;
            }))
        }
    }

    ceshiContent(type,obj) {
        
        if (type == 1) {
            this.ceshiNum2++;
            if (this.ceshiNum2 % 2 == 0) {
                this.ceshi_log_list.visible = false;
            } else {
                this.ceshi_log_list.visible = true;
            }
        } else if (type == 2) {
            GameControl.instance.onClose();
            GameControl.instance.onConnect();
            Main.showTip('正在刷新数据，请稍后...');
        }  else if (type == 3) {
            obj.text=obj.text=='关闭自动'?'打开自动':'关闭自动';
            Main.AUTO=obj.text=='关闭自动'?true:false;
        }
    }


    onClickVoiceBtn() {
        let roomid = 13004
        GameControl.instance.onSend({
            name: 'M.Room.C2R_DissolveRoom',
            data: {
                roomid: roomid,
            },
            success(res) {
                console.log('解散房间：', res)
            }
        })
        Laya.Scene.open('demo.scene',true)
    }

    /**
     * 确认分牌
     */
    onClickConfrimSubBtn1() {
        this._control.confrimSubResult();
    }

    /**
     * 自定义聊天
     */
    onClickChatBtn() {
        CustomChat.open(this);
    }

    //补充钵钵(确认带入)    
    onClickConfirmDaiRuBtn() {
        this._control.makeUpBoBoConfirmDaiRu();

    }

    onClickMenuBtn() {
        GameMenu.open();
    }

    //实时战绩    
    onClickNowPaiJuBtn() {
        this._control.openSceneView('shishizhanji.scene');
    }

    // 牌局回顾
    onClickPaijuhuiguBtn() {
        this._control.openSceneView('paijuhuigu.scene');
    }
}


