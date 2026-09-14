import ProductOverview from "../components/ProductOverview";
import { useLoaderData, useParams, useNavigation } from "react-router-dom";
import SubjectDetailsSkeleton from "../components/SubjectDetailsSkeleton";

export default function ProductDetails() {
  const { id } = useParams();
  const loaderData = useLoaderData();
  const navigation = useNavigation();

  if (navigation.state === "loading" || !loaderData?.specificProduct) {
    return <SubjectDetailsSkeleton />;
  }

  const { specificProduct, materials } = loaderData;

  return (
    <ProductOverview specificProduct={specificProduct} materials={materials} />
  );
}