import COMMON from '../common/common'
export default class deskView extends Laya.Script {
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

    }
    onStart() {
        // this.initGameView();
    }

    onDisable() {

    }
    // 初始化游戏界面
    initGameView() {
        let _deskView = this.owner;
        let _deskViewChilds = _deskView._children.filter(item => item.name.indexOf('empty-seat') != -1);
        console.log(_deskViewChilds)
        let GameUI = this.owner.parent;
        GameUI.mang_cm_pool.zOrder = 2;
        GameUI.pi_cm_pool.zOrder = 2;
        GameUI._playerSeatXYArray = [];//玩家初始的位置坐标
        GameUI._xiaZhuSeatXYArray = [];//保存下注分数处初始的位置坐标
        GameUI._tipsSeatXYArray = [];//保存提示初始的位置坐标
        GameUI._pokerBoxSeat = [];//保存玩家显示牌的位置坐标
        GameUI._showCMFaceToPlayerXY = [];//玩家显示筹码相对位置中心的坐标
        GameUI._mangDiChiFaceToPlayerXYArray = [];//芒底池玩家相对位置中心的坐标
        GameUI._piDiChiFaceToPlayerXYArray = [];//芒底池玩家相对位置中心的坐标
        GameUI._subPokerBoxSeat = [];//保存玩家分牌后显示的位置坐标
        _deskView.width = Laya.stage.width;
        _deskView.height = Laya.stage.height;
        for (let i = 0; i < _deskViewChilds.length; i++) {
            COMMON.setLayoutValue(_deskViewChilds[i]);//设置适配参数
            _deskViewChilds[i].mePokerX_2 = [];
            _deskViewChilds[i].mePokerX_3 = [];
            _deskViewChilds[i].mePokerX_4 = [];
            _deskViewChilds[i].poker12 = [11, 11];
            _deskViewChilds[i].poker34 = [11, 11];
            _deskViewChilds[i].sub1 = [];
            _deskViewChilds[i].sub2 = [];
            _deskViewChilds[i].sub1Point = '1点';
            _deskViewChilds[i].sub2Point = '2点';
            _deskViewChilds[i].index = i;
            _deskViewChilds[i].seatId = i;
            _deskViewChilds[i].userId = '';
            _deskViewChilds[i].isMe = false;
            _deskViewChilds[i].showXiaZhuScore = false;
            _deskViewChilds[i].xiaZhuScore = 0;
            setTimeout(() => {
                {
                    GameUI._playerSeatXYArray.push({ index: i, x: _deskViewChilds[i].x, y: _deskViewChilds[i].y });//保存初始的位置坐标
                    GameUI._xiaZhuSeatXYArray.push({ index: i, x: _deskViewChilds[i].getChildByName("xiaZhuScore").x, y: _deskViewChilds[i].getChildByName("xiaZhuScore").y });//保存初始下注的位置坐标
                    GameUI._tipsSeatXYArray.push({ index: i, x: _deskViewChilds[i].getChildByName("tipsBox").x, y: _deskViewChilds[i].getChildByName("tipsBox").y });//保存初始提示的位置坐标
                    GameUI._pokerBoxSeat.push({ index: i, x: _deskViewChilds[i].getChildByName("show_poker_box").x, y: _deskViewChilds[i].getChildByName("show_poker_box").y })
                    GameUI._subPokerBoxSeat.push({ x: _deskViewChilds[i].getChildByName("sub_poker_box").x, y: _deskViewChilds[i].getChildByName("sub_poker_box").y })
                }

                {//玩家显示筹码相对位置中心的坐标
                    let parent_xiaZhuScoreObj = _deskViewChilds[i].getChildByName("xiaZhuScore");
                    let son_showCmObj = _deskViewChilds[i].getChildByName("xiaZhuScore").getChildByName("cm_show_seat");
                    let start_seat = _deskViewChilds[i].getChildByName("create_cm_seat");//开始位置
                    let x = this.getCoordinate(start_seat, parent_xiaZhuScoreObj, son_showCmObj).x;// 获取相对坐标(找某节点中的节点相对玩家的坐标x)
                    let y = this.getCoordinate(start_seat, parent_xiaZhuScoreObj, son_showCmObj).y;// 获取相对坐标(找某节点中的节点相对玩家的坐标y)
                    GameUI._showCMFaceToPlayerXY.push({ x: x, y: y })
                    _deskViewChilds[i]._showCMFaceToPlayerXY = {//玩家显示筹码相对位置中心的坐标
                        x: x,
                        y: y
                    }
                }
                {//芒/皮底池相对于玩家位置中心的坐标

                    let moveCMSeat = _deskViewChilds[i].getChildByName("create_cm_seat").getChildByName("move_cm");
                    let mang_xy = moveCMSeat.globalToLocal(new Laya.Point(GameUI.mang_cm_pool.x, GameUI.mang_cm_pool.y));
                    // console.log(mang_xy.x, mang_xy.y, GameUI.mang_cm_pool.x, GameUI.mang_cm_pool.y)
                    let pi_xy = moveCMSeat.globalToLocal(new Laya.Point(GameUI.pi_cm_pool.x, GameUI.pi_cm_pool.y));
                    GameUI._mangDiChiFaceToPlayerXYArray.push({ x: mang_xy.x + 50, y: mang_xy.y });
                    GameUI._piDiChiFaceToPlayerXYArray.push({ x: pi_xy.x + 100, y: pi_xy.y });
                    _deskViewChilds[i]._mangDiChiFaceToPlayerXY = {//玩家显示筹码相对位置中心的坐标
                        x: mang_xy.x + 50,
                        y: mang_xy.y
                    }
                    _deskViewChilds[i]._piDiChiFaceToPlayerXY = {//玩家显示筹码相对位置中心的坐标
                        x: pi_xy.x + 100,
                        y: pi_xy.y
                    }
                }
                {//丢牌的位置
                    _deskViewChilds[i]._diuPokerSeatXY = {//玩家显示筹码相对位置中心的坐标
                        x: _deskViewChilds[i].getChildByName("deal_cards_seat34").x,
                        y: _deskViewChilds[i].getChildByName("deal_cards_seat34").y
                    }
                }
            })

        }
    }
    /**
    * 获取相对坐标(找某节点中的节点相对玩家的坐标)
    */
    getCoordinate(start, parent, son) {
        let x1 = son.x - parent.width / 2;//儿子相对父亲的坐标
        let y1 = son.y - parent.height / 2;
        let x2 = parent.x - start.x;//父亲相对起点的坐标
        let y2 = parent.y - start.y;
        return {
            x: x1 + x2,
            y: y1 + y2
        }
    }
}