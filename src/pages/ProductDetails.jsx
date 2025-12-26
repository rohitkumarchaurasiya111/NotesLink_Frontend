import { useState, useEffect } from "react";
import ProductOverview from "../components/ProductOverview"
import { getSpecificSubjectDetails, getAllMaterialsForGivenSubject } from "../api/userApi";
import { useLoaderData, useParams } from "react-router-dom";


export default function ProductDetails(){
    const {id} = useParams();           //Getting this Id from React Router
    const {specificProduct, materials} = useLoaderData();       //Getting these data from react-router loader 

    return(
        <>
            <ProductOverview specificProduct={specificProduct} materials={materials}/>
        </>
    );
}