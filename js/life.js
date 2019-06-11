/* ************************************************************************** */
/*           .      .@@                                                       */
/*          $@#.@#$..@$@`     $                                               */
/*        `##@$@@@$$$#@$##@@@#                                                */
/*     $@@##@$$###$##@@@@@@#$$@@#                                             */
/*    `#$$$##################@`                                               */
/*    #$##^$################$#$       langton.js                              */
/*   #$#<--->@#######$##########.                                             */
/*   ####$v####.        `####$ #.     By: cdivry <cdivry@student.42.fr>       */
/*   ####$####$`        .###  .                                               */
/*    .########################                                               */
/*     .$#$###################.                                               */
/*       `#################$.                                                 */
/*         `$$############$.`     Created: 2019/06/03 19:11:23 by cdivry      */
/*           `#$##########.       Updated: 2019/06/03 19:13:00 by cdivry      */
/*              `$#$$$$#$                                                     */
/*                  ##$.                                                      */
/* ************************************************************************** */


/*
** CANVAS
*/

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//var MAP = {WIDTH: 16, HEIGHT: 9};
//var MAP = {WIDTH: 1280, HEIGHT: 720};
var MAP = {WIDTH: 128, HEIGHT: 72};

/*
** ENGINE
*/

MAP.FPS = 100;
MAP.ITERATIONS = 0;
MAP.ZOOM = 0;
MAP.SIZE = MAP.WIDTH * MAP.HEIGHT;
MAP.TILES = Array(MAP.SIZE);
MAP.TILES = MAP.TILES.fill(0);
MAP.PAUSE = false;
MAP.SPEED = 1;
MAP.TILE_SIZE = {X: document.body.clientWidth / MAP.WIDTH, Y:  document.body.clientHeight / MAP.HEIGHT};
MAP.IMAGE = ctx.getImageData(0, 0, canvas.width, canvas.height)
MAP.MOUSE = {X: 0, Y: 0, clock: false};
MAP.HOVER = {X: 0, Y: 0};
MAP.INTERVAL = null;

// random fill
for (var i = 0; i < MAP.TILES.length; i++) {
	MAP.TILES[i] = Math.random() < 0.5 ? 1 : 0;
}


/*
** FUNCTIONS
*/

function set_speed(value) {
	if (value === parseInt(value) && value > 0 && value < 10) {
		MAP.SPEED = value;
		window.clearInterval(MAP.INTERVAL);
		//window.setInterval(draw_loop, 10);
		//window.clearInterval();
		window.setTimeout(function(){
			MAP.INTERVAL = window.setInterval(main_loop, 1000 / value);
		}, 1);
	}
}
function is_inside_map(map, x, y) {
	return (map[x + (MAP.WIDTH * y)] === 'undefined' ? false : true);
}

function get_tile(map, x, y) {
	return (is_inside_map(map, x, y) ? map[x + (MAP.WIDTH * y)] : 0);
}

function set_tile(x, y, value) {
	if (is_inside_map(MAP.TILES, x, y)) {
		MAP.TILES[x + (MAP.WIDTH * y)] = value;
	}
}

function look_around(map, x, y) {
	return (
		get_tile(map, x - 1, y - 1) +
		get_tile(map, x, y - 1) +
		get_tile(map, x + 1, y - 1) +
		get_tile(map, x - 1, y) +
		//get_tile(map, x, y) + // not the current one
		get_tile(map, x + 1, y) +
		get_tile(map, x - 1, y + 1) +
		get_tile(map, x, y + 1) +
		get_tile(map, x + 1, y + 1)
	);
}


/*
** MOUSE
*/

function mouse_move(event) {
	MAP.HOVER.X = parseInt(event.layerX / MAP.TILE_SIZE.X);
	MAP.HOVER.Y = parseInt(event.layerY / MAP.TILE_SIZE.Y);
	MAP.MOUSE.X = event.layerX / MAP.TILE_SIZE.X;
	MAP.MOUSE.Y = event.layerY / MAP.TILE_SIZE.Y;
	if (MAP.MOUSE.click == true) {
		set_tile(MAP.HOVER.X, MAP.HOVER.Y, 1);
	}
}
function mouse_down(event) {
	set_tile(MAP.HOVER.X, MAP.HOVER.Y, 1);
	MAP.MOUSE.click = true;
}
function mouse_up(event) {
	MAP.MOUSE.click = false;
}
canvas.addEventListener("mousedown", mouse_down);
canvas.addEventListener("mouseup", mouse_up);
canvas.addEventListener('mousemove', mouse_move);

/*
** KEYBOARD
*/

function keyboard_press(event) {
	var key = event.keyCode;
	console.log(key);
    if (key == 32) {
		MAP.PAUSE = MAP.PAUSE ? false : true;
	}
    if (key == 62) {
		set_speed(MAP.SPEED + 1);
	}
    if (key == 60) {
		set_speed(MAP.SPEED - 1);
	}

}
window.addEventListener("keypress", keyboard_press);


/*
** DRAW
*/

function set_antialiasing(value) {
    ctx.imageSmoothingEnabled = value;
    ctx.mozImageSmoothingEnabled = value;
    ctx.webkitImageSmoothingEnabled = value;
    ctx.msImageSmoothingEnabled = value;
}
 
function draw_background() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw_tile(x, y, tile_value) {
	x_pos = x * MAP.TILE_SIZE.X;
	y_pos = y * MAP.TILE_SIZE.Y;
	if (x == MAP.HOVER.X && y == MAP.HOVER.Y) {
		ctx.fillStyle = '#f00';
	}
	else if (tile_value) {
		//ctx.fillStyle = '#C19A6B';
		ctx.fillStyle = '#0066cc';
	} else {
		//ctx.fillStyle = '#CCFFFF';
		ctx.fillStyle = '#e5ffcc';
	}
	ctx.fillRect(x_pos, y_pos, MAP.TILE_SIZE.X, MAP.TILE_SIZE.Y);
}

function draw_playground()
{
	var x = 0, y = 0;
	MAP.TILES.forEach(tile => {
		draw_tile(x, y, tile);
		// next tile on square map
		x++;
		if (x % MAP.WIDTH == 0) {
			x = 0;
			y++;
		}
	});
	
	//ctx.putImageData(MAP.IMAGE, 0, 0);
}

function draw_infos() {
	ctx.fillStyle = '#000';
	ctx.font = "21px Tahoma";
	ctx.fillText("Itérations: " + MAP.ITERATIONS, 42, 42);
	ctx.fillText("Vitesse: x" + MAP.SPEED, 42, 74);
	ctx.fillText("Case ( " + MAP.HOVER.X + " , " + MAP.HOVER.Y + " )", 42, 106);
	if (MAP.PAUSE) {
		ctx.fillStyle = '#f00';
		ctx.font = "32px Tahoma";
		ctx.fillText("[ PAUSE ]", (canvas.width / 2) - 50, 42) ;
		ctx.font = "21px Tahoma";
		ctx.fillText("[ appuyez sur espace pour poursuivre ]", (canvas.width / 2) - 170, 84) ;
	}
	
}

function draw_loop() {
	set_antialiasing(false);
    canvas.height = document.body.clientHeight;
    canvas.width = document.body.clientWidth;
   	draw_background();
	draw_playground();
	draw_infos();
	//
	//console.log( get_tile (160, 90) );
}

/*
** LOOPS
*/

function main_loop() {
	if (!MAP.PAUSE) {
		var x = 0, y = 0, look = 0;
		const _map = [...MAP.TILES]; // shitty memcopy
		_map.forEach(tile => {
			look = look_around(_map, x, y);
			if (tile && (look == 2 || look == 3)) {
				set_tile(x, y, tile);
			}
			else if (look == 3) {
				set_tile(x, y, 1);
			} 
			else {
				set_tile(x, y, 0);
			}

			// mvoe next
			x++;
			if (x % MAP.WIDTH == 0) {
				x = 0;
				y++;
			}
		});
		MAP.ITERATIONS++;
	}
}


/* **************************************** */
/*                ENTRYPOINT                */
/* **************************************** */

/*
** GAME DRAW LOOP
*/


window.setInterval(draw_loop, 1000 / MAP.FPS);
set_speed(1);

draw_loop();
