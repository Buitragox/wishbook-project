//import React from "react";
//import { Link } from "react-router-dom";
import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from "reactstrap";
import { Link } from "react-router-dom";
import useBooks from "../hooks/useBooks";

const items = [
  {
    src: "img/book.png"
  },
  {
    src: "img/AYTV.png"
  },
  {
    src: "img/vpj.jpg"
  }
];
const items2 = [
  {
    src: "img/señ.jpg"
  },
  {
    src: "img/NDN.jpg"
  },
  {
    src: "img/mimi.jpg"
  }
];

const Example = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const { books } = useBooks();

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === 3 - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? 3 - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = books.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.id}
      >
        <Link to={"/Book/" + item.id}>
          <img className="img" src={"../" + item.img} alt={item.title} />
        </Link>
        {/* <CarouselCaption
          captionText={"$" + item.price}
          captionHeader={item.title}
        /> */}
      </CarouselItem>
    );
  });

  return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
      <CarouselIndicators
        items={books}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
};
const Example2 = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const { books } = useBooks();
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === 4 - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? 4 - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = books.slice(5, books.length).map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.id}
      >
        <Link to={"/Book/" + item.id}>
          <img className="img" src={"../" + item.img} alt={item.title} />
        </Link>
        {/* <CarouselCaption
          captionText={"$" + item.price}
          captionHeader={item.title}
        /> */}
      </CarouselItem>
    );
  });

  return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
      <CarouselIndicators
        items={items2}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
};

export default function home() {
  return (
    <div className="container-r container">
      <hr size="0" className="rulerColor container"></hr>
      <h2 className="txt-home text-left-align container">Popular Books</h2>
      <Example />
      <h2 className="txt-home text-left-align container">On Sale</h2>
      <Example2 />
    </div>
  );
}
