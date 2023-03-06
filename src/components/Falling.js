import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

export const Falling = () => {
  const canvasRef = useRef(null);
  const boxRef = useRef(null);
  const wordsRef = useRef([]);

  const info = [
    // {
    //   type: 'text', // link, 
    //   category: 'work' // 'about(contact)', 'blog'
    //   text: 'tasul',
    //   image: 'path',
    //   url: 'url',
    //   class: '',
    // },
    {
      type: 'text',
      text: 'azul',
    },
    {
      type: 'text',
      text: 'hey',
    },
    {
      type: 'text',
      text: 'bye',
    },
    {
      type: 'link',
      text: 'link',
      url: 'https://github.com/azultasul/falling-words',
    },
  ]

  useEffect(() => {
    // module aliases
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const Runner = Matter.Runner;
    const Bodies = Matter.Bodies;
    const Composite = Matter.Composite;
    const Mouse = Matter.Mouse;
    const MouseConstraint = Matter.MouseConstraint;
  
    const canvasSize = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    
    // create an engine
    const engine = Engine.create();
  
    // create a renderer
    const render = Render.create({
      element: canvasRef.current,
      engine: engine,
      options: {
        ...canvasSize,
        background: "transparent",
        wireframes: false
      }
    });
  
    // create walls
    const boxA = Bodies.rectangle(400, 20, 80, 80);
    const boxB = Bodies.rectangle(450, 50, 80, 80);
    const ballA = Bodies.circle(350, 400, 40, { isStatic: true });

    const wallT = Bodies.rectangle(canvasSize.width/2, 12, canvasSize.width, 24, { isStatic: true });
    const wallR = Bodies.rectangle(canvasSize.width - 12, canvasSize.height/2, 24, canvasSize.height, { isStatic: true });
    const wallL = Bodies.rectangle(12, canvasSize.height/2, 24, canvasSize.height, { isStatic: true });
    const wallB = Bodies.rectangle(canvasSize.width/2, canvasSize.height - 12, canvasSize.width, 24, { isStatic: true });

    // create words
    const words = wordsRef.current.map(el => {
      const width = el.offsetWidth;
      const height = el.offsetHeight;

      return {
        body: Bodies.rectangle(canvasSize.width/2, 32, width, height, {render: {fillStyle: "transparent"}}),
        el: el,
        render() {
          const { x, y } = this.body.position;
          this.el.style.top = `${y - height / 2}px`;
          this.el.style.left = `${x - width / 2}px`;
          this.el.style.transform = `rotate(${this.body.angle}rad)`;
        }
      }
    })
  
    // add mouse control
    const mouse = Mouse.create(canvasRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });
    // mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    // mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
  
    Composite.add(engine.world, [boxA, boxB, ballA, wallT, wallR, wallL, wallB, ...words.map(el => el.body), mouseConstraint]);
  
    render.mouse = mouse;
    Runner.run(engine);
    Render.run(render);

    (function rerender() {
      words.forEach((element) => {
        element.render();
      });
      Matter.Engine.update(engine);
      requestAnimationFrame(rerender);
    })();

  }, [])

  return (
    <div ref={canvasRef}>
      <div ref={boxRef}>
        {info.map((item, index) => 
          item.type === 'link' 
          ? <span ref={el => (wordsRef.current[index] = el)} className='word word-link' key={index}>
              {item.text}<a href={item.url} target="_blank">detail</a>
            </span>
          : <span ref={el => (wordsRef.current[index] = el)} className='word' key={index}>{item.text}</span>
        )}
      </div>
    </div>
  )
}

export default Falling;