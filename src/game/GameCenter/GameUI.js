import GameControl from './GameControl'
import COMMON from '../common/common'
import Main from '../common/Main';
import PlyerNews from '../Fuction/PlyerNews';
import GameSet from '../Fuction/GameSet';
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
        //关闭多点触控，否则就无敌了
        // Laya.MouseManager.multiTouchEnabled = false;
        //加载场景文件
        // this.loadScene("cheXuanGame_8.scene");
        this.ceshiNum = 0;
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

    /**
     * 显示提示框
     */
    showTips(msg = 'null') {
        this.tipsBox._children = [];
        let tip = new Laya.Sprite();
        let text = new Laya.Text();
        text.text = msg;
        tip.addChild(text);
        text.color = '#FFFFFF';
        text.fontSize = 40;
        text.width = 720;
        text.height = 110;
        text.align = 'center';
        text.valign = 'middle';
        tip.loadImage('res/img/common/tip.png', Laya.Handler.create(this, loadImgEnd));
        function loadImgEnd() {
            this.tipsBox.addChild(tip);
        }
        tip.width = 720;
        tip.height = 110;
        setTimeout(() => {
            Laya.Tween.to(tip, { y: -300 }, 600, null, Laya.Handler.create(this, this.tipMoveEnd, [tip]))
        }, 100)
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
        this.loadMenuContent();
        // this.gameSetRegisterEvent();
        this._confirmDaiRuBtn = this.makeUp_bobo.getChildByName("confirmDaiRuBtn");
        this._control = this.getComponent(GameControl);
        // this.start_game_btn.on(Laya.Event.CLICK, this, this.onClickStartBtn);//游戏开始事件
        this.confrimSubBtn1.on(Laya.Event.CLICK, this, this.onClickConfrimSubBtn1);//确认分牌事件
        this.ExpressionUI.on(Laya.Event.CLICK, this, this.onClickExpression);//表情
        this._mask.on(Laya.Event.CLICK, this, this.onClickMask);//蒙板
        this.menuBtnUI.on(Laya.Event.CLICK, this, this.onClickMenuBtn);//左上方菜单
        this.nowPaiJuUI.on(Laya.Event.CLICK, this, this.onClickNowPaiJuBtn);//实时战绩
        this.paiJuHuiGuBtnUI.on(Laya.Event.CLICK, this, this.onClickPaijuhuiguBtn);//牌局回顾
        this._confirmDaiRuBtn.on(Laya.Event.CLICK, this, this.onClickConfirmDaiRuBtn);//补充钵钵确认带入
        this.bobo_close.on(Laya.Event.CLICK, this, this.onClickMask);//补充钵钵关闭按钮关闭
        this.gameSet_close.on(Laya.Event.CLICK, this, this.onClickMask);//牌局设置关闭按钮关闭
        this.voiceBtnUI.on(Laya.Event.CLICK, this, this.onClickVoiceBtn);
        this.ceShiBtn.on(Laya.Event.CLICK, this, this.onClickceShiBtn);
    }

    onClickceShiBtn() {
        this.ceshiNum++;
        if (this.ceshiNum % 2 == 0) {
            this.ErrList.visible = false;
        } else {
            this.ErrList.visible = true;
        }
    }
    /** 
     * 开始游戏
    */
    // onClickStartBtn() {
    //     this._control.clickStartGame();
    // }

    onClickVoiceBtn() {
        this._control.ceShi();
    }

    /**
     * 确认分牌
     */
    onClickConfrimSubBtn1() {
        this._control.confrimSubResult();
    }

    /**
     * 表情
     */
    onClickExpression(msg) {
        this.showTips('旁观者不能发表情!');
    }

    //补充钵钵(确认带入)    
    onClickConfirmDaiRuBtn() {
        this._control.makeUpBoBoConfirmDaiRu();

    }

    /**
     * 所有弹框的蒙板事件
     */
    onClickMask() {
        this._control.showMakeUpBoBo(false, 'hand');
        this._control.openMenuList(false);
        GameSet.gameSet(false);
        PlyerNews.GetNews(false);
        GameControl.instance._allowSeatUp = true;
    }

    onClickMenuBtn() {
        this._control.openMenuList(true);
    }

    //实时战绩    
    onClickNowPaiJuBtn() {
        this._control.openSceneView('shishizhanji.scene');
    }

    // 牌局回顾
    onClickPaijuhuiguBtn() {
        this._control.openSceneView('paijuhuigu.scene');
    }

    /**
     * 加载菜单内容
     */
    loadMenuContent() {
        let _menuList = this.menu.getChildByName('menuList');
        _menuList.array = [
            { id: 1, imgUrl: 'res/img/menu/menu_1.png' },
            { id: 2, imgUrl: 'res/img/menu/menu_2.png' },
            { id: 3, imgUrl: 'res/img/menu/menu_3.png' },
            { id: 4, imgUrl: 'res/img/menu/menu_4.png' },
            { id: 5, imgUrl: 'res/img/menu/menu_5.png' },
            { id: 6, imgUrl: 'res/img/menu/menu_6.png' },
            { id: 7, imgUrl: 'res/img/menu/menu_7.png' },
        ];
        // _menuList.vScrollBarSkin = "";//运用滚动
        _menuList.renderHandler = new Laya.Handler(this, this.menuOnRender);
        _menuList.mouseHandler = new Laya.Handler(this, this.menuOnClick);
    }
    /**
     * 为列表赋上相应的内容
     * @param {*} cell 返回的对象
     * @param {*} index 返回的索引
     */
    menuOnRender(cell, index) {
        // console.log(cell)
        let menuContent = cell.getChildByName("menu_row_node").getChildByName("listContent");
        menuContent.skin = cell.dataSource.imgUrl;
        if (cell.dataSource.id == 7) {
            let menuLine = cell.getChildByName("menu_row_node").getChildByName("line");
            menuLine.removeSelf();
        }
    }

    /**
    * 为列表的选项绑定事件
    * @param {*} Event 返回的对象
    * @param {*} index 返回的索引
    */
    menuOnClick(Event, index) {
        if (Event.type == 'click') {
            // console.log(Event.target)
            let ID = Event.target.dataSource.id;
            if (ID == 2) {
                this._control.openMenuList(false);
                // this._control.openPaiJuGuiZe(true);
                Laya.Scene.open('paijutishi.scene', false, { show: true });
            } else if (ID == 1) {
                this._control.openMenuList(false);
                this._control.playerSeatUpSend();
            } else if (ID == 7) {
                this._control.openMenuList(false);
                this._control.playerLeaveRoomSend();
            } else if (ID == 4) {
                this._control.openMenuList(false);
                this._control.playerAddBOBOSend();
            } else if (ID == 3) {
                this._control.openMenuList(false);
                // this._control.gameSet(true);
                GameSet.gameSet(true);
            } else if (ID == 6) {
                this._control.openMenuList(false);
                this._control.beackRoom();
            } else if (ID == 5) {
                this._control.onClose();
            }
        }
    }
}


