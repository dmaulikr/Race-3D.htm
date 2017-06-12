'use strict';

function draw_logic(){
}

function logic(){
    var movement = 0;
    if(core_keys[83]['state']
      && entity_entities['player']['speed'] > -entity_entities['player']['speed-max'] / 2){
        movement = -entity_entities['player']['acceleration'];
    }
    if(core_keys[87]['state']
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
        if(core_keys[65]['state']){
            rotation = 2 / (1 / entity_entities['player']['speed']);
        }
        if(core_keys[68]['state']){
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
              'y': -rotation,
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

function repo_init(){
    core_repo_init({
      'info': '<a onclick="webgl_setmode({mode:1,newgame:true,})">Test Track</a>',
      'keybinds': {
        65: {},
        68: {},
        83: {},
        87: {},
      },
      'menu': true,
      'title': 'Race-3D.htm',
    });
    race_init();
    webgl_init();
}
