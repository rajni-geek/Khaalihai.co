export default function Heading({ area }: { area: string }) {
  return (
    <>
      <h1 className="text-3xl md:text-4xl font-semibold text-white text-center capitalize mb-4">
        We’re launching in {area || "your area"}
      </h1>

      <p className="text-center text-gray-400 text-sm mb-6">
        Be the first to know when we go live!
      </p>
    </>
  );
}