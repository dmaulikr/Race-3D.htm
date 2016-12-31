'use strict';

function draw_logic(){
}

function logic(){
    if(webgl_menu){
        return;
    }

    var movement = 0;
    if(input_keys[83]['state']
      && race_racers[0]['speed'] > -race_racers[0]['speed-max'] / 2){
        movement = -race_racers[0]['acceleration'];
    }
    if(input_keys[87]['state']
      && race_racers[0]['speed'] < race_racers[0]['speed-max']){
        movement = race_racers[0]['acceleration'];
    }
    race_racers[0]['speed'] = race_racers[0]['speed'] + movement;

    if(race_racers[0]['speed'] !== 0){
        if(movement === 0){
            if(Math.abs(race_racers[0]['speed']) > .001){
                race_racers[0]['speed'] = math_round({
                  'number': race_racers[0]['speed'] * .95,
                });

            }else{
                race_racers[0]['speed'] = 0;
            }
        }

        var camera_movement = math_move_3d({
          'angle': webgl_entities['racer-0']['rotate']['y'],
          'speed': race_racers[0]['speed'],
        });
        webgl_group_modify({
          'grouplist': [
            'racer-0',
          ],
          'todo': function(entity){
              webgl_entities[entity]['position']['x'] += camera_movement['x'];
              webgl_entities[entity]['position']['z'] += camera_movement['z'];
          },
        });

        var rotation = false;
        if(input_keys[65]['state']){
            rotation = 2 / (1 / race_racers[0]['speed']);
        }
        if(input_keys[68]['state']){
            rotation = -2 / (1 / race_racers[0]['speed']);
        }
        if(rotation !== false){
            webgl_group_modify({
              'grouplist': [
                'racer-0',
              ],
              'todo': function(entity){
                  webgl_entities[entity]['rotate']['y'] += rotation;
              },
            });
            webgl_camera_rotate({
              'x': 0,
              'y': -rotation,
              'z': 0,
            });
        }
    }

    webgl_camera['x'] = webgl_entities['racer-0']['position']['x'];
    webgl_camera['z'] = -webgl_entities['racer-0']['position']['z'] + .0001;

    webgl_text['debug-position']['text'] =
      webgl_entities['racer-0']['position']['x'] + 'x, '
      + webgl_entities['racer-0']['position']['y'] + 'y, '
      + webgl_entities['racer-0']['position']['z'] + 'z';
    webgl_text['debug-rotation']['text'] = webgl_entities['racer-0']['rotate']['y'];
    webgl_text['debug-speed']['text'] = race_racers[0]['speed'];
}

function resize_logic(){
}

function setmode_logic(newgame){
    race_checkpoints.length = 0;
    race_racers.length = 0;

    // Main menu mode.
    if(webgl_mode === 0){
        document.body.innerHTML = '<div><div><a onclick="webgl_setmode({newmode:1,newgame:true,})">Test Track</a></div></div>'
          + '<div class=right><div><input disabled value=ESC>Menu</div><hr>'
          + '<div><input id=audio-volume max=1 min=0 step=0.01 type=range>Audio<br>'
          + '<input id=ms-per-frame>ms/Frame<br>'
          + '<a onclick=settings_reset()>Reset Settings</a></div></div>';
        settings_update();

    // New game mode.
    }else{
        if(newgame){
            settings_save();
        }

        webgl_camera['rotate-x'] = 45;
        webgl_camera['y'] = 5;

        webgl_entities['ground'] = {
          '_init': true,
          'color': [
            0.1, 0.4, 0.1, 1,
            0.1, 0.4, 0.1, 1,
            0.1, 0.4, 0.1, 1,
            0.1, 0.4, 0.1, 1,
          ],
          'position': {
            'x': 0,
            'y': -2.1,
            'z': 0,
          },
          'vertices': [
            50, 0, -50,
            -50, 0, -50,
            -50, 0, 50,
            50, 0, 50,
          ],
        };

        var racers = {
          0: {
            'color': '#fff',
            'speed-max': 1,
            'y': -2,
          },
        };
        for(var racer in racers){
            race_racer_create({
              'properties': racers[racer],
            });

            webgl_entities['racer-' + racer] = {
              '_init': true,
              'color': [
                1, 1, 1, 1,
                1, 1, 1, 1,
                1, 1, 1, 1,
                1, 1, 1, 1,
              ],
              'position': {
                'x': race_racers[racer]['x'],
                'y': race_racers[racer]['y'],
                'z': race_racers[racer]['z'],
              },
              'vertices': [
                1, 0, -2,
                -1, 0, -2,
                -1, 0, 2,
                1, 0, 2,
              ],
            };

            webgl_group_add({
              'entitylist': [
                'racer-0',
              ],
              'group': 'racer-0',
            });
        }
    }

    webgl_text['debug-position'] = {
      'properties': {
        'fillStyle': '#fff',
        'font': webgl_fonts['medium'],
        'textBaseline': 'top',
      },
      'text': '',
      'x': 0,
      'y': 0,
    };
    webgl_text['debug-rotation'] = {
      'properties': {
        'fillStyle': '#fff',
        'font': webgl_fonts['medium'],
        'textBaseline': 'top',
      },
      'text': '',
      'x': 0,
      'y': 25,
    };
    webgl_text['debug-speed'] = {
      'properties': {
        'fillStyle': '#fff',
        'font': webgl_fonts['medium'],
        'textBaseline': 'top',
      },
      'text': '',
      'x': 0,
      'y': 50,
    };
}

window.onload = function(e){
    settings_init({
      'prefix': 'Race-3D.htm-',
      'settings': {
        'audio-volume': 1,
        'ms-per-frame': 25,
      },
    });
    input_init(
      {
        27: {
          'todo': webgl_menu_toggle,
        },
        65: {},
        68: {},
        81: {
          'todo': webgl_menu_quit,
        },
        83: {},
        87: {},
      }
    );
    webgl_init();
};
