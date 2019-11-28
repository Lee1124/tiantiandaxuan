
/**
 * 该脚本为房间初始化数据所用
 */

class GameRoomInit {
    init(that) {
        let GameUI = that.owner;
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
    }

    keepValue(that, data) {
        // console.log('进来1',data.INDEX)
        let playerSeat = data.owner;
        let GameUI = that.owner;
        playerSeat.mePokerX_2 = [];
        playerSeat.mePokerX_3 = [];
        playerSeat.mePokerX_4 = [];
        playerSeat.sub1 = [];
        playerSeat.sub2 = [];
        playerSeat.sub1Point = '';
        playerSeat.sub2Point = '';
        playerSeat.index = data.INDEX;
        playerSeat.seatId = data.INDEX;
        playerSeat.userId = '';
        playerSeat.isMe = false;
        playerSeat.showXiaZhuScore = false;
        playerSeat.xiaZhuScore = 0;

        GameUI._playerSeatXYArray.push({ index: that.INDEX, x: playerSeat.x, y: playerSeat.y });//保存初始的位置坐标
        GameUI._xiaZhuSeatXYArray.push({ index: that.INDEX, x: playerSeat.getChildByName("xiaZhuScore").x, y: playerSeat.getChildByName("xiaZhuScore").y });//保存初始下注的位置坐标
        GameUI._tipsSeatXYArray.push({ index: that.INDEX, x: playerSeat.getChildByName("tipsBox").x, y: playerSeat.getChildByName("tipsBox").y });//保存初始提示的位置坐标
        GameUI._pokerBoxSeat.push({ index: that.INDEX, x: playerSeat.getChildByName("show_poker_box").x, y: playerSeat.getChildByName("show_poker_box").y })
        GameUI._subPokerBoxSeat.push({ x: playerSeat.getChildByName("sub_poker_box").x, y: playerSeat.getChildByName("sub_poker_box").y })

        {//玩家显示筹码相对位置中心的坐标
            let parent_xiaZhuScoreObj = playerSeat.getChildByName("xiaZhuScore");
            let son_showCmObj = playerSeat.getChildByName("xiaZhuScore").getChildByName("cm_show_seat");
            let start_seat = playerSeat.getChildByName("create_cm_seat");//开始位置
            let x = this.getCoordinate(start_seat, parent_xiaZhuScoreObj, son_showCmObj).x;// 获取相对坐标(找某节点中的节点相对玩家的坐标x)
            let y = this.getCoordinate(start_seat, parent_xiaZhuScoreObj, son_showCmObj).y;// 获取相对坐标(找某节点中的节点相对玩家的坐标y)
            GameUI._showCMFaceToPlayerXY.push({ x: x, y: y })
            playerSeat._showCMFaceToPlayerXY = {//玩家显示筹码相对位置中心的坐标
                x: x,
                y: y
            }
        }

        {//芒/皮底池相对于玩家位置中心的坐标

            let moveCMSeat = playerSeat.getChildByName("create_cm_seat").getChildByName("move_cm");
            let mang_xy = moveCMSeat.globalToLocal(new Laya.Point(GameUI.mang_cm_pool.x, GameUI.mang_cm_pool.y));
            // console.log(mang_xy.x, mang_xy.y, GameUI.mang_cm_pool.x, GameUI.mang_cm_pool.y)
            let pi_xy = moveCMSeat.globalToLocal(new Laya.Point(GameUI.pi_cm_pool.x, GameUI.pi_cm_pool.y));
            GameUI._mangDiChiFaceToPlayerXYArray.push({ x: mang_xy.x + 50, y: mang_xy.y });
            GameUI._piDiChiFaceToPlayerXYArray.push({ x: pi_xy.x + 100, y: pi_xy.y });
            playerSeat._mangDiChiFaceToPlayerXY = {//玩家显示筹码相对位置中心的坐标
                x: mang_xy.x + 50,
                y: mang_xy.y
            }
            playerSeat._piDiChiFaceToPlayerXY = {//玩家显示筹码相对位置中心的坐标
                x: pi_xy.x + 100,
                y: pi_xy.y
            }
        }
        {//丢牌的位置
            playerSeat._diuPokerSeatXY = {//玩家显示筹码相对位置中心的坐标
                x: playerSeat.getChildByName("deal_cards_seat34").x,
                y: playerSeat.getChildByName("deal_cards_seat34").y
            }
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

export default new GameRoomInit();