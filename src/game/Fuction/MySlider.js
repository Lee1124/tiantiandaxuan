const
    Sprite = Laya.Sprite,
    Event = Laya.Event;
import MyCenter from '../common/MyCenter';
import Main from '../common/Main'
export default class MySlider extends Laya.Script {
    constructor() {
        super();
        // Main.$LOG("this.width:" + this.width + "-" + this.autoSize);

    }
    onEnable()  {
        this.InitAttribute()
        this.InitEvent();
    }

    /**
     * 初始化属性
     */
    InitAttribute()  {
        //显示的滑动对象节点
        this.slider = this.owner;
        //滑动背景
        this.sliderBg = this.slider.getChildByName("da_sliderBg");
        this.sliderHeight = this.sliderBg.getChildByName("da_sliderHeight");
        //最大值
        this.maxVal = this.sliderBg.getChildByName("da_maxNum").getChildByName("value");
        //当前滑动刻度
        this.handler = this.sliderBg.getChildByName("da_handler");
        //刻度文字显示
        this.texNum = this.handler.getChildByName("da_texNum");
        //激活滑动按钮
        // this.btnClick = this.owner.getChildByName("da_btnClick");
        //默认隐藏滑动节点
        this.slider.visible = false;
        // this.owner.visible = false;
        //设置滑动初始位置
        this.beginPosition = this.handler.y;
        //设置滑动结束为止
        this.endPosition = this.handler.y - this.sliderHeight.height;
        Main.$LOG(this.beginPosition, this.endPosition, this.sliderBg.height)

        this.Init();
    }
    /**
     * 初始化事件信息
     */
    InitEvent()  {
        // this.btnClick.on(Event.MOUSE_DOWN, this, this.SliderMouseDown);
    }

    /**
     * slider按下
     * @param startVal 开始数字
     * @param endVal 结束数字
     * @param {function} dragAction 变化回调
     * @param {function} endAction 结束回调
     */
    SliderMouseDown(startVal, endVal, dragAction, endAction) {
        //测试代码（*****************）
        this.Show(startVal, endVal, dragAction, endAction);
        //测试代码（*****************）

        //注册事件
        Laya.stage.on(Event.MOUSE_MOVE, this, this.SliderMouseMove);
        Laya.stage.on(Event.MOUSE_UP, this, this.SliderMouseUp);
        // Laya.stage.on(Event.MOUSE_OUT, this, this.SliderMouseOut);


        //初始位置
        this.SliderVal(0);
        this.handler.y = this.beginPosition;
        this.maxVal.text = endVal;
    }
    /**
     * 测试1
     * @param {*} progress 
     * @param {*} max 
     */
    test1(progress, max)  {
        Main.$LOG("进度：" + progress + "-" + max)
    }
    testEnd(sVal)  {
        Main.$LOG("抬起:" + sVal)
    }

    /**
     * 显示进度条
     * @param {*} startVal 
     * @param {*} endVal 
     * @param {*} dragAction 
     * @param {*} endAction 
     */
    Show(startVal, endVal, dragAction, endAction)  {
        this.sShow = true;
        this.sCalibration = 0;
        this.sStartVal = startVal;
        this.sEndVal = endVal;
        this.sEndAction = endAction;
        this.sDragAction = dragAction;
        this.sCurDragVal = 0;
        this.slider.visible = true;
    }

    /**
     * 删除滑动事件
     */
    RemoveSliderEvent()  {
        Laya.stage.off(Event.MOUSE_MOVE, this, this.SliderMouseMove);
        Laya.stage.off(Event.MOUSE_UP, this, this.SliderMouseUp);
        // Laya.stage.off(Event.MOUSE_OUT, this, this.SliderMouseOut);
    }
    /**
     * 抬起事件处理
    */
    SliderMouseUp(e) {
        //删除滑动事件
        this.RemoveSliderEvent();
        //结束回调
        if (this.sEndAction != null)  {
            this.sEndAction(this.sCurDragVal);
        }
        //初始化
        this.Init();
    }
    /**
     * 移到事件处理
     */
    SliderMouseMove(e) {
        let point = new Laya.Point(Laya.stage.mouseX, Laya.stage.mouseY);
        let localPoint = this.sliderBg.globalToLocal(point);
        //Main.$LOG('localPoint:',localPoint,point,this.owner)
        this.handler.y = Math.min(Math.max(localPoint.y, this.endPosition), this.beginPosition);

        //Main.$LOG("SliderMouseMove:"+  point.x+':'+point.y +"-" + localPoint.y +"-" + this.beginPosition + "-"+ this.handler.y);
        this.SliderVal((this.beginPosition - this.handler.y) / (this.beginPosition - this.endPosition));
    }
    //初始化
    Init()  {
        this.slider.visible = false;
        this.sShow = false;
        this.sCalibration = 0;
        this.sStartVal = 0;
        this.sEndVal = 0;
        this.sCurDragVal = 0;
    }
    /**
     * 滑动
     * @param {*} sVal 
     */
    SliderVal(sVal)  {
        if (!this.sShow)  {
            RemoveSliderEvent();
            return;
        }
        this.texNum.text = this.CalculationCalibration(this.sStartVal, this.sEndVal, sVal, this.sDragAction);
    }

    /**
     * 计算刻度
     */
    CalculationCalibration(startVal, endVal, sVal, dragAction) {
        //每个范围的递增值（）
        let scope = [2, 5, 100];
        //范围开始下标
        let scopeIndex = startVal.toString().length - 1;
        let cScopeIndex = scopeIndex;
        //差值
        let subVal = endVal;
        //单位值范围 每次乘以10（0-10，10-100等。。每次计算当前作用域中的刻度次数）
        let unitVal = Math.pow(10, scopeIndex + 1)
        //范围值
        let scopeVal = scope.length > scopeIndex ? scope[scopeIndex] : scope[scope.length - 1] * Math.pow(10 * scopeIndex - scope.length);

        let cScopeVal = scopeVal;
        //刻度值
        let calibrationVal = [];
        //刻度次数
        let calibrationNum = 1;
        calibrationVal.push(0);
        let curVal = startVal;
        calibrationVal.push(curVal);

        let remainder = curVal % scopeVal;
        if (remainder > 0)  {
            curVal = scopeVal - remainder + curVal;
            calibrationVal.push(curVal);
            ++calibrationNum;
        }
        //上一次的单位值大小
        let LastUnitVal = startVal + scopeVal - remainder;

        Main.$LOG(endVal + "-" + unitVal + "-" + scopeVal);
        //
        while (endVal >= unitVal) {
            //TODO:将每个刻度的值添加到表中
            let curNum = parseInt((unitVal - LastUnitVal) / scopeVal);
            let nIndex = 0;
            while (nIndex < curNum)  {
                curVal += scopeVal;
                calibrationVal.push(curVal);
                ++nIndex;
            }
            //累计刻度次数
            calibrationNum += curNum
            //Main.$LOG("curNum:"+curNum + "-"+calibrationNum);
            //记录上一次单位值
            LastUnitVal = unitVal;
            //累计-每次单位x10
            unitVal = unitVal * 10;

            if (scope.length > ++scopeIndex) {
                //不确定范围值配置
                scopeVal = scope[scopeIndex];
            }
            else {
                //范围配置中不存在 原来的基础值x10
                scopeVal = scopeVal * 10;
                Main.$LOG(scopeVal);
            }
        }

        let lCurNum = (parseInt((endVal - LastUnitVal) / scopeVal));
        //计算剩余值能有多少刻度(当前刻度是从0开始)
        calibrationNum += lCurNum;
        //TODO:添加刻度值-将每个刻度的值添加到表中
        let lIndex = 0;
        while (lIndex < lCurNum) {
            curVal += scopeVal;
            calibrationVal.push(curVal);
            ++lIndex;
        }
        //添加最后一次数值
        if (endVal % scopeVal > 0) {
            ++calibrationNum;
            calibrationVal.push(endVal);
        }
        //当前刻度
        let curCalibration = parseInt(sVal * calibrationNum);
        //Main.$LOG("endVal"+ endVal + "-" + sVal  + "-" + LastUnitVal + "-"+ scopeVal+ "-" + lCurNum + "-" + calibrationNum);

        //Main.$LOG("总刻度次数：" + calibrationNum + ",当前刻度：" + curCalibration + "，值：" + calibrationVal.length);
        let curCVal = calibrationVal[curCalibration];
        //回调-返回当前刻度的数值
        if (this.sDragAction != null && this.sCurDragVal != curCVal)  {
            // Main.$LOG("=============sDragAction");
            this.sDragAction(calibrationVal[curCalibration], curCalibration == calibrationNum - 1);
        }
        // Main.$LOG("=====calibrationVal:" +curCVal +"-" + this.sCurDragVal);
        this.sCurDragVal = curCVal;
        return this.sCurDragVal;
    }
    /**
     * 超出触发范围
     */
    SliderMouseOut()  {
        //删除滑动事件
        this.RemoveSliderEvent();
        //结束回调
        if (this.sEndAction != null)  {
            this.sEndAction(this.sCurDragVal);
        }
        //初始化
        this.Init();
    }

}