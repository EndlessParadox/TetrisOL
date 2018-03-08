/**
 * Created by renjie on 2015/7/3.
 */


(function(window){

    // 动作枚举
    var ActionType = {
        ACTION_LEFT:1,
        ACTION_RIGHT:2,
        ACTION_CHANGE:3,
        ACTION_DOWN:4
    };

    function Shape(x, y, idx, color, shapes) {
        this.x = x;
        this.y = y;
        this.idx = idx;
        this.color = color;
        this.shapes = shapes;
    };

    Shape.prototype.doAction = function(cmd) {
        switch(cmd) {
            case ActionType.ACTION_LEFT:
                this.x--;
                break;
            case ActionType.ACTION_RIGHT:
                this.x++;
                break;
            case ActionType.ACTION_CHANGE:
                this.idx = (this.idx + 1) % 4;
                break;
            case ActionType.ACTION_DOWN:
                this.y++;
                break;
        }
    };

    Shape.prototype.render = function(ctx) {
        var shapesArr = this.shapes[this.idx];
        ctx.fillColor = this.color;
        for ( var i = 0; i < 4; i++ ) {
            for ( var j = 0; j < 4; j++ ) {
                if ( shapesArr[i][j] == 1 ) {
                    ctx.fillRect((this.x + j) * 20, (this.y + i) * 20, 20, 20);

                    ctx.strokeColor = cc.color(0, 255, 0);
                    ctx.stroke();
                }
            }
        }
    };

    Shape.prototype.display = function(ctx, offsetx, offsety) {
        var shapesArr = this.shapes[this.idx];
        ctx.fillColor = this.color;
        for ( var i = 0; i < 4; i++ ) {
            for ( var j = 0; j < 4; j++ ) {
                if ( shapesArr[i][j] == 1 ) {
                    ctx.fillRect(offsetx + j * 20, offsety + i * 20, 20, 20);

                    ctx.strokeColor = cc.color(0, 255, 0);
                    ctx.stroke();
                }
            }
        }
    };

    LShape.SHAPES = [
        [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [1, 1, 1, 0],
            [1, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 1, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0]
        ]
    ];

    function LShape(x, y, idx, color) {
        Shape.call(this, x, y, idx, color, LShape.SHAPES);
    };
    // class LShape extend Shape
    LShape.prototype = new Shape();

    JShape.SHAPES =  [
        [
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 1, 0, 0],
            [0, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 1, 1, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [1, 1, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    ];

    function JShape(x, y, idx, color) {
        Shape.call(this, x, y, idx, color, JShape.SHAPES);
    };
    JShape.prototype = new Shape();

    IShape.SHAPES = [
        [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0]
        ],
        [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0]
        ]
    ];

    function IShape(x, y, idx, color) {
        Shape.call(this, x, y, idx, color, IShape.SHAPES);
    };
    // class IShape extend Shape
    IShape.prototype = new Shape();

    OShape.SHAPES = [
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ]
    ];

    function OShape(x, y, idx, color) {
        Shape.call(this, x, y, idx, color, OShape.SHAPES);
    };
    // class CShape extend Shape
    OShape.prototype = new Shape();


    TShape.SHAPES = [
        [
            [0, 0, 0, 0],
            [0, 1, 0, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 1, 0, 0],
            [1, 1, 0, 0],
            [0, 1, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 1, 1, 0],
            [0, 1, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 0, 0]
        ]
    ];

    function TShape(x, y, idx, color) {
        Shape.call(this, x, y, idx, color, TShape.SHAPES);
    };
    // class CShape extend Shape
    TShape.prototype = new Shape();


    SShape.SHAPES = [
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [1, 0, 0, 0],
            [1, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [1, 0, 0, 0],
            [1, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]
        ]
    ];
    function SShape(x, y, idx, color) {
        Shape.call(this, x, y, idx, color, SShape.SHAPES);
    };
    // class CShape extend Shape
    SShape.prototype = new Shape();


    ZShape.SHAPES = [
        [
            [0, 0, 0, 0],
            [1, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 1, 0],
            [0, 1, 1, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [1, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 1, 0],
            [0, 1, 1, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]
        ]
    ];
    function ZShape(x, y, idx, color) {
        Shape.call(this, x, y, idx, color, ZShape.SHAPES);
    };
    // class CShape extend Shape
    ZShape.prototype = new Shape();

    // ==============================================================
    function TetrisUnit() {
        this.row = 20;
        this.col = 10;
        this.boards = new Array(this.row);
        for ( var i = 0; i < this.row; i++ ) {
            this.boards[i] = new Array(this.col);
            for ( var j = 0; j < this.col; j++ ) {
                this.boards[i][j] = 0;
            }
        }

        this.bkBoards = new Array(this.row);
        for ( var i = 0; i < this.row; i++ ) {
            this.bkBoards[i] = new Array(this.col);
            for ( var j = 0; j < this.col; j++ ) {
                this.bkBoards[i][j] = 0;
            }
        }
    }

    TetrisUnit.prototype.reset = function() {
        for ( var i = 0; i < this.row; i++ ) {
            for ( var j = 0; j < this.col; j++ ) {
                this.boards[i][j] = 0;
            }
        }
    }

    TetrisUnit.prototype.checkAvailable = function(tx, ty, shapeArr) {
        for ( var i = 0; i < 4; i++ ) {
            for ( var j = 0; j < 4; j++ ) {
                if (shapeArr[i][j] == 1) {
                    if (tx + j < 0 || tx + j >= this.col || ty + i < 0 || ty + i >= this.row ) {
                        return false;
                    }
                    if ( this.boards[ty + i][tx + j] == 1 ) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    TetrisUnit.prototype.applyAction2Data = function(tx, ty, shapeArr) {
        var i, j;
        for ( i = 0; i < this.row; i++ ) {
            for ( j = 0; j < this.col; j++ ) {
                this.bkBoards[i][j] = this.boards[i][j];
            }
        }

        for ( i = 0; i < 4; i++ ) {
            for (  j = 0; j < 4; j++ ) {
                if ( shapeArr[i][j] === 1 ) {
                    if (tx + j < 0 || tx + j >= this.col || ty + i < 0 || ty + i >= this.row) {
                        continue;
                    }
                    this.bkBoards[ty + i][tx + j] = 1;
                }
            }
        }
        return this.bkBoards;
    }

    TetrisUnit.prototype.render = function(ctx) {

        ctx.strokeColor = cc.color(125, 0, 0);
        ctx.rect(0, 0, 20 * this.col, 20 * this.row);
        ctx.stroke();

        for ( var i = 0; i < this.row; i++ ) {
            for (  var j = 0; j < this.col; j++ ) {
                if ( this.boards[i][j] != 0 ) {
                    ctx.fillColor = cc.color(0, 125, 0);
                    ctx.fillRect(j * 20, i * 20, 20, 20);

                    ctx.strokeColor = cc.color(0, 255, 0);
                    ctx.stroke();
                }
            }
        }
    }

    TetrisUnit.prototype.applyShape = function(tx, ty, shapeArr) {
        var i, j;
        for ( i = 0; i < 4; i++ ) {
            for (  j = 0; j < 4; j++ ) {
                if ( shapeArr[i][j] === 1 ) {
                    if (tx + j < 0 || tx + j >= this.col || ty + i < 0 || ty + i >= this.row) {
                        continue;
                    }
                    this.boards[ty + i][tx + j] = 1;
                }
            }
        }
    }

    TetrisUnit.prototype.touchDown = function(tx, ty, shapeArr) {
        // *) 方块落地
        for ( var i =0; i < 4; i++ ) {
            for ( var j = 0; j < 4; j++ ) {
                if ( shapeArr[i][j] == 1 ) {
                    if ( tx + j < 0 || tx + j >= this.col || ty + i < 0 || ty + i >= this.row ) {
                        continue;
                    }
                    this.boards[ty + i][tx + j] = 1;
                }
            }
        }

        // *) 消除成行的方块
        var eliminateNum = 0;
        var eliminateArr = new Array(this.row);
        for ( var i = this.row - 1; i >= 0; i-- ) {
            var gridNum = 0;
            for ( var j = 0; j < this.col; j++ ) {
                if ( this.boards[i][j] == 0 ) {
                    break;
                }
                gridNum++;
            }
            // *) 满足消掉的条件
            if ( gridNum === this.col ) {
                eliminateArr[i] = true;
                eliminateNum++;
            } else {
                eliminateArr[i] = false;
            }
        }

        if ( eliminateNum > 0 ) {
            var nextIdx = this.row - 1;
            for ( var i = this.row - 1; i >= 0; i-- ) {
                while ( nextIdx >= 0 && eliminateArr[nextIdx] === true ) {
                    nextIdx--;
                }

                if ( i === nextIdx ) {
                    nextIdx--;
                    continue;
                } else {
                    if ( nextIdx >= 0 ) {
                        for ( var j = 0; j < this.col; j++ ) {
                            this.boards[i][j] = this.boards[nextIdx][j];
                        }
                        nextIdx--;
                    } else {
                        for ( var j = 0; j < this.col; j++ ) {
                            this.boards[i][j] = 0;
                        }
                    }
                }
            }
        }

        return eliminateNum;

    }

    TetrisUnit.prototype.isOverlay = function(tx, ty, shapeArr) {
        for ( var i =0; i < 4; i++ ) {
            for ( var j = 0; j < 4; j++ ) {
                if ( shapeArr[i][j] == 1 ) {
                    if ( tx + j < 0 || tx + j >= this.col || ty + i < 0 || ty + i >= this.row ) {
                        continue;
                    }
                    if ( this.boards[ty + i][tx + j] === 1 ) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    // export
    window.ActionType = ActionType;
    window.Shape = Shape;
    window.LShape = LShape;
    window.JShape = JShape;
    window.IShape = IShape;
    window.OShape = OShape;
    window.TShape = TShape;
    window.SShape = SShape;
    window.ZShape = ZShape;
    window.TetrisUnit = TetrisUnit;

})(window);

