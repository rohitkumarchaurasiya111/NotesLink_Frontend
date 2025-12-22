import { useEffect, useState } from "react";
import ProductCard from "../components/productCard";
import { getSubjectListOfSpecificCollegeAndYear } from "../api/userApi";
import OtherNavbar from "../components/OtherNavbar";
import { Years } from "../constants/Years";

let college = 1;

export default function ProductListing() {
    const [products, setProducts] = useState([]);
    const [year, setYear] = useState(Years[0]);
    const [loading, setLoading] = useState(true);

    // This will fetch the subejcts of Specific Year and college and store them into Products, It will re-run if year is changed
    useEffect(() => {
        async function fetchSubjects() {
            setLoading(true);
            const response = await getSubjectListOfSpecificCollegeAndYear(college, year);
            setProducts(response.data);
            setLoading(false);
        }
        fetchSubjects();
    }, [year]);

    return (
        <>
            <OtherNavbar year={year} setYear={setYear} />
            <div className="bg-white">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    {/* Loading State */}
                    {loading && (
                        <div className="flex justify-center py-24">
                            <p className="text-sm text-gray-500">Loading subjects...</p>
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && products.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <div className="rounded-full bg-blue-50 p-6">
                                <svg
                                    className="h-10 w-10 text-blue-500"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 12h6m-6 4h6M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z"
                                    />
                                </svg>
                            </div>

                            <h3 className="mt-6 text-lg font-semibold text-gray-900">
                                Building in Progress
                            </h3>

                            <p className="mt-2 max-w-md text-sm text-gray-500">
                                We’re currently adding subjects for this year.
                                Please check back soon!
                            </p>
                        </div>
                    )}

                    {/* Products Grid */}
                    {!loading && products.length > 0 && (
                        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}