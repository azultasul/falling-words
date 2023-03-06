import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

export const Falling = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    // module aliases
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Bodies = Matter.Bodies,
        Composite = Matter.Composite,
        Mouse = Matter.Mouse,
        MouseConstraint = Matter.MouseConstraint;
  
    // create an engine
    var engine = Engine.create();
  
    // create a renderer
    var render = Render.create({
        element: canvasRef.current,
        engine: engine
    });
  
    // create two boxes and a ground
    var boxA = Bodies.rectangle(400, 0, 80, 80);
    var boxB = Bodies.rectangle(450, 50, 80, 80);
    var ballA = Bodies.circle(350, 400, 40, { isStatic: true });
    var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
    var wallR = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
    var wallL = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
    var wallT = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
    var wallB = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
  
    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });
  
    // add all of the bodies to the world
    Composite.add(engine.world, [boxA, boxB, ballA, ground, mouseConstraint]);
  
  
    // keep the mouse in sync with rendering
    render.mouse = mouse;
  
    // run the renderer
    Render.run(render);
  
    // create runner
    var runner = Runner.create();
  
    // run the engine
    Runner.run(runner, engine);

  }, [])

  return (
    <div ref={canvasRef}></div>
  )
}

export default Falling;