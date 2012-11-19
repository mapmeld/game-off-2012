/**
 * Missile Command HTML5 JavaScript clone
 * 
 */

var mouseX, mouseY, lastpull;
function movem(e){
  mouseX = e.layerX;
  mouseY = e.layerY;
}

var metas = [
  {
    id: -1,
    title: "Speed up incoming missiles",
    body: "Accepting this request speeds up incoming missiles.",
    user: {
      avatar_url: "http://i.imgur.com/AE4dw.jpg"
    },
    outcome: "reject",
    run: function(){
      /* speed up incoming missiles */
    }
  },
  {
    id: -2,
    title: "Comic Sans",
    body: "Switch font of all sections to Comic Sans. lol",
    user: {
      avatar_url: "http://i.imgur.com/r4ooT.jpg"
    },
    outcome: "reject",
    run: function(){
      document.body.style.fontFamily = "'Comic Sans MS'";
    }
  },
  {
    id: -3,
    title: "User fires two missiles",
    body: "Add a second missile-launcher for the user to defend their base",
    user: {
      avatar_url: "http://i.imgur.com/dfMJ2.jpg"
    },
    outcome: "merge",
    run: function(){
      /* add second firing post */
    }
  },
  {
    id: -4,
    title: "Hide scoreboard",
    body: "If you think about it, life is not about who wins and who loses.",
    user: {
      avatar_url: "http://i.imgur.com/lceSZ.jpg"
    },
    outcome: "reject",
    run: function(){
      document.getElementById("scoreinfo").style.display = "none";
    }
  },
  {
    id: -5,
    title: "Restore scoreboard",
    body: "Brings back scoreboard in case another pull request has hidden it",
    user: {
      avatar_url: "http://i.imgur.com/dfMJ2.jpg"
    },
    outcome: "merge",
    run: function(){
      document.getElementById("scoreinfo").style.display = "block";
    }
  }

];

var pulls = metas;
var setGameMode = 0;
function gameMode(index, repo){
  document.getElementById("gameMode" + setGameMode).className = "";
  setGameMode = index;
  document.getElementById("gameMode" + index).className = "active";  
  if(repo == "meta"){
    pulls = metas;
  }
  else{
    $.getJSON("/" + repo + ".json", function(irlpulls){
      pulls = irlpulls;
    });
  }
}

var lastMissile = Math.floor(Math.random() * pulls.length);

var MC = MC || (function() {

    var engine = (function() {
        // Private variables protected by closure
        var FPS = 1000 / 30,
            _canvas = document.querySelector('canvas'),
            _ctx = _canvas.getContext('2d'),
            _width = _canvas.width || _canvas.style.width,
            _height = _canvas.height || _canvas.style.height,
            _gradient = _ctx.createLinearGradient(_width / 2, 0, _width / 2, _height),
            _level = 0,
            _new_missile = 10000,
            _missiles_created = 0,
            _missiles_destroyed = 0,
            _gameInterval,
            _entities = {
                'missiles': [],
                'targets': [],
                'rockets': [],
                'turret': null
            },
            _levels = [];

        /**
         * Start the game
         */
        function run() {
            startWave();
            Wave.init();
            _gameInterval = setInterval(_gameLoop, FPS);
        }
        
        function startWave() {
            _new_missile = 0;
            _missiles_created = 0;
            _missiles_destroyed = 0;
        }
        
        /**
         * Pause game
         */
        function _pause() {
            clearInterval(_gameInterval);
        }
        
        // Setup click/touch events
        _canvas.addEventListener('click', launchRocket, false);
        
        function launchRocket(event) {
            var target = {
                'x': event.clientX - this.offsetLeft,
                'y': event.clientY - this.offsetTop
            };
            
            _entities.rockets.push(new Rocket(
                target,
                {
                    'x': _entities.turret.pos.x + _entities.turret.width,
                    'y': _entities.turret.pos.y + (_entities.turret.height / 2)
                }
            ));
        }

        /**
         * Game loop
         */
        function _gameLoop() {
            // Wave end?
            if (_missiles_destroyed === Wave.getWave(_level).MissilesToDetroy) {
                _level += 1;
                startWave();
            }
        
            // Add missiles
            if (_new_missile < 0 &&
                _missiles_created < Wave.getWave(_level).MissilesToDetroy
            ) {
                lastMissile++;
                _entities.missiles.push(
                    new Missile(false, false, Wave.getWave(_level).MissileSpeed, pulls[lastMissile % pulls.length])
                );
                _missiles_created += 1;
                _new_missile += Wave.getWave(_level).TimeBetweenShots;
            }
            
            _new_missile -= FPS;
        
            // Clear the stage
            _ctx.fillStyle = _gradient;
            _ctx.fillRect(0, 0, _width, _height);

            // Move missiles & rockets
            _moveEntities(_entities.missiles);
        
          var anypulls = false; 
          var mindist = 10000;
          for(var e=0;e<_entities.missiles.length;e++){
            //console.log(_entities.missiles[e]);
            var distance = Math.pow(mouseX - _entities.missiles[e].pos.x, 2) + Math.pow(mouseY - _entities.missiles[e].pos.y, 2);
            //console.log(mindist);
            if(distance < 3000 && distance < mindist){
              anypulls = true;
              mindist = distance;
              if(lastpull != _entities.missiles[e].pullreq.title){
                //console.log(_entities.missiles[e].pullreq.title);
                lastpull = _entities.missiles[e].pullreq.title;
                document.getElementById("pullinfo").innerHTML = "<h4>" + _entities.missiles[e].pullreq.title + "</h4><img src='" + _entities.missiles[e].pullreq.user.avatar_url + "' style='float:left;width:60px;margin:10px;'/>" + _entities.missiles[e].pullreq.body + "</p>";
              }
            }
          }
          if(!anypulls){
            lastpull = null;
            document.getElementById("pullinfo").innerHTML = "";
          }
            
            var count = _entities.rockets.length;
            for (var i = 0; i < count; i++) {
                _entities.rockets[i].move();
            }

            // Draw entities to the canvas
            _drawEntities(_entities.targets);
            _drawEntities(_entities.missiles);
            _drawEntities(_entities.rockets);
            
            // Draw debug information
            debugInfo();
        }
        
        function debugInfo() {
            _ctx.fillStyle = 'rgb(255, 255, 255)';
            _ctx.fillText(
                'Missile launched = ' + _missiles_created + '/' + Wave.getWave(_level).MissilesToDetroy,
                10, 20
            );
            _ctx.fillText('Level = ' + _level, 10, 30);
        }

        /**
         * Draw each entity to the canvas
         *
         * @param {array} entities All the game entities.
         */
        function _drawEntities(entities) {
            for (var i = 0; i < entities.length; i++) {
                entities[i].draw(_ctx);
                
                // @TODO Move rockets out somewhere better
                if (entities[i].currentRadius <= 1 && !entities[i].expanding) {
                    entities.splice(i, 1);
                }
            }
        }

        /**
         * Move each entity to the canvas
         *
         * @param {array} entities all the game entities.
         */
        function _moveEntities(entities) {
            var count = entities.length;
            for (var i = 0; i < count; i++) {
                entities[i].move();
                
                // Check for collision
                // @TODO: Split the two hits into different sections
                if (hasHitRocketExplosion(entities[i]) || entities[i].hasHit()) {
                    // Remove the missile
                    entities.splice(i, 1);
                    count -= 1;
                    // Note the destroyed missile
                    _missiles_destroyed += 1;
                    // Reset missile timer to trigger creation of new missile
                    _new_missile = 0;
                }
                
                // Pause the game if there's no missiles
                if (_entities.missiles.length <= 0) {
                   // _pause();
                }
            }
        }
        
        /**
         * Check if a missile hit a rocket explosion.
         * 
         * @param {object} missile.
         * @return {bool} Boolean verdict.
         */
        function hasHitRocketExplosion(missile) {
            for (var i = 0; i < _entities.rockets.length; i++) {
                var x = _entities.rockets[i].pos.x - missile.pos.x,
                    y = _entities.rockets[i].pos.y - missile.pos.y;
                    
                var dist = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
                
                if (dist < _entities.rockets[i].currentRadius) {
                    //console.log("hit!");
                    _entities.rockets[i].pullreq = { outcome: missile.pullreq.outcome };
                    return true;
                }
            }
            return false;
        }

        /**
         * Load and setup a level
         *
         * @param {object} level Level data.
         */
        function loadLevel(level) {
            // Add game entities
            _entities.turret = new Turret(_width, _height);
            _entities.targets.push(_entities.turret);
            for (var i = 0; i < level.homes.length; i++) {
                _entities.targets.push(new Home(level.homes[i]));
            }

            // Set background gradient
            for (var i = 0; i < level.background.length; i++) {
                _gradient.addColorStop(
                    level.background[i].position,
                    level.background[i].colour
                );
            }

        }

        /**
         * Get random target location
         *
         * @return {object} Target's location.
         */
        function getRandomTarget() {
            var targetCount = _entities.targets.length;
            var rndIndex = Math.floor(targetCount * Math.random());
            var target = _entities.targets[rndIndex];

            return target;
        }
        
        
        /*
         * @return {float} Width of the canvas
         */
        function getWidth() {
            return _width;
        }

        /*
         * @return {float} Height of the canvas
         */
        function getHeight() {
            return _height;
        }

        // Expose public methods
        return {
            'loadLevel': loadLevel,
            'getWidth': getWidth,
            'getHeight': getHeight,
            'getRandomTarget': getRandomTarget,
            'launchRocket': launchRocket,
            'run': run
        };
    }());
    
    
    var Wave = (function() {
        var TOTAL_WAVE_NUM = 40,
            _waves = [];
        
        /**
         * Sets up the missile waves
         */
        function init() {
            document.getElementById("gamemodeselect").style.display = "none";
            document.getElementById("startbutton").style.display = "none";
            document.getElementById("gameinfo").style.display = "none";
            for (var i = 0; i < TOTAL_WAVE_NUM; i++) {
                _waves[i] = {
                    'MissilesToDetroy': 10 + i,
                    'MirvChance': 30 + i * 4,
                    'BombChance': i * 2,
                    'FlyerChance': 5,
                    'TimeBetweenShots': 6000 - i * 200,
                    'MissileSpeed': 1.9 + (i / 4)
                };
            }
        }
        
        /**
         * Get the wave
         */
        function getWave(level) {
            return _waves[level];
        }
        
        return {
            'init': init,
            'getWave': getWave
        };
    }());


    /**
     * Game entity class.
     */
    var Entity = function Entity() {};

    /**
    * Draw the game entity on the canvas
    *
    * @param {elm} ctx Canvas context.
    */
    Entity.prototype.draw = function(ctx) {
        ctx.fillStyle = this.colour;
        ctx.fillRect(
            this.pos.x,
            this.pos.y,
            this.width,
            this.height
        );
    };

    /**
     * Turret launcher class
     *
     * @param {object} pos Location position.
     */
    var Turret = function Turret(width, height) {
       this.width = 20;
       this.height = 20;
       this.pos = {
        'x': 50,
        'y': (height / 2) - (this.height / 2)
       };
       this.colour = 'rgb(255, 0, 0)';
    };
    Turret.prototype = new Entity();

    /**
     * Home entity class
     *
     * @param {object} pos Location position.
     */
    var Home = function Home(pos) {
       this.pos = pos;
       this.width = 20;
       this.height = 10;
       this.colour = 'rgb(0, 100, 250)';
    };
    Home.prototype = new Entity();

    /**
     * Missile class
     *
     * @param {object} origin Starting position.
     * @param {object} target Target destination position.
     */
    var Missile = function(origin, target, speed, pullreq) {
        this.pos = {};
        this.pullreq = pullreq;
        this.origin = origin || {
            'x': 800,
            'y': engine.getHeight() * Math.random()
        };
        
        this.target = target || engine.getRandomTarget();
        
        // Calculate angle
        var x = this.target.pos.x - this.origin.x;
        var y =  this.origin.y - this.target.pos.y;
        this.angle = Math.atan(y / x);

        this.colour = 'rgb(0, 255, 0)';
        this.speed = speed / 1.7;
        this.distance = 0;
    };

    Missile.prototype.draw = function(ctx) {
        ctx.strokeStyle = this.colour;
        ctx.beginPath();
        ctx.moveTo(this.origin.x, this.origin.y);
        ctx.lineTo(
            this.pos.x,
            this.pos.y
        );
        ctx.closePath();
        ctx.stroke();
    };

    Missile.prototype.move = function() {
        this.distance += this.speed;
        this.pos.x = this.origin.x - Math.cos(this.angle) * this.distance;
        this.pos.y = Math.sin(this.angle) * this.distance + this.origin.y;
    };
    
    Missile.prototype.hasHit = function() {
        if (this.pos.x <= this.target.pos.x + this.target.width) {
            if(this.pullreq.outcome == "merge"){
              document.getElementById("goodpoints").innerHTML = document.getElementById("goodpoints").innerHTML * 1 + 1;
              document.getElementById("totalpoints").innerHTML = document.getElementById("totalpoints").innerHTML * 1 + 1;
            }
            else if(this.pullreq.outcome == "reject"){
              document.getElementById("badpoints").innerHTML = document.getElementById("badpoints").innerHTML * 1 + 1;
              document.getElementById("totalpoints").innerHTML = document.getElementById("totalpoints").innerHTML * 1 - 1;
            }
            if(this.pullreq.run){
              (this.pullreq.run)();
            }
            return true;
        } else {
            return false;
        }
    };
    
    var Rocket = function Rocket(target, origin) {
        this.fullRadius = 30;
        this.currentRadius = 0;
        this.expanding = true;
        this.explosionSpeed = 2;
        this.exploded = false;
        this.speed = 10;
        this.distance = 0;
        
        this.target = target;
        
        // @TODO: Weird turret reference issue causing red turrets to move
        this.origin = origin;
        this.pos = {x: origin.x, y:origin.y};
        
        // Calculate angle
        var x = this.target.x - this.origin.x;
        var y = this.origin.y - this.target.y;
        this.angle = Math.atan(y / x);
        
    };
    
    /* Some comment.
     *
     */
    Rocket.prototype.move = function() {
        if (this.exploded) {
            return;
        }
        
        this.distance -= this.speed;
        
        this.pos.x = this.origin.x - Math.cos(this.angle) * this.distance;
        this.pos.y = Math.sin(this.angle) * this.distance + this.origin.y;
        
        if (this.pos.x > this.target.x) {
            this.exploded = true;
            this.pullreq = { outcome: false };
        }
    };
    
    Rocket.prototype.draw = function(ctx) {
        if (this.exploded) {
            ctx.fillStyle = 'rgb(255, 255, 255)';
            if (this.expanding) {
                this.currentRadius += this.explosionSpeed;
                
                if (this.currentRadius >= this.fullRadius) {
                    this.expanding = false;
                }
            } else {
                this.currentRadius -= this.explosionSpeed;
            }
            if(this.pullreq && this.pullreq.outcome == "merge"){
              ctx.fillStyle = 'rgb(255, 0, 0)';
              if(!this.pullreq.done){
                document.getElementById("badpoints").innerHTML = document.getElementById("badpoints").innerHTML * 1 + 1;
                document.getElementById("totalpoints").innerHTML = document.getElementById("totalpoints").innerHTML * 1 - 1;
                this.pullreq.done = true;
              }
            }
            else{
              if(this.pullreq && this.pullreq.outcome == "reject"){
                if(!this.pullreq.done){
                  document.getElementById("goodpoints").innerHTML = document.getElementById("goodpoints").innerHTML * 1 + 1;
                  document.getElementById("totalpoints").innerHTML = document.getElementById("totalpoints").innerHTML * 1 + 1;
                  this.pullreq.done = true;
                }
              }
              ctx.fillStyle = 'rgb(255, 255, 255)';
            }
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, this.currentRadius, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = 'rgb(255, 255, 255)';
        } else {
            ctx.strokeStyle = 'rgb(255, 255, 255)';
            ctx.beginPath();
            ctx.moveTo(this.origin.x, this.origin.y);
            ctx.lineTo(
                this.pos.x,
                this.pos.y
            );
            ctx.closePath();
            ctx.stroke();
        }        
    };


    /**
     * Levels
     */
    var levels = [];
    levels[0] = {
        'homes': [
            { 'x': 50, 'y': 55 },
            { 'x': 45, 'y': 105 },
            { 'x': 55, 'y': 158 },
            { 'x': 50, 'y': 270 },
            { 'x': 55, 'y': 325 },
            { 'x': 45, 'y': 390 }
        ],
        'background': [
            {'colour': 'rgb(0, 5, 20)', 'position': 0},
            {'colour': 'rgb(0, 30, 70)', 'position': 0.7},
            {'colour': 'rgb(0, 60, 120)', 'position': 1}
        ],
        'rocketCount': 5,
        'attackRate': 1,
        'timer': 30
    };

    function init() {
        engine.loadLevel(levels[0]);
        engine.run();
    }

    return {
        'init': init
    };

}());