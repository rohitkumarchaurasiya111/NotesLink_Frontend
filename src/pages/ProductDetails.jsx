import { useState, useEffect } from "react";
import ProductOverview from "../components/ProductOverview"
import { getSpecificSubjectDetails } from "../api/userApi";


export default function ProductDetails(){
    //This will be used to store only one specific product details from backend whose details we are going to show
    const [specificProduct, setSpecificProduct] = useState("");
    const subjectId = 2;

    useEffect(()=>{
        async function getSubjectDetailsAndMaterials(){
            const response = await getSpecificSubjectDetails(subjectId);
            setSpecificProduct(response.data);
            console.log(response.data);
        }
        getSubjectDetailsAndMaterials();
    },[])

    return(
        <>
            <ProductOverview specificProduct={specificProduct} />
        </>
    );
}