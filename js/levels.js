'use strict';

function load_level(id){
    entity_create({
      'id': 'ground',
      'properties': {
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
      },
      'types': [
        '_webgl',
      ],
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
        entity_create({
          'id': racer,
          'properties': racers[racer],
          'types': [
            '_webgl',
            '_racer',
          ],
        });

        entity_group_add({
          'entities': [
            racer,
          ],
          'group': racer,
        });
    }
}
