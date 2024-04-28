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
  const navigate = useNavigate();

  const [perks, setPerks] = useState([]);
  const [inputOne, setInputOne] = useState("");
  const [inputTwo, setInputTwo] = useState("");
  const [priceOption, setPriceOption] = useState("");
  const [sort, setSort] = useState("");
  const [coordinates, setCoordinates] = useState([]);

  const sortArr = ["nearest", "far", "cheapest", "expensive", "popular"];

  const handleSortClick = (event) => {
    setSort(event.currentTarget.id);
    if (event.currentTarget.id === "nearest" || event.currentTarget.id === "far") {
      navigator.geolocation.getCurrentPosition(
        (position) => setCoordinates([position.coords.longitude, position.coords.latitude]),
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
    navigate("/");
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
      className={" top-16 m-auto mb-5 mt-5 w-full max-w-screen-md origin-top rounded-lg border border-gray-300 bg-white p-3 transition-all  duration-300 "}
    >
      <Heading text={"Filters"} />
      <div className="relative border-b border-gray-300 py-3">
        <Paragrapgh text={"Price"} />

        <Button
          text={"clear"}
          className={"mont absolute right-1 top-1 !m-0 rounded-md border border-gray-300 !bg-gray-50 !p-1 !text-xs !font-normal !text-black"}
          id={"price"}
          onClick={handleClearClick}
        />
        <select
          className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700  outline-none "
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
          <div className="item-center flex flex-col gap-1 px-4" id="lessThan">
            {priceOption === "priceRange" && <Paragrapgh text={"From -"} />}
            {priceOption && (
              <Input
                type="number"
                placeholder="600"
                className={"mt-2 !rounded-md !border-0 bg-gray-100 !px-2 !py-2  !outline-0 "}
                onChange={(event) => setInputOne(event.target.value)}
                value={inputOne}
              />
            )}
          </div>
          <div className="item-center flex flex-col gap-1 px-4" id="moreThan">
            {priceOption === "priceRange" && <Paragrapgh text={"To -"} />}
            <Input
              type="number"
              placeholder="600"
              className={`!m-0 mt-2 hidden !rounded-md !border-0 bg-gray-100 !px-2 !py-2  !outline-0 ${
                priceOption === "priceRange" ? "!block" : ""
              }`}
              onChange={(event) => setInputTwo(event.target.value)}
              value={inputTwo}
            />
          </div>
        </div>
      </div>

      <div className="relative border-b border-gray-300 py-3">
        <Paragrapgh text={"Sort by"} />

        <Button
          text={"clear"}
          className={"mont absolute right-1 top-1 !m-0 rounded-md border border-gray-300 !bg-gray-50 !p-1 !text-xs !font-normal !text-black"}
          id={"sort"}
          onClick={handleClearClick}
        />

        <div className="mt-3 grid grid-cols-3 gap-3">
          {sortArr.map((value) => {
            return (
              <div
                key={value}
                className={`rounded-md border border-gray-300 px-3 py-2 ${
                  sort === value ? "bg-primary !text-white" : "bg-white !text-black"
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

      <div className="relative border-b  border-gray-300 py-3">
        <p className="mont mb-1 text-lg ">Perks</p>
        <Button
          text={"clear"}
          className={"mont absolute right-1 top-1 !m-0 rounded-md border border-gray-300 !bg-gray-50 !p-1 !text-xs !font-normal !text-black"}
          id={"perks"}
          onClick={handleClearClick}
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          <Perks selected={perks} onChange={setPerks} />
        </div>
      </div>
      <div className="mt-5 flex gap-3">
        <Button onClick={handleApplyClick} text={"Apply"} className={"!m-0 "} />
        <Button
          onClick={handleCancelClick}
          text={"Cancel"}
          className={"!m-0 border border-gray-300 bg-white !text-gray-700 "}
        />
      </div>
    </div>
  );
}

export default Filter;
