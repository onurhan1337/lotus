export const LoadingChallenge = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-slate-200 dark:border-slate-500 rounded-full" />
    </div>
  );
};

export default LoadingChallenge;
