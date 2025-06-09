import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMostPopularPlaces } from "../services/api/placeApi";
import Place from "../components/Place";
import { PlaceDataType } from "../types/place";
import Button from "../components/ui/Button";
import { editSearchString } from "../slice/filterSlice";
import { useDispatch } from "react-redux";

const heroImages = [
  "https://images.unsplash.com/photo-1617415420840-48518720fe26?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1478059299873-f047d8c5fe1a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=400&q=80",
];

const aboutImages = [
  "https://plus.unsplash.com/premium_photo-1661962551246-49ffac5cff8a?q=80&w=2033&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1723921232154-574f9172f3f4?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1558713984-4539e6f80df2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const LandingPage: React.FC = () => {

const [places ,setPlaces] = useState<any[]>([]);
const [placeSearch, setPlaceSearch] = useState<string>("");

useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      
        const response: any = await getMostPopularPlaces(signal);
        const result = response?.data?.places || [];
        setPlaces((prev) => [...prev, ...result]);
      
    };

    fetchData();

    return () => {
      controller.abort();
      setPlaces([])
    };
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoadMoreClick = ()=>{
    navigate("/");
  }

  const handleSearchClick = ()=>{
        navigate("/");
        dispatch(editSearchString(placeSearch));
  }

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Hero Section */}
      <section className="container mx-auto flex flex-col items-center justify-between gap-10 px-4 py-12 md:flex-row">
        {/* Left: Text and Search */}
        <div className="flex max-w-xl flex-1 flex-col items-start justify-center">
          <span className="mb-2 text-lg font-semibold text-primary">Explore the World</span>
          <h1 className="mont mb-4 text-4xl font-bold md:text-5xl">
            Discover The Best Destinations In The World
          </h1>
          <p className="raleway mb-6 text-lg text-gray-600">
            Let's help you dream destinations here! We will recommend you a beautiful place and a
            cheap trip with your beloved family.
          </p>
          <div className="mb-6 w-full flex gap-2 items-center">
            {/* <SearchPlace /> */}
            <input
              type="text"
              placeholder="Search Destination..."
              className="flex-1 rounded-full border border-gray-300 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
            value={placeSearch}
            onChange={(e)=>setPlaceSearch(e.target.value)}
            />
            <button onClick={handleSearchClick} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-white transition duration-300 hover:bg-primary/90">
              Search
            </button>
          </div>
          <div className="mt-2 flex gap-4">
            <div className="flex flex-col items-center rounded-xl bg-white px-4 py-2 shadow">
              <span className="text-lg font-bold text-primary">100+</span>
              <span className="text-xs text-gray-500">Destinations</span>
            </div>
            <div className="flex flex-col items-center rounded-xl bg-white px-4 py-2 shadow">
              <span className="text-lg font-bold text-primary">100%</span>
              <span className="text-xs text-gray-500">Verified</span>
            </div>
          </div>
        </div>
        {/* Right: Image Grid */}
        <div className="relative left-20 flex max-w-full flex-1  flex-row  gap-5 overflow-hidden">
          <div className="">
            <img
              src={heroImages[0]}
              alt="dest1"
              className="ml-auto h-80 w-[300px] rounded-2xl object-cover"
            />
            <img
              src={heroImages[1]}
              alt="dest2"
              className="mt-5 h-52 w-[550px] rounded-2xl object-cover "
            />
          </div>
          <div>
            <img
              src={heroImages[2]}
              alt="dest2"
              className="h-52 w-[550px] rounded-2xl object-cover "
            />
            <img
              src={heroImages[3]}
              alt="dest1"
              className="mt-5 h-80 w-[300px] rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-16 md:flex-row">
            {/* Left: Image Stack */}
            <div className="relative w-full md:w-1/2">
              <div className="relative">
                <img
                  src={aboutImages[0]}
                  alt="Main destination"
                  className="h-[500px] w-full rounded-3xl object-cover shadow-xl"
                />
                <div className="absolute -bottom-8 -right-8 rounded-2xl bg-white p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Trusted by</p>
                      <p className="text-2xl font-bold text-primary">10K+</p>
                    </div>
                  </div>
                </div>
              </div>
              <img
                src={aboutImages[1]}
                alt="Secondary destination"
                className="absolute -left-10 -top-10 h-[250px] w-[250px] rounded-3xl border-4 border-white object-cover shadow-xl"
              />
            </div>

            {/* Right: Content */}
            <div className="w-full md:w-1/2">
              <span className="mb-2 text-lg font-semibold text-primary">About Us</span>
              <h2 className="mont mb-6 text-4xl font-bold md:text-5xl">
                Your Journey Begins With Us
              </h2>
              <p className="raleway mb-8 text-lg text-gray-600">
                We're more than just a travel platform - we're your partner in creating
                unforgettable memories. With years of experience and a passion for exploration, we
                connect you with the world's most extraordinary destinations.
              </p>

              <div className="mb-8 grid grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Verified Stays</h3>
                    <p className="text-sm text-gray-600">Quality assured</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">24/7 Support</h3>
                    <p className="text-sm text-gray-600">Always available</p>
                  </div>
                </div>
              </div>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-white transition duration-300 hover:bg-primary/90"
              >
                Learn More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-start gap-16 lg:flex-row">
            {/* Left: Content */}
            <div className="lg:w-1/3">
              <span className="mb-2 block text-lg font-semibold text-primary">What We Give</span>
              <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
                Best Features For You
              </h2>
              <p className="text-lg text-gray-600">
                We will provide the best features for those of you who want to travel comfortably
                with your family.
              </p>
            </div>

            {/* Right: Features Grid */}
            <div className="flex-1 lg:w-2/3">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {/* Feature 1: Lots of Choices */}
                <div className="text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-gray-900">Lots of Choices</h3>
                  <p className="text-gray-600">
                    We have provided several choices of destinations and very cheap travelling
                    packages
                  </p>
                </div>

                {/* Feature 2: Best Tour Guide */}
                <div className="text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-gray-900">Best Tour Guide</h3>
                  <p className="text-gray-600">
                    We provide professional tour guide and provide and people who understand the
                    place
                  </p>
                </div>

                {/* Feature 3: Easy Booking */}
                <div className="text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-gray-900">Easy Booking</h3>
                  <p className="text-gray-600">
                    We will also make it easier for users to book tickets or book the place you want
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section end */}

      {/* Top destination section start */}

      <section className="px-4 py-20">
        <div className="container mx-auto rounded-3xl bg-gray-50 px-4 py-12 text-center ">
          <div className="mx-auto flex max-w-3xl flex-col gap-5">
            <span className="mb-2 text-lg font-semibold text-primary">Top Destination</span>
            <h2 className="mont mb-6 text-4xl font-bold md:text-5xl">
              Lets Explore Your Dream Destinatin Here.
            </h2>
            <p className="raleway mb-8 text-lg text-gray-600">
              We have recommended the most popular destinations for you to explore. Discover
              breathtaking places, unique experiences, and unforgettable adventures curated just for
              your next journey.
            </p>
            
          </div>
          <div className="max-w-7xl mx-auto grid items-center justify-center gap-x-[34px] gap-y-[40px] py-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                  {places.map((obj: PlaceDataType) => (
                    <Place
                      key={obj?._id}
                      id={obj?._id}
                      title={obj?.title}
                      description={obj?.description}
                      photo={obj?.mainImage}
                      price={obj?.price}
                      favourites={obj?.favourites}
                    />
                  ))}
                </div>
                <Button text="Load More" onClick={handleLoadMoreClick} />
        </div>
      </section>

      {/* Top destination section end*/}

      {/* CTA Section */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h2 className="mont mb-6 text-4xl font-bold text-white md:text-5xl">
              Ready to Start Your Journey?
            </h2>
            <p className="raleway mb-8 max-w-2xl text-lg text-white/90">
              Join thousands of travelers who have already discovered their dream destinations with us. 
              Start planning your next adventure today!
            </p>
            <div className="flex gap-4">
              <Link
                to="/search"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-primary transition duration-300 hover:bg-gray-100"
              >
                Start Exploring
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white px-8 py-4 text-white transition duration-300 hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* Enhanced Footer */}
      <footer className="bg-white py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            {/* Developer Info */}
            <div className="mb-6">
              <p className="text-lg font-medium text-gray-700">
                Developed by{" "}
                <span className="font-bold">Dev Sharma</span>
              </p>
            </div>

            {/* Social Links */}
            <div className="mb-6 flex items-center gap-6">
              {/* GitHub */}
              <a
                href="https://github.com/devsharmagit/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 transition duration-300 hover:bg-gray-700"
              >
                <svg
                  className="h-5 w-5 text-gray-300 group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="text-sm">GitHub</span>
              </a>

              {/* Twitter/X */}
              <a
                href="https://x.com/CodeDevsharma"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 transition duration-300 hover:bg-gray-700"
              >
                <svg
                  className="h-5 w-5 text-gray-300 group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span className="text-sm">Twitter</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/dev-sharma-88a87624b/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 transition duration-300 hover:bg-gray-700"
              >
                <svg
                  className="h-5 w-5 text-gray-300 group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="text-sm">LinkedIn</span>
              </a>

              {/* Email */}
              <a
                href="mailto:devsharmasoe@gmail.com"
                className="group flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 transition duration-300 hover:bg-gray-700"
              >
                <svg
                  className="h-5 w-5 text-gray-300 group-hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm">Email</span>
              </a>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-700 pt-4">
              <p className="text-sm text-gray-700">
                &copy; {new Date().getFullYear()} TravelEase. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
