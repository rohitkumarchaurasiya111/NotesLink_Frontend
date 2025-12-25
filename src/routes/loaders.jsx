// All the code blocks where we are fetching some data using API and giving those data to components, will be here and we will only pass the data to components using react-routers.

import { getSubjectListOfSpecificCollegeAndYear } from "../api/userApi";
import { Years } from "../constants/Years";

// This will fetch the subejcts of Specific Year and college
    export const productListingLoader = async ({request}) =>{
        const url = new URL(request.url);
        const year = url.searchParams.get("year") || Years[0];
        const college = 1;              //harcoding it just for now

        const response = await getSubjectListOfSpecificCollegeAndYear(college, year);

        console.log(response.data);
        return { products:response.data, year}
    }