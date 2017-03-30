'use strict';

function draw_logic(){
}

function logic(){
    if(webgl_menu){
        return;
    }

    var movement = 0;
    if(input_keys[83]['state']
      && entity_entities['player']['speed'] > -entity_entities['player']['speed-max'] / 2){
        movement = -entity_entities['player']['acceleration'];
    }
    if(input_keys[87]['state']
      && entity_entities['player']['speed'] < entity_entities['player']['speed-max']){
        movement = entity_entities['player']['acceleration'];
    }
    entity_entities['player']['speed'] = entity_entities['player']['speed'] + movement;

    if(entity_entities['player']['speed'] !== 0){
        if(movement === 0){
            if(Math.abs(entity_entities['player']['speed']) > .001){
                entity_entities['player']['speed'] = math_round({
                  'number': entity_entities['player']['speed'] * .95,
                });

            }else{
                entity_entities['player']['speed'] = 0;
            }
        }

        var camera_movement = math_move_3d({
          'angle': entity_entities['player']['rotate']['y'],
          'speed': entity_entities['player']['speed'],
        });
        entity_group_modify({
          'groups': [
            'player',
          ],
          'todo': function(entity){
              entity_entities[entity]['position']['x'] += camera_movement['x'];
              entity_entities[entity]['position']['z'] += camera_movement['z'];
          },
        });

        var rotation = false;
        if(input_keys[65]['state']){
            rotation = 2 / (1 / entity_entities['player']['speed']);
        }
        if(input_keys[68]['state']){
            rotation = -2 / (1 / entity_entities['player']['speed']);
        }
        if(rotation !== false){
            entity_group_modify({
              'groups': [
                'player',
              ],
              'todo': function(entity){
                  entity_entities[entity]['rotate']['y'] += rotation;
              },
            });
            webgl_camera_rotate({
              'x': 0,
              'y': -rotation,
              'z': 0,
            });
        }
    }

    entity_entities['_webgl-camera']['position']['x'] = entity_entities['player']['position']['x'];
    entity_entities['_webgl-camera']['position']['z'] = -entity_entities['player']['position']['z'] + .0001;

    webgl_text['debug-position']['text'] =
      entity_entities['player']['position']['x'] + 'x, '
      + entity_entities['player']['position']['y'] + 'y, '
      + entity_entities['player']['position']['z'] + 'z';
    webgl_text['debug-rotation']['text'] = entity_entities['player']['rotate']['y'];
    webgl_text['debug-speed']['text'] = entity_entities['player']['speed'];
}

function setmode_logic(newgame){
    race_checkpoints.length = 0;

    // Main menu mode.
    if(webgl_mode === 0){
        document.body.innerHTML = '<div><div><a onclick="webgl_setmode({newmode:1,newgame:true,})">Test Track</a></div></div>'
          + '<div class=right><div><input disabled value=ESC>Menu</div><hr>'
          + '<div><input id=audio-volume max=1 min=0 step=0.01 type=range>Audio<br>'
          + '<input id=ms-per-frame>ms/Frame<br>'
          + '<a onclick=storage_reset()>Reset Settings</a></div></div>';
        storage_update();

    // New game mode.
    }else{
        if(newgame){
            storage_save();
        }

        entity_entities['_webgl-camera']['rotate']['x'] = 45;
        entity_entities['_webgl-camera']['position']['y'] = 5;
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
    input_init({
      'keybinds': {
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
      },
    });
    storage_init({
      'data': {
        'audio-volume': 1,
        'ms-per-frame': 25,
      },
      'prefix': 'Race-3D.htm-',
    });
    webgl_init();
    race_init();
};
