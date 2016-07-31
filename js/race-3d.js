'use strict';

function draw_logic(){
}

function logic(){
    var movement = 0;
    if(input_keys[83]['state']){
        movement = -race_racers[0]['acceleration'];
        if(race_racers[0]['speed'] > -race_racers[0]['speed-max'] / 2){
            race_racers[0]['speed'] += movement;
        }
    }
    if(input_keys[87]['state']){
        movement = race_racers[0]['acceleration'];
        if(race_racers[0]['speed'] < race_racers[0]['speed-max']){
            race_racers[0]['speed'] += movement;
        }
    }

    if(race_racers[0]['speed'] !== 0){
        var camera_movement = math_move_3d(
          race_racers[0]['speed'],
          webgl_entities['racer-0']['rotate']['y']
        );
        webgl_group_modify(
          [
            'racer-0',
          ],
          function(entity){
              webgl_entities[entity]['position']['x'] += camera_movement['x'];
              webgl_entities[entity]['position']['z'] += camera_movement['z'];
          }
        );

        var rotation = false;
        if(input_keys[65]['state']){
            rotation = 2 / (1 / race_racers[0]['speed']);
        }
        if(input_keys[68]['state']){
            rotation = -2 / (1 / race_racers[0]['speed']);
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
    }

    webgl_camera['x'] = webgl_entities['racer-0']['position']['x'];
    webgl_camera['z'] = -webgl_entities['racer-0']['position']['z'] + .0001;
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

    var racers = {
      0: {
        'color': '#fff',
        'speed-max': 1,
        'y': -2,
      },
    };
    for(var racer in racers){
        race_racer_create(racers[racer]);

        webgl_entity_set(
          'racer-' + racer,
          {
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
          }
        );
        webgl_group_add(
          'racer-' + racer,
          [
            'racer-' + racer,
          ]
        );
    }
};
