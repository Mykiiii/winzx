export default function ProfileLoading() {
  return (
    <div className="grid animate-pulse gap-8">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="h-24 w-24 rounded-2xl bg-gray-200" />
            <div className="grid gap-3">
              <div className="h-8 w-56 rounded-full bg-gray-200" />
              <div className="h-4 w-32 rounded-full bg-gray-200" />
              <div className="h-4 w-80 max-w-full rounded-full bg-gray-200" />
            </div>
          </div>
          <div className="h-12 w-36 rounded-2xl bg-gray-200" />
        </div>
      </div>

      <section className="grid gap-6">
        <div className="grid gap-3">
          <div className="h-4 w-20 rounded-full bg-gray-200" />
          <div className="h-8 w-72 max-w-full rounded-full bg-gray-200" />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2].map((item) => (
            <div key={item} className="grid gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
              <div className="grid gap-4">
                <div className="h-11 w-11 rounded-2xl bg-gray-200" />
                <div className="grid gap-3">
                  <div className="h-5 w-44 rounded-full bg-gray-200" />
                  <div className="h-4 w-full rounded-full bg-gray-200" />
                  <div className="h-4 w-3/4 rounded-full bg-gray-200" />
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 pt-5">
                <div className="grid gap-2">
                  <div className="h-7 w-20 rounded-full bg-gray-200" />
                  <div className="h-4 w-16 rounded-full bg-gray-200" />
                </div>
                <div className="h-11 w-28 rounded-2xl bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
