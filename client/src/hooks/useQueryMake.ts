function useQueryMake(filter, searchString) {
  let searchPrice = "";
  if (filter?.price?.type === "lessThan") {
    searchPrice = searchPrice + `price[lte]=${filter?.price?.value}`;
  }
  if (filter?.price?.type === "moreThan") {
    searchPrice = searchPrice + `price[gte]=${filter?.price?.value}`;
  }
  if (filter?.price?.type === "equalsTo") {
    searchPrice = searchPrice + `price=${filter?.price?.value}`;
  }
  if (filter?.price?.type === "priceRange") {
    searchPrice = searchPrice + `price[gte]=${filter?.price?.from}&price[lte]=${filter?.price?.to}`;
  }
  let searchSort = "";
  let latitude = "";
  let longitude = "";
  if (filter?.location) {
    latitude = `latitude=${filter?.location[1] || 0}`;
    longitude = `longitude=${filter?.location[0] || 0}`;
  }
  if (filter?.sort === "expensive") {
    searchSort = "sort=-price";
  }
  if (filter?.sort === "cheapest") {
    searchSort = "sort=price";
  }
  if (filter?.sort === "popular") {
    searchSort = "sort=-favCount";
  }
  if (filter?.sort === "far") {
    searchSort = "sort=far";
  }
  if (filter?.sort === "nearest") {
    searchSort = "sort=near";
  }
  let searchPerk = "";

  if (filter?.perks?.length) {
    searchPerk = `perks[all]=${filter.perks.join(",")}`;
  }

  let searchStringToAdd = "";
  if (searchString) {
    searchStringToAdd = `searchString=${searchString}`;
  }

  let queryArray = [searchPrice, searchSort, searchPerk, latitude, longitude, searchStringToAdd];

  const query = queryArray
    .filter((value) => {
      return value.length !== 0;
    })
    .join("&");

  return query;
}

export default useQueryMake;
