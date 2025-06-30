import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPlan } from "../store/slice/meal/mealActions";
import LoadState from "../components/LoadState";

const CreateMealPlan = () => {
  const dispatch = useDispatch();
  const { loading, mealsAndExercise } = useSelector(
    (state) => state.mealsAndExercise
  );
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    dietaryPreference: "",
    currentWeight: "",
    targetWeight: "",
    activityLevel: "",
    allergies: [],
    mealFrequency: "3",
    prepTime: "30",
    lifestyle: "",
    workSchedule: "",
    medicalConditions: [],
    medications: [],
    budget: "",
  });

  const steps = [
    { number: 1, title: "Dietary Preferences" },
    { number: 2, title: "Health Goals" },
    { number: 3, title: "Restrictions" },
    { number: 4, title: "Schedule" },
    { number: 5, title: "Lifestyle" },
    { number: 6, title: "Medical History" },
    { number: 7, title: "Budget" },
    { number: 8, title: "Review" },
  ];
  const dietaryOptions = [
    {
      value: "standard",
      label: "Standard",
      icon: "fa-utensils",
      description: "Regular diet with all food groups",
    },
    {
      value: "vegetarian",
      label: "Vegetarian",
      icon: "fa-carrot",
      description: "Plant-based with dairy and eggs",
    },
    {
      value: "vegan",
      label: "Vegan",
      icon: "fa-leaf",
      description: "100% plant-based diet",
    },
    {
      value: "pescatarian",
      label: "Pescatarian",
      icon: "fa-fish",
      description: "Vegetarian plus seafood",
    },
  ];
  const allergenOptions = [
    "Dairy",
    "Eggs",
    "Tree Nuts",
    "Peanuts",
    "Shellfish",
    "Wheat",
    "Soy",
    "Fish",
  ];
  const handleNext = async () => {
    if (currentStep < 8) setCurrentStep(currentStep + 1);
    else {
      const response = await dispatch(createPlan(formData));

      if (createPlan.fulfilled.match(response)) {
        toast.success("Plan created successfully");
        navigate("/meal-plan/suggestions");
      } else {
        toast.error(response.payload);
        console.log(response);
      }
    }
  };
  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleAllergiesChange = (allergy) => {
    setFormData({
      ...formData,
      allergies: formData.allergies.includes(allergy)
        ? formData.allergies.filter((a) => a !== allergy)
        : [...formData.allergies, allergy],
    });
  };

  if (loading) return <LoadState />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
        <div>
          <h1 className="text-3xl font-bold mb-8">
            Create Your Personalized Meal Plan
          </h1>
          <div className="mb-12 overflow-x-auto">
            <div className="flex space-x-4 min-w-max">
              {steps.map((step) => (
                <div key={step.number} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep >= step.number
                        ? "bg-green-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {step.number}
                  </div>
                  <span className="ml-2 text-sm whitespace-nowrap">
                    {step.title}
                  </span>
                  {step.number < steps.length && (
                    <div
                      className={`h-1 w-8 mx-2 ${
                        currentStep > step.number
                          ? "bg-green-500"
                          : "bg-gray-200"
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {currentStep === 1 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  Select Your Dietary Preference
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {dietaryOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          dietaryPreference: option.value,
                        })
                      }
                      className={`p-6 rounded-xl cursor-pointer border-2 transition-all ${
                        formData.dietaryPreference === option.value
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-green-200"
                      }`}
                    >
                      <i
                        className={`fas ${option.icon} text-2xl ${
                          formData.dietaryPreference === option.value
                            ? "text-green-500"
                            : "text-gray-400"
                        }`}
                      ></i>
                      <h3 className="text-xl font-semibold mt-4">
                        {option.label}
                      </h3>
                      <p className="text-gray-600 mt-2">{option.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {currentStep === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  Set Your Health Goals
                </h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Weight (kg)
                      </label>
                      <input
                        type="number"
                        name="currentWeight"
                        value={formData.currentWeight}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border-gray-200 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Target Weight (kg)
                      </label>
                      <input
                        type="number"
                        name="targetWeight"
                        value={formData.targetWeight}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border-gray-200 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Activity Level
                    </label>
                    <select
                      name="activityLevel"
                      value={formData.activityLevel}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border-gray-200 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Select activity level</option>
                      <option value="sedentary">Sedentary</option>
                      <option value="light">Lightly Active</option>
                      <option value="moderate">Moderately Active</option>
                      <option value="very">Very Active</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            {currentStep === 3 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  Dietary Restrictions
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {allergenOptions.map((allergen) => (
                    <div
                      key={allergen}
                      onClick={() => handleAllergiesChange(allergen)}
                      className={`p-4 rounded-lg cursor-pointer border-2 transition-all ${
                        formData.allergies.includes(allergen)
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-green-200"
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.allergies.includes(allergen)}
                          onChange={() => {}}
                          className="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <span className="ml-3">{allergen}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {currentStep === 4 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Meal Schedule</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meals per Day
                    </label>
                    <select
                      name="mealFrequency"
                      value={formData.mealFrequency}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border-gray-200 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="3">3 meals</option>
                      <option value="4">4 meals</option>
                      <option value="5">5 meals</option>
                      <option value="6">6 meals</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Maximum Prep Time (minutes)
                    </label>
                    <select
                      name="prepTime"
                      value={formData.prepTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border-gray-200 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="45">45 minutes</option>
                      <option value="60">60 minutes</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            {currentStep === 5 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  Lifestyle Information
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Occupation Type
                    </label>
                    <select
                      name="lifestyle"
                      value={formData.lifestyle}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border-gray-200 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Select occupation type</option>
                      <option value="sedentary">Office/Desk Job</option>
                      <option value="active">
                        Active Job (Teacher, Retail, etc.)
                      </option>
                      <option value="physical">Physical Labor</option>
                      <option value="varied">Varied Activity Levels</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Work Schedule
                    </label>
                    <select
                      name="workSchedule"
                      value={formData.workSchedule}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border-gray-200 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Select work schedule</option>
                      <option value="regular">Regular (9-5)</option>
                      <option value="early">Early Shift</option>
                      <option value="late">Late Shift</option>
                      <option value="night">Night Shift</option>
                      <option value="rotating">Rotating Shifts</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            {currentStep === 6 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Medical Information</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Medical Conditions (if any)
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        "Diabetes",
                        "Hypertension",
                        "Heart Disease",
                        "IBS",
                        "Celiac Disease",
                        "GERD",
                        "Thyroid Issues",
                        "None",
                      ].map((condition) => (
                        <div
                          key={condition}
                          onClick={() => {
                            const newConditions =
                              formData.medicalConditions.includes(condition)
                                ? formData.medicalConditions.filter(
                                    (c) => c !== condition
                                  )
                                : [...formData.medicalConditions, condition];
                            setFormData({
                              ...formData,
                              medicalConditions: newConditions,
                            });
                          }}
                          className={`p-4 rounded-lg cursor-pointer border-2 transition-all ${
                            formData.medicalConditions.includes(condition)
                              ? "border-green-500 bg-green-50"
                              : "border-gray-200 hover:border-green-200"
                          }`}
                        >
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.medicalConditions.includes(
                                condition
                              )}
                              onChange={() => {}}
                              className="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <span className="ml-3">{condition}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Medications (if any)
                    </label>
                    <input
                      type="text"
                      placeholder="Enter medications separated by commas"
                      className="w-full px-4 py-2 rounded-lg border-gray-200 focus:ring-green-500 focus:border-green-500"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          medications: e.target.value
                            .split(",")
                            .map((item) => item.trim()),
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            )}
            {currentStep === 7 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  Budget Considerations
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Weekly Grocery Budget
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border-gray-200 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Select weekly budget</option>
                      <option value="economy(Rs. 500 - 2000)">
                        Economy (Rs. 500 - 2000)
                      </option>
                      <option value="moderate(Rs. 2000 - 5000)">
                        Moderate (Rs. 2000 - 5000)
                      </option>
                      <option value="premium(Rs. 5000 - 10000)">
                        Premium (Rs. 5000 - 10000)
                      </option>
                      <option value="luxury(Rs. 10000+)">
                        Luxury (Rs. 10000+)
                      </option>
                    </select>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium mb-2">Budget-Friendly Tips</h4>
                    <p className="text-sm text-gray-600">
                      Your meal plan will be optimized based on your budget
                      while still meeting your nutritional needs. We'll include
                      cost-saving tips and affordable alternatives.
                    </p>
                  </div>
                </div>
              </div>
            )}
            {currentStep === 8 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  Review Your Information
                </h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">Diet & Health</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>
                          Diet: {formData.dietaryPreference || "Not selected"}
                        </li>
                        <li>
                          Current Weight:{" "}
                          {formData.currentWeight || "Not provided"} kg
                        </li>
                        <li>
                          Target Weight:{" "}
                          {formData.targetWeight || "Not provided"} kg
                        </li>
                        <li>
                          Activity Level:{" "}
                          {formData.activityLevel || "Not selected"}
                        </li>
                      </ul>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">
                        Restrictions & Preferences
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>
                          Allergies:{" "}
                          {formData.allergies.length
                            ? formData.allergies.join(", ")
                            : "None"}
                        </li>
                        <li>
                          Medical Conditions:{" "}
                          {formData.medicalConditions.length
                            ? formData.medicalConditions.join(", ")
                            : "None"}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">Lifestyle</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>
                          Occupation: {formData.lifestyle || "Not selected"}
                        </li>
                        <li>
                          Work Schedule:{" "}
                          {formData.workSchedule || "Not selected"}
                        </li>
                      </ul>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">Meal Planning</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>Meals per day: {formData.mealFrequency}</li>
                        <li>Prep time: {formData.prepTime} minutes</li>
                        <li>Budget: {formData.budget || "Not selected"}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium mb-2">
                      Ready to Create Your Plan
                    </h4>
                    <p className="text-sm text-gray-600">
                      We have all the information needed to create your
                      personalized nutrition plan. Click "Create Plan" to
                      generate your custom meal recommendations.
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className="flex justify-between mt-8 pt-8 border-t">
              <button
                onClick={handlePrevious}
                className={`!rounded-button px-6 py-2 text-gray-600 border border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap ${
                  currentStep === 1 ? "invisible" : ""
                }`}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className="!rounded-button bg-green-500 text-white px-6 py-2 hover:bg-green-600 transition-colors cursor-pointer whitespace-nowrap"
              >
                {currentStep === 8 ? "Create Plan" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateMealPlan;
