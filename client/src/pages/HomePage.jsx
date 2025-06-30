import { useEffect } from "react";
import * as echarts from "echarts";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HomePage = () => {
  useEffect(() => {
    const chart = echarts.init(document.getElementById("progress-chart"));
    const option = {
      animation: false,
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Calories",
          type: "line",
          data: [1800, 2200, 1950, 2100, 1850, 2300, 2000],
          smooth: true,
          lineStyle: {
            width: 4,
          },
        },
      ],
    };
    chart.setOption(option);

    return () => chart.dispose();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 pb-20 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-5xl max-sm:text-4xl font-bold text-gray-800 leading-tight">
              Transform Your Diet,
              <br />
              Transform Your Life
            </h1>
            <p className="text-xl max-sm:text-lg text-gray-600">
              Personalized meal plans, expert nutrition advice, and progress
              tracking — all in one place.
            </p>
            <Link
              to="/meal-plan/create"
              className="!rounded-button bg-green-500 text-white px-8 py-4 text-lg hover:bg-green-600 transition-all transform hover:-translate-y-1 whitespace-nowrap"
            >
              Start Your Journey
            </Link>
          </div>
          <figure className="md:w-1/2 mt-10 md:mt-0">
            <img
              src="https://public.readdy.ai/ai/img_res/02c110ea43e598f75e2c9b52c166a148.jpg"
              alt="Healthy Food Arrangement"
              loading="lazy"
              className="w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
            />
          </figure>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl max-sm:text-3xl font-bold text-center text-gray-800 mb-16">
          Why Choose NutriPlan?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: "fa-chart-line",
              title: "Smart Progress Tracking",
              description:
                "Monitor your nutrition goals with advanced analytics and visual progress reports.",
            },
            {
              icon: "fa-utensils",
              title: "Personalized Meal Plans",
              description:
                "Get customized meal plans based on your preferences and dietary requirements.",
            },
            {
              icon: "fa-book",
              title: "Recipe Library",
              description:
                "Access thousands of healthy recipes with detailed nutritional information.",
            },
          ].map((feature, index) => (
            <article
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow transform hover:-translate-y-2"
              aria-label={feature.title}
            >
              <i
                className={`fas ${feature.icon} text-4xl text-green-500 mb-4`}
                aria-hidden="true"
              ></i>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Meal Planner Section */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl max-sm:text-3xl font-bold text-center text-gray-800 mb-16">
            Weekly Meal Planner
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Quinoa Buddha Bowl",
                calories: "450",
                time: "25 min",
                image:
                  "https://public.readdy.ai/ai/img_res/7a3a6106ed44de46c39d192cc62667a0.jpg",
              },
              {
                title: "Grilled Salmon Salad",
                calories: "380",
                time: "20 min",
                image:
                  "https://public.readdy.ai/ai/img_res/c1c68e0d7ea73254fd16fc4e15ac178e.jpg",
              },
              {
                title: "Vegetarian Pasta",
                calories: "420",
                time: "30 min",
                image:
                  "https://public.readdy.ai/ai/img_res/7818c7d2584433d49d46e1f3f1d63488.jpg",
              },
            ].map((meal, index) => (
              <article
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
              >
                <figure>
                  <img
                    src={meal.image}
                    alt={meal.title}
                    loading="lazy"
                    className="w-full h-48 object-cover"
                  />
                </figure>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {meal.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <span>
                      <i className="fas fa-fire-alt mr-2"></i>
                      {meal.calories} cal
                    </span>
                    <span>
                      <i className="fas fa-clock mr-2"></i>
                      {meal.time}
                    </span>
                  </div>
                  <button className="!rounded-button mt-4 w-full bg-green-500 text-white py-2 hover:bg-green-600 transition-colors cursor-pointer whitespace-nowrap">
                    Add to Plan
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Progress Chart Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl max-sm:text-3xl font-bold text-center text-gray-800 mb-16">
          Track Your Progress
        </h2>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div
            id="progress-chart"
            style={{ height: "400px" }}
            aria-label="Progress Chart Visualization"
          ></div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default HomePage;
