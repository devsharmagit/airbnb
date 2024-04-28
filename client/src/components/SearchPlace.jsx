import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editSearchString } from "../slice/filterSlice.js";
import IconButton from "./ui/IconButton.jsx";
import Input from "./ui/Input.jsx";
import { CrossSvg, SearchSvg, GearSvg } from "../assets/svgs";
import FilterModal from "./Modal/FilterModal.jsx";

const SearchPlace = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [filterOpen, setFilterOpen] = useState(false);
  const [searchString, setSearchString] = useState("");

  const handleClick = (event) => {
    event.preventDefault();
    navigate("/");
    dispatch(editSearchString(searchString));
  };

  const handleCancelClick = () => {
    setSearchString("");
    dispatch(editSearchString(""));
  };

  return (
    <>
      <div className="relative flex items-center gap-1">
        <form
          onSubmit={handleClick}
          className="flex w-[250px] items-center  justify-center rounded-full border border-gray-300 px-5 py-1 shadow-md shadow-gray-300 sm:w-[350px] "
        >
          <Input
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            type="text"
            placeholder="search here..."
            className="mont !my-0 !rounded-none !border-0 !py-0 px-1 text-lg text-black outline-0"
          />

          <IconButton type={"reset"} onClick={handleCancelClick} Icon={CrossSvg} />

          <IconButton
            type={"submit"}
            Icon={SearchSvg}
            className={"text bg-primary text-white hover:bg-primary"}
            IconClass={"text-white fill-white"}
          />
        </form>

        <IconButton
          text={"Filter"}
          onClick={() => {
            setFilterOpen(!filterOpen);
          }}
          Icon={GearSvg}
          className={"flex flex-col-reverse items-center justify-center bg-white text-gray-400 hover:bg-white "}
          IconClass={"w-[24px] h-[24px] flex-1 text-gray-500"}
        />
      </div>
      <FilterModal isOpen={filterOpen} setIsOpen={setFilterOpen} />
    </>
  );
};

export default SearchPlace;
