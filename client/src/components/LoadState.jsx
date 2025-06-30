const LoadState = () => {
  return (
    <section
      className="loading-state flex items-center justify-center h-screen"
      role="status"
      aria-live="polite"
    >
      <div
        className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500"
        aria-label="Loading, please wait"
      ></div>
    </section>
  );
};

export default LoadState;
