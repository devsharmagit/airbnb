import {  useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editSearchString } from "../slice/filterSlice.js";
import IconButton from "./ui/IconButton.jsx";
import Input from "./ui/Input.jsx";
import { CrossSvg, SearchSvg, GearSvg,   } from "../assets/svgs"
import FilterModal from "./Modal/FilterModal.jsx";

const SearchPlace = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [filterOpen, setFilterOpen] = useState(false);
    const [searchString, setSearchString] = useState("");

    const handleClick = (event) => {
        event.preventDefault();
        navigate("/")
        dispatch(editSearchString(searchString));
      };
    
      const handleCancelClick = () => {
        setSearchString("");
        dispatch(editSearchString(""));
      };

  return (
    <>
    <div className="flex items-center gap-1 relative">
    <form
      onSubmit={handleClick}
      className="flex justify-center items-center  w-[250px] sm:w-[350px] border border-gray-300 px-5 py-1 rounded-full shadow-md shadow-gray-300 "
    >
      <Input  value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        type="text"
        placeholder="search here..."
        className="!my-0 outline-0 !py-0 !border-0 !rounded-none mont px-1 text-lg text-black" />
     

      <IconButton
        type={"reset"}
        onClick={handleCancelClick}
        Icon={CrossSvg}
      />

      <IconButton
        type={"submit"}
        Icon={SearchSvg}
        className={`bg-primary hover:bg-primary text text-white`}
        IconClass={`text-white fill-white`}
      />
    </form>

    <IconButton
      text={"Filter"}
      onClick={() => {
        setFilterOpen(!filterOpen);
      }}
      Icon={GearSvg}
      className={`hover:bg-white flex justify-center items-center flex-col-reverse text-gray-400 bg-white `}
      IconClass={`w-[24px] h-[24px] flex-1 text-gray-500`}
    />
  </div>
  <FilterModal isOpen={filterOpen} setIsOpen={setFilterOpen} />
    </>
  )
}

export default SearchPlace
