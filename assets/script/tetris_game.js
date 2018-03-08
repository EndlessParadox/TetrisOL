/**
 * Created by renjie on 2015/7/3.
 */


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

    // *) 游戏场景的构造
    function GameScene() {

        this.tetrisUnit = new TetrisUnit();
        this.strategy = new AIStrategy();
        this.moves = [];

        this.gameState = GameState.STATE_INIT;

        this.currentShape = null;
        this.nextShape = null;

        this.timestamp = new Date().getTime();

        this.score = 0;

    };

    GameScene.prototype.initGame = function() {
        this.tetrisUnit.reset();
    };

    GameScene.prototype.startGame = function() {
        this.gameState = GameState.STATE_STEP;

        this.currentShape = createShape();
        this.nextShape = createShape();

        this.score = 0;

        this.tetrisUnit.reset();
        this.timestamp = new Date().getTime();

        var moveAns = this.strategy.makeBestDecision(this.tetrisUnit, this.currentShape);
        this.moves = moveAns.action_moves;

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
            default: ;
        }
    };

    GameScene.prototype.updateGame = function() {
        // *) 状态判断
        if ( this.gameState === GameState.STATE_INIT ) {
            return;
        }

        var now = new Date().getTime();
        if ( now - this.timestamp > 500 ) {
            if ( this.currentShape != null ) {
                if ( this.moves.length > 0 ) {
                    this.currentShape.x = this.moves[0].x;
                    this.currentShape.y = this.moves[0].y;
                    this.currentShape.idx = this.moves[0].idx;
                    this.moves.splice(0, 1);
                } else if ( this.detect(ActionType.ACTION_DOWN) ) {
                    this.currentShape.doAction(ActionType.ACTION_DOWN);
                } else {
                    var tx = this.currentShape.x;
                    var ty = this.currentShape.y;
                    var shapeArr = this.currentShape.shapes[this.currentShape.idx];

                    var eliminatedLines = this.tetrisUnit.touchDown(tx, ty, shapeArr);
                    this.updateScore(eliminatedLines);

                    this.currentShape = this.nextShape;
                    this.nextShape = createShape();

                    // *) 判断游戏是否结束
                    if ( this.detectGameOver() ) {
                        alert("Game Over\n you had " + this.score + " points");
                        this.initGame();
                    } else {
                        // *)
                        var moveAns = this.strategy.makeBestDecision(this.tetrisUnit, this.currentShape);
                        this.moves = moveAns.action_moves;
                    }

                }
            }
            this.timestamp = now;
        } else {
            if ( this.moves.length > 0 ) {
                if ( this.moves[0].x === this.currentShape.x
                    && this.moves[0].y === this.currentShape.y + 1
                    && this.moves[0].idx === this.currentShape.idx ) {
                    this.currentShape.y = this.moves[0].y;
                    this.moves.splice(0, 1);
                }
            }
        }
    };

    GameScene.prototype.renderGame = function(ctx) {

        ctx.fillColor = cc.hexToColor('#ffffff');
        ctx.fillRect(0, 0, 800, 640);

        ctx.strokeColor = cc.hexToColor('#ff0000');
        ctx.rect(0, 0, 20 * this.col, 20 * this.row);
        ctx.stroke();

        if ( this.gameState === GameScene.STATE_INIT ) {
            return;
        }

        this.tetrisUnit.render(ctx);

        if ( this.currentShape != null ) {
            this.currentShape.render(ctx);
        }

        // *) 绘制傍边的信息条
        this.drawInfo(ctx);

    };

    GameScene.prototype.drawInfo = function(ctx) {

        if ( this.gameState === GameState.STATE_INIT ) {
            return;
        }

        ctx.strokeColor = cc.hexToColor('#0000ff');
        ctx.stroke(210, 0, 100, 200);

        ctx.font = "16px Courier New";
        //设置字体填充颜色
        ctx.fillColor = "blue";
        //从坐标点(50,50)开始绘制文字

        if ( this.nextShape !== null ) {
            //ctx.fillText("Next:", 220, 18);
            this.nextShape.display(ctx, 220, 36);
        }

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



