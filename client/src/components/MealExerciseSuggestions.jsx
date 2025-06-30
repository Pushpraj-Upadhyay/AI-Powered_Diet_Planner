import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlan } from "../store/slice/meal/mealActions";
import LoadState from "./LoadState";
import { toast } from "react-toastify";

const MealExerciseSuggestions = () => {
  const [activeTab, setActiveTab] = useState("meal");
  const dispatch = useDispatch();
  const { mealsAndExercise, loading, error } = useSelector(
    (state) => state.mealsAndExercise
  );

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
    dispatch(fetchPlan());
  }, [error]);

  const handleCompletePlan = (event) => {
    event.preventDefault();
    const button = event.target.closest("button");
    if (button) {
      if (button.textContent === "Complete") {
        button.textContent = "Completed";
        button.style.backgroundColor = "#4CAF50"; // Change to green
      } else if (button.textContent === "Completed") {
        button.textContent = "Complete";
        button.style.backgroundColor = "#F44336"; // Change back to red
      } else {
        // details button clicked
      }
    }
  };

  if (loading) return <LoadState />;

  if (mealsAndExercise.length == 0) {
    return (
      <section className="h-screen flex items-center justify-center">
        <div className="text-center text-gray-600">
          <h1 className="text-2xl font-bold mb-4">
            No Meal Suggestions Available
          </h1>
          <p className="text-lg">
            Please create a meal plan to see suggestions.
          </p>
          <Link
            to="/meal-plan/create"
            className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 inline-block hover:bg-green-600 transition-colors"
            role="button"
            aria-label="Create a meal plan"
          >
            Create Plan
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div className="p-6 max-sm:px-2">
      {/* Toggle Buttons */}
      <div className="w-1/2 max-sm:w-full flex justify-evenly mb-4 mx-auto bg-green-100 rounded-full p-1">
        <button
          onClick={() => setActiveTab("meal")}
          className={`px-4 py-2 rounded-full transition-all duration-300 ${
            activeTab === "meal"
              ? "bg-green-600 text-white"
              : "text-green-800 hover:bg-green-200"
          }`}
        >
          Meal Plan
        </button>
        <button
          onClick={() => setActiveTab("fitness")}
          className={`px-4 py-2 rounded-full transition-all duration-300 ${
            activeTab === "fitness"
              ? "bg-green-600 text-white"
              : "text-green-800 hover:bg-green-200"
          }`}
        >
          Fitness Exercise
        </button>
      </div>

      <main>
        {activeTab === "meal" && (
          <section onClick={handleCompletePlan}>
            {mealsAndExercise.map((dayPlan, dayIndex) => (
              <article
                key={dayIndex}
                className="bg-white p-2 my-16 rounded-xl shadow-md border border-green-200"
              >
                <header>
                  <h2 className="text-2xl text-center font-bold text-green-700 mb-2 uppercase">
                    {dayPlan.currDay}
                  </h2>
                </header>

                <div className="flex max-md:flex-col justify-around items-center">
                  {dayPlan.currDayPlan.meals.map((meal, mealIndex) => (
                    <div
                      key={mealIndex}
                      className="w-88 max-md:w-full bg-white p-4 mx-2 my-4 rounded-xl shadow-md border border-green-200 flex flex-col"
                    >
                      <p className="flex justify-evenly h-7 text-lg">
                        <span>{meal.mealNum}</span>
                        <span>{meal.timing}</span>
                      </p>
                      <p className="font-semibold text-lg">{meal.name}</p>
                      <p className="text-green-700">{meal.calories} calories</p>

                      <div className="flex justify-around text-white">
                        <button className="h-8 mt-4 px-4 py-1 bg-red-500 hover:bg-red-600 rounded-sm transition-colors cursor-pointer">
                          {meal.isCompleted ? "Completed" : "Complete"}
                        </button>
                        <button className="h-8 mt-4 px-4 py-1 bg-blue-500 hover:bg-blue-600 rounded-sm transition-colors cursor-pointer">
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </section>
        )}

        {activeTab === "fitness" && (
          <section onClick={handleCompletePlan}>
            {mealsAndExercise.map((dayPlan, dayIndex) => (
              <article
                key={dayIndex}
                className="bg-white p-2 my-16 rounded-xl shadow-md border border-green-200"
              >
                <header className="flex flex-col items-center">
                  <h2 className="text-2xl font-bold text-green-700 mb-2 uppercase">
                    {dayPlan.currDay}
                  </h2>
                </header>

                <div className="flex max-md:flex-col justify-around items-center">
                  {dayPlan.currDayPlan.exercise.map(
                    (exercise, exerciseIndex) => (
                      <div
                        key={exerciseIndex}
                        className="w-88 max-md:w-full bg-white p-4 mx-2 my-4 rounded-xl shadow-md border border-green-200 flex flex-col"
                      >
                        <p className="flex justify-evenly h-7 text-lg">
                          <span>{exercise.duration}</span>
                          <span>{exercise.intensity}</span>
                        </p>
                        <p className="font-semibold text-lg">{exercise.name}</p>
                        <p className="text-green-700">{exercise.type}</p>

                        <div className="flex justify-around text-white">
                          <button className="h-8 mt-4 px-4 py-1 bg-red-500 hover:bg-red-600 rounded-sm transition-colors cursor-pointer">
                            {exercise.isCompleted ? "Completed" : "Complete"}
                          </button>
                          <button className="h-8 mt-4 px-4 py-1 bg-blue-500 hover:bg-blue-600 rounded-sm transition-colors cursor-pointer">
                            Details
                          </button>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default MealExerciseSuggestions;
