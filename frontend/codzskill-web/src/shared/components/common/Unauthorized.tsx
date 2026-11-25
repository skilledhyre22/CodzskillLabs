export const Unauthorized = () => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="text-5xl">🔒</div>

        <h2 className="mt-5 text-2xl font-bold text-slate-800">
          Access Denied
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          You don't have permission to access this page.
          Please contact SuperAdmin to get the required role assigned.
        </p>

        <p className="mt-4 text-sm font-semibold text-red-500">
          Required Role: Trainer
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;