import { useState, useEffect } from "react";
import ProductOverview from "../components/ProductOverview"
import { getSpecificSubjectDetails, getAllMaterialsForGivenSubject } from "../api/userApi";
import { useParams } from "react-router-dom";


export default function ProductDetails(){
    //This will be used to store only one specific product details from backend whose details we are going to show
    const [specificProduct, setSpecificProduct] = useState("");
    const [materials, setMaterials] = useState({});

    const {id} = useParams();           //Getting this Id from React Router
    const subjectId = id;

    useEffect(()=>{
        async function getSubjectDetailsAndMaterials(){
            let response = await getSpecificSubjectDetails(subjectId);
            setSpecificProduct(response.data);
            console.log(response.data);

            response = await getAllMaterialsForGivenSubject(subjectId);
            setMaterials(response.data);
            // console.log(response.data);
        }
        getSubjectDetailsAndMaterials();
    },[])

    return(
        <>
            <ProductOverview specificProduct={specificProduct} materials={materials}/>
        </>
    );
}