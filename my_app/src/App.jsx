import {
  Button,
  Input,
  Image as HeroImage,
} from "@heroui/react";
import { Card, CardBody, CardFooter } from "@heroui/card";
import "./index.css";
import {  Search, LayoutGrid } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link as RouterLink } from "react-router-dom";
import Header from "./components/Navbar";
export default function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCat, setActiveCat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");
  const baseURL = "https://api.escuelajs.co";
  useEffect(() => {
    const catId = searchParams.get("category");
    if (catId) setActiveCat(Number(catId));
  }, []);
  useEffect(() => {
    if (activeCat !== null) {
      setSearchParams({ category: activeCat, search: searchInput });
    } else {
      setSearchParams(searchInput ? { search: searchInput } : {});
    }
  }, [activeCat, searchInput, setSearchParams]);
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(`${baseURL}/api/v1/products/`);
        const data = await res.json();
        if (!cancelled) {
          setProducts(Array.isArray(data) ? data : []);
          setLoading(false);
        }
      } catch {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);
  useEffect(() => {
    async function loadCats() {
      try {
        const res = await fetch(`${baseURL}/api/v1/categories`);
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : []);
      } catch {
        setCategories([]);
      }
    }
    loadCats();
  }, []);
  const searchTerm = searchParams.get("search") || "";
  const filteredProducts = useMemo(() => {
    let items = products;
    if (activeCat) {
      items = items.filter((p) => p?.category?.id === activeCat);
    }
    if (searchTerm) {
      items = items.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return items;
  }, [products, activeCat, searchTerm]);
  const truncate = (s = "", n = 70) =>
    s.length <= n ? s : s.slice(0, n) + "...";
  return (
    <>
      <Header />
      <div className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
        <div>
          <div className="max-w-md mb-6">
            <Input
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (activeCat !== null) {
                    setSearchParams({ category: activeCat, search: searchInput });
                  } else {
                    setSearchParams({ search: searchInput });
                  }
                }
              }}

              startContent={
                <div className="p-1 rounded-full">
                  <Search className="text-black flex-shrink-0" size={20}
                  />
                </div>
              }
              classNames={{
                input: "text-white placeholder:text-gray-400",
                inputWrapper: "bg-black border border-neutral-700",
              }}
            />
          </div>

          {loading ? (
            <p className="text-white/80">Loading products…</p>
          ) : (
            <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {filteredProducts.map((item) => {
                const img =
                  Array.isArray(item.images) && item.images.length > 0
                    ? item.images[0]
                    : "/images/placeholder.jpeg";
                return (
                  <RouterLink to={`/products/${item.id}`} key={item.id}>
                    <Card
                      key={item.id}
                      className="bg-[#17171a] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                    >
                      <CardBody className="overflow-visible p-0">
                        <HeroImage
                          alt={item.title}
                          className="w-full object-cover h-72 "
                          radius="lg"
                          shadow="sm"
                          src={img}
                          width="100%"
                        />
                      </CardBody>
                      <CardFooter className="flex flex-col gap-3 p-5">
                        <b className="text-white">{item.title}</b>
                        <p className="text-sm text-neutral-300">
                          {truncate(item.description, 70)}{" "}
                          <span className="text-white font-semibold cursor-pointer">Read More</span>
                        </p>
                        <span className="inline-block bg-neutral-700/70 text-white text-xs px-3 py-1 rounded-full">
                          {item?.category?.name}
                        </span>
                        <div className="flex justify-between items-center w-full">
                          <div>
                            <p className="text-xs text-white">Price</p>
                            <p className="text-white font-extrabold">${Number(item.price ?? 0).toLocaleString()}</p>
                          </div>
                          <Button className="bg-violet-600 text-white font-bold hover:bg-violet-700" >
                            Details
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </RouterLink>
                );
              })}
            </div>
          )}
        </div>

        <aside className="lg:order-2 order-1 w-full lg:w-64">
          <div className="sticky top-6 bg-[#151518] border border-violet-700 rounded-2xl p-4 lg:p-6 overflow-auto max-h-[80vh]">
            <h2 className="text-xl lg:text-2xl font-extrabold mb-4 lg:mb-6 flex items-center gap-2 text-white">
              <LayoutGrid size={22} /> Categories:
            </h2>
            <ul className="space-y-2 lg:space-y-4">
              <li>
                <button
                  onClick={() => setActiveCat(null)}
                  className={`w-full text-left text-sm lg:text-lg transition-colors ${activeCat === null
                    ? "text-violet-400 font-bold"
                    : "text-white hover:text-violet-300"
                    }`}
                >
                  All
                </button>
              </li>
              {categories.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => setActiveCat(c.id)}
                    className={`w-full text-left text-sm lg:text-lg transition-colors ${activeCat === c.id
                      ? "text-violet-400 font-bold"
                      : "text-white hover:text-violet-300"
                      }`}
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

      </div>
    </>
  );
}
