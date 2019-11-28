class CountPoint{
    constructor() {}
    /**
     * 特殊牌型的表
     */
    specialTable(){
        let arr = [{
            name: '丁皇',
            type1: 1,
            type2: 3,
            point1: 1,
            point2: 1
        },
        {
            name: '天牌',
            type1: 1,
            type2: 1,
            point1: 10,
            point2: 10
        },
        {
            name: '地牌',
            type1: 1,
            type2: 1,
            point1: 0,
            point2: 0
        },
        {
            name: '人牌',
            type1: 1,
            type2: 1,
            point1: 6,
            point2: 6
        },
        {
            name: '和牌',
            type1: 1,
            type2: 1,
            point1: 2,
            point2: 2
        },
        {
            name: '梅十',
            type1: 2,
            type2: 2,
            point1: 8,
            point2: 8
        },
        {
            name: '板凳',
            type1: 2,
            type2: 2,
            point1: 2,
            point2: 2
        },
        {
            name: '长三',
            type1: 2,
            type2: 2,
            point1: 4,
            point2: 4
        },
        {
            name: '虎头',
            type1: 2,
            type2: 2,
            point1: 9,
            point2: 9
        },
        {
            name: '苕十',
            type1: 1,
            type2: 1,
            point1: 8,
            point2: 8
        },
        {
            name: '猫猫',
            type1: 1,
            type2: 1,
            point1: 4,
            point2: 4
        },
        {
            name: '膏药',
            type1: 1,
            type2: 1,
            point1: 5,
            point2: 5
        },
        {
            name: '豹子',
            type1: 2,
            type2: 2,
            point1: 3,
            point2: 3
        },
        {
            name: '豹子',
            type1: 2,
            type2: 2,
            point1: 5,
            point2: 5
        },
        {
            name: '豹子',
            type1: 2,
            type2: 2,
            point1: 6,
            point2: 6
        },
        {
            name: '豹子',
            type1: 2,
            type2: 2,
            point1: 7,
            point2: 7
        },
        {
            name: '天王',
            type1: 1,
            type2: 2,
            point1: 10,
            point2: 7
        },
        {
            name: '地王',
            type1: 1,
            type2: 2,
            point1: 0,
            point2: 7
        },
        {
            name: '天杠',
            type1: 1,
            type2: 2,
            point1: 10,
            point2: 6
        },
        {
            name: '天杠',
            type1: 1,
            type2: 1,
            point1: 10,
            point2: 6
        },
        {
            name: '地杠',
            type1: 1,
            type2: 2,
            point1: 0,
            point2: 6
        },
        {
            name: '地杠',
            type1: 1,
            type2: 1,
            point1: 0,
            point2: 6
        },
        {
            name: '天关九',
            type1: 1,
            type2: 2,
            point1: 10,
            point2: 5
        },
        {
            name: '天关九',
            type1: 1,
            type2: 1,
            point1: 10,
            point2: 5
        },
        {
            name: '地关九',
            type1: 1,
            type2: 2,
            point1: 0,
            point2: 5
        },
        {
            name: '地关九',
            type1: 1,
            type2: 1,
            point1: 0,
            point2: 5
        },
        {
            name: '灯笼九',
            type1: 1,
            type2: 2,
            point1: 6,
            point2: 9
        },
        {
            name: '和五九',
            type1: 1,
            type2: 2,
            point1: 2,
            point2: 3
        },
        {
            name: '丁长九',
            type1: 1,
            type2: 2,
            point1: 1,
            point2: 4
        },
        {
            name: '梅十九',
            type1: 2,
            type2: 2,
            point1: 8,
            point2: 7
        },
        {
            name: '丁猫九',
            type1: 1,
            type2: 1,
            point1: 1,
            point2: 3
        },
        
        {
            name: '乌龙九',
            type1: 2,
            type2: 2,
            point1: 9,
            point2: 6
        },
        {
            name: '苕十九',
            type1: 1,
            type2: 2,
            point1: 8,
            point2: 7
        }
    ]
    return arr;
    }

    /**
     * 三花牌的表
     */ 
	sanHuaTable() {
		let arr = [{
				name: '三花特牌',
				type1: 2,
				type2: 1,
				type3: 2,
				point1: 8,
				point2: 8,
				point3: 9
			},
			{
				name: '三花特牌',
				type1: 2,
				type2: 1,
				type3: 3,
				point1: 4,
				point2: 4,
				point3: 1
			}
		]
		return arr;
    }
    
    /* 查找特殊牌(不包括三花牌) */
	searchCombination(poker1, poker2) {
		/* 红桃 h --- 0
		   黑桃 s --- 1
		   梅花 c --- 2
		   方块 d --- 3 */
		let ptype1 = parseInt(poker1 / 13);
		let ptype2 = parseInt(poker2 / 13);
		let point1 = poker1 % 13;
		let point2 = poker2 % 13;

		/* 1代表红色  2代表黑色 3代表大王*/
		if (ptype1 == 4) {
			ptype1 = 3;
		} else if (ptype1 == 0 || ptype1 == 3) {
			ptype1 = 1;
		} else {
			ptype1 = 2;
		}
		if (ptype2 == 4) {
			ptype2 = 3;
		} else if (ptype2 == 1 || ptype2 == 2) {
			ptype2 = 2;
		} else {
			ptype2 = 1;
		}

		let newArr = this.specialTable();
		// console.log(ptype1, ptype2)
		// console.log(point1, point2)
		let name = '';
		newArr.forEach(item => {
			if ((ptype1 == item.type1 && ptype2 == item.type2 && point1 == item.point1 && point2 == item.point2) ||
				(ptype1 == item.type2 && ptype2 == item.type1 && point1 == item.point2 && point2 == item.point1)) {
				// console.log(item.name)
				name = item.name;
			}
		})
		return name;
    }
    
    /* 查找特殊三花牌 */
	searchSanHua(poker1, poker2, poker3) {
		let ptype1 = parseInt(poker1 / 13);
		let ptype2 = parseInt(poker2 / 13);
		let ptype3 = parseInt(poker3 / 13);
		let point1 = poker1 % 13;
		let point2 = poker2 % 13;
		let point3 = poker3 % 13;

		/* 1代表红色  2代表黑色 3代表大王*/
		if (ptype1 == 4) {
			ptype1 = 3;
		} else if (ptype1 == 0 || ptype1 == 3) {
			ptype1 = 1;
		} else {
			ptype1 = 2;
		}
		if (ptype2 == 4) {
			ptype2 = 3;
		} else if (ptype2 == 1 || ptype2 == 2) {
			ptype2 = 2;
		} else {
			ptype2 = 1;
		}
		if (ptype3 == 4) {
			ptype3 = 3;
		} else if (ptype3 == 1 || ptype3 == 2) {
			ptype3 = 2;
		} else {
			ptype3 = 1;
		}
		let newArr = this.sanHuaTable();
		// console.log(ptype1, ptype2, ptype3)
		// console.log(point1, point2, point3)
		let name = null;
		newArr.forEach(item => {
			if ((ptype1 == item.type1 && ptype2 == item.type2 && ptype3 == item.type3 && point1 == item.point1 && point2 ==
					item.point2 && point3 == item.point3) ||
				(ptype1 == item.type1 && ptype2 == item.type3 && ptype3 == item.type2 && point1 == item.point1 && point2 == item
					.point3 && point3 == item.point2) ||
				(ptype1 == item.type2 && ptype2 == item.type1 && ptype3 == item.type3 && point1 == item.point2 && point2 == item
					.point1 && point3 == item.point3) ||
				(ptype1 == item.type2 && ptype2 == item.type3 && ptype3 == item.type1 && point1 == item.point2 && point2 == item
					.point3 && point3 == item.point1) ||
				(ptype1 == item.type3 && ptype3 == item.type2 && ptype2 == item.type1 && point1 == item.point3 && point3 == item
					.point2 && point2 == item.point1) ||
				(ptype1 == item.type3 && ptype2 == item.type2 && ptype3 == item.type1 && point1 == item.point3 && point2 == item
					.point2 && point3 == item.point1)) {
				// console.log(item.name)
				name = item.name;
			}
		})
		return name;
    }
    
    /** 
     * 特殊牌和点数
    */
	countPoint(poker1, poker2) {
		let name = this.searchCombination(poker1, poker2);
		let point1;
		if (parseInt(poker1 / 13) == 4) {
			point1 = 6
		} else
			point1 = (poker1 % 13 + 2)
		let point2;
		if (parseInt(poker2 / 13) == 4) {
			point2 = 6
		} else
			point2 = (poker2 % 13 + 2)
		let point = (point1 + point2) % 10;
		if (name == '') {
			name = point + '点';
		}
		return name;
	}
	/**
     * 三花牌
     * @param {*} poker1 
     * @param {*} poker2 
     * @param {*} poker3 
     */
	sanHuaPoker(poker1, poker2, poker3) {
		let name = this.searchSanHua(poker1, poker2,poker3);
		return name;
	}
}

export default new CountPoint();