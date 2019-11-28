/**
 * 该脚本为了soket断开重连后重置数据,保证数据正确性
 */
import Main from '../common/Main'
import GameRoomInit from '../Fuction/GameRoomInit'
class RecSoketReloadData {
    reload(that) {
        console.log(that._playerArray)
        // GameRoomInit.init(that);
        let me_handleBox = that.owner.getChildByName("me_handleBox");
        me_handleBox._children.forEach(item => {
            item.visible = false;
        })
        that.owner.me_sub_pokerBox.visible=false;
        that.owner.subCountDown.visible=false;
        that.owner.meAnimationBox.visible=false;
        that.owner.delayTimeBtn.visible=false;
        that._playerArray.forEach(item_player => {
            // GameRoomInit.keepValue(that,item_player);
            let playerSeat = item_player.owner;
            that._plyerIndexArray[item_player.INDEX]=item_player.INDEX;
            playerSeat.userId = '';
            playerSeat.mePokerX_2 = [];
            playerSeat.mePokerX_3 = [];
            playerSeat.mePokerX_4 = [];
            playerSeat.sub1 = [];
            playerSeat.sub2 = [];
            playerSeat.sub1Point = '';
            playerSeat.sub2Point = '';
            playerSeat.isMe = false;
            playerSeat.showXiaZhuScore = false;
            playerSeat.xiaZhuScore = 0;
            playerSeat.index = item_player.INDEX;
            playerSeat.seatId = item_player.INDEX;
            playerSeat.x=that.owner._playerSeatXYArray[item_player.INDEX].x;
            playerSeat.y=that.owner._playerSeatXYArray[item_player.INDEX].y;
            playerSeat.getChildByName("xiaZhuScore").x=that.owner._xiaZhuSeatXYArray[item_player.INDEX].x;
            playerSeat.getChildByName("xiaZhuScore").y=that.owner._xiaZhuSeatXYArray[item_player.INDEX].y;
            playerSeat.getChildByName("tipsBox").x=that.owner._tipsSeatXYArray[item_player.INDEX].x;
            playerSeat.getChildByName("tipsBox").y=that.owner._tipsSeatXYArray[item_player.INDEX].y;
            playerSeat.getChildByName("show_poker_box").x=that.owner._pokerBoxSeat[item_player.INDEX].x;
            playerSeat.getChildByName("show_poker_box").y=that.owner._pokerBoxSeat[item_player.INDEX].y;
            let create_cm_seat_children=playerSeat.getChildByName("create_cm_seat")._children;
            create_cm_seat_children.forEach(item => {
                item.x=that.owner._showCMFaceToPlayerXY[item_player.INDEX].x;
                item.y=that.owner._showCMFaceToPlayerXY[item_player.INDEX].y
            });
            playerSeat.getChildByName("sub_poker_box").x=that.owner._subPokerBoxSeat[item_player.INDEX].x;
            playerSeat.getChildByName("sub_poker_box").y=that.owner._subPokerBoxSeat[item_player.INDEX].y;

           playerSeat._showCMFaceToPlayerXY.x = that.owner._showCMFaceToPlayerXY[item_player.INDEX].x;
           playerSeat._showCMFaceToPlayerXY.y = that.owner._showCMFaceToPlayerXY[item_player.INDEX].y;
           playerSeat._mangDiChiFaceToPlayerXY.x = that.owner._mangDiChiFaceToPlayerXYArray[item_player.INDEX].x;
           playerSeat._mangDiChiFaceToPlayerXY.y = that.owner._mangDiChiFaceToPlayerXYArray[item_player.INDEX].y;
           playerSeat._piDiChiFaceToPlayerXY.x = that.owner._piDiChiFaceToPlayerXYArray[item_player.INDEX].x;
           playerSeat._piDiChiFaceToPlayerXY.y = that.owner._piDiChiFaceToPlayerXYArray[item_player.INDEX].y;

            let headBox = playerSeat.getChildByName("head-box");
            let headImg = headBox.getChildByName("headImgBox");
            let xiaZhuScore = playerSeat.getChildByName("xiaZhuScore");
            let deal_cards_seat = playerSeat.getChildByName("deal_cards_seat");
            let deal_cards_seat34 = playerSeat.getChildByName("deal_cards_seat34");
            let move_cm = playerSeat.getChildByName("create_cm_seat").getChildByName("move_cm");
            let show_poker_box = playerSeat.getChildByName("create_cm_seat").getChildByName("move_cm");
            let sub_poker_box = playerSeat.getChildByName("sub_poker_box");
            let score = playerSeat.getChildByName("score");
            let banker = playerSeat.getChildByName("banker");
            let name = playerSeat.getChildByName("name");
            let countDownBox = playerSeat.getChildByName("countDownBox");
            let show_me_poker_box = playerSeat.getChildByName("show_me_poker_box");
            let show_me_sub_poker = playerSeat.getChildByName("show_me_poker_box");
            let xiuPokerBox = playerSeat.getChildByName("xiuPokerBox");
            let gifBox = playerSeat.getChildByName("gifBox");
            let winScore = playerSeat.getChildByName("winScore");
            let tipsBox = playerSeat.getChildByName("tipsBox");
            headBox.visible = false;
            xiaZhuScore.visible = false;
            move_cm.visible = false;
            deal_cards_seat._children.forEach(item => {
                item.visible = false;
            })
            deal_cards_seat34._children.forEach(item => {
                item.visible = false;
            })
            show_me_poker_box._children.forEach(item => {
                item.visible = false;
            })
            headImg.skin = '';
            tipsBox.loadImage('');
            sub_poker_box.visible = false;
            score.visible = false;
            banker.visible = false;
            countDownBox.visible = false;
            xiuPokerBox.visible = false;
            gifBox.visible = false;
            winScore.visible = false;
            name.text = '';
        });

    }


}
export default new RecSoketReloadData();