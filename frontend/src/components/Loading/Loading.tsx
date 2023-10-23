const Loading = () => {
  return (
    <div className="absolute z-50 top-0 flex justify-center items-center w-full h-full bg-gray-700 opacity-50 dark:bg-bgModalDark">
      <div className="w-7 h-7 border-t-4 border-textHover border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
