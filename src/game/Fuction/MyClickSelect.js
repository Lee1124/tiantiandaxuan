/**
 * 该脚本为点击选中功能
 */
export default class MyClickSelect extends Laya.Script {
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
        this.bindEvent();
        this.init();
    }

    bindEvent() {
        this.list = this.owner.getChildByName("selectList");
        this.list.cells.forEach(item => {
            let $select = item.getChildByName("listRow").getChildByName("select");
            $select.on(Laya.Event.CLICK, this, this.clickSelectBox, [$select, item]);
        });
    }

    clearAllSelect() {
        this.list.cells.forEach(item => {
            let $yes = item.getChildByName("listRow").getChildByName("select").getChildByName("yes");
            $yes.visible = false;
        });
    }
    clickSelectBox(selectBox, cell) {
        this.clearAllSelect();
        let yes = selectBox.getChildByName("yes");
        yes.visible = !yes.visible;
        if (this.returnFn)
            this.returnFn.call(this.fnThat, cell.dataSource.value);
    }
    init(isSelectIndex = 0) {
        this.clearAllSelect();
        this.list.cells.forEach((item, index) => {
            if (index == isSelectIndex) {
                let $yes = item.getChildByName("listRow").getChildByName("select").getChildByName("yes");
                $yes.visible = true;
            }
        });
    }
    /**
     * @param {*} that 执行域
     * @param {*} isSelectIndex 选中下标 默认为下标为0的
     * @param {*} fn 回调
     */
    MySelect(that, isSelectIndex = 0, fn) {
        this.fnThat = that;
        this.returnFn = fn;
        this.init(isSelectIndex);
    }
}