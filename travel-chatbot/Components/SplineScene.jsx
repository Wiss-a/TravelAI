import React from 'react';
import Spline from '@splinetool/react-spline';

export default function SplineScene() {
  const onClickEvent = (event) => {
    if (event.target.name === 'Plane') {
      alert('Ready to plan your next adventure? ✈️');
    } else {
      console.log('3D object clicked:', event.target.name);
    }
  };

  const onMouseHover = (event) => {
    console.log('Mouse hovered over object:', event.target.name);
  };

  return (
    <div className="Spline">
      <Spline
        scene="https://prod.spline.design/1L8FZI74pt-K4jQg/scene.splinecode"
        onMouseDown={onClickEvent}
        onMouseHover={onMouseHover}
      />
    </div>
  );
}
