export default function BuildingMessage({ message }) {
    return (
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
                {message}
                <br />
                Please check back soon!
            </p>
        </div>
    );
}
