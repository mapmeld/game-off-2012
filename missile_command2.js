/**
 * Missile Commnad HTML5 JavaScript clone
 * 
 * @author  Andrew Mason
 * @contact andrew@coderonfire.com
 * 
 */
 
var mouseX, mouseY, lastpull;
function movem(e){
  mouseX = e.layerX;
  mouseY = e.layerY;
}

var pulls = [
  {
    id: 4237,
    title: "Changed CSS rules for outlines in active/focus states",
    body: "I have modified mixins.less to have the tab-focus() function remove dotted borders, not set them as a default style. Then I modified reset.less to apply that function with active, focus, hover, and -moz-inner-focus pseudo classes on anchor, button, and input[type=\"button\"] elements.",
    user: {
      avatar_url: "https://secure.gravatar.com/avatar/23b6b7be99b46e7df8be186823e5d95f?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png"
    },
    outcome: "reject"
  },
  {
    id: 4238,
    title: "#4114 Fix for unprefixed directional linear-gradients",
    body: "Convert angles for unprefixed linear-gradients based on the Candidate Recommendation. Uses a Javascript expression to convert the angles. Fixes Issue #4114",
    user: {
      avatar_url: "https://secure.gravatar.com/avatar/8a76c8ff85fac690655ce7981aa741db?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png"
    },
    outcome: "reject"
  },
  {
    id: 4240,
    title: "Change click event in button for prevent form post",
    body: "prevent form post",
    user: {
      avatar_url: "https://secure.gravatar.com/avatar/5eb05a2a1b383d4a8dfd00298d967c39?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png"
    },
    outcome: "reject"
  },
  {
    id: 4241,
    title: "Use ref instead of label when checking branches in issue-guidelines",
    body: "The label field of the github API contains user:branch eg, fat:my-cool-feature. It is better to haunt using the ref field which will only contain the branch name.",
    user: {
      avatar_url: "https://secure.gravatar.com/avatar/5211ea711bb06482530172f77732f61a?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png"
    },
    outcome: "merge"
  },
  {
    id: 4245,
    title: "move the 'timeout' to the 'self' from the 'this'",
    body: "The bug will appear if the mouse enters into other elements from the\nformer elements when the hiding-delay is not the 0s. At the same time,\nthe 'tooltip' of the former elements won't hide. That's why I move the\n'timeout' to the 'self' from the 'this'.",
    user: {
      avatar_url: "https://secure.gravatar.com/avatar/f9346ef401aa00a8f4cbb9da82ba6e36?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png"
    },
    outcome: "reject"
  },
  {
    id: 4247,
    title: "Update docs/javascript.html",
    body: "Amended all mentions of 'Javascript' and 'javascript' in the body text to the correct 'JavaScript'.",
    user: {
      avatar_url: "https://secure.gravatar.com/avatar/28500dad5b09e308302db7389bd2ad93?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png"
    },
    outcome: "reject"
  },
  {
    id: 4257,
    title: "close #3531 added focus handling and removed the badly announced \"times\"...",
    body: "... close button from screenreaders",
    user: {
      avatar_url: "https://secure.gravatar.com/avatar/ac20c97a1a7c321444013be47f1fcee6?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png"
    },
    outcome: "merge"
  },
  {
    id: 4259,
    title: "Aria",
    body: "added roll to tooltip",
    user: {
      avatar_url: "https://secure.gravatar.com/avatar/4c9d4aea3902debf993433deaa42b7dc?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png"
    },
    outcome: "reject"
  },
  {
    id: 4267,
    title: "Add an example of a nav-list with icons like there is in the 2.0 docs",
    body: "Missing this documentation showing that it's possible to use icon* classes in the nav-lists.",
    user: {
      avatar_url: "https://secure.gravatar.com/avatar/5565384270c6785221192ea43dc44752?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png"
    },
    outcome: "reject"
  },
  {
    id: 4268,
    title: "Allow passing data arguments to modal (fixes #531)",
    body: "Implements @bronson's suggestion in #531, all credit to him.",
    user: {
      avatar_url: "https://secure.gravatar.com/avatar/d178a6201be696c466c41c355c671707?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png"
    },
    outcome: "reject"
  },
  {
    id: 4270,
    title: "Update docs/javascript.html",
    body: "Amended all mentions of 'Javascript' and 'javascript' in the body text to the correct 'JavaScript'.",
    user: {
      avatar_url: "https://secure.gravatar.com/avatar/28500dad5b09e308302db7389bd2ad93?s=140&d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png"
    },
    outcome: "reject"
  },
  {
    id: 4274,
    title: "Fixes vertical-three-colors in Firefox",
    body: "The less mixin for vertical-three-colors doesn't seem to work in Firefox 13.0.1.\nIt just displays the default background-image option. It looks like Firefox want a percentage value.",
    user: {
      avatar_url: "https://secure.gravatar.com/avatar/3941fd147c84076b9254ec62e740b16a?s=140&d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png"
    },
    outcome: "merge"
  },
  {
    id: 4276,
    title: "Optimized images size with ImageOptim app",
    body: "this saves several 10s of kilobytes from the Bootstrap package",
    user: {
      avatar_url: "https://secure.gravatar.com/avatar/8495227402a81e6adb37d0992edb75d4?s=140&d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png"
    },
    outcome: "reject"
  },
  {
    id: 4277,
    title: "Fix typo in readme file",
    body: "Fix typo error phatomjs => phantomjs",
    user: {
      avatar_url: "https://secure.gravatar.com/avatar/3052f56becb460532f9b53b1e6187987?s=140&d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png"
    },
    outcome: "merge"
  },
  {
    id: 4282,
    title: "Fixed responsive label selector",
    body: "",
    user: {
      avatar_url: "https://secure.gravatar.com/avatar/fb4882be433ade76bb107685a3eb04d8?s=140&d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png"
    },
    outcome: "reject"
  },
  {
    id: 4289,
    title: "Update docs/templates/pages/javascript.mustache",
    body: "Amended all mentions of 'Javascript' and 'javascript' in the body text to the correct 'JavaScript'. (mustache file)",
    user: {
      avatar_url: "https://secure.gravatar.com/avatar/28500dad5b09e308302db7389bd2ad93?s=140&d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png"
    },
    outcome: "merge"
  },
  {
    id: 4293,
    title: ".input-block-level is a mixin, not a class.",
    body: "I modified the definition of the .input-block-level mixin so that it won't create a .input-block-level class.",
    user: {
      avatar_url: "https://secure.gravatar.com/avatar/4137d4e521b829ff3de67910d26e5b5f?s=140&d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png"
    },
    outcome: "reject"
  },
  {
    id: 4298,
    title: "fix tooltip plugin and affix plugin issue",
    body: "The bug will appear if the mouse enters into other elements from the\nformer elements when the hiding-delay is not the 0s. At the same time,\nthe 'tooltip' of the former elements won't hide. That's why I move the\n'timeout' to the 'self' from the 'this'.",
    user: {
      avatar_url: "https://secure.gravatar.com/avatar/f9346ef401aa00a8f4cbb9da82ba6e36?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png"
    },
    outcome: "reject"
  },
  {
    id: 4802,
    title: "Fixes typo on border radius fix for tables",
    body: "The fix for tables has a typo for the Mozilla vendor prefix for border radius. Both webkit and the generic border radius change the top right radius while mozilla is using top left(probably just some copy-pasta typo)",
    user: {
      avatar_url: "https://secure.gravatar.com/avatar/e17306f0655af0fa81e5329d776576cd?s=140&d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png"
    },
    outcome: "reject"
  },
  {
    id: 5008,
    title: "Fix small documentation typos.",
    body: "No description given.",
    user: {
      avatar_url: "https://secure.gravatar.com/avatar/86bbd1a5d022713ef9c950e707aef675?s=140&d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png"
    },
    outcome: "merge"
  },
  {
    id: 5027,
    title: "Force alert colors",
    body: "Alerts should use the configured alert colors regardless of colors set on elements that enclose them.\n\nWithout !important alert colors are overridden by more specific selectors.  For and example of the issue check out this fiddle: http://jsfiddle.net/kylewest/SEntG/",
    user: {
      avatar_url: "https://secure.gravatar.com/avatar/30f957ec3d22f2701b17d212a554fdd7?s=140&d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png"
    },
    outcome: "reject"
  },
  {
    id: 5028,
    title: "Remove offset margin in row-fluid mobile layout",
    body: "As I can see in documentation for \"Basic grid HTML\", offset margin-left's does not preserved in small screen resolutions. So if I'm not wrong this must be the concept for \"Fluid offsetting\" too.\nFor this, we only need to override the first-child of all offsets as the rest children is covered by .row-fluid [class*=\"span\"] rule.",
    user: {
      avatar_url: "https://secure.gravatar.com/avatar/38ca483fb8e759b18cbfc194588cf089?s=140&d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png"
    },
    outcome: "merge"
  },
  
];
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
            'x': 600,
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