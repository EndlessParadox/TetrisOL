
(function(window){
    // 状态描述
    var GameState = {
        STATE_INIT:0,
        STATE_STEP:1,
        STATE_RUN:2,
        STATE_OVER:3
    };

    function createShape() {
        var shapeTypes = [LShape, JShape, IShape, OShape, TShape, SShape, ZShape];
        var colorTypes = [cc.color(255,0,0), cc.color(0,255,0), cc.color(0,0,255), cc.color(255,100,255)]

        var shapeIdx = Math.floor(Math.random() * 100) % shapeTypes.length;
        var shapePos = Math.floor(Math.random() * 100) % 4;
        var colorIdx = Math.floor(Math.random() * 100) % colorTypes.length;

        return new shapeTypes[shapeIdx](4, 0, shapePos, colorTypes[colorIdx]);
    }

    function createShapeFromOrigin(shape)
    {
        var shapeTypes = [LShape, JShape, IShape, OShape, TShape, SShape, ZShape];
        return new shapeTypes[shape.shapeArrIdx](4,0,shape.idx,shape.color,shape.atlas);
    }

    // *) 游戏场景的构造
    function GameScene(shapeList ,atlas) {

        this.tetrisUnit = new TetrisUnit(atlas);
        this.strategy = new AIStrategy();
        this.moves = [];

        this.gameState = GameState.STATE_INIT;

        this.currentShape = null;
        this.nextShape = null;

        this.timestamp = new Date().getTime();

        this.score = 0;
        this.shapeList = [];

        this.originList = shapeList;
        for(var i = 0 ; i < this.originList.length; i ++) {
            this.shapeList.push(createShapeFromOrigin(this.originList[i]));
        }

        this.index = 0;

        this.attack = false;

        this.attackLine = 0;

        this.isGameOver = false;

        this.level = 1;

        this.startTime = new Date().getTime();
    };

    GameScene.prototype.initGame = function() {
        this.tetrisUnit.reset();
        this.score = 0;
    };

    GameScene.prototype.startGame = function(isAI) {
        this.gameState = GameState.STATE_STEP;

        //this.currentShape = createShape();
        //this.nextShape = createShape();
        if(this.shapeList.length > 2)
        {
            this.currentShape = createShapeFromOrigin(this.shapeList[this.index]);
            this.nextShape = createShapeFromOrigin(this.shapeList[this.index + 1]);
        }
        else {
            return;
        }

        this.fastDown = false;

        this.score = 0;

        this.tetrisUnit.reset();
        this.timestamp = new Date().getTime();

        if(isAI) {
            var moveAns = this.strategy.makeBestDecision(this.tetrisUnit, this.currentShape);
            this.moves = moveAns.action_moves;
        }

        this.isAI = isAI;

    }

    GameScene.prototype.updateScore = function(line) {
        switch(line) {
            case 1:
                this.score += 100;
                break;
            case 2:
                this.score += 300;
                break;
            case 3:
                this.score += 500;
                break;
            case 4:
                this.score += 800;
                break;
            default:
        }
    };

    GameScene.prototype.updateGame = function(isAI,moves,lockDown,boomEff,board) {
        // *) 状态判断
        if ( this.gameState === GameState.STATE_INIT ) {
            return;
        }

        if(!isAI)
        {
            this.moves = moves;
        }

        var now = new Date().getTime();
        if(now - this.startTime > 60000)
        {
            this.level ++;
            if(this.level > 3)
            {
                this.level = 3;
            }
            this.startTime = now;
        }

        if ( now - this.timestamp > (300 - (this.level - 1)* 30) ) {
            if ( this.currentShape != null ) {
                if ( this.moves.length > 0 ) {
                    if(!isAI)
                    {
                        if(!this.fastDown) {
                            if (this.tetrisUnit.checkAvailable(this.currentShape.x + this.moves[0].x, this.currentShape.y + this.moves[0].y, this.currentShape.shapes[this.currentShape.idx + this.moves[0].idx < 4 ? this.currentShape.idx + this.moves[0].idx : 0])) {
                                this.currentShape.x += this.moves[0].x;
                                this.currentShape.y += this.moves[0].y;
                                this.currentShape.idx = this.currentShape.idx + this.moves[0].idx < 4 ? this.currentShape.idx + this.moves[0].idx : 0
                            }
                        }
                        this.moves.splice(0, 1);
                    }
                    else {
                        if (this.tetrisUnit.checkAvailable(this.moves[0].x,this.moves[0].y,this.currentShape.shapes[this.moves[0].idx])) {
                            this.currentShape.x = this.moves[0].x;
                            this.currentShape.y = this.moves[0].y;
                            this.currentShape.idx = this.moves[0].idx;
                            this.moves.splice(0, 1);
                        }
                    }
                    //if(this.detect(ActionType.ACTION_DOWN))
                    //    this.currentShape.doAction(ActionType.ACTION_DOWN);
                }
                else if ( this.detect(ActionType.ACTION_DOWN) ) {
                    this.currentShape.doAction(ActionType.ACTION_DOWN);
                } else {
                    var tx = this.currentShape.x;
                    var ty = this.currentShape.y;
                    var shapeArr = this.currentShape.shapes[this.currentShape.idx];
                    var color = this.currentShape.color;

                    var eliminatedLines = this.tetrisUnit.touchDown(tx, ty, shapeArr,color,boomEff,board,isAI);
                    this.updateScore(eliminatedLines);
                    if(eliminatedLines >= 2) {
                        this.attack = true;
                        this.attackLine = eliminatedLines - 1;
                        //this.tetrisUnit.underAttack(eliminatedLines);
                        //this.node.dispatchEvent( new cc.Event.EventCustom('foobar', true) );
                    }

                    this.currentShape = createShapeFromOrigin(this.shapeList[this.index + 1]);
                    this.index ++;
                    //this.nextShape = createShape();
                    this.fastDown = false;
                    if(this.index >= this.shapeList.length - 1)
                    {
                        this.originList.reverse();
                        this.shapeList = [];
                        for(var i = 0 ; i < this.originList.length; i ++) {
                            this.shapeList.push(createShapeFromOrigin(this.originList[i]));
                        }
                        this.index = -1;
                    }
                    this.nextShape = createShapeFromOrigin(this.shapeList[this.index + 1]);

                    if(this.delayAttack)
                    {
                        this.delayAttack = false;
                        this.tetrisUnit.underAttack(this.delayAttackLine,this.delayAttackAtk);
                        if(this.isAI) {
                            var moveAns = this.strategy.makeBestDecision(this.tetrisUnit, this.currentShape);
                            this.moves = moveAns.action_moves;
                        }
                    }

                    // *) 判断游戏是否结束
                    if ( this.detectGameOver() ) {
                        this.isGameOver = true;
                        //alert("Game Over\n you had " + this.score + " points");
                        //this.initGame();
                    } else {
                        // *)
                        if(isAI) {
                            var moveAns = this.strategy.makeBestDecision(this.tetrisUnit, this.currentShape);
                            this.moves = moveAns.action_moves;
                        }
                    }

                }
            }
            this.timestamp = now;
        } else {
            if ( this.moves.length > 0 ) {
                if(!isAI)
                {
                    if(this.moves[0].y == 1)
                    {
                        if(this.tetrisUnit.checkAvailable(this.currentShape.x + this.moves[0].x, this.currentShape.y + this.moves[0].y,this.currentShape.shapes[this.currentShape.idx + this.moves[0].idx < 4 ? this.currentShape.idx + this.moves[0].idx : 0])) {
                            this.fastDown = lockDown;
                            this.currentShape.y++;
                        }
                        this.moves.splice(0, 1);
                    }
                }
                else {
                    //return;
                    if(this.moves[0].y > this.tetrisUnit.row - (this.level * 5)) {
                        if (this.tetrisUnit.checkAvailable(this.moves[0].x,this.moves[0].y,this.currentShape.shapes[this.moves[0].idx])) {
                            if (this.moves[0].x === this.currentShape.x
                                && this.moves[0].y === this.currentShape.y + 1
                                && this.moves[0].idx === this.currentShape.idx) {
                                this.currentShape.y = this.moves[0].y;
                            }
                        }
                        this.moves.splice(0, 1);
                    }
                }
            }
            else {
                if(this.fastDown)
                {
                    if(this.tetrisUnit.checkAvailable(this.currentShape.x, this.currentShape.y + 1,this.currentShape.shapes[this.currentShape.idx])) {
                        this.currentShape.y++;
                    }
                }
            }
        }
    };


    GameScene.prototype.renderGame = function(ctx,boardsArr,showBoardsArr,score) {

        //ctx.fillColor = cc.hexToColor('#ffffff');
        //ctx.fillRect(0, 0, 800, 640);

        if ( this.gameState === GameScene.STATE_INIT ) {
            return;
        }

        this.tetrisUnit.render(ctx,boardsArr);

        if ( this.currentShape != null ) {
            this.currentShape.render(ctx,boardsArr);
        }

        // *) 绘制傍边的信息条
        this.drawInfo(ctx,showBoardsArr,score);

    };

    GameScene.prototype.drawInfo = function(ctx,showBoardsArr,score) {

        if ( this.gameState === GameState.STATE_INIT ) {
            return;
        }

        //ctx.strokeColor = cc.hexToColor('#0000ff');
        //ctx.stroke(210, 0, 100, 200);

        ctx.font = "16px Courier New";
        //设置字体填充颜色
        ctx.fillColor = "blue";
        //从坐标点(50,50)开始绘制文字

        if ( this.nextShape !== null ) {
            //ctx.fillText("Next:", 220, 18);
            this.nextShape.display(showBoardsArr, 220, 36);
        }

        score.string = this.level;
        //score.string = "Score: " + this.score;
        //ctx.fillText("Score: ", 220, 138);
        //ctx.fillText("  "  + this.score, 220, 156);

    };

    // 测试是否可以
    GameScene.prototype.detect = function(cmd) {

        var tidx = this.currentShape.idx;
        var tx = this.currentShape.x;
        var ty = this.currentShape.y;

        switch(cmd) {
            case ActionType.ACTION_LEFT:
                tx = this.currentShape.x - 1;
                break;
            case ActionType.ACTION_RIGHT:
                tx = this.currentShape.x + 1;
                break;
            case ActionType.ACTION_CHANGE:
                tidx = (this.currentShape.idx - 1) % 4;
                break;
            case ActionType.ACTION_DOWN:
                ty = this.currentShape.y + 1;
                break;
        }
        var shapeArr = this.currentShape.shapes[tidx];

        return this.tetrisUnit.checkAvailable(tx, ty, shapeArr);

    };
    
    GameScene.prototype.detectGameOver = function() {
        var shapeArr = this.currentShape.shapes[this.currentShape.idx];
        return this.tetrisUnit.isOverlay(this.currentShape.x, this.currentShape.y, shapeArr);
    };

    GameScene.prototype.underAttack = function(line,atk){
        this.delayAttack = true;
        this.delayAttackLine = line;
        this.delayAttackAtk = atk;
    }

    //var canvas = document.getElementById("canvas");
    //var ctx = canvas.getContext("2d");

    //var gameScene = new GameScene();
    //gameScene.initGame();
    //gameScene.startGame();
    //
    //var fps = 60 || 0;
    //setInterval(gameLogic, fps);
    //
    //function gameLogic() {
    //    gameScene.updateGame();
    //    gameScene.renderGame(ctx);
    //}
    window.GameScene = GameScene;

})(window);



