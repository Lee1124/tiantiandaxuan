/**
 * 游戏控制脚本
 *  */
import CommonSet from '../common/common'
import CountPoint from '../common/CountPoint';//查找点数
import NetClient from '../common/NetClient';//websoket
import Main from '../common/Main';//Main.js
import MyCenter from '../common/MyCenter';
import HTTP from '../common/HttpRequest';
import GameRoomInit from '../Fuction/GameRoomInit'
import PlayerDelayTime from '../Fuction/PlayerDelayTime';
import MySlider from '../Fuction/MySlider';
import RecSoketReloadData from '../Fuction/RecSoketReloadData'
import ErrText from '../Fuction/ErrText'
let clickIndex = 0;
export default class GameControl extends Laya.Script {
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
        //定义音量
        this._music = {
            moveShow: 'res/sounds/chips_to_table.wav',
            moveMangOrPi: 'res/sounds/chips_to_pot.wav',
            dealCards: 'res/sounds/movecard.mp3',
            fanCards: 'res/sounds/card_turning.wav',
            handle: 'res/sounds/handle.wav',
            diu: 'res/sounds/diu.wav',
            sub: 'res/sounds/sub.wav',
            subTimeOut: 'res/sounds/timeout.wav',
            subEnd: 'res/sounds/pcheck.wav',
            xiu: 'res/sounds/pcheck.wav',
            YouWin: 'res/sounds/YouWin.wav',
            daSlider: 'res/sounds/slider.wav',
            daSliderTop: 'res/sounds/slider_top.wav',
        }

        //定义芒和皮敞常量
        this._betType = {
            mang: 1,
            pi: 2,
        }

        this.autoHandle = {
            left: 1,
            right: 2
        }

        //定义移动筹码位置常量
        this._moveCMSeat = {
            one: 1,
            show: 2,
            mang: 3,
            pi: 4
        }

        // 绑定牌数据
        this._bindPokerData = {
            poker12: 1,
            poker3: 2,
            poker4: 3,
            poker34: 4
        }

        // 绑定玩家分数类型
        this._changeScoreType = {
            seat: 1,
            xiaZhu: 2
        }

        // 筹码移动速度
        this._speed = {
            changeSeatSpeed: 180,
            moveCM: 260,
            delayCard: 100,
            moveCard: 200,
            fanCard: 100,
            xiuFan: 200,
            diu: 500,
            diuRotation: 300,
            handle: 120,
            winCMDelay: 500,
            winShowDelay: 500
        }

        this.delayType = {
            action: 1,
            sub: 2
        }

        //允许操作显示
        this._allowStartAction = true;
        //是否是刷新或者重连的数据
        this._isUpdateData = false;
        //开始分牌的数据
        this.StartAssignPokerArr = [];
        //敲发牌是否结束
        this.qiaoDealPokerEnd = false;
        //soket重连次数
        this.soketConnetNum = 0;
        //是否已留座
        this.isLiuZuo = false;
    }



    $LOG(...data1) {
        if (Main.debug)
            console.log(...data1)
    }
    onAwake() {
        GameControl.instance = this;
    }
    onStart() {
        Main.$LOG('游戏控制中心:', this, this.owner._openedData)
        this._subCountDownVal = this.owner.subCountDown.getChildByName("timeText").getChildByName('timeVal');
        this._subCountDownLineTop = this.owner.subCountDown.getChildByName("lineBox")._children[0].getChildByName("line_top");
        {
            this._subView1 = this.owner.me_sub_pokerBox.getChildByName("poker1Box").getChildByName("poker");
            this._subView2 = this.owner.me_sub_pokerBox.getChildByName("poker2Box").getChildByName("poker");
            this._subPoint1Text = this.owner.me_sub_pokerBox.getChildByName("point1Text");
            this._subPoint2Text = this.owner.me_sub_pokerBox.getChildByName("point2Text");
            this._confrimSubBtn0 = this.owner.confrimSubBtn0;
            this._confrimSubBtn1 = this.owner.confrimSubBtn1;
        }
        this.setGameParamInit();
    }
    /**
     * 初始化游戏参数
     */
    setGameParamInit() {
        this.userId = Main.userInfo.userId;
        this.key = Main.userInfo.key;
        this.roomPwd = this.owner._openedData.roomPws;
        this.roomId = '';
        this.netClient = new NetClient("ws://" + Main.websoketApi);
        this.onConnect();
    }

    onEnable() {
        let num = 0;
        let that = this;
        this.openDiaLogSpeed = 200;
        this._playerArray = [];
        this._plyerIndexArray = [];
        that._seatXY = [];
        this.$LOG('控制中心:', this);
        GameRoomInit.init(that);
        MyCenter.req({
            key: "seat",
            callback(res) {
                res.INDEX = num++;
                that._playerArray.push(res);
                that._plyerIndexArray.push(res.INDEX);
                setTimeout(() => {
                    GameRoomInit.keepValue(that, res);
                })
            }
        });
    }

    /**
     * 执行调整位置的动画函数
     * @param index 所属索引
     * @param speed 移动位置的速度
     */
    changeSeatXY(index, speed) {
        let arr = [];
        let deskViewUserSeatArr = this.owner.deskView._children.filter(item => item.name.indexOf('empty-seat') != -1);
        for (let i = 0; i < deskViewUserSeatArr.length; i++) {
            arr.push(i);
        }
        let concatArr = arr.splice(index, deskViewUserSeatArr.length).concat(arr.splice(0, index + 1));
        for (let i = 0; i < concatArr.length; i++) {
            {
                this._playerArray[concatArr[i]].owner.isMe = false;
                this._playerArray[index].owner.isMe = true;
            }
            Laya.Tween.to(this._playerArray[concatArr[i]].owner, { x: this.owner._playerSeatXYArray[i].x, y: this.owner._playerSeatXYArray[i].y }, speed, null, Laya.Handler.create(this, () => {
            }));//切换位置
            Laya.Tween.to(this._playerArray[concatArr[i]].owner.getChildByName("xiaZhuScore"), { x: this.owner._xiaZhuSeatXYArray[i].x, y: this.owner._xiaZhuSeatXYArray[i].y }, speed, null);//切换下注分处的位置
            Laya.Tween.to(this._playerArray[concatArr[i]].owner.getChildByName("tipsBox"), { x: this.owner._tipsSeatXYArray[i].x, y: this.owner._tipsSeatXYArray[i].y }, speed, null);//切换下注分处的位置
            {
                this._playerArray[concatArr[i]].owner.getChildByName("show_poker_box").x = this.owner._pokerBoxSeat[i].x;
                this._playerArray[concatArr[i]].owner.getChildByName("show_poker_box").y = this.owner._pokerBoxSeat[i].y;
            }
            {//保证玩家筹码的位置正确
                let create_cm_seat_children = this._playerArray[concatArr[i]].owner.getChildByName("create_cm_seat")._children;
                create_cm_seat_children.forEach(item => {
                    Laya.Tween.to(item, { x: this.owner._showCMFaceToPlayerXY[i].x, y: this.owner._showCMFaceToPlayerXY[i].y }, speed);
                });
            }

            {//保证玩家分牌显示的位置正确
                Laya.Tween.to(this._playerArray[concatArr[i]].owner.getChildByName("sub_poker_box"), { x: this.owner._subPokerBoxSeat[i].x, y: this.owner._subPokerBoxSeat[i].y }, speed, null);
            }

            {//刷新玩家显示筹码/与芒奖池/与皮奖池的坐标
                this._playerArray[concatArr[i]].owner._showCMFaceToPlayerXY.x = this.owner._showCMFaceToPlayerXY[i].x;
                this._playerArray[concatArr[i]].owner._showCMFaceToPlayerXY.y = this.owner._showCMFaceToPlayerXY[i].y;
                this._playerArray[concatArr[i]].owner._mangDiChiFaceToPlayerXY.x = this.owner._mangDiChiFaceToPlayerXYArray[i].x;
                this._playerArray[concatArr[i]].owner._mangDiChiFaceToPlayerXY.y = this.owner._mangDiChiFaceToPlayerXYArray[i].y;
                this._playerArray[concatArr[i]].owner._piDiChiFaceToPlayerXY.x = this.owner._piDiChiFaceToPlayerXYArray[i].x;
                this._playerArray[concatArr[i]].owner._piDiChiFaceToPlayerXY.y = this.owner._piDiChiFaceToPlayerXYArray[i].y;
            }
        }
    }



    /**
     * soket打开
     */
    onConnect() {
        let that = this;
        this.netClient.open();
        this.netClient.onConnectSucc = function () {
            Main.$LOG('连接成功');
            that.onSend({
                name: 'M.User.C2G_Connect',
                data: {
                    uid: that.userId,
                    key: that.key,
                    devid: Laya.Browser.onAndroid ? "Android" : "PC",
                    ip: "60.255.161.15"
                },
                success(resMsg) {
                    Main.$LOG('初始化---[Rpc回调]:', resMsg);
                    if (resMsg._t == "G2C_Connect") {
                        if (resMsg.ret.type == 0) {
                            RecSoketReloadData.reload(this);
                            Main.showLoading(false, Main.loadingType.two);
                            this.soketConnetNum = 0;
                            this.onSend({
                                name: 'M.Room.C2R_IntoRoom',
                                data: {
                                    roomPws: that.roomPwd
                                },
                                success(res) {
                                    that.dealSoketMessage('初始化---C2R_IntoRoom进入房间', res);
                                }
                            })
                        } else {
                            Main.showDiaLog(resMsg.ret.msg, 1, () => {
                                that.onClose();
                                Laya.Scene.open('login.scene', true, Main.sign.signOut);
                            })
                        }
                    }
                }
            });
            /* 接受消息 */
            that.netClient.onMessage = function (name, resMsg) {
                that.dealSoketMessage('onMessage公共消息：', resMsg); //进入处理函数
            }

            that.netClient.onStartConnect = function (res) {
                Main.errList = [];
                Main.$LOG('soket重新连接开始')
                Main.showLoading(true, Main.loadingType.two);
                that.soketConnetNum++;
                if (that.soketConnetNum >= 15) {
                    Main.showLoading(false, Main.loadingType.two);
                    that.soketConnetNum = 0;
                    Main.showDiaLog('网络错误,请重新登录', 1, () => {
                        that.onClose();
                        Laya.Scene.open('login.scene', true, Main.sign.signOut);
                    })
                } else if (that.soketConnetNum == 1) {
                    Main.showTip('检测到网络丢失!');
                }
            }
        }
    }
    /**
     * soket发送消息
     */
    onSend(obj) {
        let that = this;
        let name = obj.name;
        let data = obj.data;
        this.netClient.send({
            name: name,
            data: data,
            callback: function (name, msg) {
                obj.success.call(that, msg);
            }
        });
        Main.$LOG('soket发送消息:', obj);
    }

    /**
    * soket关闭
    */
    onClose() {
        Main.showLoading(false, Main.loadingType.two);
        this.netClient.close();
    }

    /**
     * 获取游戏房间信息
     */
    getGameNews(data) {
        this._gameRoomeNews = data.option;
        this.setRoomData(data);
    }

    /**
     * 设置房间数据
     * @param {*} data 房间数据
     */
    setRoomData(data) {
        // this.owner.start_game_btn.visible = !data.start && parseInt(data.administration) === parseInt(this.userId) ? true : false;
        this.owner.rule_roomPws.text = data.roomPws;
        this.owner.rule_roomName.text = data.roomName;
        this.owner.rule_pi.text = '皮：' + data.option.dizhu;
        this.owner.rule_ruleText2_9.text = data.option.dy29 ? '2/9地王' : '';
        if (data.option.xmzm && data.option.yxqm) {
            this.owner.rule_ruleText.text = '休芒/揍芒/圈芒 ×' + data.option.mangrate;
        } else if (data.option.xmzm && !data.option.yxqm) {
            this.owner.rule_ruleText.text = '休芒/揍芒 ×' + data.option.mangrate;
        } else if (!data.option.xmzm && data.option.yxqm) {
            this.owner.rule_ruleText.text = '圈芒 ×' + data.option.mangrate;
        } else if (!data.option.xmzm && !data.option.yxqm) {
            this.owner.rule_ruleText.text = '';
        }
    }

    /**
     * 处理websoket收到的消息
     */
    dealSoketMessage(sign, resData) {
        try {
            Main.$LOG(sign, resData);
            if (resData._t == 'GenalResult') {
                this.errOpenLoginView(resData);
            }
            if (resData._t == 'R2C_IntoRoom') {
                if (resData.ret.type == 0) {
                    this.requestRoomUpdateData(resData);
                } else {
                    Main.showTip(resData.ret.msg);
                    this.leaveRoomOpenView();
                }
            }
            // 进入房间数据(即刷新数据)
            if (resData._t == 'R2C_UpdateRoom') {
                if (resData.ret.type == 0) {
                    resData.param.json.forEach(item => {
                        if (item._t == "CXIntoRoom") {
                            this.getGameNews(item);//获取游戏信息
                            this.updateRoomData(item, resData);
                        } else if (item._t == "UpdateRoomData") {
                            this.updateCurData(item, resData);//更新当前数据
                        }
                    })
                } else {
                    Main.showTip(resData.ret.msg);
                }
            }

            if (resData._t == "R2C_AddDairu") {
                if (resData.ret.type == 0 || resData.ret.type == 4) {
                    this.setMeMakeBOBO(resData);
                    resData.param.json.forEach(item => {
                        if (item._t == "CXAddBobo") {
                            this.playerAddDairu(item);
                        }
                    })
                }
                if (resData.ret.type != 0) {
                    Main.showTip(resData.ret.msg);
                }
            }

            if (resData._t == 'R2C_SeatAt') {
                if (resData.ret.type == 0) {
                    resData.param.json.forEach(item => {
                        if (item._t == "CXSeatAt") {
                            this.playerSeatAt(item);
                        } else if (item._t == "CXSitDown") {
                            this.playerSeatDown(item);
                        }
                    })
                } else {
                    Main.showTip(resData.ret.msg);
                }
            } else if (resData._t == 'R2C_SeatUp') {
                if (resData.ret.type == 0) {
                    this.playerSeatUp(resData);
                } else {
                    Main.showTip(resData.ret.msg);
                }
            } else if (resData._t == 'R2C_SitDown') {
                if (resData.ret.type == 0) {
                    resData.param.json.forEach(item => {
                        this.playerSeatDown(item);
                    })
                } else {
                    Main.showTip(resData.ret.msg);
                }
            } else if (resData._t == "R2C_LeaveRoom") {
                if (resData.ret.type == 4) {
                    Main.showTip(resData.ret.msg);
                } else {
                    this.leaveRoomDeal(resData);
                }
            } else if (resData._t == "CXRoomEnd") {
                this.roomEnd(resData);
            }

            if (resData._t == "G2C_TimeDelay") {
                PlayerDelayTime.dealWithRes(this, resData);
            } else if (resData._t == "G2C_StartNewRound") {
                this.startNewRound(resData);
            } else if (resData._t == "G2C_BetPiAndMango") {
                this.betPiAndMango(resData);
            } else if (resData._t == "G2C_Deal") {
                this._startAction = null;
                if (resData.type == 0) {//首牌(第1、2张)
                    this.playerBindPoker12Val(resData);
                    if (this._isUpdateData) {
                        this.startDealPoker1And2();
                    }
                } else if (resData.type == 1) {//第3张
                    this.playerBindPoker3Or4Val(resData, 3);
                } else if (resData.type == 2) {//第4张
                    this.qiaoDealPokerEnd = false;
                    this.StartAssignPokerArr = [];
                    this.playerBindPoker3Or4Val(resData, 4);
                } else if (resData.type == 3) {//第3,4张
                    this._allowStartAction = true;
                    this.qiaoDealPokerEnd = false;
                    this.playerBindPoker34Val(resData);
                }
            } else if (resData._t == "G2C_StartAction") {
                this._startAction = resData;
                if (resData.ret.type == 0) {
                    this.startAction();
                } else if (resData.ret.type == 6) {
                    Main.showTip(resData.ret.msg);
                    this.sanhuaAction(resData)
                }
            } else if (resData._t == "G2C_PlayerAction") {
                this.playerAction(resData);
            } else if (resData._t == "G2C_PlayerActionEnd") {
                this.qiaoDealPokerEnd = true;
                this.playerActionEnd(resData);
            } else if (resData._t == "G2C_StartAssignPoker") {//分牌
                this.StartAssignPokerArr = [];
                if (this.qiaoDealPokerEnd) {
                    this.assignPokerCountDown(true, resData);
                    this.startAssignPoker(true, false, resData);
                } else {
                    this.StartAssignPokerArr = [{ data: resData }];
                }
            } else if (resData._t == "G2C_AssignPoker") {//分牌
                if (resData.ret.type == 0) {
                    this.assignPokerReturn(resData);
                } else {
                    Main.showTip(resData.ret.msg);
                }
            } else if (resData._t == "G2C_WinUp") {
                this.playerWinUp(resData);
            } else if (resData._t == "G2C_RecyclingMang") {
                this.recyclingMang(resData);
            } else if (resData._t == "G2C_RoundEnd") {
                this.roundEnd(resData);
            }

            //表情
            if (resData._t == "G2C_GameChat") {
                this.showPlayerExpression(resData);
            }

            //留座
            if (resData._t == "R2C_Reservation") {
                if (resData.ret.type == 0) {
                    resData.param.json.forEach(item => {
                        if (item._t == "CXSeatReservation") {
                            this.playerLiuZuo(item);
                        } else if (item._t == "CXSitDown") {
                            this.isLiuZuo = false;
                            this.playerSeatDown(item);
                        }
                    })
                } else {
                    Main.showTip(resData.ret.msg);
                }
            }
        } catch (error) {
            Main.$LOG('error', error);
            ErrText.ERR(this, 'try-catc处异常：', error);
        }
    }

    /**
     * 表情
     */
    showPlayerExpression(data) {
        this._playerArray.forEach(item_player => {
            if (item_player.owner.userId == data.chat.sender) {
                item_player.playerSeatAddExpression(true, data.chat.content, true);
            }
        })
    }

    /**
     * 未按流程登陆或重复登录就返回登录页面
     */
    errOpenLoginView(data) {
        Main.showDiaLog('登录失效，请重新登录', 1, () => {
            Laya.Scene.open('login.scene', true, Main.sign.signOut, Laya.Handler.create(this, () => {
                this.destroy();
            }));
        });
    }

    /**
     * 进入房间连接成功后进行数据请求
     */
    requestRoomUpdateData(data) {
        this.roomId = data.roomId;
        this.onSend({
            name: 'M.Room.C2R_UpdateRoom',
            data: {
                roomId: this.roomId
            },
            success(upDateRes) {
                this.dealSoketMessage('进入房间收到的消息：', upDateRes); //进入处理函数
            }
        })
    }

    /**
     *房间结束
     */
    roomEnd(data) {
        Laya.Scene.open('paiJuEndView.scene', false, { show: true, data: data, page: this.owner._openedData.page });
    }

    /**
     * 加载关于座位上的数据
     * @param {} roomSeatArr 需要更新的数据
     */
    updateRoomData(data, allData) {
        // console.log('更新座位上的数据=========================0000:', this._plyerIndexArray);
        ErrText.ERR(this, '更新座位上的数据Date', new Date().getTime());
        this._allowStartAction = true;
        this._totalMango = data.mang;//芒果底池总分
        this._totalPi = data.dichi;//皮底池总分
        if (data.mang) {
            this.showDiChiMang(true);
        }
        if (data.dichi > 0) {
            this.showDiChiPi(true);
            this._isUpdateData = true;
        }
        /* =====更新座位上的数据===== */
        this._dealNumber = 0;
        let meArr = data.roomSeat.filter(item => item._id == this.userId);
        if (meArr.length > 0) {
            this.newIndexConcatArr = this._plyerIndexArray.splice(meArr[0].seat_idx, this._plyerIndexArray.length).concat(this._plyerIndexArray.splice(0, meArr[0].seat_idx + 1));
            this._playerArray.forEach((item, index) => {
                item.owner.seatId = this.newIndexConcatArr[index];
            })
        } else {
            this.newIndexConcatArr = this._plyerIndexArray;
        }
        data.roomSeat.forEach(item_seatData => {
            item_seatData.seatidx = item_seatData.seat_idx;
            item_seatData.userId = item_seatData._id;
            if (item_seatData.seatAtTime > 0 && item_seatData.score == 0) {
                this.playerSeatAt(item_seatData);
            } else if (item_seatData.seatAtTime == 0) {
                this.playerSeatDown(item_seatData);
            }
            if (item_seatData.seatAtTime > 0 && item_seatData.score != 0 && item_seatData.seatReservation) {
                this.playerSeatDown(item_seatData);
                this.playerLiuZuo(item_seatData);
            }
            // ====更新牌数据
            this._playerArray.forEach((item_player, item_index) => {
                if (item_seatData.userId == item_player.owner.userId) {
                    if (item_player.owner.isMe) {
                        item_player.owner.actionType = -1;
                    }
                    if (item_seatData.xiazhu > 0) {
                        item_player.showOrHidePlayerXiaZhuView(true);
                        item_player.changePlayerScore(item_seatData.score, this._changeScoreType.seat);
                        item_player.changePlayerScore(item_seatData.xiazhu, this._changeScoreType.xiaZhu);
                    }
                    if (item_seatData.xiazhu > 0 && !item_seatData.isAction) {// 初始下注状态
                        item_player.changeShowCM(this, 2, true, null);
                    } else if (item_seatData.xiazhu > 0 && item_seatData.isAction) {// 下注状态
                        item_player.changeShowCM(this, 3, true, null);
                    }
                    if (item_seatData.action == 3)
                        item_player.changeShowCM(this, 0, true, null);

                    if (item_seatData.assignPoker) {//已分牌
                        item_player.showActionTip(true, 6);
                        this._showSubView = false;
                        this.startAssignPoker(false);
                        let returnData1 = [item_seatData.pokers[0], item_seatData.pokers[1]];
                        let returnData2 = [item_seatData.pokers[2], item_seatData.pokers[3]];
                        let point1 = CountPoint.countPoint(item_seatData.pokers[0], item_seatData.pokers[1]);
                        let point2 = CountPoint.countPoint(item_seatData.pokers[2], item_seatData.pokers[3]);
                        item_player.showPlayerSubResult(true, { sub1: { data: returnData1, point: point1 }, sub2: { data: returnData2, point: point2 } });
                    } else {
                        let cur = allData.param.json.filter(item => item._t == "UpdateRoomData");
                        let curIsSubPoker = [];
                        if (cur.length != 0)
                            curIsSubPoker = cur[0].curData.filter(item => item._t == "G2C_StartAssignPoker");
                        if (curIsSubPoker.length == 0) {
                            if (item_seatData.action > 0) {
                                item_player.showActionTip(true, item_seatData.action);
                                if (item_seatData.action == 5) {
                                    item_player.playerSeatAddGif(true, Main.animations.qiao);
                                }
                            }
                            this._allowXiuPoker = true;
                        } else {
                            this._allowXiuPoker = false;
                        }
                        ErrText.ERR(this, '重置牌数据' + item_seatData.userId, item_seatData.pokers)
                        if (item_seatData.pokers.length > 0) {
                            this._isUpdateData = false;
                        }
                        //重置牌数据
                        item_seatData.pokers.forEach((item_val, item_val_index) => {
                            item_player.dealPoker(this, item_val_index + 1, data.roomSeat.length, item_val, item_index, true);
                        })
                    }
                    if (item_player.owner.isMe)
                        item_player.showPlayerXiuSign(item_seatData.showPoker);
                }
            })
            // ====/更新牌数据
        })
        /* =====/更新座位上的数据===== */
    }

    /**
     * 更新当前数据
     * @param {*} data 数据
     */
    updateCurData(data, allData) {
        data.curData.forEach(item => {
            if (item._t == "G2C_StartAction") {
                this._startAction = item;
                this._allowStartAction = true;
                this.startAction();
            } else if (item._t == "G2C_StartAssignPoker") {
                this.assignPokerCountDown(true, item);
                let curRoomSeat = allData.param.json.filter(item => item._t == "CXIntoRoom")[0].roomSeat.filter(item2 => item2.userId == this.userId && !item2.assignPoker);
                let noFenPaiArr = item.players.filter(item => curRoomSeat.find(item2 => item2.userId == item));
                if (noFenPaiArr.length > 0)
                    this.startAssignPoker(true, true, item);
            }
        })
    }

    /**
     * ========================测试==============
     *  */
    ceShi() {
        // this.owner.mang_cm_pool.visible=true;
        // console.log(this.owner.mang_cm_pool)
        // let ME=this._playerArray[0].owner.getChildByName("create_cm_seat").getChildByName('move_cm');
        // let XY=ME.globalToLocal(new Laya.Point(this.owner.mang_cm_pool.x,this.owner.mang_cm_pool.y))
        // Laya.Tween.to(ME,{x:XY.x+50,y:XY.y},1000)
        // console.log(XY.x,XY.y)
        // this.startAssignPoker()
        // return
        clickIndex++;
        // Main.showLoading(true,Main.loadingType.three,'正在进入房间...')
        // if(clickIndex==1){
        //     this._playerArray.forEach(item=>{
        //         item.showPlayerXiuView(true,[1,10]);
        //      })
        //      return
        //     this._allowXiuPoker=true;
        //     this._playerArray[0].owner.isMe=true;
        //     let arr=[2,1,0]
        //     arr.forEach((item0,index)=>{
        //         this._playerArray.forEach((item_player,item_index)=>{
        //             if(item0==item_player.owner.index){
        //                 item_player.dealPoker(this,1,3,index,false,this.demo5)
        //             }
        //          })
        //     })
        // }
        // console.log('测试进了')
        // Main.showDiaLog('啊哈哈哈哈1', 1, (res) => {
        //     console.log('确认回调')
        // }, (res2) => {
        //     console.log('取消回调')
        // }, '#FF0000');
        // Main.showDiaLog('啊哈哈哈哈2', 2, (res) => {
        //     console.log('确认回调')
        // }, (res2) => {
        //     console.log('取消回调')
        // }, '#FF0000');
        // Main.DiaLog(null,1,'啊哈哈哈哈',(res)=>{
        //     console.log('确认回调')
        // },(res2)=>{
        //     console.log('取消回调')
        // },'#FF0000');
        // Main.showTip('哈哈哈哈哈哈1122')
        // Main.showLoading(true, Main.loadingType.two);
        // // this.meAnimationZT(true, Main.animations.win)
        // // if (clickIndex == 1) {
        // //     this.meAnimationZT(true,Main.animations.win)
        // // } else {
        // //     this.meAnimationZT(false,Main.animations.win)
        // // }
        // if (clickIndex == 4) {
        //     Main.showLoading(false, Main.loadingType.two)
        // }

        // this._playerArray.forEach((item, index) => {
        //     if (index == 0)
        //         this.assignPokerCountDown(true);
        // })
        // if (clickIndex == 1) {
        //     let data = {
        //         countdown: 17,
        //         delayedNum: 0,
        //         delayedNumMax: 4,
        //         delayedScore: 10,
        //         endTime: 1575088008,
        //         maxXiazu: 196,
        //         opts: [3, 2, 1],
        //         ret: { type: 0, msg: "成功" },
        //         score: 94,
        //         startTime: 1575087991,
        //         uid: 1021354,
        //         xiazu: 102,
        //     }
        //     this.setMeHandleBtnZT(true, data);
        // } else if(clickIndex == 2){
        //     let data = {
        //         countdown: 17,
        //         delayedNum: 0,
        //         delayedNumMax: 4,
        //         delayedScore: 10,
        //         endTime: 1575088008,
        //         maxXiazu: 196,
        //         opts: [3, 2, 5],
        //         ret: { type: 0, msg: "成功" },
        //         score: 94,
        //         startTime: 1575087991,
        //         uid: 1021354,
        //         xiazu: 102,
        //     }
        //     this.setMeHandleBtnZT(true, data);
        // }else if(clickIndex == 3){
        //     let data = {
        //         countdown: 17,
        //         delayedNum: 0,
        //         delayedNumMax: 4,
        //         delayedScore: 10,
        //         endTime: 1575088008,
        //         maxXiazu: 196,
        //         opts: [3, 2, 6],
        //         ret: { type: 0, msg: "成功" },
        //         score: 94,
        //         startTime: 1575087991,
        //         uid: 1021354,
        //         xiazu: 102,
        //     }
        //     this.setMeHandleBtnZT(true, data);
        // }
    }


    /**
     * 去除敲动画
     */
    clearQiaoAni() {
        this._playerArray.forEach(item_player => {
            item_player.playerSeatAddGif(false, Main.animations.qiao);//去除敲动画
        })
    }

    /**
     * 设置一些初始参数
     */
    setMoreStartVal() {
        this._allowXiuPoker = true;
        this._allowStartAction = false;
        // this._isUpdateData=false;
        this.qiaoDealPokerEnd = false;
        this.autoHandleType = null;
        {
            this._allowAssignPoker = false;
        }
    }

    /**
     * 游戏刚开始设置庄以及分数等信息
     */
    startNewRound(data) {
        this.roundEnd();
        this.setMoreStartVal();
        this.clearQiaoAni();
        this.setPlayerActionZT(data.seats);
        let showBankerUser = data.seats.filter(item => item.seat_idx == data.zidx);
        this._playerArray.forEach(item_player => {
            if (item_player.owner.userId == showBankerUser[0]._id) {
                item_player.showBanker(true);
            } else {
                item_player.showBanker(false);
            }
        })
    }

    /**
     * 设置参与游戏人员的操作状态(不能为null)
     */
    setPlayerActionZT(data) {
        let jionPlayerArr = this._playerArray.filter(item1 => data.find(item2 => item2._id == item1.owner.userId));
        jionPlayerArr.forEach(item_player => {
            item_player.owner.actionType = -1;
        })
    }

    /**
     * 开始游戏的下注步骤
     */
    betPiAndMango(data) {
        this._totalMango = data.totalMango;//芒果底池总分
        this._totalPi = data.totalPi;//皮底池总分
        this._joinPlyerArray = data.betUserInfo;
        data.betUserInfo.forEach((item_data, item_index) => {
            this._playerArray.forEach(item_player => {
                if (item_data.userId == item_player.owner.userId) {
                    item_player.changePlayerScore(item_data.score, this._changeScoreType.seat);
                    item_player.changeShowCM(this, 1, true, data.betUserInfo.length, item_index, this.showPlayerScoreAndCMEnd)
                    item_player.bindPlayerXiaZhuScoreVal(item_data, this._betType.mang);
                }
            })
        })
    }

    /**
    * (2)玩家处显示筹码结束，接下来就开始创建皮筹码并移动到显示筹码处
    *  */
    showPlayerScoreAndCMEnd() {
        this._winUpINDEX = 0;
        this._joinPlyerArray.forEach((item_data, item_index) => {
            this._playerArray.forEach(item_player => {
                if (item_data.userId == item_player.owner.userId) {
                    item_player.showMoveCM(this, 1, true, this._moveCMSeat.one, this._moveCMSeat.show, this._music.moveShow, this._joinPlyerArray.length, this.startShortMoveEnd);
                }
            })
        })
    }


    // 开局筹码短距离移动结束回调
    startShortMoveEnd() {
        this._winUpINDEX = 0;
        setTimeout(() => {
            this._joinPlyerArray.forEach((item_data, item_index) => {
                this._playerArray.forEach(item_player => {
                    if (item_data.userId == item_player.owner.userId) {
                        item_player.showOrHidePlayerXiaZhuView(false);
                        item_player.showMoveCM(this, 1, true, this._moveCMSeat.show, this._moveCMSeat.mang, this._music.moveMangOrPi, this._joinPlyerArray.length, this.moveToMangEnd);
                    }
                })
            })
        }, 300)
    }

    // 接上
    moveToMangEnd() {
        this.showDiChiMang(true);
        setTimeout(() => {
            this._joinPlyerArray.forEach((item_data, item_index) => {
                this._playerArray.forEach(item_player => {
                    if (item_data.userId == item_player.owner.userId) {
                        item_player.changeShowCM(this, 2, true, this._joinPlyerArray.length, item_index, this.showPlayerScoreAndCMEnd2)
                        item_player.bindPlayerXiaZhuScoreVal(item_data, this._betType.pi);
                    }
                })
            })
        }, 400)
    }

    // 接上
    showPlayerScoreAndCMEnd2() {
        this._winUpINDEX = 0;
        this._joinPlyerArray.forEach((item_data, item_index) => {
            this._playerArray.forEach(item_player => {
                if (item_data.userId == item_player.owner.userId) {
                    item_player.showMoveCM(this, 2, true, this._moveCMSeat.one, this._moveCMSeat.show, this._music.moveShow, this._joinPlyerArray.length, this.startShortMoveEnd2);
                }
            })
        })
    }

    // 接上
    startShortMoveEnd2() {
        this.showDiChiPi(true);
        setTimeout(() => {
            this.startDealPoker1And2();
        }, 300)
    }

    /**
     * 为玩家绑定第1,2张牌牌数据
     */
    playerBindPoker12Val(data) {
        this._dealPoker12Array = data.players;
    }

    /**
     * 为玩家绑定第3张牌牌数据
     */
    playerBindPoker3Or4Val(data, num) {
        this._allowStartAction = false;
        this._dealNumber = 0;
        let count = data.players.length;
        data.players.forEach((item_data, item_index) => {
            this._playerArray.forEach(item_player => {
                if (item_player.owner.userId == item_data.uid) {
                    let pokerName = item_data.poker[0];
                    item_player.dealPoker(this, num, count, pokerName, item_index, false, this.dealPokerEnd);
                }
            })
        })
    }

    /**
     * 为玩家绑定第3,4张牌牌数据
     * @param {*} data 牌等数据
     */
    playerBindPoker34Val(data) {
        let count = data.players.length;
        this._dealNumber = 0;
        for (let i = 3; i <= 4; i++) {
            data.players.forEach((item_data, item_index) => {
                this._playerArray.forEach(item_player => {
                    if (item_player.owner.userId == item_data.uid) {
                        let num = i;//代表第几张牌(1,2,3,4)
                        let index = item_index + ((num - 3) * count);
                        let pokerName = num == 3 ? item_data.poker[0] : item_data.poker[1];
                        item_player.dealPoker(this, num, count, pokerName, index, false, dealPokerEnd);
                        function dealPokerEnd() {
                            if (num == 4) {
                                Main.$LOG('敲发34结束：', num)
                                this.qiaoDeal34PokerEnd();
                            } else {
                                this._dealNumber = 0;
                            }
                        }
                    }
                })
            })
        }
    }

    qiaoDeal34PokerEnd() {
        this.qiaoDealPokerEnd = true;
        Main.$LOG('进来分牌数据=====================：', this.StartAssignPokerArr)
        this.StartAssignPokerArr.forEach(item => {
            this.assignPokerCountDown(true, item.data);
            this.startAssignPoker(true, false, item.data);
        })
    }

    /**
    * 显示芒果底池
    * @param {bool} isShow 是否显示底池芒
    */
    showDiChiMang(isShow) {
        let dichimang = this.owner.mang_cm_pool;
        dichimang.visible = isShow;
        if (isShow)
            this.bindDiChiMangVal();
    }

    /**
     * 芒果底池绑定值
     */
    bindDiChiMangVal(data) {
        let dichimangVal = this.owner.mang_cm_pool.getChildByName("dichimangVal");
        dichimangVal.text = data ? data : this._totalMango;
    }

    /**
    * 显示皮底池
    * @param {bool} isShow 是否显示皮底池
    */
    showDiChiPi(isShow) {
        let dichimang = this.owner.pi_cm_pool;
        dichimang.visible = isShow;
        if (isShow)
            this.bindDiChiPiVal();
    }

    /**
     * 皮底池绑定值
     */
    bindDiChiPiVal(data) {
        let dichipiVal = this.owner.pi_cm_pool.getChildByName("dichipiVal");
        dichipiVal.text = data ? data : this._totalPi;
    }

    /**
     * 操作游戏按钮显示
     */
    startAction() {
        ErrText.ERR(this, '操作游戏按钮显示状态：', this._allowStartAction)
        if (this._allowStartAction && this._startAction) {
            this._playerArray.forEach(item_player => {
                if (this._startAction.uid != this.userId) {
                    this.setPlayerAutoHandleZT(true, item_player);
                } else {
                    this.setPlayerAutoHandleZT(false, item_player);
                }
                if (item_player.owner.userId == this._startAction.uid) {
                    item_player.showActionTip(false);//隐藏提示
                    item_player.showPlayerCountDown(this._startAction, true);//开始倒计时
                    Main.$LOG('自动操作状态======', this.autoHandleType)
                    this.setMeCurHandleZT(this._startAction, item_player);
                }
            })
        }
    }

    /**
     * 设置自己当前操作状态
     */
    setMeCurHandleZT(data, item_player) {
        if (item_player.owner.isMe) {
            if (this.autoHandleType) {
                let haveXiuArr = data.opts.filter(item => item == 4);
                if ((haveXiuArr.length > 0 && this.autoHandleType == this.autoHandle.right) || haveXiuArr.length > 0 && this.autoHandleType == this.autoHandle.left) {
                    this.onClickRightBtn(4, 0);
                } else if (haveXiuArr.length == 0 && this.autoHandleType == this.autoHandle.right) {
                    this.setMeHandleBtnZT(true, data);
                } else if (haveXiuArr.length == 0 && this.autoHandleType == this.autoHandle.left) {
                    this.onClickLeftBtn(3);
                }
            } else {
                this.setMeHandleBtnZT(true, data);
            }
        }
    }

    /**
     * 三花特牌
     */
    sanhuaAction(data) {
        this._playerArray.forEach(item_player => {
            if (item_player.owner.userId == data.uid) {
                item_player.diuPoker();//执行丢牌的效果
            }
        })
    }

    /**
     * 设置玩家自动操作状态
     * @param isShow 是否显示
     * @param item_player 玩家对象
     */
    setPlayerAutoHandleZT(isShow, item_player) {
        if (!isShow)
            this.owner.autoHandleBtnBox.visible = isShow;
        if (item_player) {
            let $visible = this.owner.autoHandleBtnBox.visible;
            let $actionType = item_player.owner.actionType;
            let $curXiaZhuScore = parseInt(item_player.owner.curXiaZhuScore);
            let $isMe = item_player.owner.isMe;
            Main.$LOG('设置玩家自动操作状态:', item_player.owner.userId, item_player.owner.isMe, isShow, item_player.owner.actionType, item_player.owner.curXiaZhuScore)
            if ($isMe && !$visible && isShow && $actionType && $actionType != 3 && $actionType != 5 && $curXiaZhuScore > 0) {
                this._autoBtnArr = [];
                this.owner.autoHandleBtnBox.visible = isShow;
                let leftBtn = this.owner.auto_handle_left;
                let rightBtn = this.owner.auto_handle_right;
                let leftBtn_btn_0 = leftBtn.getChildByName("auto_0");
                let leftBtn_btn_1 = leftBtn.getChildByName("auto_1");
                let rightBtn_btn_0 = rightBtn.getChildByName("auto_0");
                let rightBtn_btn_1 = rightBtn.getChildByName("auto_1");
                this.meHandleBtnCommonSet(leftBtn, { x: -280, y: 0 });
                this.meHandleBtnCommonSet(rightBtn, { x: 280, y: 0 });
                this.loadAutoHandleImgEnd(leftBtn, leftBtn_btn_0, leftBtn_btn_1);
                this.loadAutoHandleImgEnd(rightBtn, rightBtn_btn_0, rightBtn_btn_1);
                this.autoHandleType = null;
                // console.log('设置自己的自动操作状态:', this.autoHandleType)
                leftBtn.on(Laya.Event.CLICK, this, this.onClickAutoLeftBtn, [leftBtn_btn_0, leftBtn_btn_1, rightBtn_btn_0, rightBtn_btn_1]);
                rightBtn.on(Laya.Event.CLICK, this, this.onClickAutoRightBtn, [leftBtn_btn_0, leftBtn_btn_1, rightBtn_btn_0, rightBtn_btn_1]);
            }
        }
    }

    onClickAutoLeftBtn(left_0, left_1, right_0, right_1) {
        left_0.visible = !left_0.visible;
        left_1.visible = !left_1.visible;
        right_0.visible = true;
        right_1.visible = false;
        this.autoHandleType = left_1.visible ? this.autoHandle.left : null;
    }

    onClickAutoRightBtn(left_0, left_1, right_0, right_1) {
        right_0.visible = !right_0.visible;
        right_1.visible = !right_1.visible;
        left_0.visible = true;
        left_1.visible = false;
        this.autoHandleType = right_1.visible ? this.autoHandle.right : null;
    }

    loadAutoHandleImgEnd(btnObj, btn_0, btn_1) {
        btn_0.visible = true;
        btn_1.visible = false;
        this._autoBtnArr.push(btnObj);
        if (this._autoBtnArr.length == 2) {
            this._autoBtnArr.forEach(item => {
                Laya.Tween.to(item, { x: item.moveXY.x, y: item.moveXY.y, alpha: 1 }, this._speed.handle, Laya.Ease.backInOut, Laya.Handler.create(this, this.moveAutoHandleEnd))
            })
        }
    }

    moveAutoHandleEnd() {

    }

    /**
     * 自己操作按钮设置的公共方法
     */
    meHandleBtnCommonSet(btn, XY) {
        let _btn = btn;
        _btn.alpha = 0;
        _btn.pos(0, 0);
        _btn.moveXY = XY;
    }




    /**
     * 关于自己的操作按钮的一些状态设置
     * @param isShow 是否显示
     * @param data 请求的参数
     */
    setMeHandleBtnZT(isShow = true, data) {
        Main.$LOG('进来操作状态======:', isShow, data)
        this.owner.handleBtnBox.visible = isShow;
        PlayerDelayTime.init(this.delayType.action, this, data);
        if (isShow) {
            // this.playerSeatFn('playerDelayHandle', data);
            this._btnArr = [];
            this._btnMoveNum = 0;
            let leftBtn = this.owner.handle_left;
            let rightBtn = this.owner.handle_right;
            let topBtn = this.owner.handle_top;
            this.meHandleBtnCommonSet(leftBtn, { x: -280, y: 0 });
            this.meHandleBtnCommonSet(rightBtn, { x: 280, y: 0 });
            this.meHandleBtnCommonSet(topBtn, { x: 0, y: -180 });
            {//左边--3丢
                this.loadHandleImgEnd(leftBtn, data);
                leftBtn.on(Laya.Event.CLICK, this, this.onClickLeftBtn, [3]);
            }
            {//右边--2跟,4休
                let dataOption = data.opts.filter(item => item == 2 || item == 4);
                if (dataOption.length == 1) {
                    let genScoreText = rightBtn.getChildByName('gen_btn').getChildByName('value');
                    genScoreText.text = '';
                    rightBtn._children.forEach(item_btn => {
                        item_btn.visible = false;
                    })
                    if (dataOption[0] == 2) {
                        rightBtn.getChildByName('gen_btn').visible = true;
                    } else if (dataOption[0] == 4) {
                        rightBtn.getChildByName('xiu_btn').visible = true;
                    }
                    this.loadHandleImgEnd(rightBtn, data);
                    let genScore;
                    if ((data.xiazu + data.score) >= data.maxXiazu) {
                        genScore = dataOption[0] == 2 ? data.maxXiazu : 0;
                    } else {
                        genScore = dataOption[0] == 2 ? (data.xiazu + data.score) : 0;
                    }
                    rightBtn.on(Laya.Event.CLICK, this, this.onClickRightBtn, [dataOption[0], genScore]);
                    if (dataOption[0] == 2) {
                        genScoreText.text = data.score <= genScore ? data.score : data.maxXiazu - data.xiazu;
                    }
                }
            }
            {//上边--1大,5敲,6NO大
                let dataOption = data.opts.filter(item => item == 1 || item == 5 || item == 6);
                if (dataOption.length == 1) {
                    topBtn._children.forEach(item_btn => {
                        item_btn.visible = false;
                    })
                    if (dataOption[0] == 1) {
                        topBtn.getChildByName('da_btn').visible = true;
                    } else if (dataOption[0] == 5) {
                        topBtn.getChildByName('qiao_btn').visible = true;
                    } else if (dataOption[0] == 6) {
                        topBtn.getChildByName('NOda_btn').visible = true;
                    }
                    this.loadHandleImgEnd(topBtn, data);
                    if (dataOption[0] == 1 || dataOption[0] == 5) {
                        let qiaoScore = dataOption[0] == 5 ? data.score : null;
                        topBtn.getChildByName('qiao_btn').getChildByName('value').text = '';
                        if (dataOption[0] == 5) {
                            topBtn.getChildByName('qiao_btn').getChildByName('value').text = qiaoScore;
                        }
                        topBtn.on(Laya.Event.CLICK, this, this.onClickTopBtn, [dataOption[0], qiaoScore]);
                        if (dataOption[0] == 1) {
                            topBtn.on(Laya.Event.MOUSE_DOWN, this, this.onClickTopBtn, [dataOption[0], data]);
                        } else {
                            topBtn.off(Laya.Event.MOUSE_DOWN, this, this.onClickTopBtn);
                        }
                    } else if (dataOption[0] == 6) {
                        topBtn.off(Laya.Event.CLICK, this, this.onClickTopBtn);
                        topBtn.off(Laya.Event.MOUSE_DOWN, this, this.onClickTopBtn);
                    }
                }
            }
        } else {
            this.showFastBtnAndBindVal(false);
            PlayerDelayTime.offEvent(this);
        }
    }

    //接上
    loadHandleImgEnd(btnObj, data) {
        this._btnArr.push(btnObj);
        if (this._btnArr.length == 3) {
            this._btnArr.forEach(item => {
                Laya.Tween.to(item, { x: item.moveXY.x, y: item.moveXY.y, alpha: 1 }, this._speed.handle, Laya.Ease.backInOut, Laya.Handler.create(this, this.moveHandleEnd, [data]))
            })
        }
    }

    moveHandleEnd(data) {
        this._btnMoveNum++;
        if (this._btnMoveNum == 3) {
            this.showFastBtnAndBindVal(true, data);
            if (Main.gameSetVal.gameMusic == 1)
                Laya.SoundManager.playSound(this._music.handle, 1);
        }
    }

    /**
     * 为了自己操作完成后立即显示我能看到的操作结果
     */
    showMeHandleTip(act) {
        this._playerArray.forEach(item_player => {
            if (item_player.owner.isMe) {
                item_player.showActionTip(true, act);//显示提示
            }
        })
    }

    // 接上
    onClickLeftBtn(type) {
        this.showMeHandleTip(type);
        this.setMeHandleBtnZT(false, null);//改变操作状态
        if (type == 3)
            this.onSend({
                name: 'M.Games.CX.C2G_PlayerAction',
                data: {
                    roomId: this.roomId,
                    score: 0, //丢  分数为0
                    act: type //3代表丢
                },
                success(res) {
                    this.dealSoketMessage('操作按钮的点击事件--丢：', res)
                }
            })

    }
    // 接上
    onClickRightBtn(type, genScore) {
        this.showMeHandleTip(type);
        this.setMeHandleBtnZT(false, null);//改变操作状态
        this.onSend({
            name: 'M.Games.CX.C2G_PlayerAction',
            data: {
                roomId: this.roomId,
                score: genScore,
                act: type //跟或休 
            },
            success(res) {
                this.dealSoketMessage('操作按钮的点击事件--跟或休：', res)
            }
        })
    }
    // 接上(敲)
    onClickTopBtn(type, data) {
        let that = this;
        if (type == 5) {
            this.showMeHandleTip(type);
            this.setMeHandleBtnZT(false, null);//改变操作状态
            this._playerArray.forEach(item_player => {
                if (item_player.owner.isMe)
                    item_player.playerSeatAddGif(true, Main.animations.qiao);
            })
            this.daSendSoket(data, type);
        } else if (type == 1) {
            ErrText.ERR(this, '大----处值：data', data);
            let MySliderJS = this.owner.da_slider.getComponent(MySlider);
            MySliderJS.SliderMouseDown(data.maxXiazu * 2 + data.xiazu, data.score + data.xiazu, (val1) => {
                Main.$LOG('变化值的时候回调：', val1);
                that.daSliderChangeDeal(val1, data);
            }, (val2) => {
                Main.$LOG('结束的的时候回调：', val2);
                if (val2 != 0) {
                    that.showMeHandleTip(type);
                    that.setMeHandleBtnZT(false, null);//改变操作状态
                    ErrText.ERR(this, '大----处回调的分数：data', data);
                    that.daSendSoket(val2, type);
                }
            });
        }
    }

    daSendSoket(data, type) {
        this.onSend({
            name: 'M.Games.CX.C2G_PlayerAction',
            data: {
                roomId: this.roomId,
                score: data,
                act: type //跟或休 
            },
            success(res) {
                this.dealSoketMessage('操作按钮的点击事件--跟或休：', res)
            }
        })
    }

    /**
     * 大--拖动的时候变化的回调
     */
    daSliderChangeDeal(val, data) {
        if (Main.gameSetVal.gameMusic == 1)
            if (val < data.score)
                Laya.SoundManager.playSound(this._music.daSlider, 1);
            else {
                Laya.SoundManager.playSound(this._music.daSliderTop, 1);
            }

    }

    /**
     * 隐藏全部快捷按钮
     */
    hideOrShowFastBtn(btnObj, type) {
        btnObj.getChildByName("btn1").visible = type == 1 ? true : false;
        btnObj.getChildByName("btn0").visible = type == 0 ? true : false;
    }

    /**
     * 显示快捷操作按钮并绑定相应的值
     */
    showFastBtnAndBindVal(isShow, data) {
        this.owner.fastXiaZhuBtnBox.visible = isShow;
        if (isShow) {
            let btn1 = this.owner.fastXiaZhuBtnBox.getChildByName("btn1");
            let btn2 = this.owner.fastXiaZhuBtnBox.getChildByName("btn2");
            let btn3 = this.owner.fastXiaZhuBtnBox.getChildByName("btn3");
            let text1 = btn1.getChildByName('value');
            let text2 = btn2.getChildByName('value');
            let text3 = btn3.getChildByName('value');
            let gameDiZhu = this._gameRoomeNews.dizhu;
            if (gameDiZhu == data.maxXiazu) {
                text1.text = parseInt(this._totalPi / 2);
                text1.alpha = 0.5;
                text2.text = parseInt(text1.text * 2);
                text2.alpha = 1;
                text3.text = parseInt(text1.text * 4);
                text3.alpha = 1;
                this.hideOrShowFastBtn(btn1, 0);
                this.hideOrShowFastBtn(btn2, 1);
                this.hideOrShowFastBtn(btn3, 1);
                this._allowFast1 = false;
                this._allowFast2 = true;
                this._allowFast3 = true;
                btn2.on(Laya.Event.CLICK, this, this.onClickFastBtn, [text2.text, '_allowFast2'])
                btn3.on(Laya.Event.CLICK, this, this.onClickFastBtn, [text3.text, '_allowFast3'])
            } else {
                text1.text = parseInt(data.maxXiazu * 2);
                text2.text = text1.text * 2;
                text3.text = text1.text * 4;
                if (text1.text > data.score) {
                    this._allowFast1 = false;
                    text1.alpha = 0.5;
                    this.hideOrShowFastBtn(btn1, 0);
                } else {
                    text1.alpha = 1;
                    this._allowFast1 = true;
                    this.hideOrShowFastBtn(btn1, 1);
                    btn1.on(Laya.Event.CLICK, this, this.onClickFastBtn, [text1.text, '_allowFast1'])
                }
                if (text2.text > data.score) {
                    this._allowFast2 = false;
                    text2.alpha = 0.5;
                    this.hideOrShowFastBtn(btn2, 0);
                } else {
                    text2.alpha = 1;
                    this._allowFast2 = true;
                    this.hideOrShowFastBtn(btn2, 1);
                    btn2.on(Laya.Event.CLICK, this, this.onClickFastBtn, [text2.text, '_allowFast2'])
                }
                if (text3.text > data.score) {
                    text3.alpha = 0.5;
                    this._allowFast3 = false;
                    this.hideOrShowFastBtn(btn3, 0);
                } else {
                    text3.alpha = 1;
                    this._allowFast3 = true;
                    this.hideOrShowFastBtn(btn3, 1);
                    btn3.on(Laya.Event.CLICK, this, this.onClickFastBtn, [text3.text, '_allowFast3'])
                }
            }
        }
    }

    //接上(快捷下注)
    onClickFastBtn(score, type) {
        Main.$LOG('点击快捷键状态：', this[type])
        if (this[type]) {
            this.onSend({
                name: 'M.Games.CX.C2G_PlayerAction',
                data: {
                    roomId: this.roomId,
                    score: score,
                    act: 1 //下注 大
                },
                success(res) {
                    this.dealSoketMessage('快捷按钮的点击事件:', res);
                }
            })
        }
    }

    /**
     * 玩家操作
     */
    playerAction(data) {
        if (data.ret == null || data.ret.type == 0) {
            this._playerArray.forEach(item_player => {
                if (item_player.owner.userId == data.uid) {
                    this.prePlayerAciton = data.act;
                    item_player.showActionTip(true, data.act);//显示提示
                    item_player.showPlayerCountDown(null, false);//去除倒计时
                    if (item_player.owner.isMe) {
                        this.setMeHandleBtnZT(false, null);//改变操作状态
                    }
                    switch (data.act) {
                        case 3://丢牌
                            item_player.diuPoker();//执行丢牌的效果
                            item_player.changeShowCM(this, 0, true, 1, 0);//改变筹码的图片
                            break;
                        case 1://大
                            this._winUpINDEX = 0;
                            item_player.changePlayerScore(data.playerScore, this._changeScoreType.seat);
                            item_player.showMoveCM(this, 3, true, this._moveCMSeat.one, this._moveCMSeat.show, this._music.moveShow, 1, xiaZhuMoveCMEnd)
                            function xiaZhuMoveCMEnd() {
                                item_player.changePlayerScore(data.score, this._changeScoreType.xiaZhu);
                                this.bindDiChiPiVal(data.dichi);
                                item_player.changeShowCM(this, 3, true, 1, 0);
                            }
                            break;
                        case 2://跟
                            this._winUpINDEX = 0;
                            item_player.changePlayerScore(data.playerScore, this._changeScoreType.seat);
                            item_player.showMoveCM(this, 3, true, this._moveCMSeat.one, this._moveCMSeat.show, this._music.moveShow, 1, xiaZhuMoveCMEnd2)
                            function xiaZhuMoveCMEnd2() {
                                item_player.changePlayerScore(data.score, this._changeScoreType.xiaZhu);
                                this.bindDiChiPiVal(data.dichi);
                                item_player.changeShowCM(this, 3, true, 1, 0);
                            }
                            break;
                        case 4://休
                            if (Main.gameSetVal.gameMusic == 1)
                                Laya.SoundManager.playSound(this._music.xiu, 1);
                            break;
                        case 5://敲
                            this._winUpINDEX = 0;
                            item_player.playerSeatAddGif(true, Main.animations.qiao, false);
                            item_player.changePlayerScore(data.playerScore, this._changeScoreType.seat);
                            item_player.showMoveCM(this, 3, true, this._moveCMSeat.one, this._moveCMSeat.show, this._music.moveShow, 1, xiaZhuMoveCMEnd3)
                            function xiaZhuMoveCMEnd3() {
                                item_player.changePlayerScore(data.score, this._changeScoreType.xiaZhu);
                                this.bindDiChiPiVal(data.dichi);
                                item_player.changeShowCM(this, 3, true, 1, 0);
                            }
                            break;
                    }
                }
            })
        } else {
            Main.showTip(data.ret.msg);
        }
    }

    /**
     * 本轮游戏结束
     */
    playerActionEnd(data) {
        this._winUpINDEX = 0;
        this.reloadPlayerMoreZT(true);
        data.endActionInfo.forEach((item_data, item_index) => {
            this._playerArray.forEach(item_player => {
                if (item_data.userId == item_player.owner.userId) {
                    if (item_player.owner.actionType != 3) {//不是丢
                        item_player.changeShowCM(this, 2, true, data.endActionInfo.length, item_index);
                        let cmTyppe = item_data.curXiazhu > 0 ? 3 : 2;
                        item_player.showMoveCM(this, cmTyppe, true, this._moveCMSeat.show, this._moveCMSeat.pi, this._music.moveMangOrPi, data.endActionInfo.length);
                    }
                    console.log('玩家id:', item_player.owner.userId, )
                    if (item_player.owner.actionType != 3 && item_player.owner.actionType != 5) {
                        item_player.owner.actionType = -1;
                    }
                }
            })
        })
    }


    /**
     * 恢复玩家部分状态
     */
    reloadPlayerMoreZT(isShowQiao = false) {
        this.setPlayerAutoHandleZT(false, null);
        this.setMeHandleBtnZT(false, null);//改变操作状态
        this._playerArray.forEach(item_player => {
            item_player.showPlayerCountDown(null, false);//去除倒计时
            if (item_player.owner.actionType != 3 && item_player.owner.actionType != 5) {//不是丢
                item_player.showActionTip(false);//隐藏提示
            }
            if (item_player.owner.actionType == 5) {//是敲
                if (!isShowQiao) {
                    item_player.showActionTip(false);//隐藏提示
                }
            }
        })
        this.autoHandleType = null;
    }

    /**
     * 开始分牌
     * @param data 
     * @param isShow 是否显示 
     * @param isUpdate 是否是刷新状态 
     * @param data 参与分牌的数据 
     */
    startAssignPoker(isShow = true, isUpdate = false, data) {
        if (isShow) {
            this.qiaoDealPokerEnd = false;
            this.clearQiaoAni();
            this.reloadPlayerMoreZT();
            let meSubData = data.players.filter(item => item == this.userId);
            if (meSubData.length > 0) {
                if (!isUpdate) {
                    if (Main.gameSetVal.gameMusic == 1)
                        Laya.SoundManager.playSound(GameControl.instance._music.sub, 1);
                }
                this.showAssignPokerView(isShow);
            }
            let meJoinArr = this._playerArray.filter(item_player => data.players.find(item2 => item_player.owner.isMe && item2 == item_player.owner.userId));
            if (meJoinArr.length > 0)
                PlayerDelayTime.init(this.delayType.sub, this, data);
        } else {
            this.showAssignPokerView(isShow);
            PlayerDelayTime.offEvent(this);
        }
    }

    /**
     * 分牌结果
     */
    assignPokerReturn(data) {
        this._playerArray.forEach(item_player => {
            if (item_player.owner.userId == data.userId) {
                item_player.showActionTip(true, 6);
                if (Main.gameSetVal.gameMusic == 1)
                    Laya.SoundManager.playSound(this._music.subEnd, 1);
                if (item_player.owner.isMe) {
                    this.startAssignPoker(false);
                    let returnData1 = [data.poker[0], data.poker[1]];
                    let returnData2 = [data.poker[2], data.poker[3]];
                    let point1 = CountPoint.countPoint(data.poker[0], data.poker[1]);
                    let point2 = CountPoint.countPoint(data.poker[2], data.poker[3]);
                    item_player.showPlayerSubResult(true, { sub1: { data: returnData1, point: point1 }, sub2: { data: returnData2, point: point2 } });
                }
            }
        })
    }

    /**
     * 显示分牌容器
     * @param {bool} isShow 是否显示
     */
    showAssignPokerView(isShow, type) {
        this.owner.me_sub_pokerBox.visible = isShow;
        this._allowAssignPoker = isShow;
        this._confrimSubBtn0.visible = isShow;
        this._confrimSubBtn1.visible = !isShow;
        this._subPoint1Text.text = '';
        this._subPoint2Text.text = '';
        this._subView1.loadImage('');
        this._subView1.pokerName = '';
        this._subView2.loadImage('');
        this._subView2.pokerName = '';
        if (isShow) {
            this.setAssignPokerData();
        }
        if (!type) {
            this._subPokerResult = [];
        }
    }

    /**
    * 分牌倒计时
    * @param isShow 是否显示
    * @param data 显示时间所需的参数
    */
    assignPokerCountDown(isShow = true, data = {}) {
        this.allowTimeOutSound = isShow;
        this.owner.subCountDown.visible = isShow;
        if (isShow) {
            this.subAllTime = data.endTime - data.startTime - 2;//剩余时间
            let nowTime = (new Date().getTime() / 1000);
            this._subCountDownLineTop.x = -this._subCountDownLineTop.width * ((nowTime - data.startTime) / this.subAllTime);
            this._subCountDownVal.text = this.subAllTime + 's';
            Laya.timer.frameLoop(1, this, this.subCountDownLineMove, [data]);
        } else {
            Laya.timer.clear(this, this.subCountDownLineMove);
        }
    }

    subCountDownLineMove(data) {
        let nowTime = (new Date().getTime() / 1000);
        let lastTimeValue = this.subAllTime - parseInt((nowTime - data.startTime));
        this._subCountDownVal.text = lastTimeValue + 's';
        this._subCountDownLineTop.x = -this._subCountDownLineTop.width * ((nowTime - data.startTime) / this.subAllTime);
        if (lastTimeValue == 5) {
            if (Main.gameSetVal.gameMusic == 1 && this.allowTimeOutSound) {
                this.allowTimeOutSound = false;
                Laya.SoundManager.playSound(GameControl.instance._music.subTimeOut, 1);
            }
        }
        if (lastTimeValue <= 0) {
            Laya.timer.clear(this, this.subCountDownLineMove);
        }
    }


    //进行分牌之前的事件绑定及参数设置
    setAssignPokerData() {
        this._subView1.pokerName = '';
        this._subView2.pokerName = '';
        this._playerArray.forEach(me_item => {
            if (me_item.owner.isMe) {
                me_item.showOrHidePlayerXiuSign(false);
                me_item.showOrHidePlayerShowSign(false);
                let pokerArr = me_item.owner.getChildByName('show_me_poker_box')._children;
                pokerArr.forEach((mePokerObj, index) => {
                    mePokerObj.on(Laya.Event.CLICK, this, this.onClickPoker, [mePokerObj, pokerArr, me_item.owner]);//补充钵钵关闭按钮关闭
                })
            }
        })
    }

    onClickPoker(mePokerObj, pokerArr, meItemObj) {
        if (this._allowAssignPoker) {
            let pokerArrScaleXIs0 = pokerArr.filter(item => item.scaleX == 0);
            if (pokerArrScaleXIs0.length == 0) {
                this.changeSubViewContent(this._subView1, mePokerObj, pokerArr, meItemObj);
            } else if (pokerArrScaleXIs0.length == 1 && this._subView1.pokerName === '') {
                this.changeSubViewContent(this._subView1, mePokerObj, pokerArr, meItemObj);
            } else if (pokerArrScaleXIs0.length == 1 && this._subView2.pokerName === '') {
                this.changeSubViewContent(this._subView2, mePokerObj, pokerArr, meItemObj);
            }
            this.changeMePokerX(pokerArr, meItemObj);
        }
    }

    showPoint(pokerArr) {
        let pokerScaleXIs0 = pokerArr.filter(item => item.scaleX == 0);
        let pokerScaleXNo0 = pokerArr.filter(item => item.scaleX != 0);
        if (pokerScaleXIs0.length == 2 && pokerScaleXNo0.length == 2) {
            let point1 = CountPoint.countPoint(pokerScaleXIs0[0].pokerName, pokerScaleXIs0[1].pokerName);
            let point2 = CountPoint.countPoint(pokerScaleXNo0[0].pokerName, pokerScaleXNo0[1].pokerName);
            this._subPoint1Text.text = point1;
            this._subPoint2Text.text = point2;
            this._confrimSubBtn0.visible = false;
            this._confrimSubBtn1.visible = true;
            this._subPokerResult = [pokerScaleXIs0[0].pokerName, pokerScaleXIs0[1].pokerName, pokerScaleXNo0[0].pokerName, pokerScaleXNo0[1].pokerName]
            this.$LOG('分牌点击的数据：', pokerScaleXIs0, pokerScaleXNo0)
        } else {
            this._subPoint1Text.text = '';
            this._subPoint2Text.text = '';
            this._confrimSubBtn1.visible = false;
            this._confrimSubBtn0.visible = true;
        }
    }

    changeSubViewContent(subView, mePokerObj, pokerArr, meItemObj) {
        subView.loadImage('res/img/poker/' + mePokerObj.pokerName + '.png');
        subView.pokerName = mePokerObj.pokerName;
        mePokerObj.scaleX = 0;
        subView.allowCLICK = true;
        subView.on(Laya.Event.CLICK, this, this.onClickSubView, [subView, pokerArr, meItemObj]);
        this.showPoint(pokerArr);
    }

    onClickSubView(subView, pokerArr, meItemObj) {
        if (subView.allowCLICK) {
            pokerArr.forEach(poker_item => {
                if (poker_item.pokerName == subView.pokerName) {
                    subView.loadImage('');
                    subView.pokerName = '';
                    poker_item.scaleX = 1.3;
                    this.changeMePokerX(pokerArr, meItemObj);
                    this.showPoint(pokerArr);
                }
            })
        }
    }

    changeMePokerX(pokerArr, meItemObj) {
        let pokerArrScaleXNo0 = pokerArr.filter(item => item.scaleX != 0);
        if (pokerArrScaleXNo0.length == 3) {
            pokerArrScaleXNo0.forEach((item, index) => {
                item.x = meItemObj.mePokerX_3[index].x;
            })
        } else if (pokerArrScaleXNo0.length == 2) {
            pokerArrScaleXNo0.forEach((item, index) => {
                item.x = meItemObj.mePokerX_2[index].x;
            })
        } else if (pokerArrScaleXNo0.length == 4) {
            pokerArrScaleXNo0.forEach((item, index) => {
                item.x = meItemObj.mePokerX_4[index].x;
            })
        }
    }

    /**
     * 确认分牌
     */
    confrimSubResult() {
        if (this._subPokerResult) {
            this.showAssignPokerView(false, 'view');
            this._playerArray.forEach(item_player => {
                if (item_player.owner.isMe) {
                    item_player.showActionTip(true, 6);
                    item_player.reloadPlayerPokerZT(false, [1, 2, 3, 4]);
                }
            })
            ErrText.ERR(this, '点击了确认分牌=====：', this._subPokerResult);
            this.onSend({
                name: 'M.Games.CX.C2G_AssignPoker',
                data: {
                    roomId: this.roomId,
                    poker: this._subPokerResult
                },
                success(res) {
                    this.dealSoketMessage('收到分牌结果:', res)
                }
            })
        }
    }

    /**
   * 方便关于玩家位置下的数据重置
   * @param type 函数名称 eg:'playerDelayHandle'
   * @param data 数据
   */
    playerSeatFn(type, data) {
        this._playerArray.forEach(item_player => {
            this[type](data);
        })
    }

    /**
     * 玩家输赢收金币效果
     */
    playerWinUp(data) {
        this._winUpINDEX = 0;
        this.allowWinShou = true;
        this.reloadPlayerMoreZT();
        this.playerSeatFn('assignPokerCountDown', false);
        data.players.forEach((item_data, item_index) => {
            this._playerArray.forEach(item_player => {
                if (item_data._id == item_player.owner.userId) {
                    if (item_data.assignPoker.length != 0) {
                        this.startAssignPoker(false);
                        item_player.reloadPlayerPokerZT(false, [1, 2, 3, 4]);
                        let returnData1 = [item_data.assignPoker[0], item_data.assignPoker[1]];
                        let returnData2 = [item_data.assignPoker[2], item_data.assignPoker[3]];
                        let point1 = CountPoint.countPoint(item_data.assignPoker[0], item_data.assignPoker[1]);
                        let point2 = CountPoint.countPoint(item_data.assignPoker[2], item_data.assignPoker[3]);
                        item_player.showPlayerSubResult(true, { sub1: { data: returnData1, point: point1 }, sub2: { data: returnData2, point: point2 } });
                    }
                    if (item_data.showPoker.length > 0) {
                        item_player.showPlayerXiuView(true, item_data.showPoker);
                    }
                    setTimeout(() => {
                        item_player.showActionTip(false, null);
                        item_player.showOrHidePlayerXiaZhuView(false);
                        item_player.showMoveCM(this, 2, true, this._moveCMSeat.show, this._moveCMSeat.pi, this._music.moveMangOrPi, 1, this.gameEndMoveCMEnd, [data.players])
                    }, this._speed.winShowDelay)
                }
            })
        })
    }

    gameEndMoveCMEnd(data) {
        this._winUpINDEX = 0;
        if (this.allowWinShou) {
            Main.$LOG('移动结束', data)
            let playerLoselg0 = data[0].filter(item => item.losewin >= 0);
            this.allowWinShou = false;
            setTimeout(() => {
                data[0].forEach(item_data => {
                    this._playerArray.forEach(item_player => {
                        if (item_data._id == item_player.owner.userId) {
                            this.showDiChiPi(false);
                            if (item_data.losewin >= 0) {
                                item_player.showMoveCM(this, 2, true, this._moveCMSeat.pi, this._moveCMSeat.one, this._music.moveMangOrPi, playerLoselg0.length, getMonenyEnd);
                                function getMonenyEnd() {
                                    Main.$LOG('玩家受到金币：', item_data.score);
                                    this.updatePlayerMoreData(data[0]);
                                }
                            }
                            if (item_data.mang > 0) {
                                let lastMang = this._totalMango - item_data.mang;
                                if (lastMang <= 0) {
                                    this.showDiChiMang(false);
                                }
                                Main.$LOG('进来芒:', lastMang)
                                this.bindDiChiMangVal(lastMang);
                            }
                        }
                    })
                })
            }, this._speed.winCMDelay)
        }
    }

    /**
     * 更新玩家的分数
     */
    updatePlayerMoreData(data) {
        data.forEach(item_data => {
            this._playerArray.forEach(item_player => {
                if (item_data._id == item_player.owner.userId) {
                    item_player.changePlayerScore(item_data.score, this._changeScoreType.seat);
                }
                if (item_data._id == item_player.owner.userId && item_data.losewin > 0 && item_data._id != this.userId) {
                    item_player.playerSeatAddRotationGif(true);
                }
                if (item_data._id == item_player.owner.userId && item_data.losewin > 0) {
                    item_player.showPlayerLastWinScore(true, '+' + item_data.losewin);
                }
            })
            if (item_data._id == this.userId && item_data.losewin > 0) {
                this.meAnimationZT(true, Main.animations.win, this._music.YouWin);
            }
        })
    }

    //玩家离开回收芒效果
    recyclingMang(data) {
        this._winUpINDEX = 0;
        let num = 0;
        this._playerArray.forEach(item_player => {
            if (item_player.owner.userId == data.userId) {
                // Main.$LOG('进来回收=======================0');
                item_player.showMoveCM(this, 1, true, this._moveCMSeat.mang, this._moveCMSeat.one, this._music.moveMangOrPi, 1);
                this.showDiChiMang(false);
            } else {
                num++;
                if (num == this._playerArray.length)
                    this.showDiChiMang(false);
            }
        })
    }

    /**
     * 游戏结束，马上开始下一轮
     */
    roundEnd() {
        this._playerArray.forEach(item_player => {
            item_player.reloadPlayerPokerZT(false, [1, 2, 3, 4]);
            item_player.showPlayerSubResult(false, null);
            item_player.showActionTip(false);
            item_player.showPlayerSubResult(false);
            item_player.showOrHidePlayerXiaZhuView(false);
            item_player.showOrHidePlayerXiuSign(false);
            item_player.showPlayerXiuView(false);
            item_player.playerSeatAddRotationGif(false);
            item_player.showPlayerLastWinScore(false)
        })
        this.meAnimationZT(false, Main.animations.win);
        this.playerSeatFn('assignPokerCountDown', false);
        this.StartAssignPokerArr = [];
    }

    /**
     * 留座处理
     */
    playerLiuZuo(data) {
        if (data.userId == this.userId)
            this.isLiuZuo = true;
        this._playerArray.forEach(item_player => {
            if (item_player.owner.userId == data.userId) {
                item_player.aboutPlayerLiuZuo(data);
            }
        })
    }

    /**
     * 占座处理
     * @param data 数据
     * @param isUpdate 是否是刷新状态
     */
    playerSeatAt(data, isUpdate) {
        this._playerArray.forEach(item_player => {
            if (item_player.owner.seatId == data.seatidx) {
                this.keepMeSeatIndex(data, data.seatidx);
                item_player.playerSeatDownOrSeatAtCommon(true, data);
                item_player.playerSeatAtSetContent(data);
            }
        })
    }

    // 坐下处理
    playerSeatDown(data, isUpdate) {
        this._playerArray.forEach(item_player => {
            if (item_player.owner.seatId == data.seatidx) {
                item_player.aboutPlayerLiuZuoEnd(data);
                this.keepMeSeatIndex(data, data.seatidx);
                item_player.playerSeatDownOrSeatAtCommon(false, data);
                item_player.playerSeatDownSetContent(data);
            }
        })
    }

    /**
     * 保存站位或坐下的位置index
     * @param {*} data 
     */
    keepMeSeatIndex(data, val) {
        if (data.userId == this.userId)
            this._seatIndex = val;//带入的时候需要用
    }

    //玩家起立处理
    playerSeatUp(data) {
        Main.$LOG('玩家起立：', data)
        data.userId = data.userid;
        this._playerArray.forEach(item_player => {
            if (item_player.owner.userId == data.userid) {
                this.keepMeSeatIndex(data, null);
                item_player.playerSeatUpSetContent(data);
                item_player.showBanker(false);
                item_player.showActionTip(false, null);
                item_player.showOrHidePlayerXiaZhuView(false);
                item_player.aboutPlayerLiuZuoEnd(data);
                if (data.userid == this.userId) {
                    item_player.reloadPlayerPokerZT(false, [1, 2, 3, 4]);
                }
            }
        })
    }

    /**
     * 获取玩家信息
     */
    getPlayerNews() {
        console.log('激励理论绿')
    }

    /**
     * 打开实时战绩或牌局回顾
     */
    openSceneView(url) {
        if (this.roomId && Main.userInfo.userId)
            Main.$openScene(url, false, {
                userId: Main.userInfo.userId,
                roomId: this.roomId
            });
    }

    /**
     * 打开菜单选项
     */
    openMenuList(show) {
        let showObj = this.owner.menu;
        let maskAlpha = 0.2;
        let y = show ? 0 + Main.phoneNews.statusHeight : -this.owner.menu.height;
        this.openDiaLogCommon(show, showObj, maskAlpha, 'y', y);
    }

    setMeMakeBOBO(data) {
        let addBoBoPlayer = data.param.json[0];
        this._playerArray.forEach(item_player => {
            if (addBoBoPlayer.userId == item_player.owner.userId && addBoBoPlayer.userId == this.userId)
                item_player.setMeMakeBOBO();
        })
    }


    // 确认带入钵钵
    makeUpBoBoConfirmDaiRu() {
        let daiRuScore = this.owner.bobo_daiRuScore.text;
        this.onSend({
            name: 'M.Room.C2R_AddDairu',
            data: {
                roomid: this.roomId,
                idx: this._seatIndex,
                score: daiRuScore
            },
            success(res) {
                this.dealSoketMessage('补充钵钵：', res);
            }
        })
    }

    /**
     * 补充钵钵后处理
     */
    playerAddDairu(data) {
        if (data.userId == this.userId)
            Main.showTip('带入成功');
        this._playerArray.forEach(item_player => {
            if (data.userId == item_player.owner.userId) {
                item_player.setAddDaiRuScore(data);
            }
        })
    }

    /**
     * 补充钵钵(占座)的时候获取玩家信息
     */
    playerNews(data) {
        this._usableScore = data.score;//可用积分
    }

    // 起立请求
    playerSeatUpSend() {
        this.onSend({
            name: 'M.Room.C2R_SeatUp',
            data: {
                roomid: this.roomId
            },
            success(resData) {
                Main.$LOG('起立请求', resData)
                if (resData.ret.type == 0) {
                    this.playerSeatUp(resData);
                } else {
                    Main.showTip(resData.ret.msg);
                }
            }
        })
    }

    //离开房间
    playerLeaveRoomSend() {
        this.onSend({
            name: 'M.Room.C2R_LeaveRoom',
            data: {
                roomid: this.roomId
            },
            success(res) {
                this.dealSoketMessage('离开房间：', res);
            }
        })
    }

    /**
     * 离开房间处理
     */
    leaveRoomDeal(data) {
        if (data.userid == this.userId) {
            this.leaveRoomOpenView();
        } else {
            this.playerSeatUp(data);
        }
    }

    /**
     * 离开房间打开的界面
     */
    leaveRoomOpenView() {
        this.onClose();
        Main.$openScene('tabPage.scene', true, { page: this.owner._openedData.page });
    }

    /**
     * 打开弹窗公用方法
     */
    openDiaLogCommon(show, showObj, maskAlpha, XORY, XORYVal) {
        if (showObj.visible) {
            setTimeout(() => {
                showObj.visible = show;
            }, this.openDiaLogSpeed)
        } else {
            showObj.visible = show;
        }
        this.owner._mask.alpha = maskAlpha;
        if (XORY == 'x') {
            Laya.Tween.to(showObj, { x: XORYVal }, this.openDiaLogSpeed);
        } else {
            Laya.Tween.to(showObj, { y: XORYVal }, this.openDiaLogSpeed);
        }
        this.owner._mask.visible = show;
    }

    /**
    * 开始发首牌(第1张牌)
    */
    startDealPoker1And2() {
        this._isUpdateData = false;
        let count = this._dealPoker12Array.length;
        this._dealNumber = 0;
        for (let i = 1; i <= 2; i++) {
            this._dealPoker12Array.forEach((item_data, item_index) => {
                this._playerArray.forEach(item_player => {
                    if (item_player.owner.userId == item_data.uid) {
                        let num = i;//代表第几张牌(1,2,3,4)
                        let index = item_index + ((num - 1) * count);
                        let pokerName = num == 1 ? item_data.poker[0] : item_data.poker[1];
                        item_player.dealPoker(this, num, count, pokerName, index, false, dealPokerEnd);
                        function dealPokerEnd() {
                            if (num == 2) {
                                Main.$LOG('发首牌结束：', num)
                                this.dealPokerEnd();
                            } else {
                                this._dealNumber = 0;
                            }
                        }
                    }
                })
            })
        }
    }

    // 发牌结束(接下来开始显示操作了)
    dealPokerEnd() {
        this.qiaoDeal34PokerEnd();
        this._allowStartAction = true;
        // console.log('发牌结束(接下来开始显示操作了)',this._allowStartAction)
        if (this._allowStartAction) {
            this.startAction();//开始显示操作
        }
    }

    /**
     * 秀牌
     * @param {Object} pokerObj 牌对象
     * @param {bool} isShow 是否秀牌
     */
    xiuPoker(pokerObj, isShow) {
        this.onSend({
            name: 'M.Games.CX.C2G_ShowPoker',
            data: {
                roomId: this.roomId,
                poker: pokerObj.pokerName,
                show: isShow
            },
            success(res) {
                // this.dealSoketMessage('是否秀牌请求返回的结果：',res);
                if (res.ret.type == 0) {
                    let showSign = pokerObj.getChildByName("xiuSign");
                    showSign.visible = res.show;
                } else {
                    Main.showTip(res.ret.msg);
                }
            }
        })
    }

    /**
     * 自己的动画状态设置
     */
    meAnimationZT(isShow = true, aniType = Main.animations.win, music) {
        if (Main.gameSetVal.gameMusic == 1 && music)
            Laya.SoundManager.playSound(music, 1);
        let animationBox = this.owner.meAnimationBox;
        let thisAni = animationBox.getChildByName('meGIF' + aniType);
        if (thisAni) {
            thisAni.removeSelf();
        }
        if (isShow) {
            Laya.loader.load("res/atlas/images/GIF/" + aniType + ".atlas", Laya.Handler.create(this, onMyLoaded));
            function onMyLoaded() {
                let ani = new Laya.Animation();
                ani.name = 'meGIF' + aniType;
                ani.pos(animationBox.pivotX, animationBox.pivotY);
                ani.loadAnimation("animation/" + aniType + ".ani");
                animationBox.visible = true;
                animationBox.addChild(ani);
                //播放Animation动画
                ani.play();
            }
        }

    }
}