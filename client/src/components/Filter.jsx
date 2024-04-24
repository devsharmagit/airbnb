import React, { useEffect, useState } from "react";
import Perks from "./Perks";
import { useDispatch, useSelector } from "react-redux";
import { addFilter } from "../slice/filterSlice";
import toast from "react-hot-toast";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./typography/Heading";
import Paragrapgh from "./typography/Paragrapgh";
import { useNavigate } from "react-router-dom";

function Filter({ filterOpen, setFilterOpen }) {
  const filter = useSelector((state) => state.filter.filter);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [perks, setPerks] = useState([]);
  const [inputOne, setInputOne] = useState("");
  const [inputTwo, setInputTwo] = useState("");
  const [priceOption, setPriceOption] = useState("");
  const [sort, setSort] = useState("");
  const [coordinates, setCoordinates] = useState([]);

  const sortArr = ["nearest", "far", "cheapest", "expensive", "popular"];

  const handleSortClick = (event) => {
    setSort(event.currentTarget.id);
    if (
      event.currentTarget.id === "nearest" ||
      event.currentTarget.id === "far"
    ) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          setCoordinates([position.coords.longitude, position.coords.latitude]),
        (err) => {
          toast.error("Error occured !");
          setSort("");
          setCoordinates([]);
        }
      );
    } else {
      setCoordinates([]);
    }
  };

  const handlePriceChange = (event) => {
    setPriceOption(event.target.value);
  };

  const handleClearClick = (event) => {
    if (event.currentTarget.id === "price") {
      setPriceOption("");
    }
    if (event.currentTarget.id === "sort") {
      setSort("");
    }
    if (event.currentTarget.id === "perks") {
      setPerks([]);
    }
  };

  const handleApplyClick = () => {
    let newFilter = {};
    if (priceOption === "priceRange") {
      newFilter["price"] = { type: "priceRange", from: inputOne, to: inputTwo };
    } else if (priceOption) {
      newFilter["price"] = { type: priceOption, value: inputOne };
    }
    newFilter["sort"] = sort;
    newFilter["perks"] = perks;
    newFilter["location"] = coordinates;

    dispatch(addFilter({ ...newFilter }));
    setFilterOpen(false);
    navigate("/")
  };

  const checkingFromGlobal = () => {
    if (filter?.price?.type === "priceRange") {
      setPriceOption("priceRange");
      setInputOne(filter?.price?.from || "");
      setInputTwo(filter?.price?.to || "");
    } else {
      setPriceOption(filter?.price?.type || "");
      setInputOne(filter?.price?.value || "");
      setInputTwo("");
    }
    setSort(filter?.sort || "");
    setPerks(filter?.perks || []);
  };

  const handleCancelClick = () => {
    setFilterOpen(false);
    checkingFromGlobal();
  };

  useEffect(() => {
    checkingFromGlobal();
  }, [filter]);

  return (
    <div
      className={` bg-white top-16 w-full transition-all duration-300 max-w-screen-md m-auto border rounded-lg p-3 mt-5 mb-5 origin-top  border-gray-300 `}
    >
      <Heading text={"Filters"} />
      <div className="py-3 border-b border-gray-300 relative">
        <Paragrapgh text={"Price"} />

        <Button
          text={"clear"}
          className={`absolute right-1 !font-normal top-1 !m-0 !p-1 mont !bg-gray-50 !text-black border border-gray-300 !text-xs rounded-md`}
          id={"price"}
          onClick={handleClearClick}
        />
        <select
          className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md  outline-none "
          value={priceOption}
          onChange={handlePriceChange}
        >
          <option value="">None</option>
          <option value="lessThan"> Less Than </option>
          <option value="moreThan"> More Than </option>
          <option value="equalsTo"> Equals To</option>
          <option value="priceRange">Price Range</option>
        </select>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col item-center gap-1 px-4" id="lessThan">
            {priceOption === "priceRange" && <Paragrapgh text={"From -"} />}
            {priceOption && (
              <Input
                type="number"
                placeholder="600"
                className={`!border-0 !py-2 !rounded-md mt-2 !px-2 !outline-0  bg-gray-100 `}
                onChange={(event) => setInputOne(event.target.value)}
                value={inputOne}
              />
            )}
          </div>
          <div className="flex flex-col item-center gap-1 px-4" id="moreThan">
            {priceOption === "priceRange" && <Paragrapgh text={"To -"} />}
            <Input
              type="number"
              placeholder="600"
              className={`!border-0 !m-0 !py-2 hidden !rounded-md mt-2 !px-2 !outline-0  bg-gray-100 ${
                priceOption === "priceRange" ? "!block" : ""
              }`}
              onChange={(event) => setInputTwo(event.target.value)}
              value={inputTwo}
            />
          </div>
        </div>
      </div>

      <div className="py-3 border-b border-gray-300 relative">
        <Paragrapgh text={"Sort by"} />

        <Button
          text={"clear"}
          className={`absolute right-1 !font-normal top-1 !m-0 !p-1 mont !bg-gray-50 !text-black border border-gray-300 !text-xs rounded-md`}
          id={"sort"}
          onClick={handleClearClick}
        />

        <div className="grid grid-cols-3 gap-3 mt-3">
          {sortArr.map((value) => {
            return (
              <div
              key={value}
                className={`px-3 py-2 border border-gray-300 rounded-md ${
                  sort === value
                    ? "bg-primary !text-white"
                    : "!text-black bg-white"
                }`}
                id={value}
                onClick={handleSortClick}
              >
                <Paragrapgh
                  className={`${
                    sort === value ? "!text-white" : "!text-black"
                  } text-base font-normal capitalize`}
                  text={value}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="py-3 border-b  border-gray-300 relative">
        <p className="mont text-lg mb-1 ">Perks</p>
        <Button
          text={"clear"}
          className={`absolute right-1 !font-normal top-1 !m-0 !p-1 mont !bg-gray-50 !text-black border border-gray-300 !text-xs rounded-md`}
          id={"perks"}
          onClick={handleClearClick}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <Perks selected={perks} onChange={setPerks} />
        </div>
      </div>
      <div className="mt-5 flex gap-3">
        <Button onClick={handleApplyClick} text={"Apply"} className={`!m-0 `} />
        <Button
          onClick={handleCancelClick}
          text={"Cancel"}
          className={`!m-0 bg-white border border-gray-300 !text-gray-700 `}
        />
      </div>
    </div>
  );
}

export default Filter;
