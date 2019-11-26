import GameUI from './GameUI'
import GameControl from './GameControl'
import MyCenter from '../common/MyCenter';
import Main from '../common/Main';//Main.js
import PlyerNews from '../Fuction/PlyerNews';
let _num3 = 0;
export default class seat extends Laya.Script {
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
        this._mask = new Laya.Sprite();
    }

    onEnable() {
        this.jionNum = 0;
        this._showSubBox = false;
        //设置单例的引用方式，方便其他类引用
        seat.instance = this;
        this._userId = '';
        this._isMe = false;
    }


    onDisable() {
    }

    onStart() {
        MyCenter.send("seat", this);
        this.owner.on(Laya.Event.CLICK, this, this.mouseHandler);
    }

    // 点击某个位置
    mouseHandler(e) {
        let that = this;
        // 显示补充钵钵
        if (e.target.userId == '')
            GameControl.instance.onSend({
                name: 'M.Room.C2R_SeatAt',
                data: {
                    roomid: GameControl.instance.roomId,
                    idx: e.target.seatId
                },
                success(res) {
                    GameControl.instance.dealSoketMessage('占位：', res)
                    if (res.ret.type == 0) {
                        let click_seat_index = e.target.index;
                        GameControl.instance.changeSeatXY(click_seat_index, GameControl.instance._speed.changeSeatSpeed);
                    }
                }
            })
    }

    /**
     * 玩家占座设置内容
     * @param {*} lastTime 剩余时间
     * @param {*} data 需要的参数
     */
    playerSeatAtSetContent(data) {
        let lastTime = data.seatAtTime - Main.getTimeChuo();//占座剩余时间
        if (lastTime > data.totalTime) {
            lastTime = data.totalTime;
        }
        let scoreBox = this.owner.getChildByName("score");
        scoreBox.visible = true;
        let scoreVal = scoreBox._children[0].getChildByName("scoreVal");
        scoreVal.text = '等待' + lastTime + 's';
        if (this.owner.timeID)
            clearInterval(this.owner.timeID);
        this.owner.timeID = setInterval(() => {
            lastTime--;
            scoreVal.text = '等待' + lastTime + 's';
            if (lastTime == 0) {
                clearInterval(this.owner.timeID);
            }
        }, 1000)
    }

    /**
     * 玩家坐下设置内容
     * @param {*} data 需要的参数
     */
    playerSeatDownSetContent(data) {
        this.playerSeatDownRegisterEvent();
        if (this.owner.timeID) {
            clearInterval(this.owner.timeID);
        }
        let scoreBox = this.owner.getChildByName("score");
        let scoreVal = scoreBox._children[0].getChildByName("scoreVal");
        scoreBox.visible = true;
        scoreVal.text = data.score;
        this.owner.curXiaZhuScore = 0;
    }

    /**
     * 玩家坐下注册点击事件
     */
    playerSeatDownRegisterEvent(){
        this.owner.getChildByName("head-box").on(Laya.Event.CLICK,this,this.getPlayerNews);
    }
    /**
     * 玩家离开去除点击事件
     */
    playerSeatUpOffEvent(){
        this.owner.getChildByName("head-box").off(Laya.Event.CLICK,this,this.getPlayerNews);
    }
    /**
     * 获取玩家个人信息
     */
    getPlayerNews(){
        let data={
            userId:this.owner.userId
        }
        PlyerNews.GetNews(true,data);
    }

    /**
     * 占座或坐下公共设置
     * @param {*} isShow 剩余时间
     * @param {*} data 剩余时间
     */
    playerSeatDownOrSeatAtCommon(isShow, data, isUpdate) {
        let headBox = this.owner.getChildByName("head-box");
        let headImg = headBox.getChildByName("headImgBox");
        let name = this.owner.getChildByName("name");
        headBox.visible = true;
        Main.$LoadImage(headImg, data.head, Main.defaultImg.one, 'skin');
        this.owner.userId = data.userId;
        if (data.userId == GameControl.instance.userId) {
            name.text = '';
            // console.log('进来000')
            // if (isUpdate)
            //     GameControl.instance.changeSeatXY(this.owner.index, 0);//调整位置
            this.owner.isMe = true;
            GameControl.instance.showMakeUpBoBo(isShow);
        } else {
            name.text = data.name;
            this.owner.isMe = false;
        }
    }

    /**
     * 玩家起立设置内容
     * @param {*} data 需要参数
     */
    playerSeatUpSetContent(data) {
        this.playerSeatUpOffEvent();
        let headBox = this.owner.getChildByName("head-box");
        let headImg = headBox.getChildByName("headImgBox");
        let scoreBox = this.owner.getChildByName("score");
        let scoreVal = scoreBox._children[0].getChildByName("scoreVal");
        let name = this.owner.getChildByName("name");
        headBox.visible = false;
        scoreBox.visible = false;
        headImg.skin = '';
        scoreVal.text = '';
        this.owner.userId = '';
        if (data.userid == GameControl.instance.userId) {
            this.owner.isMe = false;
        } else {
            name.text = '';
        }
    }

    /**
     * 补充钵钵后变更分数处理
     */
    setAddDaiRuScore(data) {
        let scoreBox = this.owner.getChildByName("score");
        let scoreVal = scoreBox._children[0].getChildByName("scoreVal");
        scoreVal.text = data.score;
    }


    /**如果坐下则开启自己显示牌的位置，如果未坐下则不开启自己显示牌的位置 */
    showOrHideMePokerSeat() {
        this.owner.getChildByName("show_poker_box").visible = this.owner.isMe ? false : true;
        let arr = this.owner.parent._children.filter(item => item.isMe);
        GameUI.instance.show_me_poker_box.visible = arr.length == 0 ? false : true;
    }

    /**
    * 显示某个玩家的操作倒计时
    * @param {number} data 数据
    * @param {Object} isShow 是否显示
    */
    showPlayerCountDown(data, isShow=true) {
        let countDownBox = this.owner.getChildByName("countDownBox");
        countDownBox.visible = isShow;
        if (isShow) {
            this._allTime = data.endTime - data.startTime-1;
            this._rotation = 360 * (((new Date().getTime()/1000 - data.startTime)) / this._allTime);
            this._timeOutFlag = true;
            this._showTimePlayerObj = this.owner;
            this._imgNode = countDownBox.getChildByName("countDown");
            this._imgNode.loadImage('res/img/progress1.png', Laya.Handler.create(this, this.loadImgEnd,[data]));
            this._countDownText = this.owner.getChildByName("countDownBox").getChildByName("timeText");
        } else {
            Laya.timer.clear(this, this.drawPie);
        }
    }

    // 接上
    loadImgEnd(data) {
        // let t1 = new Date().getTime();
        Laya.timer.frameLoop(1, this, this.drawPie, [data]);
    }
    // 接上
    drawPie(data) {
        this._countDownText.text = this._allTime - parseInt(((new Date().getTime() / 1000 -  data.startTime))) + 's';
        if (this._allTime - parseInt(((new Date().getTime()/ 1000 - data.startTime) )) == 5 && this._showTimePlayerObj.isMe) {
            if (this._timeOutFlag) {
                this._timeOutFlag = false;
                if (Main.gameSetVal.gameMusic == 1)
                    Laya.SoundManager.playSound(GameControl.instance._music.subTimeOut, 1);
                this._imgNode.loadImage('res/img/progress2.png');
            }
        }
        this._rotation = 360 * (((new Date().getTime() / 1000 - data.startTime)) / this._allTime);
        if (this._rotation >= 360) {
            this._rotation = 360;
            Laya.timer.clear(this, this.drawPie);
        }
        this._mask.graphics.clear();
        this._mask.graphics.drawPie(83, 83, 83, this._rotation, 360, '#000000');
        this._imgNode.mask = this._mask;
    }


    /**
     * 修改玩家显示筹码
     * @param {*} that 指向调用的组件对象 
     * @param {*} cmType 
     * @param {*} show 
     * @param {} joinNum 参与的数量
     * @param {*} fn 
     */
    changeShowCM(that, cmType, show = true, joinNum, index, fn) {
        let xiaZhuScoreBox = this.owner.getChildByName("xiaZhuScore");
        xiaZhuScoreBox.visible = show;
        let cm_show_seat = xiaZhuScoreBox.getChildByName("cm_show_seat");
        cm_show_seat.loadImage('res/img/choumaBg' + cmType + '.png', Laya.Handler.create(this, end, [that, joinNum]));
        function end(that, joinNum) {
            // console.log('修改显示筹码：',index+1,joinNum)
            if (index + 1 == joinNum) {
                if (fn)
                    fn.call(that);
            }
        }
    }


    /**
     * 显示或隐藏玩家秀牌的标志
     * @param isShow 是否显示
     */
    showOrHidePlayerXiuSign(isShow = true) {
        if (this.owner.isMe) {
            let MePokerBox = this.owner.getChildByName("show_me_poker_box");
            let poker1XiuSign = MePokerBox.getChildByName("poker1").getChildByName("xiuSign");
            let poker2XiuSign = MePokerBox.getChildByName("poker2").getChildByName("xiuSign");
            poker1XiuSign.visible = isShow;
            poker2XiuSign.visible = isShow;
        }
    }

    /**
    * 显示或隐藏自己玩家3,4张牌显示的黄色框的标志
    * @param isShow 是否显示
    */
    showOrHidePlayerShowSign(isShow = true) {
        if (this.owner.isMe) {
            let MePokerBox = this.owner.getChildByName("show_me_poker_box");
            let poker1ShowSign = MePokerBox.getChildByName("poker3").getChildByName("showSign");
            let poker2ShowSign = MePokerBox.getChildByName("poker4").getChildByName("showSign");
            poker1ShowSign.visible = isShow;
            poker2ShowSign.visible = isShow;
            if (!isShow)
                GameControl.instance._allowXiuPoker = false;
        }
    }

    /**
     * 为玩家下注筹码显示处附上相应的下注分数
     * */
    bindPlayerXiaZhuScoreVal(data, type) {
        let xiaZhuScoreVal = this.owner.getChildByName("xiaZhuScore").getChildByName("scoreVal");
        xiaZhuScoreVal.text = type == GameControl.instance._betType.mang == type ? data.mango : data.pi;
        this.owner.curXiaZhuScore = xiaZhuScoreVal.text;
    }

    /**
     * 更新玩家的下注分数以及剩余的分数
     */
    changePlayerScore(data, type) {
        if (GameControl.instance._changeScoreType.seat == type) {
            let lastScore = this.owner.getChildByName("score").getChildByName("scoreVal");
            lastScore.text = data;
        } else if (GameControl.instance._changeScoreType.xiaZhu == type) {
            let xiaZhuScoreVal = this.owner.getChildByName("xiaZhuScore").getChildByName("scoreVal");
            xiaZhuScoreVal.text = data;
        }
    }

    /**
      * 显示或隐藏玩家的下注显示处
      * @param {bool} show 是否显示
      */
    showOrHidePlayerXiaZhuView(show) {
        let xiaZhuScoreView = this.owner.getChildByName('xiaZhuScore');
        xiaZhuScoreView.visible = show;
    }



    /**
   * 为玩家第1,2张牌绑定数据
   * @param data 牌数据
   * @param type 类型 负责给哪张牌绑数据
   */
    // bindPlayerPokerData(that, data, type, fn, delay = 200) {
    //     if (GameControl.instance._bindPokerData.poker12 == type) {
    //         this.owner.poker12 = data;
    //     } else if (GameControl.instance._bindPokerData.poker3 == type) {
    //         this.owner.poker34[0] = data;
    //     } else if (GameControl.instance._bindPokerData.poker4 == type) {
    //         this.owner.poker34[1] = data;
    //     }
    //     setTimeout(() => {
    //         if (fn)
    //             fn.call(that)
    //     }, delay)
    // }

    /**
     * 显示移动筹码,并初始化位置
     * @param {*} that 指向调用的组件对象 
     * @param {*} cmType 筹码显示类型
     * @param {*} show 显示
     * @param {*} seatXY 初始化位置
     * @param {*} moveXY 移动位置
     * @param {*} music 播放音效
     * @param {} joinNum 参与的数量
     * @param {*} fn 回调函数
     */
    showMoveCM(that, cmType, show = true, seatXY, moveXY, music, joinNum, fn, param) {
        let move_cm = this.owner.getChildByName("create_cm_seat").getChildByName("move_cm");
        move_cm.visible = show;
        switch (seatXY) {
            case GameControl.instance._moveCMSeat.one:
                move_cm.pos(0, 0);
                break;
            case GameControl.instance._moveCMSeat.show:
                move_cm.pos(this.owner._showCMFaceToPlayerXY.x, this.owner._showCMFaceToPlayerXY.y);
                break;
            case GameControl.instance._moveCMSeat.mang:
                move_cm.pos(this.owner._mangDiChiFaceToPlayerXY.x, this.owner._mangDiChiFaceToPlayerXY.y);
                break;
            case GameControl.instance._moveCMSeat.pi:
                move_cm.pos(this.owner._piDiChiFaceToPlayerXY.x, this.owner._piDiChiFaceToPlayerXY.y);
                break;
        }
        move_cm.loadImage('res/img/choumaBg' + cmType + '.png', Laya.Handler.create(this, this.moveShowCM, [that, move_cm, moveXY, music, joinNum, fn, param]));
    }

    /**
   * 移动显示的移动筹码
   * @param {*} that 指向调用的组件对象 
   * @param {*} move_cm 筹码对象
   * @param {*} moveXY 移动位置
   * @param {*} joinNumfn 参与的数量
   * @param {*} fn 回调函数
   */
    moveShowCM(that, move_cm, moveXY, music, joinNum, fn, param) {
        let moveSpeed = GameControl.instance._speed.moveCM;
        switch (moveXY) {
            case GameControl.instance._moveCMSeat.one:
                Laya.Tween.to(move_cm, { x: 0, y: 0 }, moveSpeed, null, Laya.Handler.create(this, moveEnd, [that, move_cm, fn]))
                break;
            case GameControl.instance._moveCMSeat.show:
                Laya.Tween.to(move_cm, { x: this.owner._showCMFaceToPlayerXY.x, y: this.owner._showCMFaceToPlayerXY.y }, moveSpeed, null, Laya.Handler.create(this, moveEnd, [that, move_cm, fn]))
                break;
            case GameControl.instance._moveCMSeat.mang:
                Laya.Tween.to(move_cm, { x: this.owner._mangDiChiFaceToPlayerXY.x, y: this.owner._mangDiChiFaceToPlayerXY.y }, moveSpeed, null, Laya.Handler.create(this, moveEnd, [that, move_cm, fn]))
                break;
            case GameControl.instance._moveCMSeat.pi:
                Laya.Tween.to(move_cm, { x: this.owner._piDiChiFaceToPlayerXY.x, y: this.owner._piDiChiFaceToPlayerXY.y }, moveSpeed, null, Laya.Handler.create(this, moveEnd, [that, move_cm, fn]))
                break;
        }
        function moveEnd(that, move_cm, fn) {
            move_cm.visible = false;
            GameControl.instance._winUpINDEX++;
            // console.log(GameControl.instance._winUpINDEX,joinNum,fn)
            if (GameControl.instance._winUpINDEX == joinNum) {
                if (Main.gameSetVal.gameMusic == 1)
                    Laya.SoundManager.playSound(music, 1);
                if (fn) {
                    fn.call(that, param)
                }
            }
        }
    }



    /**
     * 使玩家的牌的数据重置状态(隐藏)
     * @param isShow 是否显示
     * @param isMe 是否是自己
     * @param array 数组中代表牌编号需要改变状态
     */
    reloadPlayerPokerZT(isShow, array) {
        if (array.length == 4) {
            let mePokerBox = this.owner.getChildByName('show_me_poker_box');
            mePokerBox._children.forEach(item => {
                item.visible = isShow;
            })
        }
        let arr1 = array.filter(item => item == 1 || item == 2);
        let arr2 = array.filter(item => item == 3 || item == 4);
        arr1.forEach(item => {
            let pokerBox = this.owner.getChildByName("deal_cards_seat");
            let poker = pokerBox.getChildByName('poker' + item);
            poker.visible = isShow;
        })
        arr2.forEach(item => {
            let pokerBox = this.owner.getChildByName("deal_cards_seat34");
            let poker = pokerBox.getChildByName('poker' + item);
            poker.visible = isShow;
        })
    }

    onclickPoker12Show(poker12Obj) {
        if (GameControl.instance._allowXiuPoker) {
            poker12Obj.isShow = !poker12Obj.isShow;
            GameControl.instance.xiuPoker(poker12Obj, poker12Obj.isShow);
        }
    }

    /**
     * 发牌
     * @param that 指向
     * @param num 代表第几张牌(从1开始)
     * @param count 参与人的总数
     * @param index 索引
     * @param fn 回调函数
     */
    dealPoker(that, num, count, playerPokerName, index, isUpdate, fn) {
        if (this.owner.isMe) {
            let mePokerBox = this.owner.getChildByName("show_me_poker_box");
            let mePoker = mePokerBox.getChildByName("poker" + num);
            mePoker.visible = true;
            mePoker.alpha = 0;
            mePoker.scaleX = 1;
            mePoker.scaleY = 1;
            mePoker.rotation = 180;
            mePoker.pokerName = playerPokerName;
            // console.log('自己的牌数据：',mePoker)
            let deal_me_cards_seat_xy = mePokerBox.globalToLocal(new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2));
            mePoker.pos(deal_me_cards_seat_xy.x, deal_me_cards_seat_xy.y);
            mePoker.loadImage('res/img/fightPokerBg.png', Laya.Handler.create(this, this.loadDealMePokerEnd, [that, mePoker, num, count, playerPokerName, index, isUpdate, fn]));
            if (num <= 2) {
                let pokerBox = this.owner.getChildByName("deal_cards_seat");
                let poker = pokerBox.getChildByName("poker" + num);
                pokerBox.x = this.owner._diuPokerSeatXY.x;
                pokerBox.y = this.owner._diuPokerSeatXY.y;
                pokerBox.rotation = 0;
                poker.visible = true;
                poker.alpha = 0;
                poker.x = num == 1 ? 0 : 20;
                poker.y = 0;
                poker.rotation = num == 1 ? -10 : 10;
                poker.scaleX = 0.5;
                poker.scaleY = 0.5;
                mePoker.isShow = false;
                mePoker.getChildByName("xiuSign").visible = false;
                mePoker.on(Laya.Event.CLICK, this, this.onclickPoker12Show, [mePoker]);
            } else {
                mePoker.getChildByName("showSign").visible = false;
            }
        }
        if (!this.owner.isMe) {
            let pokerBox = this.owner.getChildByName("deal_cards_seat");
            {
                pokerBox.rotation = 0;
                pokerBox.x = this.owner._diuPokerSeatXY.x;
                pokerBox.y = this.owner._diuPokerSeatXY.y;
            }
            if (num >= 3) {
                pokerBox = this.owner.getChildByName("deal_cards_seat34");
            }
            let poker = pokerBox.getChildByName("poker" + num);
            let deal_cards_seat_xy = pokerBox.globalToLocal(new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2));
            poker.visible = true;
            poker.alpha = 0;
            poker.scaleX = 1;
            poker.scaleY = 1;
            poker.rotation = 180;
            poker.pos(deal_cards_seat_xy.x, deal_cards_seat_xy.y);
            poker.loadImage('res/img/fightPokerBg.png', Laya.Handler.create(this, this.loadDealPokerEnd, [that, poker, num, count, playerPokerName, index, isUpdate, fn]))
        }
    }


    loadDealMePokerEnd(that, mePoker, num, count, playerPokerName, index, isUpdate, fn) {
        let delayTime = isUpdate ? 0 : index * (GameControl.instance._speed.moveCard / (parseInt(count / 2) < 1 ? 1 : parseInt(count / 2)));
        Main.$LOG('等待时间：', delayTime);
        let alpha = isUpdate ? 0 : 1;
        Laya.Tween.to(mePoker, { alpha: alpha }, 0, null, Laya.Handler.create(this, this.changeMePokerAlphaEnd, [that, mePoker, num, count, playerPokerName, index, isUpdate, fn]), delayTime)
    }

    /**
     * 牌图片加载完成后就开始向自己的位置上移动
     */
    loadDealPokerEnd(that, poker, num, count, playerPokerName, index, isUpdate, fn) {
        let delayTime = isUpdate ? 0 : index * (GameControl.instance._speed.moveCard / (parseInt(count / 2) < 1 ? 1 : parseInt(count / 2)));
        Main.$LOG('等待时间：', delayTime);
        let alpha = isUpdate ? 0 : 1;
        Laya.Tween.to(poker, { alpha: alpha }, 0, null, Laya.Handler.create(this, this.changePokerAlphaEnd, [that, poker, num, count, playerPokerName, index, isUpdate, fn]), delayTime)
    }

    changeMePokerAlphaEnd(that, mePoker, num, count, playerPokerName, index, isUpdate, fn) {
        let x = mePoker.width * 1.3 * num + mePoker.pivotX * 1.3;
        let y = mePoker.pivotY * 1.3;
        if (num <= 2) {
            this.owner.mePokerX_2.push({ x: x });
        }
        if (num == 3) {
            let poker1 = this.owner.getChildByName('show_me_poker_box').getChildByName('poker1');
            let poker2 = this.owner.getChildByName('show_me_poker_box').getChildByName('poker2');
            let x2 = mePoker.width * 1.3 * 1 + mePoker.pivotX * 1.3 - (poker1.width / 2) * 1.3;
            let x3 = mePoker.width * 1.3 * 2 + mePoker.pivotX * 1.3 - (poker2.width / 2) * 1.3;
            Laya.Tween.to(poker1, { x: x2 }, 100);
            Laya.Tween.to(poker2, { x: x3 }, 100);
            x = mePoker.width * 1.3 * num + mePoker.pivotX * 1.3 - (poker1.width / 2) * 1.3;
            this.owner.mePokerX_3 = [{ x: x2 }, { x: x3 }, { x: x }]
        } else if (num == 4) {
            let poker1 = this.owner.getChildByName('show_me_poker_box').getChildByName('poker1');
            let poker2 = this.owner.getChildByName('show_me_poker_box').getChildByName('poker2');
            let poker3 = this.owner.getChildByName('show_me_poker_box').getChildByName('poker3');
            let x2 = mePoker.width * 1.3 * 0 + mePoker.pivotX * 1.3;
            let x3 = mePoker.width * 1.3 * 1 + mePoker.pivotX * 1.3;
            let x4 = mePoker.width * 1.3 * 2 + mePoker.pivotX * 1.3;
            Laya.Tween.to(poker1, { x: x2 }, 100);
            Laya.Tween.to(poker2, { x: x3 }, 100);
            Laya.Tween.to(poker3, { x: x4 }, 100);
            x = mePoker.width * 1.3 * 3 + mePoker.pivotX * 1.3;
            this.owner.mePokerX_4 = [{ x: x2 }, { x: x3 }, { x: x4 }, { x: x }]
        }
        let speed = isUpdate ? 0 : GameControl.instance._speed.moveCard;
        if (!isUpdate) {
            if (Main.gameSetVal.gameMusic == 1) {
                GameControl.instance.$LOG('进来音效')
                Laya.SoundManager.playSound(GameControl.instance._music.dealCards, 1);
            }
        }
        Laya.Tween.to(mePoker, { x: x, y: y, scaleX: 1.3, scaleY: 1.3, rotation: 0 }, speed, null, Laya.Handler.create(this, this.moveMeCardEnd, [that, mePoker, num, count, playerPokerName, index, isUpdate, fn]))
    }
    changePokerAlphaEnd(that, poker, num, count, playerPokerName, index, isUpdate, fn) {
        if (num <= 2) {//第一二张牌
            let x = num == 1 ? 0 : 20;
            let rotation = num == 1 ? -10 : 10;
            let speed = isUpdate ? 0 : GameControl.instance._speed.moveCard;
            if (!isUpdate) {
                if (Main.gameSetVal.gameMusic == 1)
                    Laya.SoundManager.playSound(GameControl.instance._music.dealCards, 1);
            }
            Laya.Tween.to(poker, { x: x, y: 0, scaleX: 0.5, scaleY: 0.5, rotation: rotation }, speed, null, Laya.Handler.create(this, this.moveCardEnd, [that, poker, count, index, isUpdate, fn]))
        } else {//第三四张牌
            let poker34Box = this.owner.getChildByName("show_poker_box").getChildByName("poker_box");
            let poker34SeatXY = poker34Box.globalToLocal(new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2));
            let pokerBox = this.owner.getChildByName("deal_cards_seat34");
            let deal_cards_seat_xy = pokerBox.globalToLocal(new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2));
            let x = (deal_cards_seat_xy.x - poker34SeatXY.x) + poker.pivotX * 0.9;
            let y = (deal_cards_seat_xy.y - poker34SeatXY.y) + poker.pivotY * 0.9;
            if (num == 4) {
                x = x + (poker.width / 4);
                let x2 = (deal_cards_seat_xy.x - poker34SeatXY.x) + poker.pivotX * 0.9 - (poker.width / 4);
                let poker3 = this.owner.getChildByName("deal_cards_seat34").getChildByName('poker3');
                Laya.Tween.to(poker3, { x: x2 }, 100)
            }
            let speed = isUpdate ? 0 : GameControl.instance._speed.moveCard;
            if (!isUpdate) {
                if (Main.gameSetVal.gameMusic == 1)
                    Laya.SoundManager.playSound(GameControl.instance._music.dealCards, 1);
            }
            Laya.Tween.to(poker, { x: x, y: y, scaleX: 0.9, scaleY: 0.9, rotation: 0 }, speed, null, Laya.Handler.create(this, this.moveCard3Or4End, [that, poker, num, count, playerPokerName, index, isUpdate, fn]))
        }
    }

    moveMeCardEnd(that, mePoker, num, count, playerPokerName, index, isUpdate, fn) {
        GameControl.instance._dealNumber++;
        if (!isUpdate) {
            if (Main.gameSetVal.gameMusic == 1) {
                GameControl.instance.$LOG('进来音效')
                Laya.SoundManager.playSound(GameControl.instance._music.fanCards, 1);
            }
        }
        let speed = isUpdate ? 0 : GameControl.instance._speed.fanCard;
        Laya.Tween.to(mePoker, { scaleX: 0 }, speed, null, Laya.Handler.create(this, this.fanCardMePokerEnd, [mePoker, num, playerPokerName, isUpdate]))
        // console.log(GameControl.instance._dealNumber,count)
        if (GameControl.instance._dealNumber == count) {
            if (fn)
                fn.call(that)
        }
    }

    fanCardMePokerEnd(mePoker, num, playerPokerName, isUpdate) {
        if (num >= 3) {
            mePoker.getChildByName("showSign").visible = true;
        }
        mePoker.loadImage('res/img/poker/' + playerPokerName + '.png', Laya.Handler.create(this, this.changeMeFanPokerEnd, [mePoker, isUpdate]));
    }

    changeMeFanPokerEnd(mePoker, isUpdate) {
        let speed = isUpdate ? 0 : GameControl.instance._speed.fanCard;
        Laya.Tween.to(mePoker, { scaleX: 1.3, alpha: 1 }, speed);
    }

    moveCardEnd(that, poker, count, index, isUpdate, fn) {
        GameControl.instance._dealNumber++;
        if (isUpdate && !this.owner.isMe) {
            Laya.Tween.to(poker, { alpha: 1 }, 0);
        }
        if (GameControl.instance._dealNumber == count) {
            if (fn)
                fn.call(that)
        }
    }

    moveCard3Or4End(that, poker, num, count, playerPokerName, index, isUpdate, fn) {
        GameControl.instance._dealNumber++;
        if (GameControl.instance._dealNumber == count) {
            if (fn)
                fn.call(that)
        }
        let speed = isUpdate ? 0 : GameControl.instance._speed.fanCard;
        if (!isUpdate) {
            if (Main.gameSetVal.gameMusic == 1)
                Laya.SoundManager.playSound(GameControl.instance._music.fanCards, 1);
        }
        Laya.Tween.to(poker, { scaleX: 0 }, speed, null, Laya.Handler.create(this, this.fanCardPokerEnd, [that, poker, num, count, playerPokerName, index, isUpdate, fn]))
    }

    fanCardPokerEnd(that, poker, num, count, playerPokerName, index, isUpdate, fn) {
        poker.loadImage('res/img/poker/' + playerPokerName + '.png', Laya.Handler.create(this, this.changeFanPokerEnd, [that, poker, count, index, isUpdate, fn]))
    }

    changeFanPokerEnd(that, poker, count, index, isUpdate, fn) {
        let speed = isUpdate ? 0 : GameControl.instance._speed.fanCard;
        Laya.Tween.to(poker, { scaleX: 0.9, alpha: 1 }, speed);
    }


    /**
     * 玩家操作提示及效果显示
     * @param actionType 操作类型
     * @param isShow  是否显示
     */
    showActionTip(isShow, actionType) {
        let tipsBox = this.owner.getChildByName("tipsBox");
        tipsBox.visible = isShow;
        if (isShow) {
            tipsBox.loadImage('res/img/Action/Action' + actionType + '.png', Laya.Handler.create(this, this.loadTipEnd, [tipsBox]))
            this.owner.actionType = actionType;
        }
    }

    // 接上
    loadTipEnd(tipsBox) {
        let y = tipsBox.y;
        _num3 = 0;
        Laya.timer.frameLoop(2, this, this.TimeEnd, [y, tipsBox])
    }
    // 接上
    TimeEnd(y, tipsBox) {
        _num3++;
        if (_num3 % 2 == 0) {
            Laya.Tween.to(tipsBox, { y: y + 20 }, 100);
        } else {
            Laya.Tween.to(tipsBox, { y: y }, 100);
        }
        if (_num3 >= 5) {
            Laya.timer.clear(this, this.TimeEnd)
        }
    }

    /**
     * 玩家丢牌后，玩家的状态改变
     */

    /**
     * 玩家丢牌
     * @param isShowPoker 是否显示丢的牌(主要区分自己)
     */
    diuPoker() {
        let diuPokerBox = this.owner.getChildByName('deal_cards_seat');
        if (this.owner.isMe) {
            diuPokerBox.getChildByName('poker1').alpha = 1;
            diuPokerBox.getChildByName('poker2').alpha = 1;
        }
        let diuSeatXY = diuPokerBox.globalToLocal(new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2));
        let x = diuSeatXY.x + this.owner._diuPokerSeatXY.x;
        let y = diuSeatXY.y + this.owner._diuPokerSeatXY.y;
        Laya.Tween.to(diuPokerBox, { rotation: 360 }, GameControl.instance._speed.diuRotation);
        Laya.Tween.to(diuPokerBox, { x: x, y: y }, GameControl.instance._speed.diu, null, Laya.Handler.create(this, this.diuMoveEnd, [diuPokerBox]));
    }

    //接上
    diuMoveEnd(diuPokerBox) {
        if (Main.gameSetVal.gameMusic == 1)
            Laya.SoundManager.playSound(GameControl.instance._music.diu, 1);
        diuPokerBox.getChildByName('poker1').alpha = 0;
        diuPokerBox.getChildByName('poker2').alpha = 0;
        diuPokerBox.x = this.owner._diuPokerSeatXY.x;
        diuPokerBox.y = this.owner._diuPokerSeatXY.y;
    }


    /**
     * 显示庄的公用方法
     * @param isShow 是否显示
     */
    showBanker(isShow) {
        let banker = this.owner.getChildByName("banker");
        banker.visible = isShow;
    }


    /**
     * 显示玩家的分牌容器(返回结果用的)
     * @param {*} isShow 是否显示
     * @param {*} data 显示的值
     */
    showPlayerSubResult(isShow, data) {
        if (this.owner.isMe) {
            // console.log(data)
            let subBox = this.owner.getChildByName("show_me_sub_poker");
            subBox.visible = isShow;
            if (isShow) {
                let sub1_children = subBox.getChildByName('sub1')._children;
                let sub2_children = subBox.getChildByName('sub2')._children;
                sub1_children.forEach((item, index) => {
                    if (item.name === 'pokerBox') {
                        item.loadImage('res/img/poker/' + data.sub1.data[index] + '.png')
                    } else if (item.name === 'pointBox') {
                        item.getChildByName('pointText').text = data.sub1.point;
                    }
                })
                sub2_children.forEach((item, index) => {
                    if (item.name === 'pokerBox') {
                        item.loadImage('res/img/poker/' + data.sub2.data[index] + '.png')
                    } else if (item.name === 'pointBox') {
                        item.getChildByName('pointText').text = data.sub2.point;
                    }
                })
            }
        } else {
            let subBox = this.owner.getChildByName("sub_poker_box");
            subBox.visible = isShow;
            if (!isShow) {
                let subBox_me = this.owner.getChildByName("show_me_sub_poker");
                subBox_me.visible = isShow;
            }
            if (isShow) {
                let sub1_children = subBox.getChildByName('sub1')._children;
                let sub2_children = subBox.getChildByName('sub2')._children;
                sub1_children.forEach((item, index) => {
                    if (item.name === 'pokerBox') {
                        item.loadImage('res/img/poker/' + data.sub1.data[index] + '.png')
                    } else if (item.name === 'pointBox') {
                        item.getChildByName('pointText').text = data.sub1.point;
                    }
                })
                sub2_children.forEach((item, index) => {
                    if (item.name === 'pokerBox') {
                        item.loadImage('res/img/poker/' + data.sub2.data[index] + '.png')
                    } else if (item.name === 'pointBox') {
                        item.getChildByName('pointText').text = data.sub2.point;
                    }
                })
            }
        }
    }

    /**
     * 玩家秀牌
     * @param {*} isShow 是否显示
     * @param {*} data 秀牌的数据
     */
    showPlayerXiuView(isShow, data) {
        let xiuPokerView = this.owner.getChildByName("xiuPokerBox");
        xiuPokerView.visible = isShow;
        if (isShow) {
            let xiuPoker1 = xiuPokerView.getChildByName("xiuPoker1");
            let xiuPoker2 = xiuPokerView.getChildByName("xiuPoker2");
            xiuPoker1.loadImage('res/img/poker/-1.png');
            xiuPoker2.loadImage('res/img/poker/-1.png');
            data.forEach((pokerName, index) => {
                if (index == 0) {
                    Laya.Tween.to(xiuPoker1, { scaleX: 0 }, GameControl.instance._speed.xiuFan, null, Laya.Handler.create(this, this.xiuPokerFanEnd, [xiuPoker1, pokerName]))
                } else {
                    Laya.Tween.to(xiuPoker2, { scaleX: 0 }, GameControl.instance._speed.xiuFan, null, Laya.Handler.create(this, this.xiuPokerFanEnd, [xiuPoker2, pokerName]))
                }
            })
        }
    }
    xiuPokerFanEnd(xiuPokerObj, pokerName) {
        xiuPokerObj.loadImage('res/img/poker/' + pokerName + '.png', Laya.Handler.create(this, this.loadXiuPokerEnd, [xiuPokerObj]));
    }
    loadXiuPokerEnd(xiuPokerObj) {
        xiuPokerObj.getChildByName("showSign").visible = true;
        Laya.Tween.to(xiuPokerObj, { scaleX: 0.7 }, GameControl.instance._speed.xiuFan);
    }

    /**
     * 显示玩家赢的分数
     * @param {*} isShow 是否显示
     * @param {*} data 分数数据
     */
    showPlayerLastWinScore(isShow, data) {
        let winScoreBox = this.owner.getChildByName("winScore");
        winScoreBox.visible = isShow;
        if (isShow) {
            let winScoreText = winScoreBox.getChildByName("value");
            winScoreText.text = '';
            winScoreText.text = data;
        }
    }

    /**
     * 玩家座位上添加帧动画(gif动画)
     * @param {*} isShow 是否显示
     * @param {*} aniType 显示类型
     * @param {*} autoClose 是否自动关闭
     */
    playerSeatAddGif(isShow = true, aniType = Main.animations.qiao, autoClose = false) {
        let animationBox = this.owner.getChildByName("gifBox");
        // console.log('playerGIF'+aniType)
        animationBox.visible = isShow;
        let thisAni = animationBox.getChildByName('playerGIF' + aniType)
        if (thisAni) {
            thisAni.removeSelf();
        }
        if (this.aniTimeID) {
            clearTimeout(this.aniTimeID);
        }
        if (isShow) {
            Laya.loader.load("res/atlas/images/GIF/" + aniType + ".atlas", Laya.Handler.create(this, onMyLoaded));
            function onMyLoaded() {
                let ani = new Laya.Animation();
                ani.name = 'playerGIF' + aniType;
                ani.pos(this.owner.pivotX, this.owner.pivotY);
                ani.loadAnimation("animation/" + aniType + ".ani");
                animationBox.addChild(ani);
                //播放Animation动画
                ani.play();
                if (autoClose) {
                    this.aniTimeID = setTimeout(() => {
                        animationBox._children = [];
                        animationBox.visible = false;
                        clearTimeout(this.aniTimeID);
                    }, 2000)
                }
            }
        }
    }

    /**
     * 显示其他玩家的赢的动画
     * @param {*} isShow 是否显示
     */
    playerSeatAddRotationGif(isShow = true) {
        let animationBox = this.owner.getChildByName("gifBox");
        let win = animationBox.getChildByName("WIN");
        let win_img = animationBox.getChildByName("WIN_IMG");
        animationBox.visible = isShow;
        win.visible = isShow;
        win_img.visible=isShow;
        win.rotation = 0;
        if (isShow) {
            Laya.timer.loop(1, this, this.winRotation, [win])
        } else {
            Laya.timer.clear(this, this.winRotation);
        }
    }
    winRotation(OBJ) {
        OBJ.rotation += 4;
    }
}