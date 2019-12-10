/**
 * 打开游戏中菜单功能
 */
import Main from '../common/Main';
import GameControl from '../GameCenter/GameControl';
import PlayerLiuZuo from '../Fuction/PlayerLiuZuo';
import MakeBOBO from '../Fuction/MakeBOBO';
import GameSet from '../Fuction/GameSet';
class GameMenu {
    /**打开 */
    open() {
        this.common(true);
        this.bindEvent(true);
        this.initPage();
    }
    /**关闭 */
    close() {
        this.common(false);
        this.bindEvent(false);
    }
    /**公用 */
    common(show) {
        let showObj = GameControl.instance.owner.menu;
        let maskAlpha = 0.2;
        let y = show ? 0 + Main.phoneNews.statusHeight : -showObj.height;
        GameControl.instance.openDiaLogCommon(show, showObj, maskAlpha, 'y', y);
    }
    /**
     * 绑定事件或移除事件
     * @param {*} isBind 是否绑定事件
     */
    bindEvent(isBind = true) {
        let mask = GameControl.instance.owner._mask;
        if (isBind)
            mask.on(Laya.Event.CLICK, this, this.close);
        else
            mask.off(Laya.Event.CLICK);
    }
    /**初始化页面内容 */
    initPage() {
        let list = GameControl.instance.owner.menu.getChildByName('menuList');
        list.array = [
            { id: 1, imgUrl: 'res/img/menu/menu_1.png' },
            { id: 2, imgUrl: 'res/img/menu/menu_2.png' },
            { id: 3, imgUrl: 'res/img/menu/menu_3.png' },
            { id: 4, imgUrl: 'res/img/menu/menu_4.png' },
            { id: 5, imgUrl: 'res/img/menu/menu_5.png' },
            { id: 6, imgUrl: 'res/img/menu/menu_6.png' },
            { id: 7, imgUrl: 'res/img/menu/menu_7.png' },
        ];
        // _menuList.vScrollBarSkin = "";//运用滚动
        list.renderHandler = new Laya.Handler(this, this.menuOnRender);
        list.mouseHandler = new Laya.Handler(this, this.menuOnClick);
    }
    /**渲染列表 */
    menuOnRender(cell, index) {
        let menuContent = cell.getChildByName("menu_row_node").getChildByName("listContent");
        menuContent.skin = cell.dataSource.imgUrl;
        if (cell.dataSource.id == 7) {
            let menuLine = cell.getChildByName("menu_row_node").getChildByName("line");
            if (menuLine)
                menuLine.removeSelf();
        }
    }

    /**列表点击事件 */
    menuOnClick(Event, index) {
        if (Event.type == 'click') {
            let ID = Event.target.dataSource.id;
            this.close();
            if (ID == 2) {//牌局提示界面
                Laya.Scene.open('paijutishi.scene', false, { show: true });
            } else if (ID == 1) {//起立
                GameControl.instance.playerSeatUpSend();
            } else if (ID == 7) {//离开房间
                GameControl.instance.playerLeaveRoomSend();
            } else if (ID == 4) {//补充钵钵
                MakeBOBO.open(false);
            } else if (ID == 3) {//游戏设置
                GameSet.open(true);
            } else if (ID == 5) {//留座离桌
                PlayerLiuZuo.open(this);
            } else if (ID == 6) {//充值商城
                Main.$openScene('shoppingMall.scene', false, { isTabPage: false }, (res) => {
                    res.zOrder = 30;
                    res.x = Laya.stage.width;
                    Laya.Tween.to(res, { x: 0 }, Main._speed.page);
                })
            }
        }
    }
}
export default new GameMenu();