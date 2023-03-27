import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncPostThread } from '../states/threads/slice';
import { URL } from '../constant/Url';

function ThreadInput() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = React.useState({
    title: '',
    body: '',
    category: '',
  });

  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    dispatch(asyncPostThread({ ...input }));
    navigate(URL.HOMEPAGE);
    setInput({
      title: '',
      body: '',
      category: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="max-w-sm m-auto">
      <div className="flex flex-col mb-2">
        <div className="flex relative ">
          <input
            onChange={handleChange}
            name="title"
            value={input.title}
            type="text"
            className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Input Title"
          />
        </div>
      </div>
      <div className="flex flex-col mb-2">
        <div className="flex relative ">
          <textarea
            onChange={handleChange}
            name="body"
            value={input.body}
            type="text"
            rows={4}
            className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Input Body"
          />
        </div>
      </div>
      <div className="flex flex-col mb-6">
        <div className="flex relative ">
          <input
            onChange={handleChange}
            name="category"
            value={input.category}
            type="category"
            className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Input Category"
          />
        </div>
      </div>
      <div className="flex w-full">
        <button
          type="submit"
          className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
        >
          Buat Thread
        </button>
      </div>
    </form>
  );
}

export default ThreadInput;
