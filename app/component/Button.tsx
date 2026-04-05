type Props = {
  children: React.ReactNode;
  loading?: boolean;
};

export default function Button({ loading }: Props) {
  return (
    <button
  className="w-full py-3 rounded-lg bg-yellow-400 text-black font-bold 
  hover:bg-yellow-300 transition duration-200"
>
  {loading ? "Submitting..." : "Join Waitlist"}
</button>
  );
}