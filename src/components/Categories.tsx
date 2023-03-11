import React, { useState } from 'react';

const categories = ['Всі', 'Мʼясні', 'Вегетеріанські', 'Гриль', 'Гострі', 'Закриті'];
const Categories = ({value, onChangeCategory}) => {

  const [activeCategory, setActiveCategory] = useState(0);

  const onClickSetActive = (id: number) => {
    setActiveCategory(id);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => onChangeCategory(i)}
            className={value === i ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
