import React from 'react';
import { register } from 'swiper/element/bundle';
register();

export default (props) => {
  const { children, swiper, ...prop } = props;
  return <swiper-container
    ref={swiper}
    {...prop}
  >
    {
      Array.isArray(children) ? children.map((v, index) => <swiper-slide key={index}>{v}</swiper-slide>) : <swiper-slide>{children}</swiper-slide>
    }
  </swiper-container>
}