import './index.css';
import ReactDOM from 'react-dom/client';
import React, { Component } from 'react';
import { requestFrame, S } from 'selector_dom';

const ease = (x, test) => {
  if (test) return;
  const code = S('#easeCode').val();
  // eslint-disable-next-line no-eval
  return eval(code);
};

ease(null, true); // using ease function to prevent it from being removed after build.

export default class Easing extends Component {
  state = { easing: 'easeInSine', duration: 2000 };

  componentDidMount() {
    const c = document.getElementById('xyCanvas');
    const ctx = c.getContext('2d');
    ctx.beginPath();
    ctx.lineWidth = '2';
    ctx.strokeStyle = 'black';
    // x line
    ctx.moveTo(10, 400);
    ctx.lineTo(590, 400);
    // y line
    ctx.moveTo(100, 490);
    ctx.lineTo(100, 110);

    ctx.stroke();

    let y = 400;
    S('#start').on('click', () => {
      S('#pointDrawer').removeAttr('style');
      S('#container svg').removeAttr('style');
      S('button').css({ pointerEvents: 'none' });
      ctx.beginPath();
      ctx.lineWidth = '2';
      ctx.strokeStyle = `hsla(${Math.random() * 360}, 100%, 30%, 1)`;
      ctx.moveTo(100, 400);
      requestFrame({ from: 400, to: 110, duration: this.state.duration, easingFunction: this.state.easing }, (top, i, o) => {
        S('#pointDrawer').css({ top: top + 'px' });
        S('#container svg').css({ top: top + 'px' });
        y = top;
      });
      requestFrame({ from: 100, to: 590, duration: this.state.duration }, left => {
        S('#pointDrawer').css({ left: left + 'px' });
        ctx.lineTo(left, y);
        ctx.stroke();
        if (left === 590) {
          S('button').css({ pointerEvents: 'initial' });
        }
      });
    });
  }

  clearCanvas = () => {
    S('#pointDrawer').removeAttr('style');
    S('#container svg').removeAttr('style');
    const c = document.getElementById('xyCanvas');
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();
    ctx.lineWidth = '2';
    ctx.strokeStyle = 'black';
    // x line
    ctx.moveTo(10, 400);
    ctx.lineTo(590, 400);
    // y line
    ctx.moveTo(100, 490);
    ctx.lineTo(100, 110);

    ctx.stroke();
  };

  render() {
    return (
      <>
        <div id='container'>
          <canvas id='xyCanvas' width='600' height='600'></canvas>
          <div id='pointDrawer'></div>
          <svg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'>
            <path d='M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z' />
          </svg>
        </div>
        <button id='start' style={{ marginBottom: '10px' }}>
          Start
        </button>
        <button onClick={this.clearCanvas} style={{ marginTop: '10px' }}>
          Clear
        </button>
        <select
          onChange={e => {
            // eslint-disable-next-line no-eval
            this.setState({ easing: e.target.value === 'custom' ? eval('ease') : e.target.value });
            e.target.value === 'custom' ? S('#easeCode').css({ display: 'block' }) : S('#easeCode').css({ display: 'none' });
            e.target.value === 'custom' ? S('p').css({ display: 'block' }) : S('p').css({ display: 'none' });
          }}
        >
          <option value='easeInSine'>easeInSine</option>
          <option value='easeOutSine'>easeOutSine</option>
          <option value='easeInOutSine'>easeInOutSine</option>
          <option value='easeInQuad'>easeInQuad</option>
          <option value='easeOutQuad'>easeOutQuad</option>
          <option value='easeInOutQuad'>easeInOutQuad</option>
          <option value='easeInCubic'>easeInCubic</option>
          <option value='easeOutCubic'>easeOutCubic</option>
          <option value='easeInOutCubic'>easeInOutCubic</option>
          <option value='easeInQuart'>easeInQuart</option>
          <option value='easeOutQuart'>easeOutQuart</option>
          <option value='easeInOutQuart'>easeInOutQuart</option>
          <option value='easeInQuint'>easeInQuint</option>
          <option value='easeOutQuint'>easeOutQuint</option>
          <option value='easeInOutQuint'>easeInOutQuint</option>
          <option value='easeInExpo'>easeInExpo</option>
          <option value='easeOutExpo'>easeOutExpo</option>
          <option value='easeInOutExpo'>easeInOutExpo</option>
          <option value='easeInCirc'>easeInCirc</option>
          <option value='easeOutCirc'>easeOutCirc</option>
          <option value='easeInOutCirc'>easeInOutCirc</option>
          <option value='easeInBack'>easeInBack</option>
          <option value='easeOutBack'>easeOutBack</option>
          <option value='easeInOutBack'>easeInOutBack</option>
          <option value='easeInElastic'>easeInElastic</option>
          <option value='easeOutElastic'>easeOutElastic</option>
          <option value='easeInOutElastic'>easeInOutElastic</option>
          <option value='easeInBounce'>easeInBounce</option>
          <option value='easeOutBounce'>easeOutBounce</option>
          <option value='easeInOutBounce'>easeInOutBounce</option>
          <option value='custom'>custom</option>
        </select>
        <input
          type='text'
          id='easeCode'
          placeholder='use "x" as input variable'
          style={{ display: 'none', marginBottom: '5px' }}
        />
        <p>example: ( Math.ceil( 20 * x ) / Math.round( 20 * x ) ) * x</p>
        <input
          type='number'
          id='duration'
          placeholder='duration in milliseconds (2000 by default)'
          onChange={e => this.setState({ duration: e.target.value ? +e.target.value : 2000 })}
        />
      </>
    );
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Easing />
  </React.StrictMode>
);
