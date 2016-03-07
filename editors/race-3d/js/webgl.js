'use strict';

// Draw function for updating the buffer.
engine.draw = function(){
    engine.webgl.set.viewport({
      'target': 'buffer',
    });
    engine.webgl.clear({
      'target': 'buffer',
    });

    engine.variables['_camera'] = engine.math.matrix.create({
      'length': 16,
    });
    engine.math.matrix.identity({
      'matrix': engine.variables['_camera'],
    });

    engine.math.matrix.rotate({
      'dimensions': [
        engine.math.degreesToRadians({
          'degrees': engine.camera.rotation['x'],
        }),
        engine.math.degreesToRadians({
          'degrees': engine.camera.rotation['y'],
        }),
        engine.math.degreesToRadians({
          'degrees': engine.camera.rotation['z'],
        }),
      ],
      'matrix': engine.variables['_camera'],
    });
    engine.math.matrix.translate({
      'dimensions': [
        engine.camera.position['x'],
        engine.camera.position['y'],
        -engine.camera.position['z'],
      ],
      'matrix': engine.variables['_camera'],
    });

    engine.webgl.draw.entities();

    engine.canvas.clear();
    engine.canvas.draw.fromBuffer();

    engine.time.requestAnimationFrame({
      'key': 'draw',
    });
};

// Init function to setup the engine for this project.
engine.init = function(){
    engine.project.set.title({
      'title': 'Race-3D.htm',
    });

    engine.camera.set.dimensions({
      'dimensions': {
        'x': 0,
        'y': 0,
        'z': 0,
      },
    });
    engine.keyboard.init();
    engine.mouse.init();
    engine.mouse.set.dimensions({
      'dimensions': {
        'x': 0,
        'y': 0,
      },
    });
    engine.mouse.oncontextmenu = false;

    engine.html.set.element({
      'classes': [
        'hidden',
      ],
      'id': 'buffer',
      'type': 'canvas',
    });
    engine.html.set.element({
      'id': 'canvas',
      'type': 'canvas',
    });

    engine.webgl.init({
      'target': 'buffer',
    });

    engine.keyboard.set.keyBind({
      'event': 'keydown',
      'key': 'A',
      'loop': true,
      'todo': function(){
          engine.camera.move({
            'dy': 0,
            'speed': -.1,
            'strafe': true,
          });
      },
    });
    engine.keyboard.set.keyBind({
      'event': 'keydown',
      'key': 'C',
      'loop': true,
      'todo': function(){
          engine.camera.move({
            'dy': -.1,
            'speed': 0,
          });
      },
    });
    engine.keyboard.set.keyBind({
      'event': 'keydown',
      'key': 'D',
      'loop': true,
      'todo': function(){
          engine.camera.move({
            'dy': 0,
            'speed': .1,
            'strafe': true,
          });
      },
    });
    engine.keyboard.set.keyBind({
      'event': 'keydown',
      'key': 'S',
      'loop': true,
      'todo': function(){
          engine.camera.move({
            'dy': 0,
            'speed': -.1,
          });
      },
    });
    engine.keyboard.set.keyBind({
      'event': 'keydown',
      'key': 32,/* Space */
      'loop': true,
      'todo': function(){
          engine.camera.move({
            'dy': .1,
            'speed': 0,
          });
      },
    });
    engine.keyboard.set.keyBind({
      'event': 'keydown',
      'key': 'W',
      'loop': true,
      'todo': function(){
          engine.camera.move({
            'dy': 0,
            'speed': .1,
          });
      },
    });

    engine.mouse.set.mouseButtonBind({
      'button': 0,
      'event': 'mousedown',
      'todo': function(){
          engine.mouse.set.pointerLock({
            'id': 'canvas',
            'state': true,
          });
      },
    });
    engine.mouse.set.mouseButtonBind({
      'button': 'any',
      'event': 'mousemove',
      'todo': function(){
          if(engine.mouse.pointerLock){
              engine.camera.rotate({
                'dimensions': {
                  'x': engine.mouse.movement['y'] / 10 * engine.mouse.multiplier['y'],
                  'y': engine.mouse.movement['x'] / 10 * engine.mouse.multiplier['x'],
                },
              });
          }
      },
    });

    // Create default rectangle entity.
    engine.object.defaults['Race-3D-rectangle'] = {
      /*
      'color': [
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0,
      ],
      */
      'cull': false,
      'index': [
        0, 1, 2, 0, 2, 3,
      ],
      'mode': 'TRIANGLE_FAN',
      'position': {
        'x': 0,
        'y': 0,
        'z': 0,
      },
      'rotate': {
        'x': 0,
        'y': 0,
        'z': 0,
      },
      'scale': {
        'x': 1,
        'y': 1,
        'z': 1,
      },
      'target': 'buffer',
      'vertices': [
        -1, 0, -1,
        1, 0, -1,
        1, 0, 1,
        -1, 0, 1,
      ],
    };

    // Ground.
    engine.object.entity.set({
      'default': 'Race-3D-rectangle',
      'key': 'Race-3D-ground',
      'properties': {
        'position': {
          'y': -2,
        },
        'scale': {
          'x': 25,
          'z': 25,
        },
      },
    });

    // Walls.
    engine.object.entity.set({
      'default': 'Race-3D-rectangle',
      'key': 'Race-3D-wall-0',
      'properties': {
        'position': {
          'y': 3,
          'z': 15,
        },
        'vertices': [
          -15, -5, 0,
          15, -5, 0,
          15, -3, 0,
          -15, -3, 0,
        ],
      },
    });
    engine.object.entity.set({
      'default': 'Race-3D-rectangle',
      'key': 'Race-3D-wall-1',
      'properties': {
        'position': {
          'x': -15,
          'y': 3,
        },
        'vertices': [
          0, -5, -15,
          0, -5, 15,
          0, -3, 15,
          0, -3, -15,
        ],
      },
    });
    engine.object.entity.set({
      'default': 'Race-3D-rectangle',
      'key': 'Race-3D-wall-2',
      'properties': {
        'position': {
          'x': 15,
          'y': 3,
        },
        'vertices': [
          0, -5, 15,
          0, -5, -15,
          0, -3, -15,
          0, -3, 15,
        ],
      },
    });
    engine.object.entity.set({
      'default': 'Race-3D-rectangle',
      'key': 'Race-3D-wall-3',
      'properties': {
        'position': {
          'y': 3,
        },
        'vertices': [
          0, -5, -5,
          0, -5, -25,
          0, -3, -25,
          0, -3, -5,
        ],
      },
    });

    // Racer.
    engine.object.entity.set({
      'default': 'Race-3D-rectangle',
      'key': 'Race-3D-racer',
      'properties': {
        'angle': 0,
        'position': {
          'y': -1,
          'z': 20,
        },
        'scale': {
          'x': 2,
          'z': 2,
        },
        'rotate': {
          'y': 0,
        },
        'target-checkpoint': 0,
      },
    });

    // Checkpoints.
    engine.object.entity.set({
      'default': 'Race-3D-rectangle',
      'key': 'Race-3D-checkpoint-0',
      'properties': {
        'next': 1,
        'position': {
          'x': 22,
          'z': 20,
        },
        'scale': {
          'x': 0,
          'z': 0,
        },
      },
    });
    engine.object.entity.set({
      'default': 'Race-3D-rectangle',
      'key': 'Race-3D-checkpoint-1',
      'properties': {
        'next': 2,
        'position': {
          'x': 19,
          'z': -20,
        },
        'scale': {
          'x': 0,
          'z': 0,
        },
      },
    });
    engine.object.entity.set({
      'default': 'Race-3D-rectangle',
      'key': 'Race-3D-checkpoint-2',
      'properties': {
        'next': 3,
        'position': {
          'x': 4,
          'z': 4,
        },
        'scale': {
          'x': 0,
          'z': 0,
        },
      },
    });
    engine.object.entity.set({
      'default': 'Race-3D-rectangle',
      'key': 'Race-3D-checkpoint-3',
      'properties': {
        'next': 4,
        'position': {
          'x': -12,
          'z': -20,
        },
        'scale': {
          'x': 0,
          'z': 0,
        },
      },
    });
    engine.object.entity.set({
      'default': 'Race-3D-rectangle',
      'key': 'Race-3D-checkpoint-4',
      'properties': {
        'next': 0,
        'position': {
          'x': -20,
          'z': 20,
        },
        'scale': {
          'x': 0,
          'z': 0,
        },
      },
    });

    for(var entity in engine.object.entities){
        engine.object.entities[entity]['buffer'] = engine.webgl.set.buffer({
          'bufferType': engine.canvas.canvases['buffer'].ARRAY_BUFFER,
          //'colorData': engine.object.entities[entity]['color'],
          'indexData': engine.object.entities[entity]['index'],
          'target': engine.object.entities[entity]['target'],
          'textureData': [
            0.0, 1.0,
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
          ],
          'vertexData': engine.object.entities[entity]['vertices'],
        });
        engine.webgl.set.texture2D({
          'entity': entity,
          'image': engine.variables['_default.png'],
          'target': 'buffer',
        });
    }

    engine.time.set.animationFrame({
      'key': 'draw',
      'todo': engine.draw,
    });
    engine.time.set.interval({
      'interval': 50,
      'key': 'logic',
      'todo': 'engine.logic()',
    });

    engine.project.compile();
};

engine.logic = function(){
    engine.keyboard.repeatEvents();
    engine.mouse.repeatEvents();

    engine.object.entity.logic();

    if(engine.math.distance({
      'point0': {
        'x': engine.object.entities['Race-3D-racer']['position']['x'],
        'z': engine.object.entities['Race-3D-racer']['position']['z'],
      },
      'point1': {
        'x': engine.object.entities['Race-3D-checkpoint-' + engine.object.entities['Race-3D-racer']['target-checkpoint']]['position']['x'],
        'z': engine.object.entities['Race-3D-checkpoint-' + engine.object.entities['Race-3D-racer']['target-checkpoint']]['position']['z'],
      },
    }) < .5){
        engine.object.entities['Race-3D-racer']['target-checkpoint'] =
          engine.object.entities['Race-3D-checkpoint-' + engine.object.entities['Race-3D-racer']['target-checkpoint']]['next'];
    }

    var angle = Math.atan2(
      engine.object.entities['Race-3D-checkpoint-' + engine.object.entities['Race-3D-racer']['target-checkpoint']]['position']['z']
        - engine.object.entities['Race-3D-racer']['position']['z'],
      engine.object.entities['Race-3D-checkpoint-' + engine.object.entities['Race-3D-racer']['target-checkpoint']]['position']['x']
        - engine.object.entities['Race-3D-racer']['position']['x']
    );
    if(angle < 0){
        angle += Math.PI * 2;

    }else if(angle > Math.PI * 2){
        angle -= Math.PI * 2;
    }

    if(engine.object.entities['Race-3D-racer']['angle'] > angle){
      engine.object.entities['Race-3D-racer']['angle'] -= .1;

    }else if(engine.object.entities['Race-3D-racer']['angle'] < angle){
      engine.object.entities['Race-3D-racer']['angle'] += .1;
    }

    engine.object.entities['Race-3D-racer']['rotate']['y'] = engine.math.radiansToDegrees({
      'radians': -engine.object.entities['Race-3D-racer']['angle'],
    });

    engine.object.entities['Race-3D-racer']['position']['x'] +=
      Math.cos(engine.object.entities['Race-3D-racer']['angle']) / 2;
    engine.object.entities['Race-3D-racer']['position']['z'] +=
      Math.sin(engine.object.entities['Race-3D-racer']['angle']) / 2;
};

// Init and begin running the project.
window.onload = engine.init;
