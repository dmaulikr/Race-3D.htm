'use strict';

function draw_logic(){
}

function logic(){
    var rotation = false;
    if(input_keys[65]['state']){
        rotation = 2;
    }
    if(input_keys[68]['state']){
        rotation = -2;
    }
    if(rotation !== false){
        webgl_group_modify(
          [
            'racer-0',
          ],
          function(entity){
              webgl_entities[entity]['rotate']['y'] += rotation;
          }
        );
        webgl_camera_rotate(
          0,
          -rotation,
          0
        );
    }

    var movement = false;
    if(input_keys[83]['state']){
        movement = math_move_3d(
          .5,
          webgl_entities['racer-0']['rotate']['y']
        );
    }
    if(input_keys[87]['state']){
        movement = math_move_3d(
          -.5,
          webgl_entities['racer-0']['rotate']['y']
        );
    }
    if(movement !== false){
        webgl_group_modify(
          [
            'racer-0',
          ],
          function(entity){
              webgl_entities[entity]['position']['x'] -= movement['x'];
              webgl_entities[entity]['position']['z'] -= movement['z'];
          }
        );
    }

    webgl_camera['x'] = webgl_entities['racer-0']['position']['x'];
    webgl_camera['z'] = -webgl_entities['racer-0']['position']['z'];
}

function resize_logic(){
}

window.onload = function(e){
    input_init(
      {
        65: {},
        68: {},
        83: {},
        87: {},
      }
    );
    webgl_init();

    webgl_camera['y'] = 5;
    webgl_camera['rotate-x'] = 45;

    webgl_entity_set(
      'ground',
      {
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
      }
    );

    webgl_entity_set(
      'racer-0',
      {
        'color': [
          1, 1, 1, 1,
          1, 1, 1, 1,
          1, 1, 1, 1,
          1, 1, 1, 1,
        ],
        'position': {
          'x': 0,
          'y': -2,
          'z': 0,
        },
        'vertices': [
          1, 0, -2,
          -1, 0, -2,
          -1, 0, 2,
          1, 0, 2,
        ],
      }
    );
    webgl_group_add(
      'racer-0',
      [
        'racer-0',
      ]
    );
};
