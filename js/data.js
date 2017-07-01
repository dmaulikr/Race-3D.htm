'use strict';

function load_data(){
    race_checkpoints.length = 0;

    core_entity_create({
      'id': 'ground',
      'properties': {
        'color': [
          0.1, 0.4, 0.1, 1,
          0.1, 0.4, 0.1, 1,
          0.1, 0.4, 0.1, 1,
          0.1, 0.4, 0.1, 1,
        ],
        'position': {
          'y': -2.1,
        },
        'vertices': [
          50, 0, -50,
          -50, 0, -50,
          -50, 0, 50,
          50, 0, 50,
        ],
      },
    });

    var racers = {
      'player': {
        'color': [
          1, 1, 1, 1,
          1, 1, 1, 1,
          1, 1, 1, 1,
          1, 1, 1, 1,
        ],
        'speed-max': 1,
        'vertices': [
          1, 0, -2,
          -1, 0, -2,
          -1, 0, 2,
          1, 0, 2,
        ],
        'y': -2,
      },
    };
    for(var racer in racers){
        core_entity_create({
          'id': racer,
          'properties': racers[racer],
          'types': [
            '_webgl',
            '_racer',
          ],
        });

        core_group_add({
          'entities': [
            racer,
          ],
          'group': racer,
        });
    }

    core_entities['_webgl-camera']['rotate']['x'] = 45;
    core_entities['_webgl-camera']['position']['y'] = 5;
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
