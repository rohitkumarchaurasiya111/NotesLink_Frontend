import { useEffect, useState } from "react";
import { createMaterial, updateMaterial } from "../api/adminAPI";
import Loader from "./Loader";

export default function AdminCreateMaterialForm({
    subjectId,
    setAlert,
    selectedMaterial,
    setSelectedMaterial,
    onMaterialSave,
}) {
    const isEditMode = Boolean(selectedMaterial);

    // Extra Safety, Prevents accidental rendering without context.
    if (!subjectId && !isEditMode) {
        return <div>Select a subject to add material</div>;
    }

    const [material, setMaterial] = useState({                  //For Material JSON
        title: "",
        type: "NOTES",
        subjectId: Number(subjectId),
        isPremium: true,
        displayOrder: null,
    });
    const [file, setFile] = useState(null);                     //For File Data
    const [loading, setLoading] = useState(false);              //To show Loading state

    /* Populate form in Edit mode */
    useEffect(() => {
        if (selectedMaterial) {
            setMaterial({
                id: selectedMaterial.id,
                title: selectedMaterial.title,
                type: selectedMaterial.type,
                subjectId: selectedMaterial.subjectId,
                isPremium: selectedMaterial.isPremium,
                displayOrder: selectedMaterial.displayOrder,
                driveLink: selectedMaterial.driveLink,
            });
            setFile(null);
        }
    }, [selectedMaterial]);

    /* Re-sync subjectId when exiting edit mode or subject changes */
    useEffect(() => {
        if (!selectedMaterial) {
            setMaterial((prev) => ({
                ...prev,
                subjectId: Number(subjectId),
            }));
        }
    }, [subjectId, selectedMaterial]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setMaterial((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : name === "displayOrder"
                        ? value === "" ? null : Number(value)
                        : value,
        }));
    };


    const resetForm = () => {
        setMaterial({
            title: "",
            type: "NOTES",
            subjectId: Number(subjectId),
            isPremium: true,
            displayOrder: null,
        });
        setFile(null);
    };

    /* Cancel Edit  */
    const handleCancelEdit = () => {
        setSelectedMaterial(null);      //EXIT edit mode in parent
        resetForm();
    };

    //Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isEditMode && !file) {
            setAlert({
                type: "error",
                message: "Please select a file",
            });
            return;
        }

        try {
            setLoading(true);
            //API call
            if (isEditMode) {
                await updateMaterial(selectedMaterial.id, material);
            } else {
                await createMaterial(material, file);
            }
            setAlert({
                type: "success",
                message: isEditMode
                    ? "Material updated successfully"
                    : "Material added successfully",
            });

            setSelectedMaterial(null); //ALWAYS exit edit mode
            resetForm();
            await onMaterialSave();             //Re-Fetch the materials again, once the new one is uploaded
        } catch (err) {
            setAlert({
                type: "error",
                message: err.response?.data?.message || "Operation failed",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Loading Overlay */}
            {loading && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
                    <Loader size="lg" />
                    <p className="mt-3 text-sm font-medium text-gray-600 animate-pulse">
                        {isEditMode ? "Updating..." : "Uploading..."}
                    </p>
                </div>
            )}

            {/* Header Section */}
            <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-bold text-gray-800">
                        {isEditMode ? "Edit Material" : "Add New Material"}
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                        {isEditMode 
                            ? "Update the details for this resource." 
                            : "Upload a new resource to this subject."}
                    </p>
                </div>
                
                {/* Material ID Badge (Only in Edit Mode) */}
                {isEditMode && (
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                            Material ID
                        </span>
                        <span className="font-mono text-sm font-medium text-gray-700 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                            #{selectedMaterial.id}
                        </span>
                    </div>
                )}
            </div>

            {/* Form Section */}
            <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Title Input */}
                    <div className="space-y-1.5">
                        <label className="block text-sm font-semibold text-gray-700">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="title"
                            placeholder="e.g. Unit 1: Introduction to Data Structures"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all disabled:bg-gray-50"
                            value={material.title}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                    </div>

                    {/* Grid for Type and Order */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-gray-700">
                                Material Type
                            </label>
                            <div className="relative">
                                <select
                                    name="type"
                                    className="w-full appearance-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all disabled:bg-gray-50 bg-white"
                                    value={material.type}
                                    onChange={handleChange}
                                    disabled={loading}
                                >
                                    <option value="NOTES">Notes</option>
                                    <option value="PYQ">PYQ</option>
                                    <option value="PYQ_SOLUTION">PYQ Solution</option>
                                    <option value="IMPORTANT_RESOURCES">Important Resources</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-gray-700">
                                Display Order <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="displayOrder"
                                placeholder="e.g. 1"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all disabled:bg-gray-50"
                                value={material.displayOrder ?? ""}
                                onChange={handleChange}
                                onWheel={(e) => e.target.blur()}
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    {/* File Upload (Hidden in Edit Mode) */}
                    {!isEditMode && (
                        <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-gray-700">
                                Upload File <span className="text-red-500">*</span>
                            </label>
                            <div className="relative group">
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx,.ppt,.pptx"
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-gray-300 rounded-lg cursor-pointer focus:outline-none transition-all"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <p className="text-xs text-gray-500">Supported: PDF, DOCX, PPTX</p>
                        </div>
                    )}

                    {/* Premium Toggle */}
                    <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50/50 p-3">
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-900">Premium Content</span>
                            <span className="text-xs text-gray-500">Is this material for paid users only?</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                name="isPremium"
                                className="peer sr-only"
                                checked={material.isPremium}
                                onChange={handleChange}
                                disabled={loading}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    {/* Action Buttons Group */}
                    <div className="pt-4 flex items-center gap-3">
                        {isEditMode && (
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                disabled={loading}
                                className="flex-1 py-2.5 px-4 rounded-lg border border-gray-300 text-red-700 font-medium hover:bg-gray-50 hover:text-gray-900 transition-colors focus:ring-2 focus:ring-gray-200 focus:outline-none"
                            >
                                Cancel Edit
                            </button>
                        )}
                        
                        <button
                            type="submit"
                            disabled={loading}
                            className={`flex-[2] py-2.5 px-4 rounded-lg font-semibold text-blue shadow-sm transition-all focus:ring-2 focus:ring-blue-500/40 focus:outline-none
                                ${loading 
                                    ? "bg-blue-400 cursor-wait" 
                                    : "bg-blue-600 hover:bg-blue-700 hover:shadow"
                                }`}
                        >
                            {isEditMode ? "Update Material" : "Add Material"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
