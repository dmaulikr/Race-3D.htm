'use strict';

function draw_logic(){
}

function logic(){
    var movement = 0;
    if(core_keys[83]['state']
      && core_entities['player']['speed'] > -core_entities['player']['speed-max'] / 2){
        movement = core_entities['player']['acceleration'];
    }
    if(core_keys[87]['state']
      && core_entities['player']['speed'] < core_entities['player']['speed-max']){
        movement = -core_entities['player']['acceleration'];
    }
    core_entities['player']['speed'] = core_entities['player']['speed'] + movement;

    if(core_entities['player']['speed'] !== 0){
        if(movement === 0){
            if(Math.abs(core_entities['player']['speed']) > .001){
                core_entities['player']['speed'] = math_round({
                  'number': core_entities['player']['speed'] * .95,
                });

            }else{
                core_entities['player']['speed'] = 0;
            }
        }

        var camera_movement = math_move_3d({
          'angle': core_entities['player']['rotate']['y'],
          'speed': core_entities['player']['speed'],
        });
        core_group_modify({
          'groups': [
            'player',
          ],
          'todo': function(entity){
              core_entities[entity]['position']['x'] -= camera_movement['x'];
              core_entities[entity]['position']['z'] += camera_movement['z'];
          },
        });

        var rotation = false;
        if(core_keys[65]['state']){
            rotation = -2 / (1 / core_entities['player']['speed']);
        }
        if(core_keys[68]['state']){
            rotation = 2 / (1 / core_entities['player']['speed']);
        }
        if(rotation !== false){
            core_group_modify({
              'groups': [
                'player',
              ],
              'todo': function(entity){
                  core_entities[entity]['rotate']['y'] += rotation;
              },
            });
            webgl_camera_rotate({
              'y': -rotation,
            });
        }
    }
}

function repo_init(){
    core_repo_init({
      'info': '<input id=start type=button value="Start New Race">',
      'info-events': {
        'start': {
          'todo': function(){
              webgl_setmode({
                'newgame': true,
              });
          },
        },
      },
      'keybinds': {
        65: {},
        68: {},
        83: {},
        87: {},
      },
      'menu': true,
      'storage': {
        'level': 0,
      },
      'storage-menu': '<table><tr><td><select id=level><option value=0>Test Track</option></select><td>Level</table>',
      'title': 'Race-3D.htm',
    });
    race_init();
    webgl_init({
      'camera': false,
    });
}
