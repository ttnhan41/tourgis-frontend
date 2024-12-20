import React, { useRef } from "react";
import Wrapper from "../assets/wrappers/CategoryList";
import LeftArrow from "../assets/images/left-arrow.png";
import RightArrow from "../assets/images/right-arrow.png";

const CategorieList = ({
  categoryData,
  selectedCategory,
  onCategorySelect,
}) => {
  const handleCategoryClick = (categoryId) => {
    onCategorySelect(categoryId);
  };

  const scrollContainer = useRef();

  const scrollLeft = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollLeft -= 300;
    }
  };

  const scrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollLeft += 300;
    }
  };

  return (
    <Wrapper>
      <div className="category-container">
        <button
          className="scroll-button left-scroll-button"
          onClick={scrollLeft}
        >
          <img src={LeftArrow} alt="left-scroll" />
        </button>
        <div className="category-list" ref={scrollContainer}>
          {categoryData.map((category) => (
            <button
              key={category._id}
              className={
                selectedCategory === category._id
                  ? "category-button active"
                  : "category-button"
              }
              onClick={() => handleCategoryClick(category._id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        <button
          className="scroll-button right-scroll-button"
          onClick={scrollRight}
        >
          <img src={RightArrow} alt="right-scroll" />
        </button>
      </div>
    </Wrapper>
  );
};

export default CategorieList;
