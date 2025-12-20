import { useEffect, useState } from "react";
import { userAPI } from "../api/userApi";
import ProductCard from "../components/productCard";
import { getSubjectListOfSpecificCollegeAndYear } from "../api/userApi";

let college = 1;
let year = "THIRD";

export default function ProductListing() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchSubjects() {
            const response = await getSubjectListOfSpecificCollegeAndYear(college, year);
            setProducts(response.data);
        };
        fetchSubjects();
    }, []
    );


    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>

                <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div >
    );
}