import Highlights from './Highlights'
import ListCard from './ListCard'
import MaterialsList from './MaterialsList'
import Quote from './quote'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductOverview({ specificProduct, materials }) {
  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* {Breadcrumb - the path trail at the top } */}
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8 text-sm"
          >
            {/* College */}
            <li className="flex items-center font-medium text-gray-900">
              {specificProduct.college_name}
              <span className="mx-2 text-gray-300">/</span>
            </li>

            {/* Course */}
            <li className="flex items-center font-medium text-gray-900">
              {specificProduct.year + " Year"}
              <span className="mx-2 text-gray-300">/</span>
            </li>

            {/* Subject */}
            <li
              className="font-medium text-gray-500"
              aria-current="page"
            >
              {specificProduct.name}
            </li>
          </ol>
        </nav>


        {/* Parent */}
        <div className="w-full px-4 py-10 sm:px-6 lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:items-start">

          {/* IMAGE */}
          <div className="lg:col-span-1 lg:pr-8">
            <div className="w-full">
              <img
                alt={specificProduct.name}
                src={specificProduct.imageURL}
                className="w-full sm:w-4/5 lg:w-3/5 mx-auto rounded-lg object-cover lg:sticky lg:top-20"
              />
            </div>
          </div>

          {/* PRODUCT INFO  */}
          <div className="mt-8 lg:mt-0 lg:col-span-2 flex justify-center">
            <div className="max-w-2xl text-center">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {specificProduct.name}
              </h1>

              <div className="py-6">
                <h3 className="sr-only">Description</h3>
                <p className="text-base text-gray-900">{specificProduct.description}</p>
                <Highlights />
              </div>
            </div>
          </div>
          <Quote />
        </div>

        {/* Different Notes will be here in the form of List */}
        <MaterialsList materials={materials}/>
      </div>

    </div>
  )
}
