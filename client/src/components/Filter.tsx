import React, { useEffect, useState } from "react";
import Perks from "./Perks.tsx";
import { useDispatch } from "react-redux";
import { addFilter } from "../slice/filterSlice";
import toast from "react-hot-toast";
import Button from "./ui/Button.tsx";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxhooks.ts";
import { priceRangeData, PriceRangeEnum, sortArr } from "../constants/filter.ts";

interface FilterTypes {
  setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Filter({ setFilterOpen }: FilterTypes) {
  const filter = useAppSelector((state) => state.filter.filter);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [perks, setPerks] = useState<string[]>(filter?.perks || []);
  const [sort, setSort] = useState(filter?.sort || "");
  const [coordinates, setCoordinates] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<PriceRangeEnum | null>(filter?.priceRange || null)

  const handleSortClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget) setSort(event.currentTarget.id);
    if (event.currentTarget.id === "nearest" || event.currentTarget.id === "far") {
      navigator.geolocation.getCurrentPosition(
        (position) => setCoordinates([position.coords.longitude, position.coords.latitude]),
        () => {
          toast.error("Error occured !");
          setSort("");
          setCoordinates([]);
        }
      );
    } else {
      setCoordinates([]);
    }
  };

  

  const handleClearClick = (event: React.MouseEvent) => {
    if (event.currentTarget.id === "priceRange") {
      setPriceRange(null);
    }
    if (event.currentTarget.id === "sort") {
      setSort("");
    }
    if (event.currentTarget.id === "perks") {
      setPerks([]);
    }
  };

  const handleApplyClick = () => {
    let newFilter: any = {};
    newFilter["priceRange"] = priceRange;
    newFilter["sort"] = sort;
    newFilter["perks"] = perks;
    newFilter["location"] = coordinates;

    dispatch(addFilter({ ...newFilter }));
    setFilterOpen(false);
    navigate("/");
  };

  const checkingFromGlobal = () => {
    
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">Filters</h2>
          <button
            onClick={() => setFilterOpen(false)}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* Price Section */}
          <div className="rounded-lg border border-gray-200 p-4">
            <div className="flex justify-between items-center">
            <h3 className="mb-4 text-lg font-medium text-gray-700">Price Range</h3>
            <Button
                text="Clear"
                className="rounded-md border border-gray-300 bg-white !px-2 !py-1 text-xs !text-gray-600 hover:bg-gray-50 mt-0 m-0"
                id="priceRange"
                onClick={handleClearClick}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {
                priceRangeData.map(({text, range, key})=> <div className={`cursor-pointer rounded-lg border p-4 transition-all hover:shadow-md ${priceRange === key ? "border-primary bg-primary text-white" : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:bg-gray-50" } `} onClick={()=>setPriceRange(key)}>
                <p className={`text-lg font-semibold ${priceRange === key ? "text-gray-100" : "text-gray-800" } `}>
                  {range}
                </p>
                <p className={`text-sm ${priceRange === key ? "text-gray-200" : "text-gray-500" }`}>{text}</p>
              </div>)
              }
              
            </div>
          </div>

          {/* Sort Section */}
          <div className="rounded-lg border border-gray-200 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-700">Sort by</h3>
              <Button
                text="Clear"
                className="rounded-md border border-gray-300 bg-white !px-2 !py-1 text-xs !text-gray-600 hover:bg-gray-50 mt-0 m-0"
                id="sort"
                onClick={handleClearClick}
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {sortArr.map((value) => (
                <div
                  key={value}
                  className={`cursor-pointer rounded-lg border px-4 py-3 text-center transition-all ${
                    sort === value
                      ? "border-primary bg-primary text-white"
                      : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:bg-gray-50"
                  }`}
                  id={value}
                  onClick={handleSortClick}
                >
                  <span className="capitalize">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Perks Section */}
          <div className="rounded-lg border border-gray-200 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-700">Perks</h3>
              <Button
                text="Clear"
                className="rounded-md border border-gray-300 bg-white !px-2 !py-1 text-xs !text-gray-600 hover:bg-gray-50 mt-0 m-0"
                id="perks"
                onClick={handleClearClick}
              />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              <Perks selected={perks} onChange={setPerks} />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <Button
            onClick={handleApplyClick}
            text="Apply Filters"
            className="flex-1 rounded-lg bg-primary px-6 py-3 text-white hover:bg-primary/90"
          />
          <Button
            onClick={handleCancelClick}
            text="Cancel"
            className="flex-1 rounded-lg border border-gray-300 bg-white px-6 py-3 !text-gray-700 hover:bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
}

export default Filter;
