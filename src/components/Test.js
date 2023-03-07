import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import Link from 'next/link'
import Image from 'next/image'

export const Test = () => {
  const canvasRef = useRef(null);
  const boxRef = useRef(null);
  const wordsRef = useRef([]);

  const infos = [
    {
      category: 'info',
      items: ['✈️', '🇪🇸', '🚲', '🎧', '📸', '💻', '🍎', '📚', '✏️', '🖱️', '⌨️'],
    },
    {
      category: 'about',
      items: ['유다솔', 'Dasol', 'Tasul', 'Azul', '🇰🇷', '👩‍💻']
    },
    {
      category: 'contact',
      items: [
        {
          type: 'link',
          imagePath: '/assets/images/hotline.png',
          url: 'https://github.com/azultasul',
        },
        {
          type: 'email',
          imagePath: '/assets/images/hotline.png',
          email: 'mail@gmail.com',
        },
        {
          type: 'phone',
          imagePath: '/assets/images/hotline.png',
          phone: '010-1234-5678',
        },
      ]
    },
    {
      category: 'menu',
      items: ['about', 'work', 'blog'],
    },
  ]


  return (
    <div ref={canvasRef}>

    <div ref={boxRef}>
      {infos.map((item, index) => 
        item.type === 'link' 
        ? <span ref={el => (wordsRef.current[index] = el)} className='word word-link' key={index}>
            {item.text}<a href={item.url} target="_blank">detail</a>
          </span>
        : <span ref={el => (wordsRef.current[index] = el)} className='word' key={index}>{item.text}</span>
      )}
    </div>

      <div ref={boxRef}>
        {infos.map((info, index) => 
          info.category === 'contact' 
          ? info.items.map((item, _index) => 
            <span ref={el => (wordsRef.current[index] = el)} className={`word word--${info.category}`} key={`${index}-${_index}`}>
              {
                item.type === 'link'
                ? <><Image src={item.imagePath} alt='test' width={30} height={30} /><a href={item.url} target="_blank">go to</a></>
                : item.type === 'email'
                  ? <><Image src={item.imagePath} alt='test' width={30} height={30} /><a href={`mailto:${item.email}@example.com`}>send</a></>
                  : <><Image src={item.imagePath} alt='test' width={30} height={30} /><a href={`tel:${item.email}`}>call</a></>
              }
            </span>)
          : info.category === 'menu' 
          ? info.items.map((item, _index) => 
            <span ref={el => (wordsRef.current[index] = el)} className={`word word--${info.category}`} key={`${index}-${_index}`}>
              {item}<Link href={`/${item}`}>Link!</Link>
            </span>
          )
          : info.items.map((item, _index) => 
            <span ref={el => (wordsRef.current[index] = el)} className={`word word--${info.category}`} key={`${index}-${_index}`}>{item}</span>
          )
        )}
      </div>
    </div>
  )
}

export default Test;