import { Button } from 'flowbite-react';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterThreadByCategory, removeThreadByCategory, selectThread } from '../states/threads/slice';

function CategoryFilter() {
  const dispatch = useDispatch();
  const thread = useSelector(selectThread);
  const [categories, setCategories] = React.useState([]);

  const handleFilter = ({ category }) => {
    dispatch(filterThreadByCategory(category));
  };

  const handleRemoveFilter = () => {
    dispatch(removeThreadByCategory());
  };

  React.useEffect(() => {
    if (thread.data !== null) {
      const mapCategory = thread.data.map((data) => data.category);
      const filteredCategories = mapCategory.filter((category, index) => !mapCategory.includes(category, index + 1));
      setCategories(filteredCategories);
    }
  }, [thread]);

  return (
    <>
      <Button className="mr-2" onClick={() => handleRemoveFilter()}>
        Semua
      </Button>
      {categories.length > 0
                && categories.map((category) => (
                  <Button className="mx-2" outline onClick={() => handleFilter({ category })} key={`${category}-key`}>
                    {category}
                  </Button>
                ))}
    </>
  );
}

export default CategoryFilter;
