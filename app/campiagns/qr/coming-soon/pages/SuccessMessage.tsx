"use client";

export default function SuccessMessage({ area }: { area: string }) {
  return (
    <div className="w-full max-w-md mx-auto 
    backdrop-blur-xl bg-white/10 border border-white/20 
    rounded-2xl p-8 shadow-2xl text-center">

      {/* Icon */}
      <div className="text-4xl mb-4">🎉</div>

      {/* Heading */}
      <h2 className="text-2xl font-semibold text-white mb-2">
        You’re on the list!
      </h2>

      {/* Message */}
      <p className="text-gray-300 mb-4">
        We’ll notify you when we launch in
      </p>

      {/* Area */}
      <p className="text-yellow-400 text-lg font-medium capitalize">
        {area?.replaceAll("-", " ") || "your area"}
      </p>

      {/* Footer */}
      <p className="text-xs text-gray-400 mt-6">
        Thanks for joining us 🚀
      </p>
    </div>
  );
}