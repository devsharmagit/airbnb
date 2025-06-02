function useQueryMake(filter: any, searchString: string) {
  console.log(filter)
  let priceRange = "";
  let searchSort = "";
  let latitude = "";
  let longitude = "";
  if(filter?.priceRange){
    priceRange = `priceRange=${filter.priceRange}`
  }
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

  let queryArray = [priceRange, searchSort, searchPerk, latitude, longitude, searchStringToAdd];

  const query = queryArray
    .filter((value) => {
      return value.length !== 0;
    })
    .join("&");

    console.log({query})

  return query;
}

export default useQueryMake;
