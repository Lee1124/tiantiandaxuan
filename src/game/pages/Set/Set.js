/**
 * 设置
 */
import Back from '../../common/back';
import Switch from '../../common/MySwitch';
import Main from '../../common/Main';
export default class Set extends Laya.Script {
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

    onStart() {
        this.initBack();
        this.setList();
    }

    initBack() {
        let backJS = this.owner.back.getComponent(Back);
        backJS.initBack();
    }

    setList() {
        let list = this.owner.ctList;
        list.array = [
            { id: 1, label: 'res/img/common/set_text1.png' },
            { id: 2, label: 'res/img/common/set_text2.png' },
            { id: 3, label: 'res/img/common/set_text3.png', BanBenVal: '1.0.0' },
        ];
        list.renderHandler = new Laya.Handler(this, this.listRender);
        list.mouseHandler = new Laya.Handler(this, this.listSelect);
    }

    listRender(cell) {
        let label = cell.getChildByName('label');
        label.skin = cell.dataSource.label;
        if (cell.dataSource.id != 1) {
            let selectView = cell.getChildByName('selectView');
            selectView.removeSelf();
        }
        if (cell.dataSource.id == 1) {
            //初始化游戏声音的状态
            this.initSwitch(cell);
        }
        if (cell.dataSource.id != 2) {
            let goIconBox = cell.getChildByName('goIconBox');
            goIconBox.removeSelf();
        }
        if (cell.dataSource.id != 3) {
            let testBox = cell.getChildByName('testBox');
            testBox.removeSelf();
        }
    }

    listSelect(Event, index) {
        if (Event.type == 'click') {
            let ID = Event.target.dataSource.id;
            if (ID == 2) {
                Main.$openScene('aboutOur.scene', false, this.openDta, (res) => {
                    res.x = Laya.stage.width;
                    res.zOrder = 10;
                    Laya.Tween.to(res, { x: 0 }, Main._speed.page);
                })
            }
        }
    }
    /**
     * 初始化游戏声音的状态
     */
    initSwitch(cell) {
        let selectView = cell.getChildByName('selectView');
        let SwitchJS = selectView.getComponent(Switch);
        let gameMusicState = localStorage.getItem('gameMusic') ? localStorage.getItem('gameMusic') : 1;
        let isOpened = gameMusicState == 0 ? false : true;
        SwitchJS.initSwitch(this, isOpened, (bool) => {
            let isOpen = bool ? 1 : 0;
            localStorage.setItem('gameMusic', isOpen);
        });
    }
}